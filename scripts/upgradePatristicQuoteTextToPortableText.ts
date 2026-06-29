/**
 * Upgrades legacy string `quoteText` values to Portable Text blocks in Sanity.
 *
 * Run after changing the patristicQuote schema from `text` to block arrays.
 * Safe to re-run — skips documents that already store Portable Text.
 *
 *   SANITY_API_WRITE_TOKEN=<token> yarn migrate:patristic-quote-text
 */
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import {
    isPortableTextQuoteText,
    plainTextToPatristicQuoteBlocks
} from '../src/lib/apologetics/patristicQuoteText';

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

type QuoteDoc = {
    _id: string;
    legacyId?: string;
    quoteText?: unknown;
};

function upgradeQuoteText(value: unknown): ReturnType<typeof plainTextToPatristicQuoteBlocks> | null {
    if (isPortableTextQuoteText(value)) {
        return null;
    }

    if (typeof value === 'string') {
        return plainTextToPatristicQuoteBlocks(value);
    }

    if (value == null) {
        return plainTextToPatristicQuoteBlocks('');
    }

    // Defensive: empty arrays or malformed values from partial edits.
    return plainTextToPatristicQuoteBlocks(String(value));
}

async function upgrade() {
    const docs = await client.fetch<QuoteDoc[]>(
        `*[_type == "patristicQuote"]{ _id, legacyId, quoteText }`
    );

    const toUpgrade = docs
        .map((doc) => {
            const blocks = upgradeQuoteText(doc.quoteText);
            return blocks ? { ...doc, blocks } : null;
        })
        .filter((doc): doc is QuoteDoc & { blocks: ReturnType<typeof plainTextToPatristicQuoteBlocks> } => doc !== null);

    console.log(`Checked ${docs.length} patristic quotes in ${dataset}.`);
    console.log(`${toUpgrade.length} document(s) need quoteText upgrade.`);

    if (toUpgrade.length === 0) {
        console.log('Nothing to upgrade. If Studio still shows errors, hard-refresh /studio and reopen the document.');
        return;
    }

    const batchSize = 50;
    for (let i = 0; i < toUpgrade.length; i += batchSize) {
        const batch = toUpgrade.slice(i, i + batchSize);
        const transaction = client.transaction();

        batch.forEach((doc) => {
            transaction.patch(doc._id, (patch) => patch.set({ quoteText: doc.blocks }));
        });

        await transaction.commit();
        console.log(`  ✓ upgraded ${Math.min(i + batchSize, toUpgrade.length)} / ${toUpgrade.length}`);
    }

    console.log('quoteText upgrade complete.');
}

upgrade().catch((err) => {
    console.error(err);
    process.exit(1);
});
