/**
 * Migrates patristic topic/subtopic vocabulary and quote references in Sanity.
 *
 *   npx tsx scripts/migratePatristicTaxonomyInSanity.ts          # dry run
 *   npx tsx scripts/migratePatristicTaxonomyInSanity.ts --apply  # write changes
 */
import { createClient, type SanityClient } from '@sanity/client';
import {
    createSanityMigrationClient,
    loadSanityEnvFiles
} from './lib/sanityMigrationClient';
import {
    patristicVocabularyDocument,
    patristicVocabularyId
} from './lib/patristicVocabulary';

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
const SACRAMENTS_TOPIC_ID = 'patristicTopic-sacraments';
const SACRAMENTS_SUBTOPIC_ID = 'patristicSubtopic-sacraments';
const EUCHARIST_SUBTOPIC_TITLE = 'Eucharist';
const EUCHARIST_SUBTOPIC_ID = patristicVocabularyId('patristicSubtopic', EUCHARIST_SUBTOPIC_TITLE);

const LORDS_PRAYER_CANONICAL_TITLE = "Lord's Prayer";
const LORDS_PRAYER_CANONICAL_ID = patristicVocabularyId(
    'patristicSubtopic',
    LORDS_PRAYER_CANONICAL_TITLE
);

type VocabDoc = { _id: string; title: string };
type SubtopicRef = { _type: 'reference'; _ref: string; _key?: string; _weak?: boolean };
type QuoteDoc = {
    _id: string;
    legacyId?: string;
    topic?: SubtopicRef;
    subtopics?: SubtopicRef[];
};

function matchesPattern(title: string, pattern: string): boolean {
    const needle = pattern.replace(/^\*|\*$/g, '');
    return title.includes(needle);
}

function resolveMergedSubtopicTitle(title: string): string | null {
    if (title === LORDS_PRAYER_CANONICAL_TITLE || title === "The Lord's Prayer") {
        return LORDS_PRAYER_CANONICAL_TITLE;
    }

    if (matchesPattern(title, '*Papal*') || title.includes('Universal Bishop')) {
        return 'Church Governance';
    }

    if (matchesPattern(title, '*Fasting*')) {
        return 'Fasting';
    }

    if (matchesPattern(title, '*Invocation*') || matchesPattern(title, '*Intercession*')) {
        return 'Invocation & Intercession';
    }

    if (
        matchesPattern(title, '*Image Worship') ||
        matchesPattern(title, '*Relic Worship') ||
        matchesPattern(title, '*Saint Worship')
    ) {
        return 'Saint & Idol Worship';
    }

    if (matchesPattern(title, '*Purgatory*')) {
        return 'Purgatory';
    }

    return null;
}

function buildSubtopicMergeMap(subtopics: VocabDoc[]): Map<string, string> {
    const titleById = new Map(subtopics.map((doc) => [doc._id, doc.title]));
    const mergeMap = new Map<string, string>();

    for (const doc of subtopics) {
        const canonicalTitle = resolveMergedSubtopicTitle(doc.title);
        if (!canonicalTitle || canonicalTitle === doc.title) continue;

        const canonicalId = patristicVocabularyId('patristicSubtopic', canonicalTitle);
        mergeMap.set(doc._id, canonicalId);
    }

    // Ensure transitive merges resolve to the same canonical id.
    for (const [fromId, toId] of [...mergeMap.entries()]) {
        let next = toId;
        while (mergeMap.has(next) && mergeMap.get(next) !== next) {
            next = mergeMap.get(next)!;
        }
        mergeMap.set(fromId, next);
    }

    // Drop no-op merges where source already is canonical.
    for (const [fromId, toId] of [...mergeMap.entries()]) {
        if (fromId === toId) mergeMap.delete(fromId);
        else if (titleById.get(fromId) === titleById.get(toId)) mergeMap.delete(fromId);
    }

    return mergeMap;
}

function remapSubtopicRefs(
    refs: SubtopicRef[] | undefined,
    mergeMap: Map<string, string>,
    options?: { removeRefs?: Set<string>; addRefs?: string[] }
): SubtopicRef[] | undefined {
    if (!refs?.length && !options?.addRefs?.length) return refs;

    const removeRefs = options?.removeRefs ?? new Set<string>();
    const seen = new Set<string>();
    const result: SubtopicRef[] = [];

    for (const ref of refs ?? []) {
        const mapped = mergeMap.get(ref._ref) ?? ref._ref;
        if (removeRefs.has(mapped) || removeRefs.has(ref._ref)) continue;
        if (seen.has(mapped)) continue;
        seen.add(mapped);
        result.push({
            _type: 'reference',
            _ref: mapped,
            _key: result.length === 0 ? mapped : `${mapped}-${result.length}`
        });
    }

    for (const refId of options?.addRefs ?? []) {
        if (seen.has(refId)) continue;
        seen.add(refId);
        result.push({
            _type: 'reference',
            _ref: refId,
            _key: result.length === 0 ? refId : `${refId}-${result.length}`
        });
    }

    return result.length > 0 ? result : undefined;
}

function subtopicRefIds(refs: SubtopicRef[] | undefined): string[] {
    return (refs ?? []).map((ref) => ref._ref).sort();
}

function subtopicsNeedUpdate(
    before: SubtopicRef[] | undefined,
    after: SubtopicRef[] | undefined
): boolean {
    const beforeIds = subtopicRefIds(before);
    const afterIds = subtopicRefIds(after);
    if (beforeIds.length !== afterIds.length) return true;
    return beforeIds.some((id, index) => id !== afterIds[index]);
}

