/**
 * Append OT canon / biblical canon quotes to CSV (idempotent by legacy ID and text snippet).
 */
import fs from 'fs';
import path from 'path';
import {
    parsePatristicQuotesCsv,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

const SUBTOPICS = 'Biblical Canon|Old Testament Canon';

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC428',
        Father: 'Melito of Sardis',
        Died_AD: 'c.180',
        Era: 'Greek Patristic',
        Source_Work: 'Ecclesiastical History (via Eusebius)',
        Source_Ref: 'Book 4, Section 26',
        Quote_Text:
            'Melito to Onesimus his brother, greeting: Since you have often, on account of your zeal for the word of God, begged of me to make selections for you, from the law and the prophets, concerning the Saviour and our whole faith; and as you, moreover, wished to learn accurately of the old books, how many they are in number and in what order they are written, I have earnestly endeavored to perform the same, well knowing your zeal for the faith and your great desire to learn the word of God; and that, through your earnest love toward God, you desire these more than all things else, striving for your eternal salvation. I accordingly went to the East, and, coming to the very place where these things were preached and transacted, I have accurately learned the books of the Old Testament. Their names are as follows: Five books of Moses: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy. Joshua, Judges, Ruth. Four books of Kings [two of Samuel and two of Kings], two of Paralipomenon [Chronicles]. The Psalms of David, the Proverbs of Solomon (which is also Wisdom), Ecclesiastes, the Song of Songs, Job. Of the prophets, Isaiah, Jeremiah; and of the twelve prophets, one book; Daniel, Ezekiel, Esdras',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Earliest extant Christian OT canon list; preserved in Eusebius. Omits Esther and some disputed books.'
    },
    {
        ID: 'FC429',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Ecclesiastical History (via Eusebius)',
        Source_Ref: 'Book 6, Section 25',
        Quote_Text:
            'It should be observed that the collective books, as handed down by the Hebrews, are twenty-two, according to the number of letters in their alphabet. These twenty-two books, according to the Hebrews, are as follows: Genesis; Exodus; Leviticus; Numbers; Deuteronomy; Joshua, the son of Nave; Judges and Ruth in one; first and second of Kings in one (Samuel); third and fourth of Kings in one (Kings); first and second of Chronicles in one; Esdras, first and second in one (Ezra and Nehemiah); Book of Psalms; Proverbs of Solomon; Ecclesiastes; Song of Songs; Isaiah; Jeremiah, with Lamentations and the epistle, in one; Daniel; Ezekiel; Job; Esther',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: "Origen's Hebrew canon of twenty-two books, as cited by Eusebius."
    },
    {
        ID: 'FC430',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'On First Principles',
        Source_Ref: 'Book 4, Chapter 33',
        Quote_Text:
            'The book which is called the Wisdom of Solomon, a work which is certainly not esteemed authoritative by all',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Origen acknowledges that Wisdom of Solomon is not universally held authoritative.'
    },
    {
        ID: 'FC431',
        Father: 'Victorinus of Pettau',
        Died_AD: 'c.280-304',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on the Apocalypse',
        Source_Ref: 'Chapter 4, Verses 7-8',
        Quote_Text:
            'The four and twenty elders are the twenty-four books of the prophets and of the law, which give testimonies of the judgment. . . . These are the testimonies of the books of the Old Testament. Thus, twenty and four make as many as there are elders sitting upon the thrones. . . . And the books of the Old Testament that are received are twenty-four, which you will find in the epitomes of Theodore',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Twenty-four received OT books identified with the twenty-four elders of Revelation.'
    },
    {
        ID: 'FC432',
        Father: 'Eusebius of Caesarea',
        Died_AD: 'c.260-340',
        Era: 'Greek Patristic',
        Source_Work: 'Chronicle',
        Source_Ref:
            'Chron. paulo ante ann. mund. 4890 (as cited by Richard Field, Of the Church, Volume 2, p. 105)',
        Quote_Text:
            'The books of the Maccabees reckon the kingdom of the Greeks from this point; but this is found not to be counted in their priestly codices',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Maccabees not counted in the Hebrew priestly codices.'
    },
    {
        ID: 'FC433',
        Father: 'Council of Laodicea',
        Died_AD: 'c.363',
        Era: 'Greek Patristic',
        Source_Work: 'Synodical Canons',
        Source_Ref: 'Canon 60',
        Quote_Text:
            'The books of the Old Testament which must be read are: Genesis of the world, Exodus from Egypt, Leviticus, Numbers, Deuteronomy, Joshua son of Nave, Judges, Ruth, Esther, of Kings first and second, third and fourth, Paralipomenon first and second, Esdras first and second, book of 150 Psalms, Proverbs of Solomon, Ecclesiastes, Song of Songs, Job, twelve Prophets, Isaiah, Jeremiah and Baruch, Lamentations and Epistles, Ezekiel, Daniel',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Laodicea lists OT books to be read; no deuterocanonical books included.'
    },
    {
        ID: 'FC434',
        Father: 'Hilary of Poitiers',
        Died_AD: 'c.315-368',
        Era: 'Latin Patristic',
        Source_Work: 'Exposition of the Psalms',
        Source_Ref: 'Prologue, Section 15',
        Quote_Text:
            'And this is the cause that the law of the Old Testament is arranged in twenty-two books, that they may correspond with the number of the Hebrew letters. According to the traditions of the ancients, they are so arranged that there are five books of Moses; Joshua Nave, six; Judges and Ruth, seven; first and second of Kings, eight; third and fourth of Kings, nine; of Paralipomenon two, ten; book of days of Esdras, eleven; Solomon\'s Proverbs, Ecclesiastes, Song of Songs, thirteen, fourteen and fifteen; twelve prophets, sixteen; then Isaiah, Jeremiah with Lamentations and Epistle, these and Daniel and Ezekiel and Job and Esther, make up the number of twenty-two books. Some are pleased to add Tobit and Judith, to make the number twenty-four, according to the letters of the Greek alphabet',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Hebrew twenty-two-book canon; Tobit and Judith added by some to reach twenty-four.'
    },
    {
        ID: 'FC435',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: '39th Festal Letter',
        Source_Ref: 'Section 7',
        Quote_Text:
            'But for greater exactness I add this also, writing of necessity; that there are other books besides these not indeed included in the Canon, but appointed by the Fathers to be read by those who newly join us, and who wish for instruction in the word of godliness. The Wisdom of Solomon, and the Wisdom of Sirach, and Esther, and Judith, and Tobit, and that which is called the Teaching of the Apostles, and the Shepherd. But the former, my brethren, are included in the Canon, the latter being [merely] read',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Festal Letter distinguishes canonical OT books from those merely appointed for reading.'
    },
    {
        ID: 'FC436',
        Father: 'Gregory of Nazianzus',
        Died_AD: 'c.329-390',
        Era: 'Greek Patristic',
        Source_Work: 'Carmina Dogmatica',
        Source_Ref: 'Book I, Section I, Carmen XII (PG 37:471-474)',
        Quote_Text:
            'Receive the number and names of the holy books. First the twelve historical books in order: first is Genesis, then Exodus, Leviticus, Numbers and the testament of the law repeated again; Joshua, Judges and Ruth the Moabitess follow these; after this the famous deeds of Kings holds the ninth and tenth place; the Chronicles comes in the eleventh place, and Ezra is last. There are also five poetic books, first of which is Job, the one next to it is King David\'s, and three of Solomon, namely Ecclesiastes, Proverbs, and his Song. After these come five books of the holy prophets, of which twelve are contained in one volume: Hosea . . . Malachi, these are in the first book; the second contains Isaiah. After these is Jeremiah, called from his mother\'s womb, then Ezekiel, strength of the Lord, and Daniel last. These twenty-two books of the Old Testament are counted according to the twenty-two letters of the Jews. . . . Let not your mind be deceived about extraneous books (for many false ascriptions are making the rounds), but you should hold to this legitimate number from me, dear reader',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Twenty-two-book Hebrew canon; warns against extraneous apocryphal books.'
    },
    {
        ID: 'FC437',
        Father: 'Amphilochius of Iconium',
        Died_AD: 'c.340-403',
        Era: 'Greek Patristic',
        Source_Work:
            'As cited by C. E. Stowe, "The Apocryphal Books of the Old Testament, and the Reasons for their Exclusion from the Canon of Scripture"',
        Source_Ref: 'Bibliotheca Sacra and American Biblical Repository, Volume 11, p. 302',
        Quote_Text:
            'I will speak of the first books of the Old Testament. The Pentateuch, the Creation [Genesis], then Exodus; Leviticus is the middle book, after that, Numbers, then Deuteronomy. Add to these Joshua and Judges; then Ruth, four books of Kings, and two books of Paralipomenon; and upon these the first of Esdras, then the second. I will mention to you in order the five poetic books: Job, pressed with conflicts of various sufferings; the book of Psalms, the melodious cure for souls; three books of Solomon the wise, Proverbs, Ecclesiastes and the Song of Songs; and to these add the twelve prophets, Hosea first, then Amos the second, Micah, Joel, Obadiah, also Jonah, the type of his three days\' passion, after these Nahum, Habakuk, then the ninth Zephaniah, Haggai and Zachariah, and the far-famed messenger Malachi. After which learn four prophets, Isaiah the great free-speaker, Jeremiah the sympathetic and mystic, Ezekiel, and Daniel the last, the same most wise in words and deeds. To these some also add Esther',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Detailed OT canon list; Esther noted as optionally added by some.'
    },
    {
        ID: 'FC438',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'The Panarion of Epiphanius of Salamis',
        Source_Ref: 'Book 1, Chapter 8 (Against Judaism), Section 6.1-4, p. 28-29',
        Quote_Text:
            'By the time of the captives\' return from Babylon these Jews had acquired the following books and prophets, and the following books of the prophets: 1. Genesis. 2. Exodus. 3. Leviticus. 4. Numbers. 5. Deuteronomy. 6. The Book of Joshua the son of Nun. 7. The Book of the Judges. 8. Ruth. 9. Job. 10. The Psalter. 11. The Proverbs of Solomon. 12. Ecclesiastes. 13. The Song of Songs. 14. The First Book of Kings. 15. The Second Book of Kings. 16. The Third Book of Kings. 17. The Fourth Book of Kings. 18. The First Book of Chronicles. 19. The Second Book of Chronicles. 20. The Book of the Twelve Prophets. 21. The Prophet Isaiah. 22. The Prophet Jeremiah, with the Lamentations and the Epistles of Jeremiah and Baruch. 23. The Prophet Ezekiel. 24. The Prophet Daniel. 25. I Ezra. 26. II Ezra. 27. Esther. These are the twenty-seven books given the Jews by God. They are counted as twenty-two, however, like the letters of their Hebrew alphabet, because ten books which the Jews reckon as five are double. . . . And they have two more books of disputed canonicity, the Wisdom of Sirach and the Wisdom of Solomon, apart from certain other apocrypha',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Twenty-seven books counted as twenty-two; Wisdom of Sirach and Solomon are disputed, not canonical.'
    },
    {
        ID: 'FC439',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homily 4 on Genesis',
        Source_Ref: 'Section 4',
        Quote_Text:
            'All the sacred books of the Old Testament were originally composed in Hebrew, no one contradicts it',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'OT Scripture originally composed in Hebrew.'
    },
    {
        ID: 'FC440',
        Father: 'Rufinus',
        Died_AD: 'c.345-410',
        Era: 'Latin Patristic',
        Source_Work: "Commentary on the Apostles' Creed",
        Source_Ref: 'Section 38',
        Quote_Text:
            "But it should be known that there are also other books which our fathers call not 'Canonical' but 'Ecclesiastical:' that is to say, Wisdom, called the Wisdom of Solomon, and another Wisdom, called the Wisdom of the Son of Syrach, which last-mentioned the Latins called by the general title Ecclesiasticus, designating not the author of the book, but the character of the writing. To the same class belong the Book of Tobit, and the Book of Judith, and the Books of the Maccabees. In the New Testament the little book which is called the Book of the Pastor of Hermas (and that) which is called the Two Ways, or the Judgment of Peter; all of which they would have read in the Churches, but not appealed to for the confirmation of doctrine. The other writings they have named 'Apocrypha.' These they would not have read in the Churches. These are the traditions which the Fathers have handed down to us, which, as I said, I have thought it opportune to set forth in this place, for the instruction of those who are being taught the first elements of the Church and of the Faith, that they may know from what fountains of the Word of God their draughts must be taken",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Canonical vs. ecclesiastical vs. apocryphal books distinguished; deuterocanonicals read but not used for doctrine.'
    },
    {
        ID: 'FC441',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Preface to Proverbs, Ecclesiastes, and the Song of Songs',
        Source_Ref: 'NPNF, Second Series, Volume 6, p. 492-493',
        Quote_Text:
            'As, then, the Church reads Judith, Tobit, and the books of Maccabees, but does not admit them among the canonical Scriptures, so let it also read these two volumes for the edification of the people, not to give authority to doctrines of the Church',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Jerome: deuterocanonicals may be read for edification but are not canonical Scripture.'
    },
    {
        ID: 'FC442',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Against Rufinus',
        Source_Ref: 'Book 2, Section 27',
        Quote_Text:
            'What the Savior declares was written down was certainly written down. Where is it written down? The Septuagint does not have it, and the Church does not recognize the Apocrypha. Therefore we must go back to the book of the Hebrews, which is the source of the statements quoted by the Lord, as well as the examples cited by the disciples',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Church does not recognize Apocrypha; Hebrew Scripture is the source of NT citations.'
    },
    {
        ID: 'FC443',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Prologue to the Vulgate',
        Source_Ref: 'Prologus Galeatus',
        Quote_Text:
            'And so there are also twenty-two books of the Old Testament; that is, five of Moses, eight of the prophets, nine of the Hagiographa, though some include Ruth and Kinoth (Lamentations) amongst the Hagiographa, and think that these books ought to be reckoned separately; we should thus have twenty-four books of the old law. And these the Apocalypse of John represents by the twenty-four elders, who adore the Lamb, and with downcast looks offer their crowns, while in their presence stand the four living creatures with eyes before and behind, that is, looking to the past and the future, and with unwearied voice crying, Holy, Holy, Holy, Lord God Almighty, who wast, and art, and art to come. This preface to the Scriptures may serve as a \'helmeted\' introduction to all the books which we turn from Hebrew into Latin, so that we may be assured that what is not found in our list must be placed amongst the Apocryphal writings. Wisdom, therefore, which generally bears the name of Solomon, and the book of Jesus, the Son of Sirach, and Judith, and Tobias, and the Shepherd are not in the canon',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Jerome lists twenty-two (or twenty-four) Hebrew books; Wisdom, Sirach, Judith, Tobias, and Shepherd excluded from canon.'
    },
    {
        ID: 'FC444',
        Father: 'Primasius',
        Died_AD: 'c.6th century',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on the Apocalypse of John',
        Source_Ref: 'Book I, Chapter IV',
        Quote_Text:
            'In one way, fore and aft, because the Church everywhere bearing fruit is broadened; it walks in the light of the face of God, and, his face revealed, gazes on the glory of God. In another way, fore and aft, he implies that the six-fold wings, which number twenty-four, are the books of the Old Testament, which we take up on canonical authority of the same number, just as there are twenty-four elders sitting above the thrones',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Twenty-four OT books taken up on canonical authority, identified with Revelation\'s elders.'
    },
    {
        ID: 'FC445',
        Father: 'Gregory the Great',
        Died_AD: 'c.540-604',
        Era: 'Latin Patristic',
        Source_Work: 'Morals on the Book of Job',
        Source_Ref: 'Volume 2, Part 4, Book 19, Section 34',
        Quote_Text:
            "With reference to which particular we are not acting irregularly, if from the books, though not Canonical, yet brought out for the edification of the Church, we bring forward testimony. 'Thus Eleazar in the battle smote and brought down an elephant, but fell under the very beast that he killed' (1 Maccabees 6:46)",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Gregory cites 1 Maccabees as useful for edification though not canonical.'
    },
    {
        ID: 'FC446',
        Father: 'Dialogue of Timothy and Aquila',
        Died_AD: 'c.6th-7th century',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue of Timothy and Aquila',
        Source_Ref: 'Chapter 3',
        Quote_Text:
            'These, then, are the divinely inspired books, both among Christians and among Hebrews. The first is the book of Genesis. The second is Exodus. The third is Leviticus. The fourth is Numbers. These are the ones dictated through the mouth of God and written by the hand of Moses. And the fifth is the Book of Deuteronomy, not dictated though the mouth of God but was the law given a second time through Moses. (Therefore, it was not placed in the aron, that is, the Ark of the Covenant) (see Deut. 31:9; 24-26). This is the Mosaic Pentateuch. The sixth is Joshua, son of Nun. The seventh is the Judges along with Ruth. The eighth book is the \'Things that are left,\' first and second (1,2 Chronicles). Ninth is the Book of Kingdoms, first and second (1,2 Samuel). Tenth is the third and fourth Book of Kingdoms (1,2 Kings). Eleventh is Job. Twelfth is the Psalter of David. Thirteenth is the Proverbs of Solomon. Fourteenth is Ecclesiastes along with the Canticles. Fifteenth is the Twelve Prophets, then Isaiah, Jeremiah. And again, Ezekiel, then Daniel and again, Esdras (Ezra-Nehemiah), twentieth. The twenty first is the book of Judith. Twenty second is Esther. For Tobit and the Wisdom of Solomon and the Wisdom of Jesus Son of Sirach, the 72 translators (LXX) handed down to us as apocryphal books. These twenty two books are the inspired and canonical ones. There are twenty seven, but are numbered as twenty two, because five of them are doubled. And they are numbered according to the letters of the Hebrew alphabet, and all the rest of them belong to the Apocrypha',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Twenty-two inspired canonical books; Tobit, Wisdom, and Sirach are LXX apocrypha.'
    },
    {
        ID: 'FC447',
        Father: 'John of Damascus',
        Died_AD: 'c.676-749',
        Era: 'Greek Patristic',
        Source_Work: 'Exposition of the Orthodox Faith',
        Source_Ref: 'Book 4, Chapter 17',
        Quote_Text:
            'Observe, further, that there are two and twenty books of the Old Testament, one for each letter of the Hebrew tongue. For there are twenty-two letters of which five are double, and so they come to be twenty-seven. . . . There are also the Panaretus, that is the Wisdom of Solomon, and the Wisdom of Jesus, which was published in Hebrew by the father of Sirach, and afterwards translated into Greek by his grandson, Jesus, the son of Sirach. These are virtuous and noble, but are not counted nor were they placed in the ark',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Twenty-two Hebrew OT books; Wisdom of Solomon and Sirach are noble but not counted in the canon.'
    },
    {
        ID: 'FC448',
        Father: 'Bede',
        Died_AD: 'c.673-735',
        Era: 'Medieval',
        Source_Work: 'Commentary on Revelation',
        Source_Ref: 'PL 93.144',
        Quote_Text:
            'Each of them has six wings. They raise the Church to the heights by the perfection of their teaching. For the number six is called perfect for this reason, that it is the first number completed by its own parts. Indeed one, which is a sixth part of six, and two which is a third, and three, which is half, make up six itself. In another way, six wings of four animals, which makes twenty-four, suggest the books of the entire Old Testament, by which the authority of the evangelists is supported and their truth is proven',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Twenty-four OT books support the authority of the evangelists.'
    },
    {
        ID: 'FC449',
        Father: 'Nicephorus of Constantinople',
        Died_AD: 'c.758-829',
        Era: 'Medieval',
        Source_Work: 'The Stichometery of Nicephorus',
        Source_Ref: 'PG 100.1057',
        Quote_Text:
            'And the (writings) of the Old Testament which are gainsaid and are not recognized in the Church (canonized) are the following: 3 Books of the Maccabees, The Wisdom of Solomon, The Wisdom of Jesus Sirach, The Psalms and Odes of Solomon, Esther, Judith, Susanna, Tobith, also (called) Tobias',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Stichometry lists disputed OT writings not recognized in the Church canon.'
    },
    {
        ID: 'FC450',
        Father: 'Hugh of St. Victor',
        Died_AD: 'c.1096-1141',
        Era: 'Medieval',
        Source_Work: 'De scripturis et scriptoribus sacris',
        Source_Ref: 'PL 175.10-11A',
        Quote_Text:
            "Scripture is concerned with the truth in which lies salvation. Other writings, including the apocrypha, are not pure because they do not contain truth without error; nor are they perfect, since they do not restore the soul to true knowledge and love of God. Therefore, they are not worthy to be called 'divine.' The only Scripture that is rightly called divine is that which is inspired by the Spirit of God and issued by those who speak by the Spirit of God; it makes humanity divine, reforming it to the likeness of God by instructing in knowledge and exhorting to love. Whatever is taught in it is truth; whatever is commanded is goodness; whatever is promised is happiness",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apocrypha are not divine Scripture; only Spirit-inspired writings are rightly called divine.'
    },
    {
        ID: 'FC451',
        Father: 'Glossa Ordinaria',
        Died_AD: 'c.12th century',
        Era: 'Medieval',
        Source_Work: 'Biblia cum glosa ordinaria et expositione Lyre litterali et morali',
        Source_Ref: 'British Museum IB.37895, Volume 1',
        Quote_Text:
            'The canonical books have been brought about through the dictation of the Holy Spirit. It is not known, however, at which time or by which authors the non-canonical or apocryphal books were produced. Since, nevertheless, they are very good and useful, and nothing is found in them which contradicts the canonical books, the church reads them and permits them to be read by the faithful for devotion and edification. Their authority, however, is not considered adequate for proving those things which come into doubt or contention, or for confirming the authority of ecclesiastical dogma, as blessed Jerome states in his prologue to Judith and to the books of Solomon. But the canonical books are of such authority that whatever is contained therein is held to be true firmly and indisputably, and likewise that which is clearly demonstrated from them',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apocrypha useful for devotion but inadequate for proving doctrine; canonical books alone are indisputable authority.'
    },
    {
        ID: 'FC452',
        Father: 'Cardinal Cajetan',
        Died_AD: 'c.1469-1534',
        Era: 'Post-Tridentine',
        Source_Work: 'Commentary on all the Authentic Historical Books of the Old Testament',
        Source_Ref:
            'Comments on the final chapter of Esther (as cited by William Whitaker, A Disputation on Holy Scripture, p. 48)',
        Quote_Text:
            'Here we close our commentaries on the historical books of the Old Testament. For the rest (that is, Judith, Tobit, and the books of Maccabees) are counted by St. Jerome out of the canonical books, and are placed among the Apocrypha, along with Wisdom and Ecclesiasticus, as is plain from the Prologus Galeatus. Nor be thou disturbed, like a raw scholar, if thou shouldest find anywhere, either in the sacred councils or the sacred doctors, these books reckoned canonical. For the words as well as of councils as of doctors are to be reduced to the correction of Jerome. Now, according to his judgment, in the epistle to the bishops Chromatius and Heliodorus, these books (and any other like books in the canon of the bible) are not canonical, that is, not in the nature of a rule for confirming matters of faith. Yet, they may be called canonical, that is, in the nature of a rule for the edification of the faithful, as being received and authorised in the canon of the bible for that purpose. By the help of this distinction thou mayest see thy way clear through that which Augustine says, and what is written in the provincial council of Carthage',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Cajetan follows Jerome: deuterocanonicals are canonical for edification but not for confirming faith.'
    },
    {
        ID: 'FC453',
        Father: 'Cardinal Ximenes',
        Died_AD: 'c.1436-1517',
        Era: 'Medieval',
        Source_Work: 'Preface to the Biblia Complutensia (Polyglot Bible)',
        Source_Ref:
            'As cited by B. F. Westcott, A General Survey of the History of the Canon of the New Testament, p. 470-471',
        Quote_Text:
            'The books, he writes, which are without the Canon, which the Church receives rather for the edification of the people than for the establishment of doctrine, are given only in Greek, but with a double translation',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Complutensian Polyglot separates Apocrypha from canonical books, following Jerome.'
    },
    {
        ID: 'FC454',
        Father: 'Sanctes Pagnini',
        Died_AD: 'c.1470-1538',
        Era: 'Post-Tridentine',
        Source_Work: 'Latin Bible (Lyons, 1528) and Jerome\'s Vulgate (Nuremberg, 1527, ed. Johannes Petreius)',
        Source_Ref: 'As cited by Bruce Metzger, An Introduction to the Apocrypha, p. 180',
        Quote_Text:
            "The earliest Latin version of the Bible in modern times, made from the original languages by the scholarly Dominican, Sanctes Pagnini, and published at Lyons in 1528, with commendatory letters from Pope Adrian VI and Pope Clement VII, sharply separates the text of the canonical books from the text of the Apocryphal books. Still another Latin Bible, this one an addition of Jerome's Vulgate published at Nuermberg by Johannes Petreius in 1527, presents the order of the books as in the Vulgate but specifies at the beginning of each Apocryphal book that it is not canonical. Furthermore, in his address to the Christian reader the editor lists the disputed books as 'Libri Apocryphi, sive non Canonici, qui nusquam apud Hebraeos extant'",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Pre-Reformation Latin Bibles by Pagnini (1528) and Petreius (1527) sharply separate canonical from apocryphal books.'
    },
    {
        ID: 'FC455',
        Father: 'St. Philaret of Moscow',
        Died_AD: 'c.1782-1867',
        Era: 'Post-Tridentine',
        Source_Work: 'The Longer Catechism of St Philaret of Moscow',
        Source_Ref: 'Questions 31-32',
        Quote_Text:
            '31. How many are the books of the Old Testament? St. Cyril of Jerusalem, St. Athanasius the Great, and St. John Damascene reckon them at twenty-two, agreeing therein with the Jews, who so reckon them in the original Hebrew tongue (St Athanasius, Ep. 30, De Test.; St John of Damascus, Theol. 4.17). 32. Why should we attend to the reckoning of the Hebrews? Because, as the Apostle Paul says, unto them were committed the oracles of God; and the sacred books of the Old Testament have been received from the Hebrew Church of that Testament by the Christian Church of the New (Rom. 3.2)',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Orthodox catechism: twenty-two OT books per Cyril, Athanasius, and John Damascene, following the Hebrew reckoning.'
    },
    {
        ID: 'FC456',
        Father: 'The New Catholic Encyclopedia',
        Died_AD: '1967',
        Era: 'Post-Tridentine',
        Source_Work: 'The Canon',
        Source_Ref: 'Volume 3, p. 29',
        Quote_Text:
            'St. Jerome distinguished between canonical books and ecclesiastical books. The latter he judged were circulated by the Church as good spiritual reading but were not recognized as authoritative Scripture. The situation remained unclear in the ensuing centuries. . . . For example, John of Damascus, Gregory the Great, Walafrid, Nicolas of Lyra and Tostado continued to doubt the canonicity of the deuterocanonical books. According to Catholic doctrine, the proximate criterion of the biblical canon is the infallible decision of the Church. This decision was not given until rather late in the history of the Church at the Council of Trent. The Council of Trent definitively settled the matter of the Old Testament Canon. That this had not been done previously is apparent from the uncertainty that persisted up to the time of Trent',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'NCE admits Jerome\'s distinction, patristic doubt of deuterocanonicals, and that Trent was late in settling the OT canon.'
    },
    {
        ID: 'FC457',
        Father: 'B. F. Westcott',
        Died_AD: 'c.1825-1901',
        Era: 'Post-Tridentine',
        Source_Work: 'A General Survey of the History of the Canon of the New Testament',
        Source_Ref: 'p. 478',
        Quote_Text:
            'This fatal decree, in which the Council . . . gave a new aspect to the whole question of, the Canon, was ratified by fifty-three prelates, among whom there was not one German, not one scholar distinguished for historical learning, not one who was fitted by special study for the examination of a subject in which the truth could only be determined by the voice of antiquity. How completely the decision was opposed to the spirit and letter of the original judgments of the Greek and Latin Churches, how far in the doctrinal equalization of the disputed and acknowledged books of the Old Testament it was at variance with the traditional opinion of the West, how absolutely unprecedented was the conversion of an eccelesiatical usage into an article of belief, will be seen from the evidence which has already been adduced',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Westcott on Trent\'s canon decree: opposed to antiquity, unprecedented as article of belief. While Hippo and Carthage were similar to Trent, they included 1 Esdras as canonical which Trent excluded.'
    },
    {
        ID: 'FC458',
        Father: 'Bruce Metzger',
        Died_AD: 'c.1914-2007',
        Era: 'Post-Tridentine',
        Source_Work: 'The Canon of the New Testament: Its Origin, Development, and Significance',
        Source_Ref: 'p. 246',
        Quote_Text:
            'Finally on 8 April 1546, by a vote of 24 to 15, with 16 abstentions, the Council issued a decree (De Canonicis Scripturis) in which, for the first time in the history of the Church, the question of the contents of the Bible was made an absolute article of faith and confirmed by an anathema',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Only 44% of Trent voters favored treating the Apocrypha as canonical (24 of 55 voting).'
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

    if (toAdd.length === 0) {
        console.log('All OT canon quotes already present in CSV.');
        return;
    }

    const skipped = NEW_QUOTES.length - toAdd.length;
    if (skipped > 0) {
        console.log(`Skipping ${skipped} duplicate(s).`);
    }

    const suffix = csv.endsWith('\n') ? '' : '\n';
    const lines = toAdd.map(rowToCsv).join('\n');
    fs.appendFileSync(CSV_PATH, `${suffix}${lines}\n`, 'utf8');
    console.log(`Added ${toAdd.length} quotes (${toAdd.map((r) => r.ID).join(', ')})`);
}

main();
