/**
 * Sync proposed patristic taxonomy to Sanity:
 *   1. Apply taxonomy to data/patristic_quotes_complete.csv
 *   2. Upsert vocabulary + quote documents from CSV
 *   3. Prune orphaned topic/subtopic documents
 *
 *   npx tsx scripts/syncProposedPatristicTaxonomy.ts          # dry run
 *   npx tsx scripts/syncProposedPatristicTaxonomy.ts --apply  # write changes
 */
import { createClient, type SanityClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { plainTextToPatristicQuoteBlocks } from '../src/lib/apologetics/patristicQuoteText';
import { resolvePatristicEra } from '../src/lib/apologetics/patristicQuotesEras';
import {
    buildPatristicQuoteSlug,
    parseDiedSort,
    parseSubtopics,
    parsePatristicQuotesCsv,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';
import {
    buildTaxonomyIndex,
    loadProposedTaxonomy,
    resolveProposedTaxonomyForQuote
} from './lib/patristicTaxonomyProposed';
import {
    createSanityMigrationClient,
    loadSanityEnvFiles
} from './lib/sanityMigrationClient';
import {
    patristicVocabularyDocument,
    patristicVocabularyId,
    patristicVocabularyReference,
    patristicVocabularyReferences,
    type PatristicVocabularyType
} from './lib/patristicVocabulary';

const csvPath = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

function parseRawSubtopics(value: string): string[] {
    return value
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean);
}

function escapeField(field: string): string {
    if (/[",\n\r]/.test(field)) return `"${field.replace(/"/g, '""')}"`;
    return field;
}

function writeCsv(rows: PatristicQuoteCsvRow[]) {
    const headers = [
        'ID',
        'Father',
        'Died_AD',
        'Era',
        'Source_Work',
        'Source_Ref',
        'Quote_Text',
        'Topic',
        'Subtopics',
        'Position',
        'Book',
        'Section',
        'Notes'
    ] as const;

    const lines = [
        headers.join(','),
        ...rows.map((row) => headers.map((header) => escapeField(row[header] ?? '')).join(','))
    ];
    fs.writeFileSync(csvPath, `${lines.join('\n')}\n`);
}

function applyTaxonomyToCsvRows(rows: PatristicQuoteCsvRow[]) {
    const taxonomy = buildTaxonomyIndex(loadProposedTaxonomy());

    return rows.map((row) => {
        const resolved = resolveProposedTaxonomyForQuote(
            row.Topic,
            parseRawSubtopics(row.Subtopics),
            taxonomy
        );

        return {
            ...row,
            Topic: resolved.topic,
            Subtopics: resolved.subtopics.join('|')
        };
    });
}

function uniqueValues(values: string[]): string[] {
    return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort();
}

function collectVocabulary(rows: PatristicQuoteCsvRow[]) {
    const topics = uniqueValues(rows.map((row) => row.Topic));
    const subtopics = uniqueValues(rows.flatMap((row) => parseSubtopics(row.Subtopics)));
    const eras = uniqueValues(rows.map((row) => resolvePatristicEra(row.Father, row.Era)));
    const fathers = uniqueValues(rows.map((row) => row.Father));
    const sources = uniqueValues(rows.map((row) => row.Book));
    const works = uniqueValues(rows.map((row) => row.Source_Work));
    const positions = uniqueValues(rows.map((row) => row.Position));

    return {
        patristicTopic: topics,
        patristicSubtopic: subtopics,
        patristicEra: eras,
        patristicFather: fathers,
        patristicSource: sources,
        patristicWork: works,
        patristicPosition: positions
    } satisfies Record<PatristicVocabularyType, string[]>;
}

function toSanityDocument(row: PatristicQuoteCsvRow) {
    const legacyId = row.ID.trim();
    const slug = buildPatristicQuoteSlug(row);
    const era = resolvePatristicEra(row.Father, row.Era);
    const subtopics = parseSubtopics(row.Subtopics);

    return {
        _id: `patristicQuote-${legacyId.toLowerCase()}`,
        _type: 'patristicQuote' as const,
        legacyId,
        slug: { _type: 'slug' as const, current: slug },
        father: patristicVocabularyReference('patristicFather', row.Father),
        died: row.Died_AD.trim(),
        diedSort: parseDiedSort(row.Died_AD),
        era: patristicVocabularyReference('patristicEra', era),
        sourceWork: patristicVocabularyReference('patristicWork', row.Source_Work),
        sourceRef: row.Source_Ref.trim(),
        quoteText: plainTextToPatristicQuoteBlocks(row.Quote_Text.trim()),
        topic: patristicVocabularyReference('patristicTopic', row.Topic),
        subtopics: patristicVocabularyReferences('patristicSubtopic', subtopics),
        position: patristicVocabularyReference('patristicPosition', row.Position),
        book: patristicVocabularyReference('patristicSource', row.Book),
        section: row.Section.trim(),
        notes: row.Notes.trim()
    };
}

async function createReadClient(apply: boolean): Promise<SanityClient> {
    if (apply) {
        return createSanityMigrationClient();
    }

    loadSanityEnvFiles();
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08';

    if (!projectId || !dataset) {
        throw new Error(
            'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local'
        );
    }

    return createClient({ projectId, dataset, apiVersion, useCdn: true });
}

async function commitInBatches(
    client: SanityClient,
    label: string,
    documents: Array<{ _id: string; _type: string }>,
    batchSize = 50
) {
    for (let i = 0; i < documents.length; i += batchSize) {
        const batch = documents.slice(i, i + batchSize);
        const transaction = client.transaction();
        batch.forEach((doc) => transaction.createOrReplace(doc));
        await transaction.commit();
        console.log(`  ✓ ${label}: ${Math.min(i + batchSize, documents.length)} / ${documents.length}`);
    }
}

async function deleteInBatches(client: SanityClient, label: string, ids: string[], batchSize = 50) {
    if (ids.length === 0) return;

    for (let i = 0; i < ids.length; i += batchSize) {
        const batch = ids.slice(i, i + batchSize);
        const transaction = client.transaction();
        batch.forEach((id) => transaction.delete(id));
        await transaction.commit();
        console.log(`  ✓ ${label}: ${Math.min(i + batchSize, ids.length)} / ${ids.length}`);
    }
}

/** Stale Studio drafts keep references to old vocabulary and block orphan deletes. */
async function removePatristicQuoteDrafts(client: SanityClient): Promise<number> {
    const draftIds = await client.fetch<string[]>(
        '*[_type == "patristicQuote" && _id in path("drafts.**")]._id'
    );

    if (draftIds.length === 0) return 0;

    await deleteInBatches(client, 'quote drafts', draftIds);
    return draftIds.length;
}

async function migrate(apply: boolean) {
    const originalRows = parsePatristicQuotesCsv(fs.readFileSync(csvPath, 'utf8'));
    const rows = applyTaxonomyToCsvRows(originalRows);
    const vocabulary = collectVocabulary(rows);
    const taxonomy = buildTaxonomyIndex(loadProposedTaxonomy());
    const vocabularyDocuments = Object.entries(vocabulary).flatMap(([type, titles]) =>
        titles.map((title) => patristicVocabularyDocument(type as PatristicVocabularyType, title))
    );
    const documents = rows.map(toSanityDocument);

    const slugCounts = new Map<string, number>();
    for (const doc of documents) {
        const slug = doc.slug.current;
        slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1);
    }
    for (const doc of documents) {
        if ((slugCounts.get(doc.slug.current) ?? 0) > 1) {
            doc.slug.current = `${doc.slug.current}-${doc.legacyId.toLowerCase()}`;
        }
    }

    const client = await createReadClient(apply);
    const dataset = client.config().dataset ?? 'production';

    const [existingTopics, existingSubtopics, draftQuoteIds] = await Promise.all([
            client.fetch<Array<{ _id: string; title: string }>>(
                '*[_type == "patristicTopic"]{ _id, title }'
            ),
            client.fetch<Array<{ _id: string; title: string }>>(
                '*[_type == "patristicSubtopic"]{ _id, title }'
            ),
            client.fetch<string[]>('*[_type == "patristicQuote" && _id in path("drafts.**")]._id')
        ]);

    const activeTopicIds = new Set(
        vocabulary.patristicTopic.map((title) => patristicVocabularyId('patristicTopic', title))
    );
    const activeSubtopicIds = new Set(
        vocabulary.patristicSubtopic.map((title) =>
            patristicVocabularyId('patristicSubtopic', title)
        )
    );

    const topicsToDelete = existingTopics.filter((doc) => !activeTopicIds.has(doc._id));
    const subtopicsToDelete = existingSubtopics.filter((doc) => !activeSubtopicIds.has(doc._id));

    const topicCounts = new Map<string, number>();
    for (const row of rows) {
        topicCounts.set(row.Topic, (topicCounts.get(row.Topic) ?? 0) + 1);
    }

    console.log(`Dataset: ${dataset}`);
    console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`);
    console.log('');
    console.log(`Quotes: ${rows.length}`);
    console.log(`Topics: ${vocabulary.patristicTopic.length}`);
    console.log(`Subtopics: ${vocabulary.patristicSubtopic.length}`);
    console.log('');
    console.log('Topic distribution:');
    [...topicCounts.entries()]
        .sort((a, b) => {
            const sortA = taxonomy.topicSort.get(a[0]) ?? 999;
            const sortB = taxonomy.topicSort.get(b[0]) ?? 999;
            return sortA - sortB || b[1] - a[1];
        })
        .forEach(([topic, count]) => console.log(`  ${count}\t${topic}`));
    console.log('');
    console.log(`Upsert vocabulary documents: ${vocabularyDocuments.length}`);
    console.log(`Upsert quote documents: ${documents.length}`);
    console.log(
        `Delete orphaned topic documents: ${topicsToDelete.map((doc) => doc.title).join(', ') || '(none)'}`
    );
    console.log(
        `Delete orphaned subtopic documents: ${subtopicsToDelete.length} (${subtopicsToDelete
            .slice(0, 8)
            .map((doc) => doc.title)
            .join(', ')}${subtopicsToDelete.length > 8 ? ', …' : ''})`
    );
    if (draftQuoteIds.length > 0) {
        console.log(
            `Remove stale quote drafts before prune: ${draftQuoteIds.length} (${draftQuoteIds
                .slice(0, 4)
                .join(', ')}${draftQuoteIds.length > 4 ? ', …' : ''})`
        );
    }

    if (!apply) {
        console.log('\nRe-run with --apply to write CSV + Sanity changes.');
        return;
    }

    writeCsv(rows);
    console.log(`\nUpdated ${csvPath}`);

    await commitInBatches(client, 'vocabulary', vocabularyDocuments);
    await commitInBatches(client, 'quotes', documents);

    const removedDrafts = await removePatristicQuoteDrafts(client);
    if (removedDrafts > 0) {
        console.log(`Removed ${removedDrafts} stale patristic quote draft(s).`);
    }

    if (subtopicsToDelete.length > 0) {
        await deleteInBatches(
            client,
            'orphaned subtopics',
            subtopicsToDelete.map((doc) => doc._id)
        );
        console.log(`Deleted ${subtopicsToDelete.length} orphaned subtopic document(s).`);
    }

    if (topicsToDelete.length > 0) {
        await deleteInBatches(client, 'orphaned topics', topicsToDelete.map((doc) => doc._id));
        console.log(`Deleted ${topicsToDelete.length} orphaned topic document(s).`);
    }

    console.log('Migration complete.');
}

const apply = process.argv.includes('--apply');

migrate(apply).catch((err: Error & { name?: string }) => {
    if (err.name === 'SanityMigrationAuthError') {
        console.error(err.message);
    } else {
        console.error(err);
    }
    process.exit(1);
});
