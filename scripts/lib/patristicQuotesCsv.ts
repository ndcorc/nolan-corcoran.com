import fs from 'fs';
import path from 'path';

export interface PatristicQuoteCsvRow {
    ID: string;
    Father: string;
    Died_AD: string;
    Era: string;
    Source_Work: string;
    Source_Ref: string;
    Quote_Text: string;
    Topic: string;
    Subtopic: string;
    Position: string;
    Book: string;
    Section: string;
    Notes: string;
}

export function parsePatristicQuotesCsv(text: string): PatristicQuoteCsvRow[] {
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
    ) as unknown as PatristicQuoteCsvRow[];
}

export function parseDiedSort(died: string): number {
    const nums = died.match(/\d+/g);
    if (!nums) return 0;
    return Math.max(...nums.map(Number));
}

export function slugify(value: string): string {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
}

export function buildPatristicQuoteSlug(row: PatristicQuoteCsvRow): string {
    const parts = [row.Father, row.Subtopic || row.Topic, row.ID].filter(Boolean);
    return slugify(parts.join(' '));
}

export function readPatristicQuotesCsv(csvPath?: string): PatristicQuoteCsvRow[] {
    const resolvedPath = csvPath ?? path.join(process.cwd(), 'data/patristic_quotes_complete.csv');
    const csv = fs.readFileSync(resolvedPath, 'utf8');
    return parsePatristicQuotesCsv(csv);
}
