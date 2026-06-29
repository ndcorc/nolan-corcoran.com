import fs from 'fs';
import path from 'path';
import { formatSubtopics, parsePatristicQuotesCsv, parseSubtopics } from './lib/patristicQuotesCsv';

const csvPath = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');
const text = fs.readFileSync(csvPath, 'utf8');
const rows = parsePatristicQuotesCsv(text);
const headers = Object.keys(rows[0]);

let changed = 0;
for (const row of rows) {
    const canonical = formatSubtopics(parseSubtopics(row.Subtopics));
    if (canonical !== row.Subtopics) {
        changed++;
        row.Subtopics = canonical;
    }
}

const escape = (field: string) => {
    if (/[",\n\r]/.test(field)) return `"${field.replace(/"/g, '""')}"`;
    return field;
};

const lines = [
    headers.join(','),
    ...rows.map((row) => headers.map((h) => escape(row[h as keyof typeof row] ?? '')).join(','))
];
fs.writeFileSync(csvPath, `${lines.join('\n')}\n`);

const unique = new Set<string>();
for (const row of rows) {
    for (const s of parseSubtopics(row.Subtopics)) unique.add(s);
}

console.log(`Updated ${changed} rows. Unique subtopics: ${unique.size}`);
