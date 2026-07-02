/**
 * Cleans up patristicFather vocabulary in Sanity:
 * - merges duplicate Fathers
 * - re-points quote references to canonical Father documents
 * - renames malformed titles (citation strings, quote wrappers, typos)
 *
 *   yarn cleanup:patristic-fathers           # dry run
 *   yarn cleanup:patristic-fathers --apply   # write to Sanity
 */
import { createClient, type SanityClient } from '@sanity/client';
import {
    createSanityMigrationClient,
    loadSanityEnvFiles
} from './lib/sanityMigrationClient';
import {
    inferCanonicalFatherTitle,
    isMalformedFatherTitle,
    PATRISTIC_FATHER_MERGE_MAP,
    PATRISTIC_FATHER_TITLE_FIXES
} from './lib/patristicFatherMerges';
import {
    patristicVocabularyDocument,
    patristicVocabularyId
} from './lib/patristicVocabulary';
import { slugify } from './lib/patristicQuotesCsv';

type FatherDoc = { _id: string; title: string };
type QuoteDoc = { _id: string; legacyId?: string; father?: { _ref: string } };

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

function buildMergeMap(fathers: FatherDoc[]): Map<string, string> {
    const titleById = new Map(fathers.map((doc) => [doc._id, doc.title]));
    const idByTitle = new Map(fathers.map((doc) => [doc.title, doc._id]));
    const mergeMap = new Map<string, string>();

    for (const [fromTitle, toTitle] of Object.entries(PATRISTIC_FATHER_MERGE_MAP)) {
        const fromId = idByTitle.get(fromTitle);
        const toId = idByTitle.get(toTitle);
        if (fromId && toId && fromId !== toId) {
            mergeMap.set(fromId, toId);
        }
    }

    for (const doc of fathers) {
        const canonicalTitle = inferCanonicalFatherTitle(doc.title);
        if (!canonicalTitle || canonicalTitle === doc.title) continue;

        const canonicalId = patristicVocabularyId('patristicFather', canonicalTitle);
        if (doc._id === canonicalId) continue;

        if (idByTitle.has(canonicalTitle)) {
            mergeMap.set(doc._id, idByTitle.get(canonicalTitle)!);
            continue;
        }

        // Title fix: document will be recreated at canonical id below.
        mergeMap.set(doc._id, canonicalId);
    }

    for (const [fromId, toId] of [...mergeMap.entries()]) {
        let next = toId;
        while (mergeMap.has(next) && mergeMap.get(next) !== next) {
            next = mergeMap.get(next)!;
        }
        mergeMap.set(fromId, next);
    }

    for (const [fromId, toId] of [...mergeMap.entries()]) {
        if (fromId === toId) mergeMap.delete(fromId);
        else if (titleById.get(fromId) === titleById.get(toId)) mergeMap.delete(fromId);
    }

    return mergeMap;
}

function fathersToCreate(
    fathers: FatherDoc[],
    mergeMap: Map<string, string>
): ReturnType<typeof patristicVocabularyDocument>[] {
    const existingIds = new Set(fathers.map((doc) => doc._id));
    const toCreate = new Map<string, ReturnType<typeof patristicVocabularyDocument>>();

    for (const [fromId, toId] of mergeMap.entries()) {
        if (existingIds.has(toId)) continue;

        const fromTitle = fathers.find((doc) => doc._id === fromId)?.title;
        const canonicalTitle =
            inferCanonicalFatherTitle(fromTitle ?? '') ??
            Object.entries(PATRISTIC_FATHER_MERGE_MAP).find(([, toTitle]) => {
                return patristicVocabularyId('patristicFather', toTitle) === toId;
            })?.[1];

        if (!canonicalTitle) continue;
        toCreate.set(toId, patristicVocabularyDocument('patristicFather', canonicalTitle));
    }

    for (const [fromTitle, toTitle] of Object.entries(PATRISTIC_FATHER_TITLE_FIXES)) {
        const canonicalId = patristicVocabularyId('patristicFather', toTitle);
        if (existingIds.has(canonicalId) || toCreate.has(canonicalId)) continue;
        if (!fathers.some((doc) => doc.title === fromTitle)) continue;
        toCreate.set(canonicalId, patristicVocabularyDocument('patristicFather', toTitle));
    }

    return [...toCreate.values()];
}

function summarizeMergeMap(mergeMap: Map<string, string>, fathers: FatherDoc[]) {
    const titleById = new Map(fathers.map((doc) => [doc._id, doc.title]));
    return [...mergeMap.entries()]
        .sort((a, b) => (titleById.get(a[0]) ?? '').localeCompare(titleById.get(b[0]) ?? ''))
        .map(([fromId, toId]) => {
            const toTitle = titleById.get(toId) ?? toId.replace(/^patristicFather-/, '');
            return `  ${titleById.get(fromId)} → ${toTitle}`;
        });
}

