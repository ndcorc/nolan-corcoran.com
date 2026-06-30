/**
 * Append Salvation / Atonement / Particular Redemption quotes to CSV
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
import { normalizeQuoteText } from './lib/parsePatristicsCanonDocx';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

const TOPIC = 'Salvation';
const ATONEMENT = 'Atonement';
const DEFINITE = 'Definite Atonement';
const PARTICULAR = 'Particular Redemption';

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC589',
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '12:7',
        Quote_Text:
            'Moreover, they gave her a sign to this effect, that she should hang forth from her house a scarlet thread. And thus they made it manifest that redemption should flow through the blood of the Lord to all them that believe and hope in God',
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scarlet thread typifies redemption flowing through the Lord’s blood to believers.'
    },
    {
        ID: 'FC590',
        Father: 'Barnabas',
        Died_AD: 'c.130',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle of Barnabas',
        Source_Ref: '7:5',
        Quote_Text:
            'Wherefore? Because to me, who am to offer my flesh for the sins of my new people, ye are to give gall with vinegar to drink: eat ye alone, while the people fast and mourn in sackcloth and ashes. These things were done that He might show that it was necessary for Him to suffer for them',
        Topic: TOPIC,
        Subtopics: ATONEMENT,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Typological reading of the passion: Christ must suffer for His people.'
    },
    {
        ID: 'FC591',
        Father: 'Polycarp',
        Died_AD: 'c.155',
        Era: 'Apostolic Father',
        Source_Work: 'Martyrdom of Polycarp',
        Source_Ref: '17:2',
        Quote_Text:
            'This he said at the suggestion and urgent persuasion of the Jews, who also watched us, as we sought to take him out of the fire, being ignorant of this, that it is neither possible for us ever to forsake Christ, who suffered for the salvation of such as shall be saved throughout the whole world (the blameless one for sinners), nor to worship any other',
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ suffered for the salvation of those who shall be saved — the blameless one for sinners.'
    },
    {
        ID: 'FC592',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 40',
        Quote_Text:
            'Because in the same place in Jerusalem you shall recognize Him whom you have dishonored, and who was an offering for all sinners willing to repent',
        Topic: TOPIC,
        Subtopics: ATONEMENT,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ offered for sinners willing to repent.'
    },
    {
        ID: 'FC593',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 41',
        Quote_Text:
            'The celebration of which our Lord Jesus Christ prescribed, in remembrance of the suffering which He endured on behalf of those who are purified in soul from all iniquity',
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Eucharistic remembrance of Christ’s suffering on behalf of the purified.'
    },
    {
        ID: 'FC594',
        Father: 'Cyprian',
        Died_AD: 'c.200-258',
        Era: 'Latin Patristic',
        Source_Work: "Treatise 4: On the Lord's Prayer",
        Source_Ref: 'Chapter 18',
        Quote_Text:
            'For Christ is the bread of life; and this bread does not belong to all men, but it is ours. And according as we say, Our Father, because He is the Father of those who understand and believe; so also we call it our bread, because Christ is the bread of those who are in union with His body',
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ the bread of life belongs to believers united to His body, not to all men.'
    },
    {
        ID: 'FC595',
        Father: 'Ambrose',
        Died_AD: 'c.339-397',
        Era: 'Latin Patristic',
        Source_Work: 'Exposition of the Christian Faith',
        Source_Ref: 'Book 4, Chapter 2, Section 27',
        Quote_Text:
            'Ignorance thou mayest not plead, for to this end He came down, that thou mayest believe; if thou believest not, He has not come down for thee, has not suffered for thee',
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ came and suffered for those who believe; unbelief excludes one from the benefit of His suffering.'
    },
    {
        ID: 'FC596',
        Father: 'Ambrose',
        Died_AD: 'c.339-397',
        Era: 'Latin Patristic',
        Source_Work: 'Jacob and the Happy Life',
        Source_Ref: '6.26 (The Fathers of the Church, volume 65, Seven Exegetical Works, p. 136)',
        Quote_Text:
            "For the Father has given every judgment to Christ. Can Christ then condemn you, when He redeemed you from death and offered Himself on your behalf, and when He knows that your life is what was gained by His death? Will He not say, 'What profit is there in my blood, if I condemn the man whom I myself have saved?'",
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${DEFINITE}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ redeemed and saved those He would not condemn — the saved life gained by His death.'
    },
    {
        ID: 'FC597',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'Panarion, Books 2 and 3',
        Source_Ref: 'Chapter 66 Against Manichaeans, Section 79.3 (Brill Edition, p. 306)',
        Quote_Text:
            "And the teacher of the church immediately adds the way in which Christ bought us, and says, 'Ye were bought with a price,' 'the precious blood of Christ, the lamb without blemish and without spot.' Now if we were bought with the blood, you are not one of the purchased, Mani, for you deny the blood",
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Redemption by Christ’s blood implies a definite purchased people.'
    },
    {
        ID: 'FC598',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Matthew',
        Source_Ref: 'on Matthew 20:28 (Fathers of the Church, volume 117, p. 228-229 [PL 26.150])',
        Quote_Text:
            "And to give his life as a redemption for many.' This took place when he took the form of a slave that he might pour out his blood for the world. And he did not say 'to give his life as a redemption' for all, but 'for many,' that is, for those who wanted to believe",
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ gave His life as redemption for many — those who wanted to believe — not for all.'
    },
    {
        ID: 'FC599',
        Father: 'Pacian',
        Died_AD: 'c.310-390',
        Era: 'Latin Patristic',
        Source_Work: 'Epistle 3: Against the Treatise of the Novatians',
        Source_Ref: 'Section 23',
        Quote_Text:
            'But if He suffered not the Gentile people to die, much more when redeemed will He not suffer them to be lost. Nor will He cast away those, whom He hath bought at a great Price. Nor is the loss of His servants a little matter in His eyes. He that has risen again shall die no more, as it is written. But Himself is our Advocate with the Father, Himself intercedeth for our sins, no powerless Maintainer of the cause of the wretched, no inadequate Intercessor! Answer, brother; can the devil oppress the servants of God, and cannot Christ set them free?',
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Those bought at a great price will not be cast away or lost after redemption.'
    },
    {
        ID: 'FC600',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Adulterous Marriages',
        Source_Ref: 'Part 1, Book 1, Chapters 15-16 (Works of Saint Augustine, vol. 9, trans. Ray Kearney, ed. John E. Rotelle, Hyde Park, NY: New City Press, 1999, p. 153)',
        Quote_Text:
            "Hence things that are lawful are not all good, but everything unlawful is not good. Just as everyone redeemed by Christ's blood is a human being, but human beings are not all redeemed by Christ's blood, so too everything that is unlawful is not good, but things that are not good are not all unlawful",
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Not all human beings are redeemed by Christ’s blood — only a subset of humanity.'
    },
    {
        ID: 'FC601',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Tractates on John',
        Source_Ref: 'Tractate 48 on John 10:22-42, Section 4',
        Quote_Text:
            "What did He mean, then, in saying to them, 'Ye are not of my sheep'? That He saw them predestined to everlasting destruction, not won to eternal life by the price of His own blood",
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Those not of Christ’s sheep were not won to eternal life by the price of His blood.'
    },
    {
        ID: 'FC602',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Tractates on John',
        Source_Ref: 'Tractate 68 on John 14:1-3, Section 2',
        Quote_Text:
            "That is, those whom He has redeemed by His blood, He shall then have delivered up to stand before His Father's face",
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Those redeemed by Christ’s blood will stand before the Father.'
    },
    {
        ID: 'FC603',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Tractates on John',
        Source_Ref: 'Tractate 87 on John 15:17-19, Sections 2-3',
        Quote_Text:
            "'If ye were of the world,' He says, 'the world would love its own.' He says this, of course, of the whole Church, which, by itself, He frequently also calls by the name of the world: as when it is said, 'God was in Christ, reconciling the world unto Himself.' And this also: 'The Son of man came not to condemn the world, but that the world through Him might be saved.' And John says in his epistle: 'We have an advocate with the Father, Jesus Christ the righteous: and He is the propitiation for our sins; and not for ours only, but also [for those] of the whole world.' The whole world then is the Church, and yet the whole world hateth the Church. The world therefore hateth the world, the hostile that which is reconciled, the condemned that which is saved, the polluted that which is cleansed. But that world which God is in Christ reconciling unto Himself, which is saved by Christ, and has all its sins freely pardoned by Christ, has been chosen out of the world that is hostile, condemned, and defiled. For out of that mass, which has all perished in Adam, are formed the vessels of mercy, whereof that world of reconciliation is composed, that is hated by the world which belongeth to the vessels of wrath that are formed out of the same mass and fitted to destruction",
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'The “world” reconciled and saved is the Church chosen out of the hostile world — propitiation for the elect.'
    },
    {
        ID: 'FC604',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Enchiridion',
        Source_Ref: 'Chapter 103',
        Quote_Text:
            "Accordingly, when we hear and read in Scripture that He 'will have all men to be saved,' although we know well that all men are not saved, we are not on that account to restrict the omnipotence of God, but are rather to understand the Scripture, 'Who will have all men to be saved,' as meaning that no man is saved unless God wills his salvation: not that there is no man whose salvation He does not will, but that no man is saved apart from His will; and that, therefore, we should pray Him to will our salvation, because if He will it, it must necessarily be accomplished. And it was of prayer to God that the apostle was speaking when he used this expression. And on the same principle we interpret the expression in the Gospel: 'The true light which lighteth every man that cometh into the world:' not that there is no man who is not enlightened, but that no man is enlightened except by Him. Or, it is said, 'Who will have all men to be saved;' not that there is no man whose salvation He does not will (for how, then, explain the fact that He was unwilling to work miracles in the presence of some who, He said, would have repented if He had worked them?), but that we are to understand by 'all men,' the human race in all its varieties of rank and circumstances, — kings, subjects; noble, plebeian, high, low, learned, and unlearned; the sound in body, the feeble, the clever, the dull, the foolish, the rich, the poor, and those of middling circumstances; males, females, infants, boys, youths; young, middle-aged, and old men; of every tongue, of every fashion, of all arts, of all professions, with all the innumerable differences of will and conscience, and whatever else there is that makes a distinction among men. For which of all these classes is there out of which God does not will that men should be saved in all nations through His only-begotten Son, our Lord, and therefore does save them; for the Omnipotent cannot will in vain, whatsoever He may will? Now the apostle had enjoined that prayers should be made for all men, and had especially added, 'For kings, and for all that are in authority,' who might be supposed, in the pride and pomp of worldly station, to shrink from the humility of the Christian faith",
        Topic: TOPIC,
        Subtopics: ATONEMENT,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Universal-sounding salvation texts explained: “all men” means all kinds of men, and none are saved apart from God’s will.'
    },
    {
        ID: 'FC605',
        Father: 'Prosper of Aquitaine',
        Died_AD: 'c.390-455',
        Era: 'Latin Patristic',
        Source_Work: 'Letter 225 to Augustine',
        Source_Ref: 'Sections 2-3 (The Fathers of the Church, volume 86, Saint Augustine, Four Anti-Pelagian Writings, p. 201)',
        Quote_Text:
            'While those who were held back by the darkness of their own prejudice went away more opposed than they had previously been. We have to fear this headlong separation of theirs, first for their own sake, lest the spirit of Pelagian impiety make sport of men so clear-minded and so exemplary in the pursuit of all virtues. . . . This is a summary of what they profess . . . the propitiation which is found in the mystery of the blood of Christ was offered for all men without exception',
        Topic: TOPIC,
        Subtopics: ATONEMENT,
        Position: 'Nuanced',
        Book: '',
        Section: '',
        Notes: 'Prosper reports (and rejects) the Pelagian claim that Christ’s propitiation was offered for all men without exception.'
    },
    {
        ID: 'FC606',
        Father: 'Prosper of Aquitaine',
        Died_AD: 'c.390-455',
        Era: 'Latin Patristic',
        Source_Work: 'Answers to the Gauls',
        Source_Ref: 'Article 9 (Defense of St. Augustine, trans. P. DeLetter, Ancient Christian Writers, volume 32, p. 149-150)',
        Quote_Text:
            'Article 9. Objection: The Saviour was not crucified for the redemption of the entire world. . . . Accordingly, though it is right to say that the Saviour was crucified for the redemption of the entire world, because He truly took our human nature and because all men were lost in the first man, yet it may also be said that He was crucified only for those who were to profit by His death',
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Universal language of redemption (entire world) coexists with particular application to those who profit by His death.'
    },
    {
        ID: 'FC607',
        Father: 'Theodoret of Cyrus',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'Interpretation of Hebrews',
        Source_Ref: 'Chapter 9 (Commentary on the Letters of St. Paul, Volume 2, p. 175)',
        Quote_Text:
            'It should be noted, of course, that Christ bore the sins of many, not all, and not all came to faith. So He removed the sins of the believers only',
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ bore the sins of many — believers only — not all.'
    },
    {
        ID: 'FC608',
        Father: 'Bede',
        Died_AD: 'c.673-735',
        Era: 'Medieval',
        Source_Work: 'Commentary on 1 John',
        Source_Ref: 'on 1 John 2:2 (Ancient Christian Commentary on Scripture: New Testament, Vol. XI, ed. Gerald Bray, Downers Grove, IL: InterVarsity Press, 2000, p. 178)',
        Quote_Text:
            'In his humanity Christ pleads for our sins before the Father, but in his divinity he has propitiated them for us with the Father. Furthermore, he has not done this only for those who were alive at the time of his death, but also for the whole church which is scattered over the full compass of the world, and it will be valid for everyone, from the very first among the elect until the last one who will be born at the end of time. This verse is therefore a rebuke to the Donatists, who thought that the true church was to be found only in Africa. The Lord pleads for the sins of the whole world, because the church which he has bought with his blood exists in every corner of the globe',
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Propitiation for the whole church bought with Christ’s blood — from first to last of the elect worldwide.'
    },
    {
        ID: 'FC609',
        Father: 'Gottschalk of Orbais',
        Died_AD: 'c.808-867',
        Era: 'Medieval',
        Source_Work: 'On Predestination',
        Source_Ref: 'as cited in Gottschalk and a Medieval Predestination Controversy, eds. Victor Genke and Francis X. Gumerlock, p. 59',
        Quote_Text:
            'We of course correctly believe, rightly hope and trust that the body and blood of Christ were handed over and shed for the church of Christ alone',
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ’s body and blood given for the church of Christ alone.'
    },
    {
        ID: 'FC610',
        Father: 'Remigius of Auxerre',
        Died_AD: 'c.841-908',
        Era: 'Medieval',
        Source_Work: 'Liber de tribus epistolis',
        Source_Ref: 'PL 121.985-1068',
        Quote_Text:
            'Since only the elect are saved, it may be accepted that Christ did not come to save all and did not die on the cross for all',
        Topic: TOPIC,
        Subtopics: `${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Only the elect are saved; Christ did not come to save all or die for all.'
    },
    {
        ID: 'FC611',
        Father: 'Council of Valence',
        Died_AD: '855',
        Era: 'Medieval',
        Source_Work: 'Council of Valence (855 A.D.)',
        Source_Ref: 'Canon 4 (Mansi, 15:5)',
        Quote_Text:
            "Likewise concerning the redemption of the blood of Christ, because of the great error which has arisen from this cause, so that some, as their writings indicate, declare that it has been shed even for those impious ones who from the beginning of the world even up to the passion of our Lord, have died in their wickedness and have been punished by eternal damnation, contrary to that prophet: 'O death, I will be Thy death, O hell, I will be thy bite'; it seems right that we should simply and faithfully hold and teach according to the evangelical and apostolic truth, because we hold this price to have been paid for those concerning whom our Lord Himself says: 'As Moses lifted up the serpent in the desert, so it is necessary that the Son of man be lifted up, that all, who believe in Him, may not perish, but may have eternal life. For God so loved the world that He gave His only begotten Son: that all, who believe in Him, may not perish but may have eternal life,' and the Apostle: 'Christ,' he said, 'once has been offered to exhaust the sins of many'",
        Topic: TOPIC,
        Subtopics: `${ATONEMENT}|${DEFINITE}|${PARTICULAR}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Rejects redemption for the eternally damned; Christ’s price paid for believers — those who believe in Him.'
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

function main() {
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const rows = parsePatristicQuotesCsv(csv);

    const added: string[] = [];
    const updated: string[] = [];
    const skipped: string[] = [];

    for (const quote of NEW_QUOTES) {
        const existing = findExistingMatch(rows, quote.Father, quote.Quote_Text);

        if (existing) {
            const existingPlain = normalizeQuoteText(existing.Quote_Text);
            const incomingPlain = normalizeQuoteText(quote.Quote_Text);
            const incomingLonger = incomingPlain.length > existingPlain.length + 20;
            const sameText = existingPlain === incomingPlain;

            if (sameText) {
                const mergedSubtopics = mergeSubtopics(existing.Subtopics, quote.Subtopics);
                const mergedNotes = mergeNotes(existing.Notes, quote.Notes);
                if (mergedSubtopics !== existing.Subtopics || mergedNotes !== existing.Notes) {
                    existing.Subtopics = mergedSubtopics;
                    existing.Notes = mergedNotes;
                    if (existing.Topic !== quote.Topic) existing.Topic = quote.Topic;
                    updated.push(`${existing.ID} (metadata)`);
                } else {
                    skipped.push(`${existing.ID} (${quote.Father})`);
                }
                continue;
            }

            if (incomingLonger) {
                existing.Quote_Text = quote.Quote_Text;
                existing.Subtopics = mergeSubtopics(existing.Subtopics, quote.Subtopics);
                existing.Notes = mergeNotes(existing.Notes, quote.Notes);
                existing.Topic = quote.Topic;
                if (quote.Source_Work) existing.Source_Work = quote.Source_Work;
                if (quote.Source_Ref) existing.Source_Ref = quote.Source_Ref;
                updated.push(existing.ID);
                continue;
            }

            skipped.push(`${existing.ID} (shorter duplicate)`);
            continue;
        }

        rows.push(quote);
        added.push(quote.ID);
    }

    writeCsv(rows);

    if (added.length) console.log(`Added ${added.length}: ${added.join(', ')}`);
    if (updated.length) console.log(`Updated ${updated.length}: ${updated.join(', ')}`);
    if (skipped.length) console.log(`Skipped ${skipped.length} duplicate(s).`);
    if (!added.length && !updated.length) console.log('No changes needed.');
}

main();
