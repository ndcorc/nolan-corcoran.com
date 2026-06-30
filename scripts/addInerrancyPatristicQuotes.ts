/**
 * Append Scripture inerrancy quotes to CSV (idempotent by legacy ID).
 */
import fs from 'fs';
import path from 'path';
import { type PatristicQuoteCsvRow } from './lib/patristicQuotesCsv';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC291',
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians',
        Source_Ref: '45:2-3',
        Quote_Text:
            'Look carefully into the Scriptures, which are the true utterances of the Holy Spirit. Observe that nothing of an unjust or counterfeit character is written in them',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptures as Spirit-inspired utterances containing nothing unjust or counterfeit.'
    },
    {
        ID: 'FC292',
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians',
        Source_Ref: '47:1-3',
        Quote_Text:
            'Take up the epistle of the blessed Apostle Paul. What did he write to you at the time when the Gospel first began to be preached? Truly, under the inspiration of the Spirit, he wrote to you concerning himself, and Cephas, and Apollos, because even then parties had been formed among you',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Paul's epistle written under Spirit inspiration when the Gospel was first preached."
    },
    {
        ID: 'FC293',
        Father: 'Papias of Hierapolis',
        Died_AD: 'c.130',
        Era: 'Apostolic Father',
        Source_Work: 'Church History (via Eusebius)',
        Source_Ref: 'Book 3, Chapter 39',
        Quote_Text:
            "Mark, having become the interpreter of Peter, wrote down accurately, though not indeed in order, whatsoever he remembered of the things done or said by Christ. For he neither heard the Lord nor followed him, but afterward, as I said, he followed Peter, who adapted his teaching to the needs of his hearers, but with no intention of giving a connected account of the Lord's discourses, so that Mark committed no error while he thus wrote some things as he remembered them. For he was careful of one thing, not to omit any of the things which he had heard, and not to state any of them falsely",
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Papias on Mark's Gospel: accurate memory, no omission or false statement (preserved in Eusebius)."
    },
    {
        ID: 'FC294',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 65',
        Quote_Text:
            'Since I am entirely convinced that no Scripture contradicts another, I shall admit that I do not understand what is recorded, and shall strive to persuade those who imagine that the Scriptures are contradictory, to be rather of the same opinion of myself',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptures are harmoniously non-contradictory; apparent difficulties admit ignorance rather than contradiction.'
    },
    {
        ID: 'FC295',
        Father: 'Theophilus of Antioch',
        Died_AD: 'c.181-188',
        Era: 'Greek Patristic',
        Source_Work: 'To Autolycus',
        Source_Ref: 'Book 3, Chapter 17',
        Quote_Text:
            'How much more, then, shall we know the truth who are instructed by the holy prophets, who were possessed by the Holy Spirit of God! On this account all the prophets spoke harmoniously and in agreement with one another, and foretold the things that would come to pass in all the world',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Prophets possessed by the Spirit spoke harmoniously and in agreement with one another.'
    },
    {
        ID: 'FC296',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 2, Chapter 28, Section 2',
        Quote_Text:
            'The Scriptures are indeed perfect, since they were spoken by the Word of God and His Spirit',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptures are perfect as spoken by the Word of God and His Spirit.'
    },
    {
        ID: 'FC297',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 2, Chapter 28, Section 3',
        Quote_Text:
            'All Scripture, which has been given to us by God, is perfectly consistent. The parables harmonize with the passages that are plain; and statements with a clearer meaning serve to explain the parables',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'All God-given Scripture is perfectly consistent; plain and parabolic passages harmonize.'
    },
    {
        ID: 'FC298',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 5, Section 1',
        Quote_Text:
            'The apostles, likewise, being disciples of the truth, are above all falsehood; for a lie has no fellowship with the truth, just as darkness has none with light, but the presence of the one shuts out that of the other. Our Lord, therefore, being the truth, did not speak lies',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostles as disciples of truth cannot speak lies; Christ the truth did not lie.'
    },
    {
        ID: 'FC299',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, Chapter 2, Section 3',
        Quote_Text:
            'But since the writings of Moses are the words of Christ . . . He thus indicates in the clearest manner that the writings of Moses are His words. If, then, [this be the case with regard] to Moses, so also, beyond a doubt, the words of the other prophets are His [words]',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Moses and the prophets speak the words of Christ.'
    },
    {
        ID: 'FC300',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'A Treatise on the Soul',
        Source_Ref: 'Chapter 21',
        Quote_Text:
            'The statements of Holy Scripture will never be discordant with truth',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scripture is never discordant with truth.'
    },
    {
        ID: 'FC301',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Commentary on Matthew',
        Source_Ref: 'Book 2',
        Quote_Text:
            'To the man who is a peacemaker in either sense there is in the Divine oracles nothing crooked or perverse, for they are all plain to those who understand. And because to such an one there is nothing crooked or perverse, he sees therefore abundance of peace in all the Scriptures, even in those which seem to be at conflict, and in contradiction with one another. And likewise he becomes a third peacemaker as he demonstrates that that which appears to others to be a conflict in the Scriptures is no conflict, and exhibits their concord and peace, whether of the Old Scriptures with the New, or of the Law with the Prophets, or of the Gospels with the Apostolic Scriptures, or of the Apostolic Scriptures with each other. . . . For he knows that all the Scripture is the one perfect and harmonised instrument of God, which from different sounds gives forth one saving voice to those willing to learn',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'All Scripture is one perfect harmonised instrument of God; apparent conflicts are reconciled.'
    },
    {
        ID: 'FC302',
        Father: 'Novatian',
        Died_AD: 'c.258',
        Era: 'Latin Patristic',
        Source_Work: 'Concerning the Trinity',
        Source_Ref: 'Chapter 30',
        Quote_Text:
            'We shall reasonably be thought to have furnished a scandal to the heretics, not assuredly by the fault of the heavenly Scriptures, which never deceive; but by the presumption of human error, whereby they have chosen to be heretics',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Heavenly Scriptures never deceive; heresy arises from human error, not Scripture.'
    },
    {
        ID: 'FC303',
        Father: 'Arnobius',
        Died_AD: 'c.330',
        Era: 'Latin Patristic',
        Source_Work: 'Against the Heathen',
        Source_Ref: 'Book 1, Chapter 58',
        Quote_Text:
            'But they were written by unlearned and ignorant men, and should not therefore be readily believed. See that this be not rather a stronger reason for believing that they have not been adulterated by any false statements, but were put forth by men of simple mind, who knew not how to trick out their tales with meretricious ornaments',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptures written by simple men without rhetorical artifice — not adulterated with false statements.'
    },
    {
        ID: 'FC304',
        Father: 'Methodius of Olympus',
        Died_AD: 'c.311',
        Era: 'Greek Patristic',
        Source_Work: 'On the Resurrection',
        Source_Ref: 'Part 1, Chapter 9',
        Quote_Text: 'For there is no contradiction nor absurdity in the Holy Scriptures',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scriptures contain no contradiction or absurdity.'
    },
    {
        ID: 'FC305',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: 'Letter 19',
        Source_Ref: 'Section 3',
        Quote_Text:
            'It is the opinion of some that the Scriptures do not agree or that the God who gave them is false. But there is no disagreement at all. Far from it! The Father, who is truth, cannot lie',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptures agree; God who gave them is truth and cannot lie.'
    },
    {
        ID: 'FC306',
        Father: 'Gregory of Nazianzus',
        Died_AD: 'c.329-390',
        Era: 'Greek Patristic',
        Source_Work: 'Oration 2',
        Source_Ref: 'Section 105',
        Quote_Text:
            'We however, who extend the accuracy of the Spirit to the merest stroke and tittle, will never admit the impious assertion that even the smallest matters were dealt with haphazard by those who have recorded them',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Spirit-inspired accuracy extends to the smallest details of Scripture.'
    },
    {
        ID: 'FC307',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'Panarion',
        Source_Ref: 'Books 2 and 3, Chapter 69 Against the Arians, Section 55.7 (Brill Edition, p. 382)',
        Quote_Text:
            'And thus everything is crystal clear, and nothing in the sacred scripture is contradictory or has any taint of death',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sacred Scripture is clear and free from contradiction.'
    },
    {
        ID: 'FC308',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Genesis',
        Source_Ref: 'Homily 4, Section 3',
        Quote_Text:
            'Do not trouble yourself, my brethren, and do not believe that Scripture ever contradicts itself. On the contrary, recognize its veracity, cling to its doctrine, and close your ears to the cries of error',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture never contradicts itself; recognize its veracity.'
    },
    {
        ID: 'FC309',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Matthew',
        Source_Ref: 'Homily 13, Section 8',
        Quote_Text:
            'The reasoning power of the soul on the other hand, if it receive the light of the divine Scriptures, will prove a more accurate, an unerring standard of realities',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Divine Scriptures are an unerring standard of realities.'
    },
    {
        ID: 'FC310',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'The Confessions',
        Source_Ref: 'Book 7, Chapter 19, Section 25 (Maria Boulding translation)',
        Quote_Text:
            'If these actions were reported of him falsely it would lay the entirety of the scriptures open to suspicion of lying, and then these writings would afford no possibility of saving faith to the human race. In fact, however, the scriptures are trustworthy; and so I acknowledged Christ to be a perfect man',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptures are trustworthy; false reports would undermine saving faith.'
    },
    {
        ID: 'FC311',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Letter 28',
        Source_Ref: '',
        Quote_Text:
            'For it seems to me that most disastrous consequences must follow upon our believing that anything false is found in the sacred books; that is to say, that the men by whom the Scripture has been given to us, and committed to writing, did put down in these books anything false. It is one question whether it may be at any time the duty of a good man to deceive; but it is another question whether it can have been the duty of a writer of Holy Scripture to deceive. For if you once admit into such a high sanctuary of authority one false statement as made in the way of duty, there will not be left a single sentence of those books which, if appearing to any one difficult in practice or hard to believe, may not by the same fatal rule be explained away, as a statement in which, intentionally, and under a sense of duty, the author declared what was not true',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Admitting one intentional falsehood in Scripture would destroy all biblical authority.'
    },
    {
        ID: 'FC312',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Reply to Faustus the Manichaean',
        Source_Ref: 'Book 11, Chapter 5',
        Quote_Text:
            'If we are perplexed by an apparent contradiction in Scripture, it is not allowable to say, The author of this book is mistaken; but either the manuscript is faulty, or the translation is wrong, or you have not understood',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apparent contradictions must be resolved without attributing error to Scripture.'
    },
    {
        ID: 'FC313',
        Father: 'Thomas Aquinas',
        Died_AD: 'c.1274',
        Era: 'Medieval',
        Source_Work: 'Summa Theologiae',
        Source_Ref: '2a2ae.110.3',
        Quote_Text:
            'That either in the Gospels or anywhere else in the canonical Scriptures falsehood is asserted or that their authors lied is inadmissible; it would put an end to the certainty of faith, which rests on the authoritativeness of Sacred Scripture',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Falsehood in canonical Scripture is inadmissible; faith rests on Scripture's authority."
    },
    {
        ID: 'FC314',
        Father: 'Jean Gerson',
        Died_AD: '1363-1429',
        Era: 'Medieval',
        Source_Work: 'De Examinatione Doctrinarum',
        Source_Ref: '2nd principal part, 1st consideration (as cited in George Tavard, Holy Writ or Holy Church, p. 52)',
        Quote_Text:
            'Scripture has been given to us as a sufficient and infallible rule for the organization of all the ecclesiastical body and of its members to the end of the world',
        Topic: 'Scripture & Canon',
        Subtopics: 'Inerrancy of Scripture|Sola Scriptura',
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture as sufficient and infallible rule for church organization until the end of the world.'
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

function main() {
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const existingIds = new Set(
        csv
            .split('\n')
            .slice(1)
            .map((line) => line.split(',')[0]?.trim())
            .filter(Boolean)
    );

    const toAdd = NEW_QUOTES.filter((row) => !existingIds.has(row.ID));
    if (toAdd.length === 0) {
        console.log('All inerrancy quotes already present in CSV.');
        return;
    }

    const suffix = csv.endsWith('\n') ? '' : '\n';
    const lines = toAdd.map(rowToCsv).join('\n');
    fs.appendFileSync(CSV_PATH, `${suffix}${lines}\n`, 'utf8');
    console.log(`Added ${toAdd.length} quotes (${toAdd.map((r) => r.ID).join(', ')})`);
}

main();
