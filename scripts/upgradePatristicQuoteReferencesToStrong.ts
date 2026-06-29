/**
 * Converts weak vocabulary references on patristicQuote documents to strong references.
 *
 * Safe to re-run — skips documents whose references are already strong.
 *
 *   SANITY_API_WRITE_TOKEN=<token> yarn migrate:patristic-quote-references
 */
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

function loadEnvFile(filename: string) {
    const envPath = path.join(process.cwd(), filename);
    if (!fs.existsSync(envPath)) return;

    const contents = fs.readFileSync(envPath, 'utf8');
    for (const line of contents.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        const key = trimmed.slice(0, eqIndex).trim();
        let value = trimmed.slice(eqIndex + 1).trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        if (!(key in process.env)) {
            process.env[key] = value;
        }
    }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET');
}

if (!token) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN (or SANITY_API_TOKEN) for write access');
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08',
    token,
    useCdn: false
});

type SanityReference = {
    _type: 'reference';
    _ref: string;
    _weak?: boolean;
    _key?: string;
};

type QuoteDoc = {
    _id: string;
    legacyId?: string;
    father?: SanityReference;
    era?: SanityReference;
    sourceWork?: SanityReference;
    topic?: SanityReference;
    subtopics?: SanityReference[];
    position?: SanityReference;
    book?: SanityReference;
};

const REFERENCE_FIELDS = [
    'father',
    'era',
    'sourceWork',
    'topic',
    'position',
    'book'
] as const;

function toStrongReference(ref: SanityReference | undefined): SanityReference | undefined {
    if (!ref || !ref._weak) return ref;

    const { _weak: _, ...strong } = ref;
    return strong;
}

function toStrongReferences(refs: SanityReference[] | undefined): SanityReference[] | undefined {
    if (!refs?.length) return refs;

    const upgraded = refs.map(toStrongReference);
    if (upgraded.every((ref, index) => ref === refs[index])) {
        return refs;
    }

    return upgraded as SanityReference[];
}

function upgradeDocument(doc: QuoteDoc): Record<string, unknown> | null {
    const patch: Record<string, unknown> = {};

    for (const field of REFERENCE_FIELDS) {
        const upgraded = toStrongReference(doc[field]);
        if (upgraded !== doc[field]) {
            patch[field] = upgraded;
        }
    }

    const upgradedSubtopics = toStrongReferences(doc.subtopics);
    if (upgradedSubtopics !== doc.subtopics) {
        patch.subtopics = upgradedSubtopics;
    }

    return Object.keys(patch).length > 0 ? patch : null;
}

async function upgrade() {
    const docs = await client.fetch<QuoteDoc[]>(
        `*[_type == "patristicQuote"]{
            _id,
            legacyId,
            father,
            era,
            sourceWork,
            topic,
            subtopics,
            position,
            book
        }`
    );

    const toUpgrade = docs
        .map((doc) => {
            const patch = upgradeDocument(doc);
            return patch ? { _id: doc._id, legacyId: doc.legacyId, patch } : null;
        })
        .filter((doc): doc is NonNullable<typeof doc> => doc !== null);

    console.log(`Checked ${docs.length} patristic quotes in ${dataset}.`);
    console.log(`${toUpgrade.length} document(s) need reference upgrade.`);

    if (toUpgrade.length === 0) {
        console.log('Nothing to upgrade.');
        return;
    }

    const batchSize = 50;
    for (let i = 0; i < toUpgrade.length; i += batchSize) {
        const batch = toUpgrade.slice(i, i + batchSize);
        const transaction = client.transaction();

        batch.forEach((doc) => {
            transaction.patch(doc._id, (patch) => patch.set(doc.patch));
        });

        await transaction.commit();
        console.log(`  ✓ upgraded ${Math.min(i + batchSize, toUpgrade.length)} / ${toUpgrade.length}`);
    }

    console.log('Reference upgrade complete.');
}

upgrade().catch((err) => {
    console.error(err);
    process.exit(1);
});