function buildTitlePatches(fathers: FatherDoc[], mergeMap: Map<string, string>) {
    const patches: Array<{ _id: string; title: string }> = [];

    for (const doc of fathers) {
        if (mergeMap.has(doc._id)) continue;

        const canonicalTitle = inferCanonicalFatherTitle(doc.title);
        if (!canonicalTitle || canonicalTitle === doc.title) continue;

        const canonicalId = patristicVocabularyId('patristicFather', canonicalTitle);
        if (canonicalId !== doc._id) continue;

        patches.push({ _id: doc._id, title: canonicalTitle });
    }

    return patches;
}

async function migrate(apply: boolean) {
    const client = await createReadClient(apply);
    const dataset = client.config().dataset ?? 'production';

    const [fathers, quotes] = await Promise.all([
        client.fetch<FatherDoc[]>('*[_type == "patristicFather"]{ _id, title }'),
        client.fetch<QuoteDoc[]>(
            '*[_type == "patristicQuote"]{ _id, legacyId, father }'
        )
    ]);

    const mergeMap = buildMergeMap(fathers);
    const titlePatches = buildTitlePatches(fathers, mergeMap);
    const fathersToCreateDocs = fathersToCreate(fathers, mergeMap);
    const mergedFatherIds = new Set(mergeMap.keys());

    const quotePatches: Array<{ _id: string; legacyId?: string; fatherRef: string }> = [];
    for (const quote of quotes) {
        const currentRef = quote.father?._ref;
        if (!currentRef) continue;

        const mapped = mergeMap.get(currentRef);
        if (!mapped || mapped === currentRef) continue;

        quotePatches.push({ _id: quote._id, legacyId: quote.legacyId, fatherRef: mapped });
    }

    const malformed = fathers.filter((doc) => isMalformedFatherTitle(doc.title));

    console.log(`Dataset: ${dataset}`);
    console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`);
    console.log('');
    console.log(`Fathers before: ${fathers.length}`);
    console.log(`Malformed titles detected: ${malformed.length}`);
    malformed.forEach((doc) => console.log(`  - ${doc.title.slice(0, 120)}${doc.title.length > 120 ? '…' : ''}`));
    console.log('');
    console.log('Father merges / renames:');
    if (mergeMap.size === 0) {
        console.log('  (none)');
    } else {
        summarizeMergeMap(mergeMap, fathers).forEach((line) => console.log(line));
    }
    console.log('');
    console.log(
        `Create canonical Father document(s): ${fathersToCreateDocs.map((d) => d.title).join(', ') || '(none)'}`
    );
    console.log('Title renames (same document id):');
    if (titlePatches.length === 0) {
        console.log('  (none)');
    } else {
        titlePatches.forEach((patch) => {
            const before = fathers.find((doc) => doc._id === patch._id)?.title;
            console.log(`  ${before} → ${patch.title}`);
        });
    }
    console.log('');
    console.log(`Patch ${quotePatches.length} patristic quote(s)`);
    console.log(`Delete ${mergedFatherIds.size} merged/obsolete Father document(s)`);

    if (!apply) {
        console.log('\nRe-run with --apply to write these changes.');
        return;
    }

    if (fathersToCreateDocs.length > 0) {
        const tx = client.transaction();
        fathersToCreateDocs.forEach((doc) => tx.createOrReplace(doc));
        await tx.commit();
        console.log(`Created ${fathersToCreateDocs.length} Father document(s).`);
    }

    if (titlePatches.length > 0) {
        const tx = client.transaction();
        titlePatches.forEach((patch) =>
            tx.patch(patch._id, (p) =>
                p.set({
                    title: patch.title,
                    slug: { _type: 'slug', current: slugify(patch.title) }
                })
            )
        );
        await tx.commit();
        console.log(`Renamed ${titlePatches.length} Father document(s).`);
    }

    const batchSize = 50;
    for (let i = 0; i < quotePatches.length; i += batchSize) {
        const batch = quotePatches.slice(i, i + batchSize);
        const tx = client.transaction();
        batch.forEach((doc) =>
            tx.patch(doc._id, (patch) =>
                patch.set({
                    father: { _type: 'reference', _ref: doc.fatherRef }
                })
            )
        );
        await tx.commit();
        console.log(
            `  ✓ patched ${Math.min(i + batchSize, quotePatches.length)} / ${quotePatches.length} quotes`
        );
    }

    if (mergedFatherIds.size > 0) {
        const tx = client.transaction();
        [...mergedFatherIds].forEach((id) => tx.delete(id));
        await tx.commit();
        console.log(`Deleted ${mergedFatherIds.size} merged Father document(s).`);
    }

    const remaining = await client.fetch<number>('count(*[_type == "patristicFather"])');
    console.log(`Fathers after: ${remaining}`);
    console.log('Cleanup complete.');
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
