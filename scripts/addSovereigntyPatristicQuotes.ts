/**
 * Append Sovereignty / Predestination / Election quotes to CSV
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

const TOPIC = 'Sovereignty';
const PREDESTINATION = 'Predestination';
const CALVINISM = 'Calvinism';
const ELECTION = 'Election';
const SALVATION = 'Salvation';

const INTRO_NOTE =
    'Romans 8–9, Ephesians 1, and John 6 teach predestination to salvation; though Calvinist/Arminian labels are anachronistic for the fathers, many were far closer to Calvin than Arminius on God’s sovereignty in salvation.';

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC662',
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '27:5',
        Quote_Text:
            'Who shall say unto Him, What hast thou done? or, Who shall resist the power of His strength? When and as He pleases He will do all things, and none of the things determined by Him shall pass away',
        Topic: TOPIC,
        Subtopics: PREDESTINATION,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: INTRO_NOTE
    },
    {
        ID: 'FC663',
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '29:1',
        Quote_Text:
            'Let us then draw near to Him with holiness of spirit, lifting up pure and undefiled hands unto Him, loving our gracious and merciful Father, who has made us partakers in the blessings of His elect',
        Topic: TOPIC,
        Subtopics: ELECTION,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Partakers in the blessings of God’s elect.'
    },
    {
        ID: 'FC664',
        Father: 'Ignatius of Antioch',
        Died_AD: 'c.107',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Ephesians',
        Source_Ref: '1:1',
        Quote_Text:
            'Ignatius, who is also called Theophorus, to the Church which is at Ephesus, in Asia, deservedly most happy, being blessed in the greatness and fullness of God the Father, and predestined before the beginning of time, that it should be always for an enduring and unchangeable glory, being united and elected through the true passion by the will of the Father, and Jesus Christ, our God',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'The Ephesian church predestined before time and elected through Christ’s passion.'
    },
    {
        ID: 'FC665',
        Father: 'Author of 2 Clement',
        Died_AD: 'c.150',
        Era: 'Apostolic Father',
        Source_Work: '2 Clement',
        Source_Ref: '1:6-8',
        Quote_Text:
            'We were deficient in understanding, worshipping stones and wood, and gold, and silver, and brass, the works of men’s hand; and our whole life was nothing else than death. Involved in blindness, and with such darkness before our eyes, we have received sight, and through His will have laid aside that cloud by which we were enveloped. For He had compassion on us, and mercifully saved us, observing the many errors in which we were entangled, as well as the destruction to which we were exposed, and that we had no hope of salvation except it came to us from Him. For He called us when we were not, and willed that out of nothing we should attain a real existence',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Salvation and calling by God’s will when we had no hope except from Him.'
    },
    {
        ID: 'FC666',
        Father: 'Didache',
        Died_AD: 'c.100',
        Era: 'Apostolic Father',
        Source_Work: 'Didache',
        Source_Ref: '3:10',
        Quote_Text:
            'The workings that befall thee receive as good, knowing that apart from God nothing cometh to pass',
        Topic: TOPIC,
        Subtopics: PREDESTINATION,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Nothing comes to pass apart from God’s providence.'
    },
    {
        ID: 'FC667',
        Father: 'Barnabas',
        Died_AD: 'c.130',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle of Barnabas',
        Source_Ref: '19:6 (Michael Holmes translation)',
        Quote_Text:
            'Accept as good the things that happen to you, knowing that nothing transpires apart from God',
        Topic: TOPIC,
        Subtopics: PREDESTINATION,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holmes translation; parallel to Didache 3:10 on divine providence.'
    },
    {
        ID: 'FC668',
        Father: 'Author of the Epistle to Diognetus',
        Died_AD: 'c.130-200',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle to Diognetus',
        Source_Ref: '11:7',
        Quote_Text:
            'Which grace if you grieve not, you shall know those things which the Word teaches, by whom He wills, and when He pleases',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'God teaches whom He wills and when He pleases.'
    },
    {
        ID: 'FC669',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 2, Chapter 2, Section 4',
        Quote_Text:
            'But He Himself in Himself, after a fashion which we can neither describe nor conceive, predestinating all things, formed them as He pleased, bestowing harmony on all things, and assigning them their own place, and the beginning of their creation',
        Topic: TOPIC,
        Subtopics: PREDESTINATION,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'God predestinating all things and forming them as He pleased.'
    },
    {
        ID: 'FC670',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 2, Chapter 33, Section 5',
        Quote_Text:
            'And therefore, when the number is completed, which He had predetermined in His own counsel, all those who have been enrolled for life shall rise again, having their own bodies, and having also their own souls',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Those enrolled for life rise when God’s predetermined number is complete.'
    },
    {
        ID: 'FC671',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, Chapter 37, Section 7',
        Quote_Text:
            'God thus determining all things beforehand for the bringing of man to perfection, for his edification, and for the revelation of His dispensations, that goodness may both be made apparent, and righteousness perfected, and that the Church may be fashioned after the image of His Son, and that man may finally be brought to maturity at some future time, becoming ripe through such privileges to see and comprehend God',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'God determining all things beforehand for man’s perfection and salvation.'
    },
    {
        ID: 'FC672',
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'The Stromata',
        Source_Ref: 'Book 7, Chapter 2',
        Quote_Text:
            'According to the fitness which every one has, He, that is, God, distributes his benefits both to the Greeks and to the Barbarians; and to them who are predestinated from among them, and are in his own time called, faithful, and elect',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Benefits distributed to those predestinated and in God’s time called, faithful, and elect.'
    },
    {
        ID: 'FC673',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: 'Four Discourses Against the Arians',
        Source_Ref: 'Discourse 2, Chapter 22, Section 76',
        Quote_Text:
            'How then has He chosen us, before we came into existence, but that, as he says himself, in Him we were represented beforehand? And how at all, before men were created, did He predestinate us unto adoption, but that the Son Himself was ‘founded before the world,’ taking on Him that economy which was for our sake? Or how, as the Apostle goes on to say, have we ‘an inheritance being predestinated,’ but that the Lord Himself was founded ‘before the world,’ inasmuch as He had a purpose, for our sakes, to take on Him through the flesh all that inheritance of judgment which lay against us, and we henceforth were made sons in Him?',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Chosen and predestined to adoption before we existed, in Christ founded before the world.'
    },
    {
        ID: 'FC674',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: 'Four Discourses Against the Arians',
        Source_Ref: 'Discourse 3, Chapter 30, Section 64',
        Quote_Text:
            'Paul was called to be an Apostle ‘by the will of God,’ and our calling has come about ‘by His good pleasure and will,’ and all things have come into being through the Word',
        Topic: TOPIC,
        Subtopics: `${ELECTION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostolic and Christian calling by God’s good pleasure and will.'
    },
    {
        ID: 'FC675',
        Father: 'Basil of Caesarea',
        Died_AD: 'c.330-379',
        Era: 'Greek Patristic',
        Source_Work: 'Homily 5 (The Fathers of the Church, volume 46, Exegetic Homilies)',
        Source_Ref: 'p. 79',
        Quote_Text:
            'Nothing happens without cause; nothing by chance; all things involve a certain ineffable wisdom',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Nothing happens by chance; all things governed by divine wisdom.'
    },
    {
        ID: 'FC676',
        Father: 'Basil of Caesarea',
        Died_AD: 'c.330-379',
        Era: 'Greek Patristic',
        Source_Work: 'Homily on Psalm 32 (The Fathers of the Church, volume 46, Exegetic Homilies)',
        Source_Ref: 'p. 232',
        Quote_Text:
            'Do not say: ‘This happened by chance’ and ‘that occurred accidentally.’ Nothing is casual, nothing indeterminate, nothing happens at random, nothing among things that exist is caused by chance. And do not say it is a bad mishap or it is an evil hour. These are the words of the untaught. ‘Are not two sparrows sold for a farthing? And yet not one of them will fall’ without the divine will',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Not even a sparrow falls apart from the divine will.'
    },
    {
        ID: 'FC677',
        Father: 'Hilary the Deacon',
        Died_AD: 'c.380',
        Era: 'Latin Patristic',
        Source_Work: "Commentary on Paul's Epistles",
        Source_Ref: 'as cited by John Gill in The Cause of God and Truth, Baker Book House, p. 237',
        Quote_Text:
            'The law being abbreviated, the remnant of the Jews are saved; but the rest cannot be saved because, by the appointment of God they are rejected, by which he hath decreed to save mankind',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'A remnant saved; the rest rejected by God’s appointment in His decree to save mankind.'
    },
    {
        ID: 'FC678',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Ephesians',
        Source_Ref: 'on Ephesians 2:8 (PG 62.33)',
        Quote_Text:
            'Even faith, [Paul] says, is not from us. For if the Lord had not come, if he had not called us, how should we have been able to believe? ‘For how,’ [Paul] says, ‘shall they believe if they have not heard?’ So even the act of faith is not self-initiated. It is, he says, ‘the gift of God’',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Faith is not self-initiated but the gift of God.'
    },
    {
        ID: 'FC679',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Ecclesiastes',
        Source_Ref: '1:10',
        Quote_Text:
            'But it could be said too, that those things, which will be done have already been done, decided out of foreknowledge and the predestination of God. For those who have been chosen in Christ before the constitution of the world existed already in previous times',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Chosen in Christ before the world; future acts decided by God’s predestination.'
    },
    {
        ID: 'FC680',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Against Jovinian',
        Source_Ref: 'Book 1, Chapter 38',
        Quote_Text:
            'God the Father chose us in Christ before the foundation of the world, that we might be holy and without spot before Him. We walked in the lusts of the flesh, doing the desires of the flesh and of the thoughts, and were children of wrath, even as the rest. But now He has raised us up with Him, and made us to sit with Him in the heavenly places in Christ Jesus',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Chosen in Christ before the foundation of the world; raised and seated with Him.'
    },
    {
        ID: 'FC681',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Ephesians',
        Source_Ref: '1.2.8-9 (PL 26.460)',
        Quote_Text:
            'Paul says this in case the secret thought should steal upon us that ‘if we are not saved by our own works, at least we are saved by our own faith, and so in another way our salvation is of ourselves.’ Thus he added the statement that faith too is not in our own will but in God’s gift',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Salvation is not of ourselves even through faith; faith is God’s gift, not our will.'
    },
    {
        ID: 'FC682',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Tractates on the Gospel of John',
        Source_Ref: 'Tractate 86 on John 15:15-16',
        Quote_Text:
            '‘Ye have not chosen me,’ He says, ‘but I have chosen you.’ Grace such as that is ineffable. For what were we so long as Christ had not yet chosen us, and we were therefore still destitute of love? For he who hath chosen Him, how can he love Him? Were we, think you, in that condition which is sung of in the psalm: ‘I had rather be an abject in the house of the Lord, than dwell in the tents of wickedness’? Certainly not. What were we then, but sinful and lost? . . . Here surely is at fault the vain reasoning of those who defend the foreknowledge of God in opposition to His grace, and with this view declare that we were chosen before the foundation of the world, because God foreknew that we should be good, but not that He Himself would make us good',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}|${CALVINISM}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ chose us, not we Him; election is by grace making us good, not foreknowledge of our goodness.'
    },
    {
        ID: 'FC683',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'The Predestination of the Saints',
        Source_Ref: 'Chapter 16 (Four Anti-Pelagian Writings, trans. John A. Mourant and William J. Collinge, The Fathers of the Church, Volume 86, pp. 237-238)',
        Quote_Text:
            'Faith, then, both in its beginning and in its completion, is a gift of God, and let it not be doubted by anyone who does not wish to contradict the most evident sacred writings that this gift is given to some, but to others it is not given. Why this gift is not given to all should not disturb the believer, who believes that from one man, all have gone into condemnation, a condemnation undoubtedly most just, so much so that even if no one were freed there from, there would be no just complaint against God. It is evident from this that it is a great grace that many are delivered and recognize, in those who are not delivered, that which they themselves deserved, so that ‘he who glories may glory’ not in his own merits, which he observes as equalled in those who are condemned, but ‘in the Lord.’ As to why God delivers this person rather than that one, ‘How incomprehensible are his judgments, and how unsearchable his ways.’ For it is better for us here to listen or to say, ‘O man, who are you that replies against God?’ than to dare to explain, as if we knew, what God has chosen to keep a secret',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}|${SALVATION}|${ELECTION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Faith a gift given to some and not others; God’s judgments in election are unsearchable.'
    },
    {
        ID: 'FC684',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'On the Predestination of the Saints',
        Source_Ref: 'Book 1, Chapter 38',
        Quote_Text:
            'Although the apostle says that it was not because He foreknew that we should be such, but in order that we might be such by the same election of His grace, by which He showed us favour in His beloved Son. When, therefore, He predestinated us, He foreknew His own work by which He makes us holy and immaculate. Whence the Pelagian error is rightly refuted by this testimony. ‘But we say,’ say they, ‘that God did not foreknow anything as ours except that faith by which we begin to believe, and that He chose and predestinated us before the foundation of the world, in order that we might be holy and immaculate by His grace and by His work.’ But let them also hear in this testimony the words where he says, ‘We have obtained a lot, being predestinated according to His purpose who worketh all things.’ He, therefore, worketh the beginning of our belief who worketh all things; because faith itself does not precede that calling of which it is said: ‘For the gifts and calling of God are without repentance;’ and of which it is said: ‘Not of works, but of Him that calleth’ (although He might have said, ‘of Him that believeth’); and the election which the Lord signified when He said: ‘Ye have not chosen me, but I have chosen you.’ For He chose us, not because we believed, but that we might believe, lest we should be said first to have chosen Him, and so His word be false (which be it far from us to think possible), ‘Ye have not chosen me, but I have chosen you.’ Neither are we called because we believed, but that we may believe; and by that calling which is without repentance it is effected and carried through that we should believe',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}|${SALVATION}|${ELECTION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Predestination foreknows God’s own work making us holy; He chose us that we might believe, not because we believed.'
    },
    {
        ID: 'FC685',
        Father: 'Fulgentius',
        Died_AD: 'c.462-527',
        Era: 'Latin Patristic',
        Source_Work: 'On the Incarnation',
        Source_Ref: 'PL 65.573',
        Quote_Text:
            'The blessed Paul argues that we are saved by faith, which he declares to be not from us but a gift from God. Thus there cannot possibly be true salvation where there is no true faith, and, since this faith is divinely enabled, it is without doubt bestowed by his free generosity',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Faith saving us is God’s gift, divinely enabled and freely bestowed.'
    },
    {
        ID: 'FC686',
        Father: 'Bernard of Clairvaux',
        Died_AD: 'c.1090-1153',
        Era: 'Medieval',
        Source_Work: 'As cited by W. Stanford Reid, “Bernard of Clairvaux in the Thought of John Calvin,” Westminster Theological Journal 41, no. 1 (1979)',
        Source_Ref: 'PL 183.353',
        Quote_Text:
            'Therefore my beginning is solely of grace, and I have nothing which I can attribute to myself in predestination or in calling',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${CALVINISM}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Beginning solely of grace; nothing attributable to self in predestination or calling.'
    },
    {
        ID: 'FC687',
        Father: 'Peter Lombard',
        Died_AD: 'c.1096-1160',
        Era: 'Medieval',
        Source_Work: 'Sentences',
        Source_Ref: 'Book 1, Distinction 41, 2.2 (Giulio Silano, Sentences, p. 226)',
        Quote_Text:
            'And so even the merit of faith comes from God’s mercy. Therefore it is not because of faith or any merits that God has elected some from eternity or has conferred his grace of justification in time, but he has elected by his freely given goodness that they should be good. Hence Augustine, in the book On the Predestination of the Saints: ‘It was not because he foreknew that we would be such that he elected us, but in order that we should be such by the very election of his grace, by which he granted us favour in his beloved Son’',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${ELECTION}|${CALVINISM}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Even faith’s merit is from mercy; election by free goodness, citing Augustine on predestination.'
    },
    {
        ID: 'FC688',
        Father: 'Thomas Aquinas',
        Died_AD: 'c.1274',
        Era: 'Medieval',
        Source_Work: 'Summa Theologiae',
        Source_Ref: '1a.23.5',
        Quote_Text:
            'It is impossible that the total result of predestination taken as a whole should have any cause in ourselves. For whatever is in a human being, disposing him toward salvation, is all included within the results of predestination. Even a person’s preparing himself to receive grace is the effect of predestination; such preparation is impossible apart from divine assistance, as the prophet Jeremiah says, ‘Restore us to yourself, O Lord, that we may be restored!’ (Lam. 5:21). In this way, as far as its results are concerned, the reason for predestination lies in the goodness of God. All the results of predestination are directed toward God’s goodness as their end, and predestination proceeds from God’s goodness as its first cause and principle',
        Topic: TOPIC,
        Subtopics: `${PREDESTINATION}|${SALVATION}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Nothing in predestination’s total result has cause in us; even preparing for grace is its effect.'
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
