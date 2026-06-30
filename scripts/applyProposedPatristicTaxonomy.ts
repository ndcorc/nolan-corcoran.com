/**
 * Applies proposed patristic taxonomy to data/patristic_quotes_complete.csv
 *
 *   npx tsx scripts/applyProposedPatristicTaxonomy.ts
 */
import fs from 'fs';
import path from 'path';
import {
    buildTaxonomyIndex,
    loadProposedTaxonomy,
    resolveProposedTaxonomyForQuote
} from './lib/patristicTaxonomyProposed';
import {
    parsePatristicQuotesCsv,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';

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

const taxonomy = buildTaxonomyIndex(loadProposedTaxonomy());
const text = fs.readFileSync(csvPath, 'utf8');
const rows = parsePatristicQuotesCsv(text);

const topicCounts = new Map<string, number>();
const subtopicCounts = new Map<string, number>();
const failures: string[] = [];

const updated = rows.map((row) => {
    try {
        const resolved = resolveProposedTaxonomyForQuote(
            row.Topic,
            parseRawSubtopics(row.Subtopics),
            taxonomy
        );

        topicCounts.set(resolved.topic, (topicCounts.get(resolved.topic) ?? 0) + 1);
        for (const subtopic of resolved.subtopics) {
            subtopicCounts.set(subtopic, (subtopicCounts.get(subtopic) ?? 0) + 1);
        }

        return {
            ...row,
            Topic: resolved.topic,
            Subtopics: resolved.subtopics.join('|')
        };
    } catch (error) {
        failures.push(`${row.ID}: ${error instanceof Error ? error.message : String(error)}`);
        return row;
    }
});

if (failures.length > 0) {
    console.error('Failed to resolve taxonomy for:');
    failures.forEach((line) => console.error(`  ${line}`));
    process.exit(1);
}

writeCsv(updated);

console.log(`Updated ${updated.length} quotes in ${csvPath}`);
console.log(`Topics: ${topicCounts.size}`);
[...topicCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([topic, count]) => console.log(`  ${count}\t${topic}`));
console.log(`Subtopics: ${subtopicCounts.size}`);
[...subtopicCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([subtopic, count]) => console.log(`  ${count}\t${subtopic}`));
