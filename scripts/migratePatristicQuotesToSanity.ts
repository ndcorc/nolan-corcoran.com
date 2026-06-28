/**
 * One-time (idempotent) migration: CSV → Sanity patristicQuote documents.
 *
 * Requires a Sanity write token:
 *   SANITY_API_WRITE_TOKEN=<token> yarn migrate:patristic-quotes
 *
 * Re-running replaces documents with the same deterministic _id (safe to re-run).
 */
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import {
    buildPatristicQuoteSlug,
    parseDiedSort,
    readPatristicQuotesCsv,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';

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

function toSanityDocument(row: PatristicQuoteCsvRow) {
    const legacyId = row.ID.trim();
    const slug = buildPatristicQuoteSlug(row);

    return {
        _id: `patristicQuote-${legacyId.toLowerCase()}`,
        _type: 'patristicQuote' as const,
        legacyId,
        slug: { _type: 'slug' as const, current: slug },
        father: row.Father.trim(),
        died: row.Died_AD.trim(),
        diedSort: parseDiedSort(row.Died_AD),
        era: row.Era.trim(),
        sourceWork: row.Source_Work.trim(),
        sourceRef: row.Source_Ref.trim(),
        quoteText: row.Quote_Text.trim(),
        topic: row.Topic.trim(),
        subtopic: row.Subtopic.trim(),
        position: row.Position.trim() || undefined,
        book: row.Book.trim(),
        section: row.Section.trim(),
        notes: row.Notes.trim()
    };
}

async function migrate() {
    const rows = readPatristicQuotesCsv();
    const documents = rows.map(toSanityDocument);

    const slugCounts = new Map<string, number>();
    for (const doc of documents) {
        const slug = doc.slug.current;
        slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1);
    }
    const duplicateSlugs = [...slugCounts.entries()].filter(([, count]) => count > 1);
    if (duplicateSlugs.length > 0) {
        console.warn('Warning: duplicate slugs detected (appending legacy ID):');
        for (const doc of documents) {
            if ((slugCounts.get(doc.slug.current) ?? 0) > 1) {
                doc.slug.current = `${doc.slug.current}-${doc.legacyId.toLowerCase()}`;
            }
        }
    }

    console.log(`Migrating ${documents.length} patristic quotes to Sanity (${dataset})…`);

    const batchSize = 50;
    for (let i = 0; i < documents.length; i += batchSize) {
        const batch = documents.slice(i, i + batchSize);
        const transaction = client.transaction();
        batch.forEach((doc) => transaction.createOrReplace(doc));
        await transaction.commit();
        console.log(`  ✓ ${Math.min(i + batchSize, documents.length)} / ${documents.length}`);
    }

    console.log('Migration complete.');
}

migrate().catch((err) => {
    console.error(err);
    process.exit(1);
});
