/**
 * Append Perspicuity of Scripture quotes to CSV (idempotent by legacy ID and text snippet).
 */
import fs from 'fs';
import path from 'path';
import {
    parsePatristicQuotesCsv,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

const PERSPICUITY = 'Perspicuity of Scripture';
const PERSPICUITY_SOLA = `${PERSPICUITY}|Sola Scriptura`;

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC376',
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians',
        Source_Ref: '53:1 (Michael Holmes translation)',
        Quote_Text:
            'For you know, and know well, the sacred Scriptures, dear friends, and you have searched into the oracles of God. We write these things, therefore, merely as a reminder',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Congregation already knows and has searched the sacred Scriptures.'
    },
    {
        ID: 'FC377',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Chapter 55',
        Quote_Text:
            'Pay attention, therefore, to what I shall record out of the holy Scriptures, which do not need to be expounded, but only listened to',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scripture needs no exposition — only to be heard.'
    },
    {
        ID: 'FC378',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 2, Chapter 27, Section 1',
        Quote_Text:
            'A sound mind, and one which does not expose its possessor to danger, and is devoted to piety and the love of truth, will eagerly meditate upon those things which God has placed within the power of mankind, and has subjected to our knowledge, and will make advancement in [acquaintance with] them, rendering the knowledge of them easy to him by means of daily study. These things are such as fall [plainly] under our observation, and are clearly and unambiguously in express terms set forth in the Sacred Scriptures',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sacred truths are plainly and unambiguously set forth in Scripture.'
    },
    {
        ID: 'FC379',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 2, Chapter 27, Section 2',
        Quote_Text:
            'Since, therefore, the entire Scriptures, the prophets, and the Gospels, can be clearly, unambiguously, and harmoniously understood by all, although all do not believe them; and since they proclaim that one only God, to the exclusion of all others, formed all things by His word',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'All Scripture can be clearly and harmoniously understood.'
    },
    {
        ID: 'FC380',
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'The Stromata',
        Source_Ref: 'Book 6, Chapter 15',
        Quote_Text:
            'And this signified that the Scripture is clear to all, when taken according to the bare reading; and that this is the faith which occupies the place of the rudiments',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture is clear to all when read according to the bare reading.'
    },
    {
        ID: 'FC381',
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'The Stromata',
        Source_Ref: 'Book 7, Chapter 16',
        Quote_Text:
            'But, selecting ambiguous expressions, they wrest them to their own opinions, gathering a few expressions here and there; not looking to the sense, but making use of the mere words. For in almost all the quotations they make, you will find that they attend to the names alone, while they alter the meanings; neither knowing, as they affirm, nor using the quotations they adduce, according to their true nature',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Heretics wrest isolated expressions rather than reading Scripture according to its sense.'
    },
    {
        ID: 'FC382',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Apology',
        Source_Ref: 'Chapter 18',
        Quote_Text:
            'But, that we might attain an ampler and more authoritative knowledge at once of Himself, and of His counsels and will, God has added a written revelation for the benefit of every one whose heart is set on seeking Him, that seeking he may find, and finding believe, and believing obey',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Written revelation given for all who seek God.'
    },
    {
        ID: 'FC383',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Praxeas',
        Source_Ref: 'Chapter 11',
        Quote_Text:
            'It will be your duty, however, to adduce your proofs out of the Scriptures as plainly as we do',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Doctrinal proofs must be adduced plainly from Scripture.'
    },
    {
        ID: 'FC384',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'On the Resurrection of the Flesh',
        Source_Ref: 'Chapter 3',
        Quote_Text:
            "Take away, indeed, from the heretics the wisdom which they share with the heathen, and let them support their inquiries from the Scriptures alone: they will then be unable to keep their ground. For that which commends men's common sense is its very simplicity, and its participation in the same feelings, and its community of opinions; and it is deemed to be all the more trustworthy, inasmuch as its definitive statements are naked and open, and known to all",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY_SOLA,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Heretics must support inquiries from Scripture alone; its statements are open and known to all.'
    },
    {
        ID: 'FC385',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'On the Resurrection of the Flesh',
        Source_Ref: 'Chapter 21',
        Quote_Text:
            'What must be the meaning of so many important passages of Holy Scripture, which so obviously attest the resurrection of the body, as to admit not even the appearance of a figurative signification? And, indeed, (since some passages are more obscure than others), it cannot but be right — as we have shown above — that uncertain statements should be determined by certain ones, and obscure ones by such as are clear and plain; else there is fear that, in the conflict of certainties and uncertainties, of explicitness and obscurity, faith may be shattered, truth endangered, and the Divine Being Himself be branded as inconstant',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Obscure passages must be determined by clear and plain ones.'
    },
    {
        ID: 'FC386',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'On the Resurrection of the Flesh',
        Source_Ref: 'Chapter 33',
        Quote_Text:
            'Now, if even parables obscure not the light of the gospel, how unlikely it is that plain sentences and declarations, which have an unmistakable meaning, should signify any other thing than their literal sense! But it is by such declarations and sentences that the Lord sets forth either the last judgment, or the kingdom, or the resurrection',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Plain sentences with unmistakable meaning should be taken in their literal sense.'
    },
    {
        ID: 'FC387',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'On First Principles',
        Source_Ref: 'Preface',
        Quote_Text:
            'Now it ought to be known that the holy apostles, in preaching the faith of Christ, delivered themselves with the utmost clearness on certain points which they believed to be necessary to every one, even to those who seemed somewhat dull in the investigation of divine knowledge',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostles preached necessary points with utmost clearness for all, including the dull.'
    },
    {
        ID: 'FC388',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Against Celsus',
        Source_Ref: 'Book 1, Chapter 2',
        Quote_Text:
            "We have to say, moreover, that the Gospel has a demonstration of its own, more divine than any established by Grecian dialectics. And this diviner method is called by the apostle the 'manifestation of the Spirit and of power;' of 'the Spirit,' on account of the prophecies, which are sufficient to produce faith in any one who reads them",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Prophecies in Scripture are sufficient to produce faith in any reader.'
    },
    {
        ID: 'FC389',
        Father: 'Hippolytus',
        Died_AD: 'c.235',
        Era: 'Greek Patristic',
        Source_Work: 'On Proverbs',
        Source_Ref: '',
        Quote_Text:
            "He who knows the wisdom of God, receives from Him also instruction, and learns by it the mysteries of the Word; and they who know the true heavenly wisdom will easily understand the words of these mysteries. Wherefore he says: 'To understand the difficulties of words;' for things spoken in strange language by the Holy Spirit become intelligible to those who have their hearts right with God",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Spirit-inspired words become intelligible to those whose hearts are right with God.'
    },
    {
        ID: 'FC390',
        Father: 'Cyprian',
        Died_AD: 'c.200-258',
        Era: 'Latin Patristic',
        Source_Work: 'Treatise 12: Three Books of Testimonies Against the Jews',
        Source_Ref: 'Preface',
        Quote_Text:
            'More strength will be given you, and the intelligence of the heart will be effected more and more, as you examine more fully the Scriptures, old and new, and read through the complete volumes of the spiritual books',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Examining Old and New Testament Scriptures increases understanding.'
    },
    {
        ID: 'FC391',
        Father: 'Theonas of Alexandria',
        Died_AD: 'c.300',
        Era: 'Greek Patristic',
        Source_Work: 'Epistle to Lucianus',
        Source_Ref: 'Chapter 9',
        Quote_Text:
            'Let no day pass by without reading some portion of the Sacred Scriptures, at such convenient hour as offers, and giving some space to meditation. And never cast off the habit of reading in the Holy Scriptures; for nothing feeds the soul and enriches the mind so well as those sacred studies do',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Daily reading and meditation in Sacred Scripture feeds the soul.'
    },
    {
        ID: 'FC392',
        Father: 'Lactantius',
        Died_AD: 'c.250-325',
        Era: 'Latin Patristic',
        Source_Work: 'The Divine Institutes',
        Source_Ref: 'Book 5, Chapter 1',
        Quote_Text:
            'For this is especially the cause why, with the wise and the learned, and the princes of this world, the sacred Scriptures are without credit, because the prophets spoke in common and simple language, as though they spoke to the people',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Prophets spoke in common and simple language accessible to the people.'
    },
    {
        ID: 'FC393',
        Father: 'Lactantius',
        Died_AD: 'c.250-325',
        Era: 'Latin Patristic',
        Source_Work: 'The Divine Institutes',
        Source_Ref: 'Book 6, Chapter 21',
        Quote_Text:
            'Is God, therefore, the contriver both of the mind, and of the voice, and of the tongue, unable to speak eloquently? Yea, rather, with the greatest foresight, He wished those things which are divine to be without adornment, that all might understand the things which He Himself spoke to all',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'God spoke divine things without adornment so all might understand.'
    },
    {
        ID: 'FC394',
        Father: 'Alexander of Alexandria',
        Died_AD: 'c.250-328',
        Era: 'Greek Patristic',
        Source_Work: 'Epistle 1: to Alexander of Constantinople',
        Source_Ref: 'Chapter 10',
        Quote_Text:
            'The religious perspicuity of the ancient Scriptures caused them no shame, nor did the consentient doctrine of our colleagues concerning Christ keep in check their audacity against Him',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Explicit patristic use of "perspicuity" for ancient Scripture.'
    },
    {
        ID: 'FC395',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: 'On the Incarnation',
        Source_Ref: 'Chapter 56',
        Quote_Text:
            'But you, taking occasion by this, if you light upon the text of the Scriptures, by genuinely applying your mind to them, will learn from them more completely and clearly the exact detail of what we have said. For they were spoken and written by God, through men who spoke of God',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Applying the mind to Scripture yields clear knowledge of doctrine.'
    },
    {
        ID: 'FC396',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heathen',
        Source_Ref: 'Part 1, Section 1',
        Quote_Text:
            'The knowledge of our religion and of the truth of things is independently manifest rather than in need of human teachers, for almost day by day it asserts itself by facts, and manifests itself brighter than the sun by the doctrine of Christ. . . . The sacred and inspired Scriptures are sufficient to declare the truth',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY_SOLA,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sacred and inspired Scriptures are sufficient to declare the truth.'
    },
    {
        ID: 'FC397',
        Father: 'Hilary of Poitiers',
        Died_AD: 'c.315-368',
        Era: 'Latin Patristic',
        Source_Work: 'On the Trinity',
        Source_Ref: 'Book 9, Chapter 40',
        Quote_Text:
            'The Lord enunciated the faith of the Gospel in the simplest words that could be found, and fitted His discourses to our understanding, so far as the weakness of our nature allowed Him, without saying anything unworthy of the majesty of His own nature',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Gospel faith enunciated in the simplest words fitted to human understanding.'
    },
    {
        ID: 'FC398',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'Panarion',
        Source_Ref: 'Books 2 and 3, Chapter 49 Against Quintillianists or Pepuzians, Section 15.14 (Brill Edition, p. 42)',
        Quote_Text:
            'And thus it is fully demonstrated that there is no obscurity or contradiction in the holy Gospels or between the evangelists, but that everything is plain',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Gospels contain no obscurity or contradiction; everything is plain.'
    },
    {
        ID: 'FC399',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'Panarion',
        Source_Ref: 'Books 2 and 3, Chapter 76 Against Anomoeans, Section 7.7 (Brill Edition, p. 518)',
        Quote_Text:
            "Everything in the sacred scripture is clear, to those who will approach God's word with pious reason, and not harbor the devil's work within them and turn their steps to the pits of death—as this unfortunate man and his converts have attacked the truth more vigorously than any who have become blasphemers of God and his faith before them",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sacred Scripture is clear to those who approach it with pious reason.'
    },
    {
        ID: 'FC400',
        Father: 'Basil of Caesarea',
        Died_AD: 'c.330-379',
        Era: 'Greek Patristic',
        Source_Work: 'Regulae Brevius Tractate',
        Source_Ref: 'Interrogatio et Responsio XCV (as cited in William Goode, The Divine Rule of Faith and Practice, Volume 3, p. 132)',
        Quote_Text:
            'Question: Whether it is desirable for new converts immediately to learn things from the Scriptures. Answer: . . . [it is] proper and necessary that each one should learn that which is useful from the inspired Scripture, both for the establishment of piety, and that he may not be accustomed to human traditions',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY_SOLA,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'New converts should learn from inspired Scripture, not human traditions.'
    },
    {
        ID: 'FC401',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Genesis 46-67',
        Source_Ref: 'Homily 55.5',
        Quote_Text:
            'Consider, I ask you, dearly beloved, the precision of Sacred Scripture in narrating everything clearly to us, instructing us in the customs of the ancients and the extent of the ardor that marked their hospitality',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sacred Scripture narrates everything clearly.'
    },
    {
        ID: 'FC402',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on the Second Epistle of Paul to the Thessalonians',
        Source_Ref: 'Homily 3',
        Quote_Text:
            'All things are clear and open that are in the divine Scriptures; the necessary things are all plain',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Necessary things in divine Scripture are all plain.'
    },
    {
        ID: 'FC403',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on the Gospel according to St. John',
        Source_Ref: 'Homily 2',
        Quote_Text:
            "For this reason too, he did not hide his teaching in mist and darkness, as they did who threw obscurity of speech, like a kind of veil, around the mischiefs laid up within. But this man's doctrines are clearer than the sunbeams, wherefore they have been unfolded to all men throughout the world",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Christ's teaching is clearer than sunbeams and unfolded to all."
    },
    {
        ID: 'FC404',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on the Gospel according to St. John',
        Source_Ref: 'Homily 53',
        Quote_Text:
            'Let us then, beloved, give heed to the Scriptures. . . . Wherefore I exhort you both to obtain Bibles, and to retain together with the Bibles the sentiments they set forth, and to write them in your minds',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Exhortation to obtain Bibles and retain Scripture in the mind.'
    },
    {
        ID: 'FC405',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Four Discourses of Chrysostom, Chiefly on the Parable of the Rich Man and Lazarus',
        Source_Ref: '3rd Sermon, sections 2-3, p. 62–63 (F. Allen, trans.)',
        Quote_Text:
            'For those without — philosophers, rhetoricians, and annalists, not striving for the common good, but having in view their own renown — if they said anything useful, even this they involved in their usual obscurity, as in a cloud. But the apostles and prophets always did the very opposite; they, as the common instructors of the world, made all that they delivered plain to all men, in order that every one, even unaided, might be able to learn by the mere reading',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostles and prophets made teaching plain so all could learn by mere reading.'
    },
    {
        ID: 'FC406',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Romans',
        Source_Ref: 'The Argument (NPNF1 11:335)',
        Quote_Text:
            'Just as people who are deprived of daylight stumble about, so also those who do not look at the brilliant light of the Holy Scriptures must frequently and constantly sin because they walk in the worst darkness',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scriptures are a brilliant light; neglect of them leads to darkness.'
    },
    {
        ID: 'FC407',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Colossians',
        Source_Ref: 'Homily 9',
        Quote_Text:
            "Tarry not, I entreat, for another to teach thee; thou hast the oracles of God. No man teacheth thee as they. . . . Hearken, I entreat you, all ye that are careful for this life, and procure books that will be medicines for the soul. If ye will not any other, yet get you at least the New Testament, the Apostolic Epistles, the Acts, the Gospels, for your constant teachers. If grief befall thee, dive into them as into a chest of medicines; take thence comfort of thy trouble, be it loss, or death, or bereavement of relations; or rather dive not into them merely, but take them wholly to thee; keep them in thy mind. This is the cause of all evils, the not knowing the Scriptures",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY_SOLA,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Believers have the oracles of God as their teachers; ignorance of Scripture is the cause of evils.'
    },
    {
        ID: 'FC408',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'The Apology Against the Books of Rufinus',
        Source_Ref: 'Book I, 16',
        Quote_Text:
            "What is the function of commentators? They expound the statements of someone else; they express in simple language views that have been expressed in an obscure manner; they quote the opinions of many individuals and they say: 'Some interpret this passage in this sense, others, in another sense'; they attempt to support their own understanding and interpretation with these testimonies in this fashion, so that the prudent reader, after reading the different interpretations and studying which of these many views are to be accepted and which rejected, will judge for himself which is the more correct; and, like the expert banker, will reject the falsely minted coin",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Commentators clarify obscure passages so the prudent reader may judge for himself.'
    },
    {
        ID: 'FC409',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on the Book of Isaiah',
        Source_Ref: 'Preface (PL 24.17B)',
        Quote_Text: 'Ignorance of Scripture is ignorance of Christ',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Famous Jerome maxim on the necessity of knowing Scripture.'
    },
    {
        ID: 'FC410',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Confessions',
        Source_Ref: 'Book 6, Chapter 5, Section 8 (Maria Boulding translation)',
        Quote_Text:
            'The authority of the sacred writings seemed to me all the more deserving of reverence and divine faith in that scripture was easily accessible to every reader, while yet guarding a mysterious dignity in its deeper sense. In plain words and very humble modes of speech it offered itself to everyone, yet stretched the understanding of those who were not shallow-minded. It welcomed all comers to its hospitable embrace',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture is accessible to every reader in plain words while rewarding deeper study.'
    },
    {
        ID: 'FC411',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Letters of St. Augustine',
        Source_Ref: 'Letter 137, Chapter 5, Section 18',
        Quote_Text:
            'Consider, moreover, the style in which Sacred Scripture is composed — how accessible it is to all men, though its deeper mysteries are penetrable to very few. The plain truths which it contains it declares in the artless language of familiar friendship to the hearts both of the unlearned and of the learned; but even the truths which it veils in symbols it does not set forth in stiff and stately sentences, which a mind somewhat sluggish and uneducated might shrink from approaching, as a poor man shrinks from the presence of the rich; but, by the condescension of its style, it invites all not only to be fed with the truth which is plain',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sacred Scripture is accessible to all in artless language while deeper mysteries reward the diligent.'
    },
    {
        ID: 'FC412',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'On Christian Doctrine',
        Source_Ref: 'Book 2, Chapter 6, Section 8',
        Quote_Text:
            'The Holy Ghost, therefore, has generously and advantageously planned Holy Scripture in such a way that in the easier passages He relieves our hunger; in the ones that are harder to understand He drives away our pride. Practically nothing is dug out from those unintelligible texts which is not discovered to be said very plainly in another place',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Harder passages are clarified by plain statements elsewhere in Scripture.'
    },
    {
        ID: 'FC413',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'On Christian Doctrine',
        Source_Ref: 'Book 2, Chapter 9, Section 14',
        Quote_Text:
            'For among the things that are plainly laid down in Scripture are to be found all matters that concern faith and the manner of life',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'All matters of faith and life are found in plainly laid down Scripture.'
    },
    {
        ID: 'FC414',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Reply to Faustus the Manichaean',
        Source_Ref: 'Book 11, Chapter 2',
        Quote_Text:
            'As I said a little ago, when these men are beset by clear testimonies of Scripture, and cannot escape from their grasp, they declare that the passage is spurious. The declaration only shows their aversion to the truth, and their obstinacy in error',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Heretics impugn clear testimonies of Scripture when confuted.'
    },
    {
        ID: 'FC415',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Reply to Faustus the Manichaean',
        Source_Ref: 'Book 12, Chapter 7',
        Quote_Text:
            'Other passages, again, are plain; for, without the help of what is clear, we could not understand what is obscure. And even the figurative passages, when brought together, will be found so harmonious in their testimony to Christ as to put to shame the obtuseness of the sceptic',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Plain passages interpret obscure ones.'
    },
    {
        ID: 'FC416',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Answer to the Pelagians III',
        Source_Ref: 'Unfinished Work in Answer to Julian, Book I:5, Part 1',
        Quote_Text:
            'You in fact try to obscure the lights of the holy scriptures which shine with certain truth by the complexity of your evil arguments. After all, what is clearer than what I just said: Human beings have become like vanity; their days pass like a shadow (Ps 144:4)? That surely would not have happened, if they had remained in the likeness of God in which they were created. What is clearer than the statement: As in Adam all die, so too in Christ all will be brought to life (1 Cor 15:22)? What is clearer than the words: Who, after all, is clean from filth? Not even an infant whose life has lasted a single day on earth (Jb 14:4-5 LXX)? And there are many other passages which you try to wrap in darkness and twist to your perverse meaning by your empty chatter',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Many Scripture passages shine with certain truth and maximal clarity.'
    },
    {
        ID: 'FC417',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Sermons on Selected Lessons of the New Testament',
        Source_Ref: 'Sermon 2, Section 1',
        Quote_Text:
            'Here then we have the Trinity in a certain sort distinguished. The Father in the Voice—the Son in the Man—the Holy Spirit in the Dove. It was only needful just to mention this, for most obvious is it to see. For the notice of the Trinity is here conveyed to us plainly and without leaving room for doubt or hesitation',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Trinity at Christ\'s baptism conveyed plainly in Scripture.'
    },
    {
        ID: 'FC418',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Answer to the Pelagians II',
        Source_Ref: 'Answer to Julian, Book V:2 (Roland J. Teske trans., New City Press, 1998, Part 1, Vol. 24, p. 432)',
        Quote_Text:
            "You exaggerate 'how difficult the knowledge of the sacred scriptures is,' claiming that 'it is suited for only the learned few'",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Augustine rebuts the claim that Scripture knowledge is only for the learned few.'
    },
    {
        ID: 'FC419',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Teaching Christianity (De Doctrina Christiana)',
        Source_Ref: 'Book 3, Chapters 2, 8 (p. 169, 172–173)',
        Quote_Text:
            'But when ambiguities arise in scripture about the meaning of words used in their proper sense, the first thing we must do is see whether we have phrased or pronounced them wrongly. So when, on paying closer attention, you still see that it is uncertain how something is to be phrased, or how to be pronounced, you should refer it to the rule of faith, which you received from the plainer passages of scripture and from the authority of the Church, about which we dealt sufficiently when we were talking in the first book about things. But if both possibilities, or all of them, if it is multiple ambiguity, are consonant with the faith, it remains to refer to the whole context, to the sections that precede and that follow the ambiguous passage, holding it in the middle between them, so that we may see which of the several meanings that present themselves the context will vote for and allow to fit in with itself. . . . It is extremely rare, then, and indeed very hard, to find any ambiguity in the literal meaning of words, as far as the books of the divine scriptures are concerned, which cannot be settled either from the context of the word, which indicates the intention of the writers, or from a comparison of different versions, or from an examination of the original language',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Ambiguities are resolved by plainer passages, context, versions, and original languages.'
    },
    {
        ID: 'FC420',
        Father: 'Isidore of Pelusium',
        Died_AD: 'c.360-435',
        Era: 'Greek Patristic',
        Source_Work: 'Epistolarium',
        Source_Ref: 'Lib. II, Epist. 5 (PG 78.461; William Goode trans., The Divine Rule of Faith and Practice, Volume 3, p. 284)',
        Quote_Text:
            'If God had had respect only to his own dignity, and not the profit of the reader, he would have used heavenly and divine words and examples. But since he was legislating for men that are weak and in need of human words (for thus they were able easily to understand things above them), he expressed his divine doctrines in common words, to the intent that even a woman and a child, and the most ignorant of all men, might obtain some profit even from the very hearing. For, the word having a consideration for the salvation of the multitude, and even rustics, is expressed with so much clearness through the philanthropy of the legislator, as to deprive no one of the benefit proportioned to his powers; nor hath it neglected the wiser of mankind; for in this so great clearness, such unutterable words dwell like treasures, that even the wisest and most learned of men are lost in the profundity of the thoughts, and often confess themselves overcome by the incomprehensibility of the wisdom',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture uses common words with great clearness for all, including the ignorant and the wise.'
    },
    {
        ID: 'FC421',
        Father: 'Theodoret',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'In Ezechielem – Præfatio',
        Source_Ref: 'PG 81.808-809',
        Quote_Text:
            "Some people who have fallen foul of this complaint have endeavored to level charges at the divine Scripture, and especially the inspired oracles, of being shrouded in obscurity. To such people the divine-inspired Paul would retort, 'Now, even if our Gospel is veiled, it is veiled to those who are perishing, but to the mature it is wisdom we are speaking.' In keeping with this, too, is what is said by our Lord and savior to the holy apostles, 'To you it is given to know the mysteries of the kingdom, whereas to those others it is not given;' and to explain the reason he immediately adds, 'Seeing they do not see, and hearing they do not understand' — that is, they willingly bring upon themselves the cloud of ignorance: if they turn to the Lord, as the apostle says, the veil will be lifted. Divine realities, therefore, are not obscure to everyone, only to those who are voluntarily blind; they ought to take note and realize that nothing worthwhile is readily accessible to human beings",
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture is not obscure to the mature; obscurity is self-imposed by the unwilling.'
    },
    {
        ID: 'FC422',
        Father: 'Theodoret',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'Quæstiones in Genesim',
        Source_Ref: 'Interrogatio 1 and LII (PG 80.77, 80.156; William Goode trans., The Divine Rule of Faith and Practice, Volume 3, p. 285)',
        Quote_Text:
            'The divine Scripture is accustomed to accommodate its lessons to those who are to be instructed; and to the perfect, to offer that which is perfect; and to the ignorant, elementary points and things suited to their ability. . . . The divine Scripture accommodates its language to men; and orders its words so that they may be able to understand',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture accommodates its language to the capacity of its hearers.'
    },
    {
        ID: 'FC423',
        Father: 'Salvian of Marseille',
        Died_AD: 'c.400-480',
        Era: 'Latin Patristic',
        Source_Work: 'On the Government of God',
        Source_Ref: 'Book I, Chapter 7',
        Quote_Text:
            'In a word, holy deeds would be done by Christians if Christ has taught holy things. He who is worshiped can be judged by His worshippers. For how is a teacher good whose pupils we see are so evil? From this viewpoint, they are Christians; they listen to Him, they read Him. It is easy for all to understand the teaching of Christ',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ\'s teaching is easy for all to understand.'
    },
    {
        ID: 'FC424',
        Father: 'Gregory the Great',
        Died_AD: 'c.540-604',
        Era: 'Latin Patristic',
        Source_Work: 'Morals on the Book of Job',
        Source_Ref: 'Preface',
        Quote_Text:
            'For as the word of God, by the mysteries which it contains, exercises the understanding of the wise, so usually by what presents itself on the outside, it nurses the simpleminded. It presenteth in open day that wherewith the little ones may be fed; it keepeth in secret that whereby men of a loftier range may be held in suspense of admiration. It is, as it were, a kind of river, if I may so liken it, which is both shallow and deep, wherein both the Lamb may find a footing, and the elephant float at large',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture is shallow enough for the simple and deep enough for the wise.'
    },
    {
        ID: 'FC425',
        Father: 'John of Damascus',
        Died_AD: 'c.676-749',
        Era: 'Greek Patristic',
        Source_Work: 'An Exact Exposition of the Orthodox Faith',
        Source_Ref: 'Book 4, Chapter 17',
        Quote_Text:
            'Wherefore to search the Scriptures is a work most fair and most profitable for souls. For just as the tree planted by the channels of waters, so also the soul watered by the divine Scripture is enriched and gives fruit in its season , viz. orthodox belief, and is adorned with evergreen leafage, I mean, actions pleasing to God. For through the Holy Scriptures we are trained to action that is pleasing to God, and untroubled contemplation. For in these we find both exhortation to every virtue and dissuasion from every vice. . . . If we read once or twice and do not understand what we read, let us not grow weary, but let us persist, let us talk much, let us enquire. For ask thy Father, he saith, and He will shew thee: thy elders and they will tell thee. For there is not in every man that knowledge. Let us draw of the fountain of the garden perennial and purest waters springing into life eternal. Here let us luxuriate, let us revel insatiate: for the Scriptures possess inexhaustible grace',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Searching Scripture is profitable; persistence in reading yields understanding.'
    },
    {
        ID: 'FC426',
        Father: 'Pope Gregory IX',
        Died_AD: 'c.1145-1241',
        Era: 'Medieval',
        Source_Work: 'Letter to Germanus, Patriarch of Constantinople',
        Source_Ref: 'as cited in Richard Littledale, Plain Reasons Against Joining the Church of Rome, p. 97',
        Quote_Text:
            'Whereas, according to the witness of the Truth, ignorance of the Scriptures is the occasion of errors, it is expedient that all should read or hear them, because Divine inspiration willed them to draw forth, for the warning of the moderns, whatsoever things He stored up therein for the teaching of such as should follow',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Ignorance of Scripture occasions error; all should read or hear Scripture.'
    },
    {
        ID: 'FC427',
        Father: 'Jacopo Sadoleto',
        Died_AD: '1477-1547',
        Era: 'Post-Tridentine',
        Source_Work: 'A Reformation Debate',
        Source_Ref: 'p. 32',
        Quote_Text:
            'For it both shines in darkness, and is perspicuous to every man, and is most easily perceived alike by learned and unlearned, and especially in matters of Christian doctrines, rests not on syllogisms, or quibbles on words, but on humility, reverence, and obedience toward God. For the word of God is quick and powerful, and sharper than any two-edged sword, piercing even to the joining of soul and spirit, to the inmost parts of the joints and marrow, not ensnaring souls by perplexing argument; but by the interposition of a certain heavenly affection of the heart, making itself plain and patent to our minds',
        Topic: 'Scripture & Canon',
        Subtopics: PERSPICUITY,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sadoleto: Scripture is perspicuous to every man, learned and unlearned alike.'
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

function main() {
    const csv = fs.readFileSync(CSV_PATH, 'utf8');
    const existingRows = parsePatristicQuotesCsv(csv);
    const existingIds = new Set(existingRows.map((row) => row.ID.trim()));
    const existingSnippets = new Set(
        existingRows.map((row) => normalizeText(row.Quote_Text).slice(0, 80))
    );

    const toAdd = NEW_QUOTES.filter((row) => {
        if (existingIds.has(row.ID)) return false;
        const snippet = normalizeText(row.Quote_Text).slice(0, 80);
        return !existingSnippets.has(snippet);
    });

    const skipped = NEW_QUOTES.filter((row) => !toAdd.includes(row));
    if (skipped.length > 0) {
        console.log(`Skipped ${skipped.length} duplicate(s): ${skipped.map((r) => r.ID).join(', ')}`);
    }

    if (toAdd.length === 0) {
        console.log('All perspicuity quotes already present in CSV.');
        return;
    }

    const suffix = csv.endsWith('\n') ? '' : '\n';
    const lines = toAdd.map(rowToCsv).join('\n');
    fs.appendFileSync(CSV_PATH, `${suffix}${lines}\n`, 'utf8');
    console.log(`Added ${toAdd.length} quotes (${toAdd.map((r) => r.ID).join(', ')})`);
}

main();
