/**
 * Import patristic quotes from Berkhof's History of Christian Doctrine (idempotent).
 * Skips duplicates; upgrades overlapping rows when the Berkhof text is more extensive.
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
import { normalizeQuoteText } from './lib/parsePatristicsCanonDocx';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');
const BERKHOF = 'Berkhof — History of Christian Doctrine';

/** Re-tag existing CSV rows after taxonomy changes. */
const RECATEGORIZE: Partial<PatristicQuoteCsvRow>[] = [
    {
        ID: 'FC477',
        Topic: 'The Church',
        Subtopics: 'Visible Church'
    },
    {
        ID: 'FC823',
        Topic: 'Christology',
        Subtopics: 'Two Natures'
    },
    {
        ID: 'FC826',
        Topic: 'Purgatory',
        Subtopics: 'Eschatological Purging'
    },
    {
        ID: 'FC832',
        Topic: 'Predestination',
        Subtopics: 'Effectual Calling'
    },
    {
        ID: 'FC833',
        Topic: 'Christology',
        Subtopics: 'Against Moral Influence'
    },
    {
        ID: 'FC835',
        Topic: 'Christology',
        Subtopics: 'Against Ransom to Satan'
    }
];

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC824',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'The souls of the pious are in a better place, those of the unjust and wicked in a worse, waiting for the time of judgment.',
        Topic: 'Purgatory',
        Subtopics: 'Intermediate State',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Intermediate State',
        Notes:
            'Justin taught an intermediate state before the final judgment, not immediate entry into heavenly glory. Berkhof, History of Christian Doctrine.'
    },
    {
        ID: 'FC825',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho (via Berkhof)',
        Source_Ref: '',
        Quote_Text: 'that their souls, when they die, are taken to heaven',
        Topic: 'Purgatory',
        Subtopics: 'Souls Cannot Return',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Intermediate State',
        Notes:
            'Justin denounced as heretical the view that souls go immediately to heaven at death. Berkhof, History of Christian Doctrine.'
    },
    {
        ID: 'FC826',
        Father: 'Gregory the Great',
        Died_AD: 'c.540-604',
        Era: 'Latin Patristic',
        Source_Work: 'Dialogues (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'It is to be believed that there is, for some light faults, a purgatorial fire before the judgment.',
        Topic: 'Purgatory',
        Subtopics: 'Eschatological Purging',
        Position: 'Roman Catholic',
        Book: BERKHOF,
        Section: 'The Intermediate State',
        Notes:
            'Berkhof calls Gregory "the inventor of purgatory" for this teaching and for prayers for deliverance from purgatorial fire. History of Christian Doctrine.'
    },
    {
        ID: 'FC827',
        Father: 'Gregory the Great',
        Died_AD: 'c.540-604',
        Era: 'Latin Patristic',
        Source_Work: 'Moralia / Homilies (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'The Sinless One became a sacrifice for us, a victim that could die in virtue of His humanity, and could cleanse in virtue of His righteousness. He paid for us a debt of death which He had not deserved, that the death which was our due might not harm us.',
        Topic: 'Atonement',
        Subtopics: 'Penal Substitution|Satisfaction',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Atonement Before Anselm',
        Notes:
            'Berkhof presents this as "the completest synthesis of ancient Latin theology on the atonement" in Gregory. Summarized from Berkhof; consult Gregory for verbatim wording.'
    },
    {
        ID: 'FC828',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text: 'Tradux animae, tradux peccati',
        Topic: 'Original Sin',
        Subtopics: 'Original Sin',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Anthropology of the Patristic Period',
        Notes:
            'Latin: the propagation of the soul involves the propagation of sin. Berkhof on Tertullian\'s traducianism and realism. History of Christian Doctrine.'
    },
    {
        ID: 'FC829',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'evil became, as it were, a natural element in man, present from birth, and that this condition passes over through generation upon the whole human race',
        Topic: 'Original Sin',
        Subtopics: 'Original Sin',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Anti-Gnostic Fathers',
        Notes:
            'Berkhof calls this "the first trace of the doctrine of original sin" in the Antignostic Fathers. Summarized from Berkhof; consult Tertullian for verbatim wording.'
    },
    {
        ID: 'FC830',
        Father: 'Ambrose',
        Died_AD: 'c.340-397',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text: 'all men have sinned in Adam, and are therefore born in sin',
        Topic: 'Original Sin',
        Subtopics: 'Original Sin',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Anthropology of the Patristic Period',
        Notes:
            'Berkhof ascribes the same teaching to Ambrose and Hilary of Poitiers as a step toward the Augustinian view. Summarized from Berkhof; consult Ambrose for verbatim wording.'
    },
    {
        ID: 'FC831',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'Augustine distinguishes several stages in the work of divine grace, which he calls "prevenient grace", "operative grace", and "co-operative grace". In the first the Holy Spirit employs the law to produce the sense of sin and guilt; in the second He uses the Gospel for the production of that faith in Christ and His atoning work which issues in justification and peace with God; and in the third the renewed will of man co-operates with Him in the life-long work of sanctification.',
        Topic: 'Justification by Faith Alone',
        Subtopics: 'Sola Gratia',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Pelagian and Augustinian Doctrines of Sin and Grace',
        Notes:
            'Berkhof\'s summary of Augustine\'s threefold distinction of grace. History of Christian Doctrine.'
    },
    {
        ID: 'FC832',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'When Augustine ascribes the renewal of man to divine grace only, and in this connection speaks of "irresistible grace," he does not mean to intimate that divine grace forces the will, contrary to the nature of man as a free agent, but rather that it so changes the will that man voluntarily chooses that which is good.',
        Topic: 'Predestination',
        Subtopics: 'Effectual Calling',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Pelagian and Augustinian Doctrines of Sin and Grace',
        Notes:
            'Berkhof\'s explanation of Augustine on irresistible grace: renewal of the will, not coercion against nature. History of Christian Doctrine.'
    },
    {
        ID: 'FC833',
        Father: 'Bernard of Clairvaux',
        Died_AD: '1090-1153',
        Era: 'Medieval',
        Source_Work: 'Against Abelard (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'the example of Christ makes us saints just as little as the example of Adam made us sinners',
        Topic: 'Christology',
        Subtopics: 'Against Moral Influence',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Atonement from Anselm to the Reformation',
        Notes:
            'Bernard against Abelard\'s moral-influence theory: Christ\'s example cannot justify apart from His redemptive work. Berkhof, History of Christian Doctrine.'
    },
    {
        ID: 'FC834',
        Father: 'Hilary of Poitiers',
        Died_AD: 'c.315-368',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text: 'Christ died voluntarily, in order to satisfy a penal obligation',
        Topic: 'Atonement',
        Subtopics: 'Penal Substitution',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Atonement Before Anselm',
        Notes:
            'Berkhof on Hilary: death of Christ as satisfaction rendered to God (inference from divine veracity). Summarized from Berkhof; consult Hilary for verbatim wording.'
    },
    {
        ID: 'FC835',
        Father: 'Gregory of Nazianzus',
        Died_AD: 'c.329-390',
        Era: 'Greek Patristic',
        Source_Work: 'Orations (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'He repudiates with scorn and indignation the idea of a ransom paid to Satan, and also rejects the idea that God the Father required a ransom.',
        Topic: 'Christology',
        Subtopics: 'Against Ransom to Satan',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Atonement Before Anselm',
        Notes:
            'Gregory also rejected the idea that God the Father required a ransom to Satan. Berkhof summary; consult Gregory for verbatim wording.'
    },
    {
        ID: 'FC836',
        Father: 'Cyril of Alexandria',
        Died_AD: 'c.376-444',
        Era: 'Greek Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'the infinite value of the death of Christ as the death of a divine Person',
        Topic: 'Atonement',
        Subtopics: 'Divinity of Christ|Penal Substitution',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Atonement Before Anselm',
        Notes:
            'Berkhof: Cyril\'s main contribution is emphasis on the immense value of Christ\'s death as the death of a divine Person—approaching full satisfaction. Summarized from Berkhof.'
    },
    {
        ID: 'FC837',
        Father: 'Cyprian',
        Died_AD: 'c.200-258',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text: 'There can be no salvation to any except in the Church',
        Topic: 'The Church',
        Subtopics: 'Extra Ecclesiam Nulla Salus',
        Position: 'Roman Catholic',
        Book: BERKHOF,
        Section: 'The Means of Grace in the Patristic Period',
        Notes:
            'Berkhof cites Cyprian on salvation only within the Church. Consult Cyprian for full context and verbatim wording. History of Christian Doctrine.'
    },
    {
        ID: 'FC838',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text: 'The Church is even now the Kingdom of Heaven',
        Topic: 'The Church',
        Subtopics: 'Church as Kingdom of God',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Church in the Middle Ages',
        Notes:
            'Berkhof on Augustine\'s identification of the present Church with the Kingdom of Heaven (the saints, and also the episcopally organized Church). History of Christian Doctrine.'
    },
    {
        ID: 'FC839',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'Tertullian was the first to assert the tri-personality of God and to use the word "Trinity".',
        Topic: 'The Trinity',
        Subtopics: 'Tri-personality',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Anti-Gnostic Fathers',
        Notes:
            'Berkhof summary of Tertullian\'s trinitarian vocabulary and tri-personality; consult Tertullian for verbatim wording. History of Christian Doctrine.'
    },
    {
        ID: 'FC840',
        Father: 'Council of Nicea',
        Died_AD: '325',
        Era: 'Greek Patristic',
        Source_Work: 'Nicene Creed (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'begotten not made, being of one substance (homoousios) with the Father',
        Topic: 'The Trinity',
        Subtopics: 'Homoousios',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Trinity in the Ancient Church',
        Notes:
            'Nicene Creed formula on the Son\'s consubstantiality with the Father, as quoted by Berkhof. History of Christian Doctrine.'
    },
    {
        ID: 'FC841',
        Father: 'Gregory of Nyssa',
        Died_AD: 'c.335-394',
        Era: 'Greek Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'restricted its use to the designation of the personal subsistence of the Father and the Son',
        Topic: 'The Trinity',
        Subtopics: 'Person and Hypostasis',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Trinity in the Ancient Church',
        Notes:
            'Berkhof on the Cappadocians (Basil, Gregory of Nyssa, Gregory Nazianzus) restricting hypostasis to personal subsistence rather than essence. Summarized from Berkhof; consult Gregory of Nyssa for verbatim wording.'
    },
    {
        ID: 'FC842',
        Father: 'Council of Constantinople',
        Died_AD: '381',
        Era: 'Greek Patristic',
        Source_Work: 'Constantinopolitan Creed (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'who proceeds from the Father, who is to be glorified with the Father and the Son',
        Topic: 'The Trinity',
        Subtopics: 'Procession of the Spirit',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Trinity in the Ancient Church',
        Notes:
            '381 Constantinopolitan formula on the Holy Spirit, as quoted by Berkhof. History of Christian Doctrine.'
    },
    {
        ID: 'FC843',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Various (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'the first to explain the relation of the Father to the Son by employing the idea of eternal generation',
        Topic: 'The Trinity',
        Subtopics: 'Eternal Generation',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Trinity in the Ancient Church',
        Notes:
            'Berkhof on Origen\'s introduction of eternal generation (with subordinationist defects in his formulation). Summarized from Berkhof; consult Origen for verbatim wording.'
    },
    {
        ID: 'FC844',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'De Trinitate (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'not in order to express it (the relationship), but in order not to be silent',
        Topic: 'The Trinity',
        Subtopics: 'Person and Hypostasis',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Trinity in the Ancient Church',
        Notes:
            'Augustine on using the term "person" for the Trinity despite its inadequacy. Berkhof, History of Christian Doctrine.'
    },
    {
        ID: 'FC845',
        Father: 'Council of Chalcedon',
        Died_AD: '451',
        Era: 'Greek Patristic',
        Source_Work: 'Chalcedonian Definition (via Berkhof)',
        Source_Ref: '',
        Quote_Text:
            'to be acknowledged in two natures, inconfusedly, unchangeably, indivisibly, inseparably, the distinction of natures being by no means taken away by the union, but rather the property of each nature being preserved, and concurring in one Person and one subsistence',
        Topic: 'Christology',
        Subtopics: 'Two Natures',
        Position: 'Reformed',
        Book: BERKHOF,
        Section: 'The Doctrine of the Person of Christ in the Ancient Church',
        Notes:
            'Chalcedonian Definition on the two natures of Christ, as quoted by Berkhof. History of Christian Doctrine.'
    }
];

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
        if (ratio > bestScore) {
            bestScore = ratio;
            best = row;
        }
    }

    return bestScore >= 0.45 ? best : null;
}