function summarizeMergeMap(mergeMap: Map<string, string>, subtopics: VocabDoc[]) {
    const titleById = new Map(subtopics.map((doc) => [doc._id, doc.title]));
    const lines: string[] = [];

    for (const [fromId, toId] of [...mergeMap.entries()].sort((a, b) =>
        (titleById.get(a[0]) ?? '').localeCompare(titleById.get(b[0]) ?? '')
    )) {
        lines.push(`  ${titleById.get(fromId)} → ${titleById.get(toId) ?? toId}`);
    }

    return lines;
}

const LORDS_SUPPER_TOPIC_ID = 'patristicTopic-lords-supper';

async function migrate(apply: boolean) {
    const client = await createReadClient(apply);
    const dataset = client.config().dataset ?? 'production';

    const [topics, subtopics, quotes] = await Promise.all([
        client.fetch<VocabDoc[]>('*[_type == "patristicTopic"]{ _id, title }'),
        client.fetch<VocabDoc[]>('*[_type == "patristicSubtopic"]{ _id, title }'),
        client.fetch<QuoteDoc[]>(
            `*[_type == "patristicQuote"]{
                _id,
                legacyId,
                topic,
                subtopics
            }`
        )
    ]);

    const mergeMap = buildSubtopicMergeMap(subtopics);
    const mergedSubtopicIds = new Set(mergeMap.keys());
    const requiredSubtopicTitles = new Set<string>([EUCHARIST_SUBTOPIC_TITLE]);

    for (const toId of mergeMap.values()) {
        const existing = subtopics.find((doc) => doc._id === toId);
        if (existing) requiredSubtopicTitles.add(existing.title);
    }

    const existingSubtopicIds = new Set(subtopics.map((doc) => doc._id));
    const subtopicsToCreate = [...requiredSubtopicTitles]
        .map((title) => patristicVocabularyDocument('patristicSubtopic', title))
        .filter((doc) => !existingSubtopicIds.has(doc._id));

    const lordsSupperQuoteIds = new Set(
        quotes.filter((q) => q.topic?._ref === LORDS_SUPPER_TOPIC_ID).map((q) => q._id)
    );

    const quotePatches: Array<{ _id: string; legacyId?: string; patch: Record<string, unknown> }> =
        [];

    for (const quote of quotes) {
        const patch: Record<string, unknown> = {};
        const isLordsSupper = lordsSupperQuoteIds.has(quote._id);

        if (isLordsSupper && quote.topic?._ref === LORDS_SUPPER_TOPIC_ID) {
            patch.topic = { _type: 'reference', _ref: SACRAMENTS_TOPIC_ID };
        }

        const remappedSubtopics = remapSubtopicRefs(quote.subtopics, mergeMap, {
            removeRefs: isLordsSupper ? new Set([SACRAMENTS_SUBTOPIC_ID]) : undefined,
            addRefs: isLordsSupper ? [EUCHARIST_SUBTOPIC_ID] : undefined
        });

        const topicChanged = Boolean(patch.topic);
        const subtopicsChanged = subtopicsNeedUpdate(quote.subtopics, remappedSubtopics);

        if (subtopicsChanged) {
            patch.subtopics = remappedSubtopics ?? [];
        }

        if (topicChanged || subtopicsChanged) {
            quotePatches.push({ _id: quote._id, legacyId: quote.legacyId, patch });
        }
    }

    const topicsToDelete = topics.filter((doc) => doc._id === LORDS_SUPPER_TOPIC_ID);
    const subtopicsToDelete = subtopics.filter((doc) => mergedSubtopicIds.has(doc._id));

    console.log(`Dataset: ${dataset}`);
    console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`);
    console.log('');
    console.log('Topic changes:');
    console.log(`  Lord's Supper → Sacraments on ${lordsSupperQuoteIds.size} quote(s)`);
    console.log(`  Delete topic document(s): ${topicsToDelete.map((d) => d.title).join(', ') || '(none)'}`);
    console.log('');
    console.log('Subtopic merges:');
    if (mergeMap.size === 0) {
        console.log('  (none)');
    } else {
        summarizeMergeMap(mergeMap, subtopics).forEach((line) => console.log(line));
    }
    console.log('');
    console.log(`Create subtopic document(s): ${subtopicsToCreate.map((d) => d.title).join(', ') || '(none)'}`);
    console.log(
        `Delete merged subtopic document(s): ${subtopicsToDelete.map((d) => d.title).join(', ') || '(none)'}`
    );
    console.log('');
    console.log(`Patch ${quotePatches.length} patristic quote(s)`);

    if (!apply) {
        console.log('\nRe-run with --apply to write these changes.');
        return;
    }

    if (subtopicsToCreate.length > 0) {
        const tx = client.transaction();
        subtopicsToCreate.forEach((doc) => tx.createOrReplace(doc));
        await tx.commit();
        console.log(`Created ${subtopicsToCreate.length} subtopic document(s).`);
    }

    const batchSize = 50;
    for (let i = 0; i < quotePatches.length; i += batchSize) {
        const batch = quotePatches.slice(i, i + batchSize);
        const tx = client.transaction();
        batch.forEach((doc) => tx.patch(doc._id, (patch) => patch.set(doc.patch)));
        await tx.commit();
        console.log(`  ✓ patched ${Math.min(i + batchSize, quotePatches.length)} / ${quotePatches.length} quotes`);
    }

    if (subtopicsToDelete.length > 0) {
        const tx = client.transaction();
        subtopicsToDelete.forEach((doc) => tx.delete(doc._id));
        await tx.commit();
        console.log(`Deleted ${subtopicsToDelete.length} merged subtopic document(s).`);
    }

    if (topicsToDelete.length > 0) {
        const tx = client.transaction();
        topicsToDelete.forEach((doc) => tx.delete(doc._id));
        await tx.commit();
        console.log(`Deleted ${topicsToDelete.length} topic document(s).`);
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
