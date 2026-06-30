/**
 * Applies patristic quote taxonomy updates (subtopic merges, cross-tags, dedup).
 * Run: npx tsx scripts/applyPatristicQuoteTaxonomy.ts
 */
import fs from 'fs';
import path from 'path';
import {
    formatSubtopics,
    parsePatristicQuotesCsv,
    parseSubtopics,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';

const csvPath = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

/** Replace one subtopic label with one or more new labels. */
const SUBTOPIC_REPLACE: Record<string, string[]> = {
    'Against Universal Bishop': ['Church Governance', 'Authority'],
    'Against Papal Jurisdiction': ['Church Governance', 'Authority'],
    'Matthew 16:18': ['Church Governance', 'Authority'],
    'Papal Primacy': ['Church Governance', 'Authority'],
    'Apostolic Equality': ['Church Governance', 'Authority'],
    'Papal Supremacy': ['Church Governance', 'Authority'],
    'Papal Hyperbole': ['Church Governance', 'Authority'],
    'Imperial Convocation of Councils': ['Church Governance', 'Authority'],
    'Apostolic Power': ['Church Governance', 'Authority'],
    Antichrist: ['Church Governance', 'Authority'],
    'Pre-Augustinian Free Will': ['Synergism'],
    'Apostrophe vs. Invocation': ['Invocation & Intercession'],
    'Apostrophe vs. Assertion': ['Invocation & Intercession'],
    'Commemoration vs. Invocation': ['Invocation & Intercession'],
    'Uncertainty of Intercession': ['Invocation & Intercession'],
    'Merits of Saints': ['Saint & Idol Worship'],
    'Against Saint Worship': ['Saint & Idol Worship'],
    'Against Marian Invocation': ['Saint & Idol Worship'],
    'Against Relic Worship': ['Saint & Idol Worship'],
    'Worship of God Alone': ['Saint & Idol Worship'],
    'Against Image Worship': ['Saint & Idol Worship'],
    'Against Religious Images': ['Saint & Idol Worship'],
    'Against Images in Churches': ['Saint & Idol Worship'],
    'Against Material Images': ['Saint & Idol Worship'],
    'Image = Idol': ['Saint & Idol Worship'],
    "The Lord's Prayer": ["Lord's Prayer"],
    'Lex Orandi Lex Credendi': ["Lord's Prayer"],
    'Voluntary Fasting': ['Fasting'],
    'Origin of Lent': ['Fasting'],
    'Purpose of Fasting': ['Fasting'],
    'Fasting with Teaching': ['Fasting'],
    'Power in Faith not Sign': ['Sign of the Cross'],
    "Power Through Christ's Name": ["Sign of the Cross"],
    'Cross Efficacious': ['Sign of the Cross'],
    'Cross + Invocation': ['Sign of the Cross'],
    'State of the Dead': ['Purgatory'],
    'Limbus Patrum': ['Purgatory'],
    'Purgatorial Fire': ['Purgatory'],
    'Against Purgatory': ['Purgatory'],
    'Figurative Interpretation': ['Sacraments', 'Spiritual Language'],
    'Spiritual Sacrifice': ['Sacraments', 'Spiritual Language'],
    'Spiritual Eating': ['Sacraments', 'Spiritual Language'],
    'Denigration of Marriage': ['Marriage & Celibacy'],
    'Praise of Virginity': ['Marriage & Celibacy'],
    'Dignity of Marriage': ['Marriage & Celibacy'],
    'Clerical Celibacy': ['Marriage & Celibacy'],
    Marriage: ['Marriage & Celibacy'],
    Virginity: ['Marriage & Celibacy'],
    "Mary's Sinlessness": ['Invocation & Intercession', 'Saint & Idol Worship'],
    'Mary as Mediatrix': ['Invocation & Intercession', 'Saint & Idol Worship'],
    'Marian Veneration Qualified': ['Invocation & Intercession', 'Saint & Idol Worship']
};

const REMOVE_IDS = new Set(['RC015', 'RC055', 'RC056']);

const TOPIC_REPLACE: Record<string, string> = {
    Salvation: 'Justification',
    Prayer: 'Spiritual Practices',
    'Church Practice': 'Spiritual Practices',
    Fasting: 'Spiritual Practices',
    'Sign of the Cross': 'Spiritual Practices',
    'Marriage & Celibacy': 'Spiritual Practices',
    Images: 'Christology',
    'Invocation of Saints': 'Christology',
    'Marian Doctrine': 'Christology',
    'Papacy & Church Governance': 'Scripture & Canon'
};

const TOPIC_BY_ID: Record<string, string> = {
    RC054: 'Christology'
};

/** When demoting a topic, replace subtopics wholesale (after SUBTOPIC_REPLACE). */
const SUBTOPICS_FOR_DEMOTED_TOPIC: Record<string, string[]> = {
    Images: ['Saint & Idol Worship'],
    'Marian Doctrine': ['Invocation & Intercession', 'Saint & Idol Worship'],
    'Sign of the Cross': ['Sign of the Cross'],
    'Marriage & Celibacy': ['Marriage & Celibacy'],
    'Papacy & Church Governance': ['Church Governance', 'Authority']
};

const INVOCATION_CHRISTOLOGY_IDS = new Set(['RC044', 'RC045', 'RC048']);

const ADD_BY_ID: Record<string, string[]> = {
    FC044: ['Sola Deo Gloria'],
    FC074: ['Sola Deo Gloria'],
    FC011: ['Sola Scriptura'],
    FC012: ['Sola Scriptura'],
    FC013: ['Patristic Fallibility'],
    FC017: ['Patristic Fallibility'],
    FC018: ['Sola Scriptura'],
    FC019: ['Sola Scriptura'],
    FC020: ['Tradition vs. Scripture'],
    FC021: ['Tradition vs. Scripture'],
    FC121: ['Sola Gratia'],
    FC126: ['Sola Gratia'],
    FC127: ['Sola Gratia'],
    FC130: ['Sola Gratia'],
    FC122: ['Sola Fide'],
    FC123: ['Sola Fide'],
    FC124: ['Sola Fide'],
    FC125: ['Sola Fide'],
    FC128: ['Sola Fide'],
    FC129: ['Sola Fide'],
    FC131: ['Sola Fide', 'Sola Gratia'],
    FC132: ['Sola Fide', 'Sola Gratia'],
    FC133: ['Sola Fide', 'Sola Gratia'],
    FC134: ['Sola Fide', 'Sola Gratia'],
    FC136: ['Sola Gratia'],
    FC135: ['Sola Fide'],
    FC195: ['Sola Fide'],
    FC271: ['Sola Gratia'],
    FC274: ['Imputed Righteousness'],
    FC275: ['Imputed Righteousness', 'Sola Gratia'],
    FC273: ['Sola Gratia'],
    FC278: ['Sola Gratia'],
    FC281: ['Sola Gratia'],
    FC283: ['Sola Gratia'],
    FC285: ['Sola Gratia'],
    FC286: ['Sola Gratia'],
    FC287: ['Sola Gratia'],
    FC265: ['Sola Fide'],
    FC266: ['Sola Fide'],
    FC267: ['Sola Fide'],
    FC268: ['Sola Fide'],
    FC269: ['Sola Fide'],
    FC270: ['Sola Fide'],
    RC011: ['Sola Fide'],
    RC012: ['Sola Fide'],
    RC013: ['Sola Fide'],
    RC014: ['Sola Fide'],
    RC016: ['Sola Fide'],
    RC017: ['Sola Fide'],
    RC018: ['Sola Fide'],
    RC019: ['Sola Fide'],
    RC021: ['Sola Fide'],
    RC004: ['Sola Gratia', 'Bondage of the Will'],
    RC005: ['Bondage of the Will'],
    RC006: ['Bondage of the Will'],
    RC007: ['Bondage of the Will'],
    RC008: ['Bondage of the Will'],
    RC009: ['Bondage of the Will'],
    RC010: ['Bondage of the Will'],
    RC054: ['Saint & Idol Worship', 'Sola Deo Gloria']
};

const REPLACE_BY_ID: Record<string, string[]> = {
    RC054: ['Saint & Idol Worship', 'Sola Deo Gloria']
};

const POSITION_BY_ID: Record<string, string> = Object.fromEntries(
    Array.from({ length: 37 }, (_, i) => [`FC${254 + i}`, 'Reformed'])
);

function remapSubtopics(subtopics: string[]): string[] {
    const result: string[] = [];
    for (const subtopic of subtopics) {
        const replacement = SUBTOPIC_REPLACE[subtopic];
        if (replacement) {
            result.push(...replacement);
        } else {
            result.push(subtopic);
        }
    }
    return formatSubtopics(result).split('|');
}

function applyRow(row: PatristicQuoteCsvRow): PatristicQuoteCsvRow | null {
    if (REMOVE_IDS.has(row.ID)) return null;

    const originalTopic = row.Topic;
    const topic = TOPIC_BY_ID[row.ID] ?? TOPIC_REPLACE[row.Topic] ?? row.Topic;

    let subtopics = remapSubtopics(parseSubtopics(row.Subtopics));

    const demotedSubtopics = SUBTOPICS_FOR_DEMOTED_TOPIC[originalTopic];
    if (demotedSubtopics) {
        subtopics = demotedSubtopics;
    } else if (originalTopic === 'Invocation of Saints' && INVOCATION_CHRISTOLOGY_IDS.has(row.ID)) {
        subtopics = ['Invocation & Intercession'];
    }

    if (REPLACE_BY_ID[row.ID]) {
        subtopics = REPLACE_BY_ID[row.ID];
    }

    const extras = ADD_BY_ID[row.ID] ?? [];
    subtopics = formatSubtopics([...subtopics, ...extras]).split('|');

    const position = row.Position || POSITION_BY_ID[row.ID] || row.Position;

    return {
        ...row,
        Topic: topic,
        Subtopics: formatSubtopics(subtopics),
        Position: position
    };
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
        ...rows.map((row) => headers.map((h) => escapeField(row[h] ?? '')).join(','))
    ];
    fs.writeFileSync(csvPath, `${lines.join('\n')}\n`);
}

const text = fs.readFileSync(csvPath, 'utf8');
const rows = parsePatristicQuotesCsv(text);
const updated = rows.map(applyRow).filter((row): row is PatristicQuoteCsvRow => row !== null);

writeCsv(updated);

const unique = new Set<string>();
for (const row of updated) {
    for (const s of parseSubtopics(row.Subtopics)) unique.add(s);
}

console.log(`Quotes: ${rows.length} → ${updated.length} (removed ${rows.length - updated.length})`);
console.log(`Unique subtopics: ${unique.size}`);
console.log([...unique].sort().join('\n'));
