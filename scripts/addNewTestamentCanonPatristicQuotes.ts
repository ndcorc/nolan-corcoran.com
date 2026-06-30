/**
 * Append NT canon quotes to CSV and upgrade overlapping entries (idempotent).
 */
import fs from 'fs';
import path from 'path';
import {
    formatSubtopics,
    parsePatristicQuotesCsv,
    parseSubtopics,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

const SUBTOPICS = 'Biblical Canon|New Testament Canon';

type RowUpdate = Partial<PatristicQuoteCsvRow> & { ID: string };

const UPDATES: RowUpdate[] = [
    {
        ID: 'FC292',
        Subtopics: formatSubtopics([
            'Inerrancy of Scripture',
            'Biblical Canon',
            'New Testament Canon'
        ]),
        Notes: "Paul's Corinthian epistle cited as Spirit-inspired apostolic writing when the Gospel was first preached."
    },
    {
        ID: 'FC293',
        Quote_Text:
            "Mark, having become the interpreter of Peter, wrote down accurately, though not indeed in order, whatsoever he remembered of the things done or said by Christ. For he neither heard the Lord nor followed him, but afterward, as I said, he followed Peter, who adapted his teaching to the needs of his hearers, but with no intention of giving a connected account of the Lord's discourses, so that Mark committed no error while he thus wrote some things as he remembered them. For he was careful of one thing, not to omit any of the things which he had heard, and not to state any of them falsely. These things are related by Papias concerning Mark. But concerning Matthew he writes as follows: 'So then Matthew wrote the oracles in the Hebrew language, and every one interpreted them as he was able.' And the same writer uses testimonies from the first Epistle of John and from that of Peter likewise. And he relates another story of a woman, who was accused of many sins before the Lord, which is contained in the Gospel according to the Hebrews. These things we have thought it necessary to observe in addition to what has already been stated",
        Subtopics: formatSubtopics([
            'Inerrancy of Scripture',
            'Biblical Canon',
            'New Testament Canon'
        ]),
        Notes:
            'Papias on Mark and Matthew; cites Johannine and Petrine epistles; mentions Gospel according to the Hebrews (preserved in Eusebius).'
    }
];

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC459',
        Father: 'Ignatius of Antioch',
        Died_AD: 'c.107',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Ephesians',
        Source_Ref: '12:2',
        Quote_Text:
            'Ye are initiated into the mysteries of the Gospel with Paul, the holy, the martyred, the deservedly most happy, at whose feet may I be found, when I shall attain to God; who in all his Epistles makes mention of you in Christ Jesus',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Ignatius assumes the Ephesians know and revere the Pauline epistles.'
    },
    {
        ID: 'FC460',
        Father: 'Ignatius of Antioch',
        Died_AD: 'c.107',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Romans',
        Source_Ref: '4:3',
        Quote_Text:
            'I do not, as Peter and Paul, issue commandments unto you. They were apostles; I am but a condemned man: they were free, while I am, even until now, a servant',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Peter and Paul named as apostolic authorities alongside their written commandments.'
    },
    {
        ID: 'FC461',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'First Apology',
        Source_Ref: 'Chapter 66',
        Quote_Text:
            'For the apostles, in the memoirs composed by them, which are called Gospels, have thus delivered unto us what was enjoined upon them',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Justin's term 'memoirs' (ἀπομνημονεύματα) for the apostolic Gospels."
    },
    {
        ID: 'FC462',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'First Apology',
        Source_Ref: 'Chapter 67',
        Quote_Text:
            'And on the day called Sunday, all who live in cities or in the country gather together to one place, and the memoirs of the apostles or the writings of the prophets are read, as long as time permits',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sunday worship included public reading of apostolic memoirs (Gospels) and prophets.'
    },
    {
        ID: 'FC463',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 81',
        Quote_Text:
            'Moreover also among us a man named John, one of the apostles of Christ, prophesied in a revelation made to him that those who have believed on our Christ will spend a thousand years in Jerusalem; and that hereafter the general and, in short, the eternal resurrection and judgment of all will likewise take place',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Justin attributes Revelation to the apostle John."
    },
    {
        ID: 'FC464',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 100',
        Quote_Text:
            "For [Christ] called one of His disciples — previously known by the name of Simon — Peter; since he recognized Him to be Christ the Son of God, by the revelation of His Father: and since we find it recorded in the memoirs of His apostles that He is the Son of God",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Appeal to apostolic memoirs (Gospels) as authoritative record."
    },
    {
        ID: 'FC465',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 101',
        Quote_Text:
            "They spake in mockery the words which are recorded in the memoirs of His apostles: 'He said he was the Son of God: let him come down; let God save him'",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Crucifixion narrative cited from apostolic memoirs.'
    },
    {
        ID: 'FC466',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 102',
        Quote_Text:
            'When He kept silence, and chose to return no answer to any one in the presence of Pilate; as has been declared in the memoirs of His apostles',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Passion narrative drawn from apostolic memoirs.'
    },
    {
        ID: 'FC467',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 103',
        Quote_Text:
            "At the time when the voice spake to Him, 'Thou art my Son: this day have I begotten Thee,' is recorded in the memoirs of the apostles",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Baptism/theophany account cited from apostolic memoirs.'
    },
    {
        ID: 'FC468',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 1, Section 1',
        Quote_Text:
            'Matthew also issued a written Gospel among the Hebrews in their own dialect, while Peter and Paul were preaching at Rome, and laying the foundations of the Church. After their departure, Mark, the disciple and interpreter of Peter, did also hand down to us in writing what had been preached by Peter. Luke also, the companion of Paul, recorded in a book the Gospel preached by him. Afterwards, John, the disciple of the Lord, who also had leaned upon His breast, did himself publish a Gospel during his residence at Ephesus in Asia',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Classic patristic account of the four Gospels and their apostolic origins.'
    },
    {
        ID: 'FC469',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 11, Section 8',
        Quote_Text:
            "It is not possible that the Gospels can be either more or fewer in number than they are. For, since there are four zones of the world in which we live, and four principal winds, while the Church is scattered throughout all the world, and the 'pillar and ground' of the Church is the Gospel and the spirit of life; it is fitting that she should have four pillars",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Theological argument for exactly four Gospels.'
    },
    {
        ID: 'FC470',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 11, Section 9',
        Quote_Text:
            'Though it agrees in nothing with the Gospels of the Apostles, so that they have really no Gospel which is not full of blasphemy. For if what they have published is the Gospel of truth, and yet is totally unlike those which have been handed down to us from the apostles, any who please may learn, as is shown from the Scriptures themselves, that that which has been handed down from the apostles can no longer be reckoned the Gospel of truth. But that these Gospels alone are true and reliable, and admit neither an increase nor diminution of the aforesaid number',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Only the four apostolic Gospels are true; the number may not be increased or diminished.'
    },
    {
        ID: 'FC471',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 21, Section 3',
        Quote_Text:
            'For the apostles, since they are of more ancient date than all these [heretics], agree with this aforesaid translation; and the translation harmonizes with the tradition of the apostles. For Peter, and John, and Matthew, and Paul, and the rest successively, as well as their followers, did set forth all prophetical [announcements], just as the interpretation of the elders contains them',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Peter, John, Matthew, and Paul named as apostolic scriptural authorities.'
    },
    {
        ID: 'FC472',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 5, Chapter 30, Section 1',
        Quote_Text:
            'Such, then, being the state of the case, and this number being found in all the most approved and ancient copies [of the Apocalypse], and those men who saw John face to face bearing their testimony [to it]; while reason also leads us to conclude that the number of the name of the beast, [if reckoned] according to the Greek mode of calculation by the [value of] the letters contained in it, will amount to six hundred and sixty and six',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Revelation accepted on testimony of those who knew John; ancient copies cited.'
    },
    {
        ID: 'FC473',
        Father: 'Theophilus of Antioch',
        Died_AD: 'c.181-188',
        Era: 'Greek Patristic',
        Source_Work: 'To Autolycus',
        Source_Ref: 'Book 3, Chapter 12',
        Quote_Text:
            'Moreover, concerning the righteousness which the law enjoined, confirmatory utterances are found both with the prophets and in the Gospels, because they all spoke inspired by one Spirit of God',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Prophets and Gospels united as Spirit-inspired Scripture.'
    },
    {
        ID: 'FC474',
        Father: 'Muratorian Fragment',
        Died_AD: 'c.170-200',
        Era: 'Latin Patristic',
        Source_Work: 'Muratorian Canon',
        Source_Ref: '',
        Quote_Text:
            "The third book of the Gospel is that according to Luke. Luke, the well-known physician, after the ascension of Christ, when Paul had taken with him as one zealous for the law, composed it in his own name, according to [the general] belief. Yet he himself had not seen the Lord in the flesh; and therefore, as he was able to ascertain events, so indeed he begins to tell the story from the birth of John. The fourth of the Gospels is that of John, [one] of the disciples. To his fellow disciples and bishops, who had been urging him [to write], he said, 'Fast with me from today to three days, and what will be revealed to each one let us tell it to one another.' In the same night it was revealed to Andrew, [one] of the apostles, that John should write down all things in his own name while all of them should review it. And so, though various elements may be taught in the individual books of the Gospels, nevertheless this makes no difference to the faith of believers, since by the one sovereign Spirit all things have been declared in all [the Gospels]: concerning the nativity, concerning the passion, concerning the resurrection, concerning life with his disciples, and concerning his twofold coming; the first in lowliness when he was despised, which has taken place, the second glorious in royal power, which is still in the future. What marvel is it then, if John so consistently mentions these particular points also in his Epistles, saying about himself, 'What we have seen with our eyes and heard with our ears and our hands have handled, these things we have written to you? For in this way he professes [himself] to be not only an eye-witness and hearer, but also a writer of all the marvelous deeds of the Lord, in their order. Moreover, the acts of all the apostles were written in one book. For 'most excellent Theophilus' Luke compiled the individual events that took place in his presence — as he plainly shows by omitting the martyrdom of Peter as well as the departure of Paul from the city [of Rome] when he journeyed to Spain. As for the Epistles of Paul, they themselves make clear to those desiring to understand, which ones [they are], from what place, or for what reason they were sent. First of all, to the Corinthians, prohibiting their heretical schisms; next, to the Galatians, against circumcision; then to the Romans he wrote at length, explaining the order (or, plan) of the Scriptures, and also that Christ is their principle (or, main theme). It is necessary for us to discuss these one by one, since the blessed apostle Paul himself, following the example of his predecessor John, writes by name to only seven churches in the following sequence: To the Corinthians first, to the Ephesians second, to the Philippians third, to the Colossians fourth, to the Galatians fifth, to the Thessalonians sixth, to the Romans seventh. It is true that he writes once more to the Corinthians and to the Thessalonians for the sake of admonition, yet it is clearly recognizable that there is one Church spread throughout the whole extent of the earth. For John also in the Apocalypse, though he writes to seven churches, nevertheless speaks to all. [Paul also wrote] out of affection and love one to Philemon, one to Titus, and two to Timothy; and these are held sacred in the esteem of the Church catholic for the regulation of ecclesiastical discipline. There is current also [an epistle] to the Laodiceans, [and] another to the Alexandrians, [both] forged in Paul's name to [further] the heresy of Marcion, and several others which cannot be received into the catholic Church — for it is not fitting that gall be mixed with honey. Moreover, the epistle of Jude and two of the above-mentioned (or, bearing the name of) John are counted (or, used) in the catholic [Church]; and [the book of] Wisdom, written by the friends of Solomon in his honour. We receive only the apocalypses of John and Peter, though some of us are not willing that the latter be read in church. But Hermas wrote the Shepherd very recently, in our times, in the city of Rome, while bishop Pius, his brother, was occupying the [episcopal] chair of the church of the city of Rome. And therefore it ought indeed to be read; but it cannot be read publicly to the people in church either among the Prophets, whose number is complete, or among the Apostles, for it is after [their] time. But we accept nothing whatever of Arsinous or Valentinus or Miltiades, who also composed a new book of psalms for Marcion, together with Basilides, the Asian founder of the Cataphrygians",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes:
            'Earliest extant Latin NT canon list; distinguishes received books from Marcionite forgeries and Shepherd of Hermas.'
    },
    {
        ID: 'FC475',
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'The Stromata',
        Source_Ref: 'Book 1, Chapter 1',
        Quote_Text:
            "Well, they preserving the tradition of the blessed doctrine derived directly from the holy apostles, Peter, James, John, and Paul, the sons receiving it from the father (but few were like the fathers), came by God's will to us also to deposit those ancestral and apostolic seeds",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostolic doctrine transmitted through Peter, James, John, and Paul.'
    },
    {
        ID: 'FC476',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Apology',
        Source_Ref: 'Chapter 31',
        Quote_Text:
            "Nay, even in terms, and most clearly, the Scripture says, 'Pray for kings, and rulers, and powers, that all may be peace with you' [1 Timothy 2:1-2]",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Pauline epistle cited as Scripture.'
    },
    {
        ID: 'FC477',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'The Prescription Against Heretics',
        Source_Ref: 'Chapter 36',
        Quote_Text:
            "Come now, you who would indulge a better curiosity, if you would apply it to the business of your salvation, run over the apostolic churches, in which the very thrones of the apostles are still pre-eminent in their places, in which their own authentic writings are read, uttering the voice and representing the face of each of them severally. Achaia is very near you, (in which) you find Corinth. Since you are not far from Macedonia, you have Philippi; (and there too) you have the Thessalonians. Since you are able to cross to Asia, you get Ephesus. Since, moreover, you are close upon Italy, you have Rome, from which there comes even into our own hands the very authority (of apostles themselves). How happy is its church, on which apostles poured forth all their doctrine along with their blood! where Peter endures a passion like his Lord's! where Paul wins his crown in a death like John's! where the Apostle John was first plunged, unhurt, into boiling oil, and thence remitted to his island-exile!",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostolic churches preserve and read the authentic apostolic writings.'
    },
    {
        ID: 'FC478',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Marcion',
        Source_Ref: 'Book 4, Chapter 2',
        Quote_Text:
            'We lay it down as our first position, that the evangelical Testament has apostles for its authors, to whom was assigned by the Lord Himself this office of publishing the gospel. Since, however, there are apostolic men also, they are yet not alone, but appear with apostles and after apostles; because the preaching of disciples might be open to the suspicion of an affectation of glory, if there did not accompany it the authority of the masters, which means that of Christ, for it was that which made the apostles their masters. Of the apostles, therefore, John and Matthew first instill faith into us; whilst of apostolic men, Luke and Mark renew it afterwards. These all start with the same principles of the faith, so far as relates to the one only God the Creator and His Christ, how that He was born of the Virgin, and came to fulfill the law and the prophets',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Four Gospels: John and Matthew as apostles; Luke and Mark as apostolic men.'
    },
    {
        ID: 'FC479',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Marcion',
        Source_Ref: 'Book 4, Chapter 5',
        Quote_Text:
            "What utterance also the Romans give, so very near (to the apostles), to whom Peter and Paul conjointly bequeathed the gospel even sealed with their own blood. We have also St. John's foster churches. For although Marcion rejects his Apocalypse, the orders of the bishops (thereof), when traced up to their origin, will yet rest on John as their Author",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Revelation attributed to John despite Marcion's rejection."
    },
    {
        ID: 'FC480',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Marcion',
        Source_Ref: 'Book 4, Chapter 5',
        Quote_Text:
            "The same authority of the apostolic churches will afford evidence to the other Gospels also, which we possess equally through their means, and according to their usage — I mean the Gospels of John and Matthew — while that which Mark published may be affirmed to be Peter's whose interpreter Mark was. For even Luke's form of the Gospel men usually ascribe to Paul",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Four Gospels received through apostolic churches with traditional authorship attributions.'
    },
    {
        ID: 'FC481',
        Father: 'Pseudo-Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against All Heresies',
        Source_Ref: 'Chapter 6',
        Quote_Text:
            "The Gospel of Luke alone, and that not entire, does he [the heretic Cerdo] receive. Of the Apostle Paul he takes neither all the epistles, nor in their integrity. The Acts of the Apostles and the Apocalypse he rejects as false",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Marcionite/Cerdo canon contrasted with the fuller catholic NT collection.'
    },
    {
        ID: 'FC482',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'On First Principles',
        Source_Ref: 'Book 1, Chapter 3, Section 1',
        Quote_Text:
            'We, however, in conformity with our belief in that doctrine, which we assuredly hold to be divinely inspired, believe that it is possible in no other way to explain and bring within the reach of human knowledge this higher and diviner reason as the Son of God, than by means of those Scriptures alone which were inspired by the Holy Spirit, i.e., the Gospels and Epistles, and the law and the prophets, according to the declaration of Christ Himself',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Gospels and Epistles named among Spirit-inspired Scriptures.'
    },
    {
        ID: 'FC483',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Homily 7 on Joshua',
        Source_Ref: 'as cited in Origen: Homilies on Joshua, trans. B. J. Bruce, ed. Cynthia White, The Fathers of the Church, Volume 105, 74–75',
        Quote_Text:
            "Matthew first sounded the priestly trumpet in his Gospel; Mark also; Luke and John each played their own priestly trumpets. Even Peter cries out with trumpets in two of his epistles; also James and Jude. In addition, John also sounds the trumpet through his epistles, and Luke, as he describes the Acts of the Apostles. And now that last one comes, the one who said, 'I think God displays us apostles last' [1 Cor 4:9], and in fourteen of his epistles, thundering with trumpets, he casts down the walls of Jericho and all the devices of idolatry and dogmas of philosophers, all the way to the foundations",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Catalog of four Gospels, catholic epistles, Acts, and fourteen Pauline epistles.'
    },
    {
        ID: 'FC484',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Homily 13 on Genesis',
        Source_Ref: 'as cited in Origen: Homilies on Genesis and Exodus, trans. Ronald E. Heine, ed. Hermigild Dressler, The Fathers of the Church, Volume 71, 188',
        Quote_Text:
            "Isaac, therefore, digs also new wells, nay rather Isaac's servants dig them. Isaac's servants are Matthew, Mark, Luke, John; his servants are Peter, James, Jude; the apostle Paul is his servant. These all dig the wells of the New Testament",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Four evangelists and apostolic authors as diggers of NT wells.'
    },
    {
        ID: 'FC485',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Commentary on the Gospel of John',
        Source_Ref: 'Book 5, Section 3',
        Quote_Text:
            "What are we to say of him who leaned on Jesus' breast, namely, John, who left one Gospel, though confessing that he could make so many that the world would not contain them? But he wrote also the Apocalypse, being commanded to be silent and not to write the voices of the seven thunders. But he also left an epistle of very few lines. Suppose also a second and a third, since not all pronounce these to be genuine; but the two together do not amount to a hundred lines",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "John's Gospel, Apocalypse, and epistles; second and third Johannine epistles disputed."
    },
    {
        ID: 'FC486',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Commentary on Matthew',
        Source_Ref: 'Book 16, Section 6',
        Quote_Text:
            "In accordance with these things, as it seems to me, the sons of Zebedee have drunk the cup and were baptized with the baptism, since Herod killed 'James the brother of John with a sword' (Acts 12.2), and the Emperor of Rome (as the tradition teaches) condemned John who testified on account of the word of truth to the island of Patmos (Rev 1.9). John teaches these things concerning his own martyrdom, not telling who it was that condemned him",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Acts and Revelation cited as scriptural witnesses to apostolic martyrdom.'
    },
    {
        ID: 'FC487',
        Father: 'Victorinus of Pettau',
        Died_AD: 'c.280-304',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on the Apocalypse',
        Source_Ref: 'Chapter 10, Verse 11',
        Quote_Text:
            'When John said these things, he was in the island of Patmos, condemned to the mines by Caesar Domitian. There he saw the Apocalypse; and when at length grown old, he thought that he should receive his release by suffering; but Domitian being killed, he was liberated',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Traditional account of Revelation written by John on Patmos under Domitian.'
    },
    {
        ID: 'FC488',
        Father: 'Anti-Marcionite Prologues',
        Died_AD: 'c.160-200',
        Era: 'Latin Patristic',
        Source_Work: 'Prologues to the Gospels',
        Source_Ref: '',
        Quote_Text:
            "Mark: Mark recorded, who was called Colobodactylus, because he had fingers that were too small for the height of the rest of his body. He himself was the interpreter of Peter. After the death of Peter himself, the same man wrote this gospel in the parts of Italy. Luke: Indeed Luke was an Antiochene Syrian, a doctor by profession, a disciple of the apostles: later however he followed Paul until his martyrdom, serving the Lord blamelessly. He never had a wife, he never fathered children, and died at the age of eighty-four, full of the Holy Spirit, in Boetia. Therefore — although gospels had already been written — indeed by Matthew in Judaea but by Mark in Italy — moved by the Holy Spirit he wrote down this gospel in the parts of Achaia, signifying in the preface that the others were written before his, but also that it was of the greatest importance for him to expound with the greatest diligence the whole series of events in his narration for the Greek believers, so that they would not be led astray by the lure of Jewish fables, or, seduced by the fables of the heretics and stupid solicitations, fall away from the truth. And so at once at the start he took up the extremely necessary [story] from the birth of John, who is the beginning of the gospel, the forerunner of our Lord Jesus Christ, and was a companion in the perfecting of the people, likewise in the introducing of baptism and a companion in martyrdom. Of this disposition the prophet Malachi, one of the twelve, certainly makes mention. And indeed afterwards the same Luke wrote the Acts of the Apostles. Later the apostle John wrote the Apocalypse on the island of Patmos, and then the Gospel in Asia. John: The Gospel of John was revealed and given to the churches by John while still in the body, just as Papias of Hieropolis, the close disciple of John, related in the exoterics, that is, in the last five books. Indeed he wrote down the gospel, while John was dictating carefully. But the heretic Marcion, after being condemned by him because he was teaching the opposite to him [John], was expelled by John. But he [Marcion] had brought writings or letters to him [John] from the brothers which were in Pontus",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Prologues on Mark, Luke, John, Acts, and Apocalypse; Marcion expelled by John.'
    },
    {
        ID: 'FC489',
        Father: 'Eusebius of Caesarea',
        Died_AD: 'c.260-340',
        Era: 'Greek Patristic',
        Source_Work: 'Church History',
        Source_Ref: 'Book 2, Chapter 15',
        Quote_Text:
            "And so greatly did the splendor of piety illumine the minds of Peter's hearers that they were not satisfied with hearing once only, and were not content with the unwritten teaching of the divine Gospel, but with all sorts of entreaties they besought Mark, a follower of Peter, and the one whose Gospel is extant, that he would leave them a written monument of the doctrine which had been orally communicated to them. Nor did they cease until they had prevailed with the man, and had thus become the occasion of the written Gospel which bears the name of Mark",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Eusebius's account of the origin of Mark's Gospel from Peter's preaching at Rome."
    },
    {
        ID: 'FC490',
        Father: 'Eusebius of Caesarea',
        Died_AD: 'c.260-340',
        Era: 'Greek Patristic',
        Source_Work: 'Church History',
        Source_Ref: 'Book 3, Chapter 24',
        Quote_Text:
            "Nevertheless, of all the disciples of the Lord, only Matthew and John have left us written memorials, and they, tradition says, were led to write only under the pressure of necessity. For Matthew, who had at first preached to the Hebrews, when he was about to go to other peoples, committed his Gospel to writing in his native tongue, and thus compensated those whom he was obliged to leave for the loss of his presence. And when Mark and Luke had already published their Gospels, they say that John, who had employed all his time in proclaiming the Gospel orally, finally proceeded to write for the following reason. The three Gospels already mentioned having come into the hands of all and into his own too, they say that he accepted them and bore witness to their truthfulness; but that there was lacking in them an account of the deeds done by Christ at the beginning of his ministry. And this indeed is true. For it is evident that the three evangelists recorded only the deeds done by the Savior for one year after the imprisonment of John the Baptist, and indicated this in the beginning of their account. For Matthew, after the forty days' fast and the temptation which followed it, indicates the chronology of his work when he says: 'Now when he heard that John was delivered up he withdrew from Judea into Galilee.' Mark likewise says: 'Now after that John was delivered up Jesus came into Galilee.' And Luke, before commencing his account of the deeds of Jesus, similarly marks the time, when he says that Herod, 'adding to all the evil deeds which he had done, shut up John in prison.' They say, therefore, that the apostle John, being asked to do it for this reason, gave in his Gospel an account of the period which had been omitted by the earlier evangelists, and of the deeds done by the Savior during that period; that is, of those which were done before the imprisonment of the Baptist. And this is indicated by him, they say, in the following words: 'This beginning of miracles did Jesus'; and again when he refers to the Baptist, in the midst of the deeds of Jesus, as still baptizing in Aenon near Salim; where he states the matter clearly in the words: 'For John was not yet cast into prison.' John accordingly, in his Gospel, records the deeds of Christ which were performed before the Baptist was cast into prison, but the other three evangelists mention the events which happened after that time. One who understands this can no longer think that the Gospels are at variance with one another, inasmuch as the Gospel according to John contains the first acts of Christ, while the others give an account of the latter part of his life. And the genealogy of our Savior according to the flesh John quite naturally omitted, because it had been already given by Matthew and Luke, and began with the doctrine of his divinity, which had, as it were, been reserved for him, as their superior, by the divine Spirit. These things may suffice, which we have said concerning the Gospel of John. The cause which led to the composition of the Gospel of Mark has been already stated by us. But as for Luke, in the beginning of his Gospel, he states that since many others had more rashly undertaken to compose a narrative of the events of which he had acquired perfect knowledge, he himself, feeling the necessity of freeing us from their uncertain opinions, delivered in his own Gospel an accurate account of those events in regard to which he had learned the full truth, being aided by his intimacy and his stay with Paul and by his acquaintance with the rest of the apostles. So much for our own account of these things. But in a more fitting place we shall attempt to show by quotations from the ancients, what others have said concerning them. But of the writings of John, not only his Gospel, but also the former of his epistles, has been accepted without dispute both now and in ancient times. But the other two are disputed. In regard to the Apocalypse, the opinions of most men are still divided. But at the proper time this question likewise shall be decided from the testimony of the ancients",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes:
            'Eusebius on four Gospels, Johannine epistles (1 John undisputed; 2–3 disputed), and divided opinion on Revelation.'
    },
    {
        ID: 'FC491',
        Father: 'Eusebius of Caesarea',
        Died_AD: 'c.260-340',
        Era: 'Greek Patristic',
        Source_Work: 'Church History',
        Source_Ref: 'Book 6, Chapter 14',
        Quote_Text:
            "To sum up briefly, he has given in the Hypotyposes abridged accounts of all canonical Scripture, not omitting the disputed books, — I refer to Jude and the other Catholic epistles, and Barnabas and the so-called Apocalypse of Peter. He says that the Epistle to the Hebrews is the work of Paul, and that it was written to the Hebrews in the Hebrew language; but that Luke translated it carefully and published it for the Greeks, and hence the same style of expression is found in this epistle and in the Acts. But he says that the words, Paul the Apostle, were probably not prefixed, because, in sending it to the Hebrews, who were prejudiced and suspicious of him, he wisely did not wish to repel them at the very beginning by giving his name. Farther on he says: 'But now, as the blessed presbyter said, since the Lord being the apostle of the Almighty, was sent to the Hebrews, Paul, as sent to the Gentiles, on account of his modesty did not subscribe himself an apostle of the Hebrews, through respect for the Lord, and because being a herald and apostle of the Gentiles he wrote to the Hebrews out of his superabundance.' Again, in the same books, Clement gives the tradition of the earliest presbyters, as to the order of the Gospels, in the following manner: The Gospels containing the genealogies, he says, were written first. The Gospel according to Marks had this occasion. As Peter had preached the Word publicly at Rome, and declared the Gospel by the Spirit, many who were present requested that Mark, who had followed him for a long time and remembered his sayings, should write them out. And having composed the Gospel he gave it to those who had requested it. When Peter learned of this, he neither directly for- bade nor encouraged it. But, last of all, John, perceiving that the external facts had been made plain in the Gospel, being urged by his friends, and inspired by the Spirit, composed a spiritual Gospel. This is the account of Clement [of Alexandria]",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes:
            "Clement of Alexandria's tradition on Gospel order and Hebrews authorship, as cited by Eusebius."
    },
    {
        ID: 'FC492',
        Father: 'Council of Laodicea',
        Died_AD: 'c.363',
        Era: 'Greek Patristic',
        Source_Work: 'Synodical Canons',
        Source_Ref: 'Canon 60',
        Quote_Text:
            'And these are the books of the New Testament: four Gospels, according to Matthew, Mark, Luke, and John; the Acts of the Apostles, seven Catholic epistles, namely, one of James, two of Peter, three of John, one of Jude, fourteen epistles of Paul, one to the Romans, two to the Corinthians, one to the Galatians, one to the Ephesians, one to the Philippians, one to the Colossians, two to the Thessalonians, one to the Hebrews, two to Timothy, one to Titus, and one to Philemon',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Laodicea Canon 60 NT list (paired with FC433 OT list from same canon).'
    },
    {
        ID: 'FC493',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: '39th Festal Letter',
        Source_Ref: 'Chapters 5-6',
        Quote_Text:
            'Again it is not tedious to speak of the [books] of the New Testament. These are, the four Gospels, according to Matthew, Mark, Luke, and John. Afterwards, the Acts of the Apostles and Epistles (called Catholic), seven, viz. of James, one; of Peter, two; of John, three; after these, one of Jude. In addition, there are fourteen Epistles of Paul, written in this order. The first, to the Romans; then two to the Corinthians; after these, to the Galatians; next, to the Ephesians; then to the Philippians; then to the Colossians; after these, two to the Thessalonians, and that to the Hebrews; and again, two to Timothy; one to Titus; and lastly, that to Philemon. And besides, the Revelation of John. These are fountains of salvation, that they who thirst may be satisfied with the living words they contain. In these alone is proclaimed the doctrine of godliness. Let no man add to these, neither let him take ought from these',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Athanasius festal letter NT canon; nothing may be added or taken away.'
    },
    {
        ID: 'FC494',
        Father: 'Cyril of Jerusalem',
        Died_AD: 'c.313-386',
        Era: 'Greek Patristic',
        Source_Work: 'Catechetical Lectures',
        Source_Ref: 'Book 4, Section 36',
        Quote_Text:
            "Then of the New Testament there are four Gospels only, for the rest have false titles and are harmful. The Manicheans also wrote a Gospel according to Thomas, which being smeared with the fragrance of the name 'Gospel' destroys the souls of those who are rather simple-minded. Receive also the Acts of the Twelve Apostles; and in addition to these the seven Catholic Epistles of James, Peter, John, and Jude; and as a seal upon them all, and the latest work of disciples, the fourteen Epistles of Paul",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Cyril lists four Gospels and rejects spurious gospels such as Thomas.'
    },
    {
        ID: 'FC495',
        Father: 'Gregory of Nazianzus',
        Died_AD: 'c.329-390',
        Era: 'Greek Patristic',
        Source_Work: 'Carmina Dogmatica',
        Source_Ref: 'Book I, Section I, Carmen XII (PG 37:471-474)',
        Quote_Text:
            "But now count also [the books] of the New Mystery; Matthew indeed wrote for the Hebrews the wonderful works of Christ, And Mark for Italy, Luke for Greece, John, the great preacher, for all, walking in heaven. Then the Acts of the wise apostles, And fourteen Epistles of Paul, And seven Catholic [Epistles], of which James is one, Two of Peter, three of John again. And Jude's is the seventh, You have all. If there is any besides these, it is not among the genuine [books]",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Gregory NT canon in verse (paired with FC436 OT list from same carmen).'
    },
    {
        ID: 'FC496',
        Father: 'Amphilochius of Iconium',
        Died_AD: 'c.340-403',
        Era: 'Greek Patristic',
        Source_Work: 'Iambics for Seleucus',
        Source_Ref: '',
        Quote_Text:
            "It is time for me to speak of the books of the New Testament. Receive only four evangelists: Matthew, then Mark, to whom, having added Luke. As third, count John as fourth in time, but first in height of teachings, for I call this one rightly a son of thunder, sounding out most greatly with the word of God. And receive also the second book of Luke, that of the catholic Acts of the Apostles. Add next the chosen vessel, the herald of the Gentiles, the apostle Paul, having written wisely to the churches twice seven Epistles: to the Romans one, to which one must add two to the Corinthians, that to the Galatians, and that to the Ephesians, after which that in Philippi, then the one written to the Colassians, two to the Thessalonians, two to Timothy, and to Titus and the Philemon, one each, and one to the Hebrews. But some say the one to the Hebrews is spurious, not saying well, for the grace is genuine. well, what remains? Of the Catholic Epistles some say we must receive seven, but others say only three should be received — that of James, one, and one of Peter, and those of John, one. And some receive three [of John], and besides these, two of Peter, and that of Jude a seventh. And again the Revelation of John, some approve, but the most say it is spurious, this is perhaps the most reliable (lit. most unfalsified) canon of the divinely inspired Scriptures",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Amphilochius NT list with notes on disputed Hebrews, catholic epistles, and Revelation.'
    },
    {
        ID: 'FC497',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'The Panarion of Epiphanius of Salamis',
        Source_Ref: 'Books 2 and 3, Chapter 76 (Against Anomoeans), Section 22.5, p. 536',
        Quote_Text:
            'Also in the four holy Gospels, and in fourteen epistles of the holy apostle Paul, and in the writings which come before these, including the Acts of the Apostles in their times and the catholic epistles of James, Peter, John and Jude, and in the Revelation of John, and in the Wisdom books, I mean those of Solomon and of the son of Sirach — in short, all the divine writings',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Epiphanius catalogs four Gospels, Pauline and catholic epistles, Acts, and Revelation.'
    },
    {
        ID: 'FC498',
        Father: 'Council of Carthage',
        Died_AD: 'c.397',
        Era: 'Latin Patristic',
        Source_Work: 'Synodical Canons',
        Source_Ref: 'Canon 24',
        Quote_Text:
            'Besides the canonical Scriptures, nothing shall be read in church under the name of divine Scriptures. Moreover, the canonical Scriptures are these: [then follows a list of Old Testament books]. The [books of the] New Testament: the Gospels, four books; the Acts of the Apostles, one book; the Epistles of Paul, thirteen; of the same to the Hebrews; one Epistle; of Peter, two; of John, apostle, three; of James, one; of Jude, one; the Revelation of John. Concerning the confirmation of this canon, the transmarine Church shall be consulted. On the anniversaries of martyrs, their acts shall also be read',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Carthage NT canon; only canonical Scripture read in church.'
    },
    {
        ID: 'FC499',
        Father: 'Apostolic Canons',
        Died_AD: 'c.380',
        Era: 'Greek Patristic',
        Source_Work: 'Apostolic Canons',
        Source_Ref: 'Canon 85',
        Quote_Text:
            'And our sacred books, that is, of the New Testament, are the four Gospels, of Matthew, Mark, Luke, John; the fourteen Epistles of Paul; two Epistles of Peter; three of John; one of James; one of Jude; two Epistles of Clement; and the Constitutions dedicated to you, the bishops, by me, Clement, in eight books, which is not appropriate to make public before all, because of the mysteries contained in them; and the Acts of us, the Apostles',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostolic Canons list includes disputed Clementine epistles and Constitutions alongside core NT books.'
    },
    {
        ID: 'FC500',
        Father: 'Rufinus',
        Died_AD: 'c.345-410',
        Era: 'Latin Patristic',
        Source_Work: "Commentary on the Apostles' Creed",
        Source_Ref: 'Section 37',
        Quote_Text:
            'Of the New Testament there are four Gospels, Matthew, Mark, Luke, and John; the Acts of the Apostles, which was written by Luke; fourteen epistles of the apostle Paul, two of the apostle Peter, one of James, the brother of the Lord and an apostle, one of Jude, three of John, and the Revelation of John. These are the books which the fathers have included in the canon; on which they would have us establish the declarations of our faith',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Rufinus NT canon (paired with FC440 on non-canonical ecclesiastical books)."
    },
    {
        ID: 'FC501',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Letter to Paulinus',
        Source_Ref: '',
        Quote_Text:
            "The New Testament I will briefly deal with. Matthew, Mark, Luke and John are the Lord's team of four, the true cherubim or store of knowledge. With them the whole body is full of eyes, they glitter as sparks, they run and return like lightning, their feet are straight feet, and lifted up, their backs also are winged, ready to fly in all directions. They hold together each by each and are interwoven one with another: like wheels within wheels they roll along and go whithersoever the breath of the Holy Spirit wafts them. [Ezekiel 1:7-21] The apostle Paul writes to seven churches (for the eighth epistle—that to the Hebrews—is not generally counted in with the others). He instructs Timothy and Titus; he intercedes with Philemon for his runaway slave. Of him I think it better to say nothing than to write inadequately. The Acts of the Apostles seem to relate a mere unvarnished narrative descriptive of the infancy of the newly born church; but when once we realize that their author is Luke the physician 'whose praise is in the gospel,' we shall see that all his words are medicine for the sick soul. The apostles James, Peter, John, and Jude, have published seven epistles at once spiritual and to the point, short and long, short that is in words but lengthy in substance so that there are few indeed who do not find themselves in the dark when they read them. The apocalypse of John has as many mysteries as words. In saying this I have said less than the book deserves. All praise of it is inadequate; manifold meanings lie hid in its every word. I beg of you, my dear brother, to live among these books, to meditate upon them, to know nothing else, to seek nothing else",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Jerome on four Gospels, Pauline epistles, Acts, catholic epistles, and Revelation.'
    },
    {
        ID: 'FC502',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'On Christian Doctrine',
        Source_Ref: 'Book 2, Chapter 8',
        Quote_Text:
            "That of the New Testament, again, is contained within the following:—Four books of the Gospel, according to Matthew, according to Mark, according to Luke, according to John; fourteen epistles of the Apostle Paul—one to the Romans, two to the Corinthians, one to the Galatians, to the Ephesians, to the Philippians, two to the Thessalonians, one to the Colossians, two to Timothy, one to Titus, to Philemon, to the Hebrews: two of Peter; three of John; one of Jude; and one of James; one book of the Acts of the Apostles; and one of the Revelation of John",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Augustine's complete NT canon list."
    },
    {
        ID: 'FC503',
        Father: 'John of Damascus',
        Died_AD: 'c.676-749',
        Era: 'Greek Patristic',
        Source_Work: 'Exposition of the Orthodox Faith',
        Source_Ref: 'Book 4, Chapter 17',
        Quote_Text:
            'The New Testament contains four gospels, that according to Matthew, that according to Mark, that according to Luke, that according to John: the Acts of the Holy Apostles by Luke the Evangelist: seven catholic epistles, viz. one of James, two of Peter, three of John, one of Jude: fourteen letters of the Apostle Paul: the Revelation of John the Evangelist: the Canons of the holy apostles, by Clement',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'John of Damascus NT canon (paired with FC447 OT list from same chapter).'
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

function normalizeText(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function mergeSubtopics(existing: string, incoming: string): string {
    return formatSubtopics([...parseSubtopics(existing), ...parseSubtopics(incoming)]);
}

function applyUpdates(rows: PatristicQuoteCsvRow[]): number {
    let count = 0;
    for (const update of UPDATES) {
        const index = rows.findIndex((row) => row.ID === update.ID);
        if (index === -1) continue;

        const current = rows[index];
        const next = { ...current, ...update };

        if (update.Subtopics && current.Subtopics) {
            next.Subtopics = mergeSubtopics(current.Subtopics, update.Subtopics);
        }

        if (
            next.Quote_Text !== current.Quote_Text ||
            next.Subtopics !== current.Subtopics ||
            (update.Notes && next.Notes !== current.Notes)
        ) {
            rows[index] = next;
            count++;
        }
    }
    return count;
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
    const lines = [headers.join(','), ...rows.map(rowToCsv)];
    fs.writeFileSync(CSV_PATH, `${lines.join('\n')}\n`, 'utf8');
}

function main() {
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const rows = parsePatristicQuotesCsv(csv);
    const updatedCount = applyUpdates(rows);

    const existingIds = new Set(rows.map((row) => row.ID.trim()));
    const existingSnippets = new Set(
        rows.map((row) => normalizeText(row.Quote_Text).slice(0, 80))
    );

    const toAdd = NEW_QUOTES.filter((row) => {
        if (existingIds.has(row.ID)) return false;
        const snippet = normalizeText(row.Quote_Text).slice(0, 80);
        if (existingSnippets.has(snippet)) return false;
        return true;
    });

    const allRows = [...rows, ...toAdd];
    writeCsv(allRows);

    const skipped = NEW_QUOTES.length - toAdd.length;
    if (updatedCount > 0) {
        console.log(`Updated ${updatedCount} existing quote(s): ${UPDATES.map((u) => u.ID).join(', ')}`);
    }
    if (skipped > 0) {
        console.log(`Skipping ${skipped} duplicate new quote(s).`);
    }
    if (toAdd.length > 0) {
        console.log(`Added ${toAdd.length} quotes (${toAdd.map((r) => r.ID).join(', ')})`);
    }
    if (updatedCount === 0 && toAdd.length === 0) {
        console.log('All NT canon quotes already present in CSV.');
    }
}

main();
