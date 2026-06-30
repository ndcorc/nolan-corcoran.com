/**
 * Import patristic quotes on the doctrines of grace (TULIP) from Gill et al. (idempotent).
 * Skips duplicates; upgrades overlapping rows when incoming text is more extensive.
 *
 * LEGEND: (P) Unconditional Election, (T) Total Depravity, (L) Limited Atonement,
 * (I) Irresistible Grace, (Per) Perseverance of the Saints.
 *
 * After running:
 *   yarn apply:patristic-taxonomy
 *   SANITY_API_WRITE_TOKEN=<token> yarn migrate:patristic-quotes
 */
import fs from 'fs';
import path from 'path';
import {
    DOCTRINES_OF_GRACE_QUOTES,
    SOURCE_BOOK,
    type DoctrineTag,
    type DoctrinesOfGraceQuoteInput
} from './lib/doctrinesOfGraceQuoteData';
import { DOCTRINES_OF_GRACE_QUOTES_PART2 } from './lib/doctrinesOfGraceQuoteDataPart2';
import {
    formatSubtopics,
    parsePatristicQuotesCsv,
    parseSubtopics,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';
import { normalizeQuoteText } from './lib/parsePatristicsCanonDocx';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');
const START_ID = 846;

/** Re-tag existing CSV rows when incoming quotes are subsets of these entries. */
const PATCH_EXISTING: Record<string, { subtopics?: string[]; notes?: string }> = {
    FC254: { subtopics: ['Total Depravity', 'Bondage of the Will'] },
    FC589: { subtopics: ['Limited Atonement'] },
    FC598: { subtopics: ['Limited Atonement'] },
    FC601: { subtopics: ['Unconditional Election'] },
    FC606: { subtopics: ['Limited Atonement'] },
    FC607: { subtopics: ['Limited Atonement'] },
    FC662: { subtopics: ['Unconditional Election'] },
    FC663: { subtopics: ['Unconditional Election'] }
};

const DOCTRINE_TOPICS: Record<
    DoctrineTag,
    { topic: string; subtopics: string[] }
> = {
    P: {
        topic: 'Predestination',
        subtopics: ['Election', 'Unconditional Election']
    },
    T: {
        topic: 'Original Sin',
        subtopics: ['Bondage of the Will', 'Total Depravity']
    },
    L: {
        topic: 'Particular Redemption',
        subtopics: ['Limited Atonement']
    },
    I: {
        topic: 'Predestination',
        subtopics: ['Effectual Calling', 'Irresistible Grace']
    },
    Per: {
        topic: 'Justification by Faith Alone',
        subtopics: ['Assurance', 'Perseverance of the Saints']
    }
};

const LEGEND_NOTE =
    'Doctrines of grace LEGEND: (P) Predestination/Unconditional Election, (T) Depravity of Man, (L) Limited Atonement, (I) Irresistible Grace, (Per) Perseverance of the Saints.';

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
    return na.includes(nb) || nb.includes(na);
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

function findExistingMatch(
    rows: PatristicQuoteCsvRow[],
    father: string,
    plain: string
): PatristicQuoteCsvRow | null {
    let best: PatristicQuoteCsvRow | null = null;
    let bestScore = 0;

    for (const row of rows) {
        if (!fatherMatches(row.Father, father)) continue;

        const ratio = overlapRatio(row.Quote_Text, plain);
        const incomingContainsExisting =
            normalizeQuoteText(plain).includes(normalizeQuoteText(row.Quote_Text)) &&
            plain.length > row.Quote_Text.length + 40;
        const existingContainsIncoming =
            normalizeQuoteText(row.Quote_Text).includes(normalizeQuoteText(plain)) &&
            row.Quote_Text.length > plain.length + 40;

        let score = ratio;
        if (incomingContainsExisting) score = Math.max(score, 0.75);
        if (existingContainsIncoming) score = Math.max(score, 0.9);

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

function buildCsvRow(input: DoctrinesOfGraceQuoteInput, id: string): PatristicQuoteCsvRow {
    const mapping = DOCTRINE_TOPICS[input.Doctrine];
    const subtopics = formatSubtopics([
        ...mapping.subtopics,
        ...(input.ExtraSubtopics ? parseSubtopics(input.ExtraSubtopics) : [])
    ]);
    const book = input.Notes?.includes('Horton appendix')
        ? 'Putting Amazing Back into Grace (Horton, appendix)'
        : SOURCE_BOOK;

    return {
        ID: id,
        Father: input.Father,
        Died_AD: input.Died_AD,
        Era: input.Era,
        Source_Work: input.Source_Work,
        Source_Ref: input.Source_Ref,
        Quote_Text: input.Quote_Text,
        Topic: mapping.topic,
        Subtopics: subtopics,
        Position: 'Reformed',
        Book: book,
        Section: 'Doctrines of Grace',
        Notes: mergeNotes(LEGEND_NOTE, input.Notes ?? '')
    };
}

function nextId(counter: number): string {
    return `FC${counter}`;
}

function main() {
    const allInputs = [...DOCTRINES_OF_GRACE_QUOTES, ...DOCTRINES_OF_GRACE_QUOTES_PART2];
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const rows = parsePatristicQuotesCsv(csv);

    for (const [id, patch] of Object.entries(PATCH_EXISTING)) {
        const row = rows.find((entry) => entry.ID.trim() === id);
        if (!row) continue;
        if (patch.subtopics?.length) {
            row.Subtopics = mergeSubtopics(row.Subtopics, formatSubtopics(patch.subtopics));
        }
        if (patch.notes) {
            row.Notes = mergeNotes(row.Notes, patch.notes);
        }
    }

    let idCounter = START_ID;
    while (rows.some((row) => row.ID.trim() === nextId(idCounter))) {
        idCounter++;
    }

    let added = 0;
    let upgraded = 0;
    let merged = 0;
    let skipped = 0;

    for (const input of allInputs) {
        const incoming = buildCsvRow(input, nextId(idCounter));
        const match = findExistingMatch(rows, incoming.Father, incoming.Quote_Text);

        if (match) {
            const existingPlain = normalizeQuoteText(match.Quote_Text);
            const incomingPlain = normalizeQuoteText(incoming.Quote_Text);
            const sameText = existingPlain === incomingPlain;
            const incomingLonger = incomingPlain.length > existingPlain.length + 20;
            const incomingContains =
                incomingPlain.includes(existingPlain) &&
                incoming.Quote_Text.length > match.Quote_Text.length + 20;

            if (sameText) {
                const mergedSubtopics = mergeSubtopics(match.Subtopics, incoming.Subtopics);
                const mergedNotes = mergeNotes(match.Notes, incoming.Notes);
                if (mergedSubtopics !== match.Subtopics || mergedNotes !== match.Notes) {
                    match.Subtopics = mergedSubtopics;
                    match.Notes = mergedNotes;
                    merged++;
                } else {
                    skipped++;
                }
                continue;
            }

            if (incomingLonger || incomingContains) {
                match.Quote_Text = incoming.Quote_Text;
                match.Subtopics = mergeSubtopics(match.Subtopics, incoming.Subtopics);
                match.Notes = mergeNotes(match.Notes, incoming.Notes);
                match.Topic = incoming.Topic;
                if (incoming.Source_Work) match.Source_Work = incoming.Source_Work;
                if (incoming.Source_Ref) match.Source_Ref = incoming.Source_Ref;
                if (!match.Book.trim()) match.Book = incoming.Book;
                if (!match.Section.trim()) match.Section = incoming.Section;
                upgraded++;
                continue;
            }

            skipped++;
            continue;
        }

        rows.push(incoming);
        idCounter++;
        added++;
    }

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

    console.log(
        `Doctrines of grace import: added ${added}, upgraded ${upgraded}, merged subtopics on ${merged}, skipped ${skipped}.`
    );
}

main();
