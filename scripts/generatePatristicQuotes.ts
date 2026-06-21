import fs from 'fs';
import path from 'path';

const csvPath = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');
const outPath = path.join(process.cwd(), 'src/data/apologetics/quotes/patristicQuotes.ts');

function parseCSV(text: string): Record<string, string>[] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];

        if (inQuotes) {
            if (ch === '"' && next === '"') {
                field += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                field += ch;
            }
            continue;
        }

        if (ch === '"') {
            inQuotes = true;
        } else if (ch === ',') {
            row.push(field);
            field = '';
        } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
            row.push(field);
            field = '';
            if (row.length > 1 || row[0] !== '') {
                rows.push(row);
            }
            row = [];
            if (ch === '\r') i++;
        } else if (ch !== '\r') {
            field += ch;
        }
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    const headers = rows.shift();
    if (!headers) return [];

    return rows.map((values) =>
        Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']))
    );
}

function parseDiedSort(died: string): number {
    const nums = died.match(/\d+/g);
    if (!nums) return 0;
    return Math.max(...nums.map(Number));
}

function toQuote(row: Record<string, string>) {
    return {
        id: row.ID,
        father: row.Father,
        died: row.Died_AD,
        diedSort: parseDiedSort(row.Died_AD),
        era: row.Era,
        source: row.Source_Work,
        ref: row.Source_Ref,
        quote: row.Quote_Text,
        topic: row.Topic,
        subtopic: row.Subtopic,
        position: row.Position,
        book: row.Book,
        section: row.Section,
        notes: row.Notes
    };
}

const csv = fs.readFileSync(csvPath, 'utf8');
const records = parseCSV(csv).map(toQuote);

fs.mkdirSync(path.dirname(outPath), { recursive: true });

const output = `// Auto-generated from data/patristic_quotes_complete.csv — do not edit by hand.
// Regenerate with: yarn generate:patristic-quotes

import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

export const PATRISTIC_QUOTES: PatristicQuote[] = ${JSON.stringify(records, null, 2)};
`;

fs.writeFileSync(outPath, output);
console.log(`Generated ${records.length} quotes → ${path.relative(process.cwd(), outPath)}`);
