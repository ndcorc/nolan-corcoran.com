/**
 * Import patristic atonement quotes from data/Patristics_on_Atonement_formatted.docx into CSV
 * (idempotent: skips duplicates, upgrades overlapping entries with more extensive text).
 *
 * After running:
 *   SANITY_API_WRITE_TOKEN=<token> yarn migrate:patristic-quotes
 */
import fs from 'fs';
import path from 'path';
import {
    formatSubtopics,
    parsePatristicQuotesCsv,
    parseSubtopics,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';
import {
    inferAtonementSubtopics,
    normalizeQuoteText,
    parsePatristicsCanonDocx
} from './lib/parsePatristicsCanonDocx';

const DOCX_PATH = path.join(process.cwd(), 'data/Patristics_on_Atonement_formatted.docx');
const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');
const TOPIC = 'Christology';

function escapeCsvField(value: string): string {
    if (/[",\n\r]/.test(value)) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

function rowToCsv(row: PatristicQuoteCsvRow): string {
    return [
        row.ID,
        row.Father,
        row.Died_AD,
        row.Era,
        row.Source_Work,
        row.Source_Ref,
        row.Quote_Text,
        row.Topic,
        row.Subtopics,
        row.Position,
        row.Book,
        row.Section,
        row.Notes
    ]
        .map(escapeCsvField)
        .join(',');
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
    ];
    fs.writeFileSync(CSV_PATH, `${[headers.join(','), ...rows.map(rowToCsv)].join('\n')}\n`, 'utf8');
}

function mergeSubtopics(existing: string, incoming: string): string {
    return formatSubtopics([...parseSubtopics(existing), ...parseSubtopics(incoming)]);
}

function mergeNotes(existing: string, incoming: string): string {
    const parts = [existing.trim(), incoming.trim()].filter(Boolean);
    return [...new Set(parts)].join(' ');
}

function fatherMatches(a: string, b: string): boolean {
    const na = normalizeQuoteText(a);
    const nb = normalizeQuoteText(b);
    if (na === nb) return true;
    if (na.includes(nb) || nb.includes(na)) return true;
    return false;
}

function overlapRatio(a: string, b: string): number {
    const na = normalizeQuoteText(a);
    const nb = normalizeQuoteText(b);
    if (!na || !nb) return 0;
    if (na === nb) return 1;
    if (na.includes(nb)) return nb.length / na.length;
    if (nb.includes(na)) return na.length / nb.length;

    const shorter = na.length < nb.length ? na : nb;
    const longer = na.length < nb.length ? nb : na;
    const snippet = shorter.slice(0, Math.min(80, shorter.length));
    if (snippet.length >= 40 && longer.includes(snippet)) {
        return snippet.length / longer.length;
    }
    return 0;
}

function nextLegacyId(rows: PatristicQuoteCsvRow[]): string {
    let max = 0;
    for (const row of rows) {
        const match = row.ID.trim().match(/^FC(\d+)$/i);
        if (match) max = Math.max(max, Number(match[1]));
    }
    return `FC${max + 1}`;
}

function normalizeSource(value: string): string {
    return normalizeQuoteText(value).replace(/\b(the|of|a|an)\b/g, ' ').replace(/\s+/g, ' ').trim();
}

function sourceWorkTokens(value: string): Set<string> {
    return new Set(
        normalizeSource(value)
            .split(' ')
            .filter((token) => token.length >= 4)
    );
}

function sourceWorksOverlap(a: string, b: string): boolean {
    if (!a.trim() || !b.trim()) return false;
    const ta = sourceWorkTokens(a);
    const tb = sourceWorkTokens(b);
    if (!ta.size || !tb.size) return false;

    let shared = 0;
    for (const token of ta) {
        if (tb.has(token)) shared++;
    }

    return shared >= 2 || (shared >= 1 && [...ta].some((token) => token.length >= 8 && tb.has(token)));
}

function findExistingMatch(
    rows: PatristicQuoteCsvRow[],
    father: string,
    plain: string,
    sourceWork: string
): PatristicQuoteCsvRow | null {
    let best: PatristicQuoteCsvRow | null = null;
    let bestScore = 0;

    for (const row of rows) {
        if (!fatherMatches(row.Father, father)) continue;

        const ratio = overlapRatio(row.Quote_Text, plain);
        const workMatch = sourceWorksOverlap(row.Source_Work, sourceWork);
        const incomingContainsExisting =
            normalizeQuoteText(plain).includes(normalizeQuoteText(row.Quote_Text)) &&
            plain.length > row.Quote_Text.length + 40;
        const existingContainsIncoming =
            normalizeQuoteText(row.Quote_Text).includes(normalizeQuoteText(plain)) &&
            row.Quote_Text.length > plain.length + 40;

        let score = ratio;
        if (incomingContainsExisting) score = Math.max(score, 0.75);
        if (existingContainsIncoming) score = Math.max(score, 0.9);
        if (workMatch && ratio >= 0.2) score = Math.max(score, ratio + 0.15);

        if (score > bestScore) {
            bestScore = score;
            best = row;
        }
    }

    if (bestScore >= 0.65) return best;
    if (bestScore >= 0.45 && best) {
        const existingPlain = normalizeQuoteText(best.Quote_Text);
        const incomingPlain = normalizeQuoteText(plain);
        if (existingPlain.includes(incomingPlain) || incomingPlain.includes(existingPlain)) {
            return best;
        }
    }

    return null;
}

function main() {
    const parsed = parsePatristicsCanonDocx(DOCX_PATH);
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const rows = parsePatristicQuotesCsv(csv);

    let nextId = nextLegacyId(rows);
    const added: string[] = [];
    const updated: string[] = [];
    const skipped: string[] = [];

    for (const quote of parsed) {
        const subtopics = formatSubtopics(inferAtonementSubtopics(quote.quotePlain));
        const existing = findExistingMatch(rows, quote.father, quote.quotePlain, quote.sourceWork);

        if (existing) {
            const existingPlain = normalizeQuoteText(existing.Quote_Text);
            const incomingPlain = normalizeQuoteText(quote.quotePlain);
            const incomingLonger = incomingPlain.length > existingPlain.length + 20;
            const sameText = existingPlain === incomingPlain;

            if (sameText) {
                const mergedSubtopics = mergeSubtopics(existing.Subtopics, subtopics);
                const mergedNotes = mergeNotes(existing.Notes, quote.notes);
                const topicChanged = existing.Topic !== TOPIC && existing.Topic === 'Salvation';
                const eraChanged = quote.era && existing.Era !== quote.era;
                if (
                    mergedSubtopics !== existing.Subtopics ||
                    mergedNotes !== existing.Notes ||
                    topicChanged ||
                    eraChanged
                ) {
                    existing.Subtopics = mergedSubtopics;
                    existing.Notes = mergedNotes;
                    if (quote.era) existing.Era = quote.era;
                    if (topicChanged) existing.Topic = TOPIC;
                    updated.push(`${existing.ID} (metadata)`);
                } else {
                    skipped.push(`${existing.ID} (${quote.father})`);
                }
                continue;
            }

            if (incomingLonger || quote.quoteMarkdown.includes('**') || quote.quoteMarkdown.includes('*')) {
                existing.Quote_Text = quote.quoteMarkdown;
                existing.Subtopics = mergeSubtopics(existing.Subtopics, subtopics);
                existing.Notes = mergeNotes(existing.Notes, quote.notes);
                if (quote.sourceWork) existing.Source_Work = quote.sourceWork;
                if (quote.sourceRef) existing.Source_Ref = quote.sourceRef;
                if (quote.died) existing.Died_AD = quote.died;
                if (quote.era) existing.Era = quote.era;
                if (existing.Topic === 'Salvation') existing.Topic = TOPIC;
                updated.push(existing.ID);
                continue;
            }

            skipped.push(`${existing.ID} (shorter duplicate)`);
            continue;
        }

        const row: PatristicQuoteCsvRow = {
            ID: nextId,
            Father: quote.father,
            Died_AD: quote.died,
            Era: quote.era,
            Source_Work: quote.sourceWork,
            Source_Ref: quote.sourceRef,
            Quote_Text: quote.quoteMarkdown,
            Topic: TOPIC,
            Subtopics: subtopics,
            Position: 'Reformed',
            Book: '',
            Section: '',
            Notes: quote.notes
        };

        rows.push(row);
        added.push(nextId);
        nextId = `FC${Number(nextId.slice(2)) + 1}`;
    }

    writeCsv(rows);

    console.log(`Parsed ${parsed.length} quotes from docx.`);
    if (added.length) console.log(`Added ${added.length}: ${added.join(', ')}`);
    if (updated.length) console.log(`Updated ${updated.length}: ${updated.join(', ')}`);
    if (skipped.length) console.log(`Skipped ${skipped.length} duplicate(s).`);
    if (!added.length && !updated.length) console.log('No changes needed.');
}

main();