function main() {
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const rows = parsePatristicQuotesCsv(csv);
    const existingIds = new Set(rows.map((row) => row.ID.trim()));

    let recategorized = 0;
    for (const patch of RECATEGORIZE) {
        const row = rows.find((entry) => entry.ID.trim() === patch.ID?.trim());
        if (!row) continue;

        if (patch.Topic) row.Topic = patch.Topic;
        if (patch.Subtopics) row.Subtopics = patch.Subtopics;
        recategorized++;
    }

    let added = 0;
    let upgraded = 0;
    let skipped = 0;

    for (const incoming of NEW_QUOTES) {
        if (existingIds.has(incoming.ID)) {
            skipped++;
            continue;
        }

        const match = findExistingMatch(rows, incoming.Father, incoming.Quote_Text);
        if (match) {
            const incomingLonger = incoming.Quote_Text.length > match.Quote_Text.length;
            const incomingContains =
                normalizeQuoteText(incoming.Quote_Text).includes(
                    normalizeQuoteText(match.Quote_Text)
                ) && incoming.Quote_Text.length > match.Quote_Text.length + 20;

            if (incomingLonger || incomingContains) {
                match.Quote_Text = incoming.Quote_Text;
                match.Topic = incoming.Topic;
                match.Subtopics = mergeSubtopics(match.Subtopics, incoming.Subtopics);
                match.Notes = mergeNotes(match.Notes, incoming.Notes);
                if (!match.Book.trim()) match.Book = incoming.Book;
                if (!match.Section.trim()) match.Section = incoming.Section;
                upgraded++;
            } else {
                skipped++;
            }
            continue;
        }

        rows.push(incoming);
        existingIds.add(incoming.ID);
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
        `Berkhof import: recategorized ${recategorized}, added ${added}, upgraded ${upgraded}, skipped ${skipped}.`
    );
}

main();
