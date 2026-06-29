/**
 * Adds missing `_key` properties to subtopics array items on patristicQuote documents.
 * Required for Sanity Studio to edit subtopic lists created via the migration API.
 *
 * Safe to re-run — skips documents whose subtopics already have keys.
 *
 *   SANITY_API_WRITE_TOKEN=<token> yarn fix:patristic-quote-subtopic-keys
 */
import { createSanityMigrationClient } from './lib/sanityMigrationClient';

type SubtopicRef = {
    _type: 'reference';
    _ref: string;
    _key?: string;
    _weak?: boolean;
};

type QuoteDoc = {
    _id: string;
    legacyId?: string;
    subtopics?: SubtopicRef[];
};

function subtopicsNeedKeys(subtopics: SubtopicRef[] | undefined): boolean {
    return Boolean(subtopics?.some((ref) => !ref._key));
}

function withSubtopicKeys(subtopics: SubtopicRef[]): SubtopicRef[] {
    const seenRefs = new Map<string, number>();

    return subtopics.map((ref) => {
        if (ref._key) return ref;

        const occurrence = seenRefs.get(ref._ref) ?? 0;
        seenRefs.set(ref._ref, occurrence + 1);

        const { _weak: _, ...rest } = ref;
        return {
            ...rest,
            _key: occurrence === 0 ? ref._ref : `${ref._ref}-${occurrence}`
        };
    });
}

async function fix() {
    const client = await createSanityMigrationClient();
    const dataset = client.config().dataset ?? 'production';

    const docs = await client.fetch<QuoteDoc[]>(
        `*[_type == "patristicQuote"]{ _id, legacyId, subtopics }`
    );

    const toFix = docs.filter((doc) => subtopicsNeedKeys(doc.subtopics));

    console.log(`Checked ${docs.length} patristic quotes in ${dataset}.`);
    console.log(`${toFix.length} document(s) need subtopic _key fixes.`);

    if (toFix.length === 0) {
        console.log('Nothing to fix.');
        return;
    }

    const batchSize = 50;
    for (let i = 0; i < toFix.length; i += batchSize) {
        const batch = toFix.slice(i, i + batchSize);
        const transaction = client.transaction();

        batch.forEach((doc) => {
            transaction.patch(doc._id, (patch) =>
                patch.set({ subtopics: withSubtopicKeys(doc.subtopics ?? []) })
            );
        });

        await transaction.commit();
        console.log(`  ✓ fixed ${Math.min(i + batchSize, toFix.length)} / ${toFix.length}`);
    }

    console.log('Subtopic key fix complete.');
}

fix().catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
});
