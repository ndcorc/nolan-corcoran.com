/**
 * Append Sola Scriptura / Sufficiency of Scripture quotes to CSV (idempotent by legacy ID).
 * Skips quotes already present under other IDs (matched by distinctive text).
 */
import fs from 'fs';
import path from 'path';
import {
    parsePatristicQuotesCsv,
    type PatristicQuoteCsvRow
} from './lib/patristicQuotesCsv';

const CSV_PATH = path.join(process.cwd(), 'data/patristic_quotes_complete.csv');

const SUBTOPICS = 'Sufficiency of Scripture|Sola Scriptura';

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC315',
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'On the Resurrection',
        Source_Ref: 'Chapter 1',
        Quote_Text:
            'The word of truth is free, and carries its own authority, disdaining to fall under any skillful argument, or to endure the logical scrutiny of its hearers. But it would be believed for its own nobility, and for the confidence due to Him who sends it. Now the word of truth is sent from God; wherefore the freedom claimed by the truth is not arrogant. For being sent with authority, it were not fit that it should be required to produce proof of what is said; since neither is there any proof beyond itself, which is God. For every proof is more powerful and trustworthy than that which it proves. . . . So also we refer all that is said regarding men and the world to the truth, and by it judge whether it be worthless or no. But the utterances of truth we judge by no separate test, giving full credit to itself. And God, the Father of the universe, who is the perfect intelligence, is the truth',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture carries its own authority; truth is judged by no test beyond itself.'
    },
    {
        ID: 'FC316',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 1, Chapter 8, Section 1',
        Quote_Text:
            'Such, then, is their system, which neither the prophets announced, nor the Lord taught, nor the apostles delivered, but of which they boast that beyond all others they have a perfect knowledge. They gather their views from other sources than the Scriptures',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Heretics derive doctrine from sources other than Scripture.'
    },
    {
        ID: 'FC317',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 1, Section 1',
        Quote_Text:
            "We have learned from none others the plan of our salvation, than from those through whom the Gospel has come down to us, which they did at one time proclaim in public, and, at a later period, by the will of God, handed down to us in the Scriptures, to be the ground and pillar of our faith. For it is unlawful to assert that they preached before they possessed 'perfect knowledge,' as some do even venture to say, boasting themselves as improvers of the apostles",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptures are the ground and pillar of faith handed down by the apostles.'
    },
    {
        ID: 'FC318',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 2, Section 1',
        Quote_Text:
            'When, however, they are confuted from the Scriptures, they turn round and accuse these same Scriptures, as if they were not correct, nor of authority, and [assert] that they are ambiguous, and that the truth cannot be extracted from them by those who are ignorant of tradition. For [they allege] that the truth was not delivered by means of written documents, but vivâ voce',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Heretics impugn Scripture when confuted; truth is sought from Scripture not oral tradition alone.'
    },
    {
        ID: 'FC319',
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, Chapter 12, Section 9',
        Quote_Text:
            'Taking this into account, that proofs [of the things which are] contained in the Scriptures cannot be shown except from the Scriptures themselves',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scriptural proofs must be drawn from Scripture itself.'
    },
    {
        ID: 'FC320',
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: '7.16',
        Quote_Text:
            'But those who are ready to toil in the most excellent pursuits, will not desist from the search after truth, till they get the demonstration from the Scriptures themselves',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Truth is demonstrated from the Scriptures themselves.'
    },
    {
        ID: 'FC321',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'On Idolatry',
        Source_Ref: 'Chapter 4',
        Quote_Text:
            'And why should I, a man of limited memory, suggest anything further? Why recall anything more from the Scriptures? As if either the voice of the Holy Spirit were not sufficient; or else any further deliberation were needful, whether the Lord cursed and condemned by priority the artificers of those things, of which He curses and condemns the worshippers',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'The voice of the Holy Spirit in Scripture is sufficient; no further proof needed.'
    },
    {
        ID: 'FC322',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Hermogenes',
        Source_Ref: 'Chapter 20',
        Quote_Text:
            'What, therefore, did not exist, the Scripture was unable to mention; and by not mentioning it, it has given us a clear proof that there was no such thing: for if there had been, the Scripture would have mentioned it',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture’s silence proves the non-existence of what it does not mention.'
    },
    {
        ID: 'FC323',
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Hermogenes',
        Source_Ref: 'Chapter 22',
        Quote_Text:
            'If it is nowhere written, then let it fear the woe which impends on all who add to or take away from the written word',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'What is not written must not be added to the written word.'
    },
    {
        ID: 'FC324',
        Father: 'Hippolytus',
        Died_AD: 'c.235',
        Era: 'Greek Patristic',
        Source_Work: 'Against Noetus',
        Source_Ref: 'Chapter 9',
        Quote_Text:
            'There is, brethren, one God, the knowledge of whom we gain from the Holy Scriptures, and from no other source. . . . So all of us who wish to practice piety will be unable to learn its practice from any other quarter than the oracles of God. Whatever things, then, the Holy Scriptures declare, at these let us look; and whatever things they teach, these let us learn',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Knowledge of God and piety are learned from Holy Scripture alone.'
    },
    {
        ID: 'FC325',
        Father: 'Cyprian',
        Died_AD: 'c.200-258',
        Era: 'Latin Patristic',
        Source_Work: 'Epistle 62',
        Source_Ref: 'Chapter 14',
        Quote_Text:
            "For if in the sacrifice which Christ offered none is to be followed but Christ, assuredly it behooves us to obey and do that which Christ did, and what He commanded to be done, since He Himself says in the Gospel, 'If ye do whatsoever I command you, henceforth I call you not servants, but friends.' And that Christ alone ought to be heard, the Father also testifies from heaven, saying, 'This is my well-beloved Son, in whom I am well pleased; hear ye Him.' Wherefore, if Christ alone must be heard, we ought not to give heed to what another before us may have thought was to be done, but what Christ, who is before all, first did. Neither is it becoming to follow the practice of man, but the truth of God; since God speaks by Isaiah the prophet, and says, 'In vain do they worship me, teaching the commandments and doctrines of men.' And again the Lord in the Gospel repeats this same saying, and says, 'Ye reject the commandment of God, that ye may keep your own tradition.' Moreover, in another place He establishes it, saying, 'Whosoever shall break one of these least commandments, and shall teach men so, he shall be called the least in the kingdom of heaven.' But if we may not break even the least of the Lord's commandments, how much rather is it forbidden to infringe such important ones, so great, so pertaining to the very sacrament of our Lord's passion and our own redemption, or to change it by human tradition into anything else than what was divinely appointed!",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ alone must be heard; human tradition must not override divine commandment.'
    },
    {
        ID: 'FC326',
        Father: 'Archelaus',
        Died_AD: 'c.278',
        Era: 'Greek Patristic',
        Source_Work: 'The Acts of the Disputation with the Heresiarch Manes',
        Source_Ref: 'Chapter 40',
        Quote_Text:
            "You well understand, no doubt, that those who seek to set up any new dogma have the habit of very readily perverting into a conformity with their own notions any proofs they desire to take from the Scriptures. In anticipation, however, of this, the apostolic word marks out the case thus: 'If any one preach any other gospel unto you than that which you have received, let him be accursed.' And consequently, in addition to what has been once committed to us by the apostles, a disciple of Christ ought to receive nothing new as doctrine",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'No new doctrine beyond what the apostles committed; Scripture guards against perversion.'
    },
    {
        ID: 'FC327',
        Father: 'Hilary of Poitiers',
        Died_AD: 'c.315-368',
        Era: 'Latin Patristic',
        Source_Work: 'On the Trinity',
        Source_Ref: 'Book 1, Chapter 18',
        Quote_Text:
            'For he is the best student who does not read his thoughts into the book, but lets it reveal its own; who draws from it its sense, and does not import his own into it, nor force upon its words a meaning which he had determined was the right one before he opened its pages. Since then we are to discourse of the things of God, let us assume that God has full knowledge of Himself, and bow with humble reverence to His words. For He Whom we can only know through His own utterances is the fitting witness concerning Himself',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture must reveal its own sense; we must not impose predetermined meanings.'
    },
    {
        ID: 'FC328',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: '39th Festal Letter',
        Source_Ref: '',
        Quote_Text:
            "These are fountains of salvation, that they who thirst may be satisfied with the living words they contain. In these alone is proclaimed the doctrine of godliness. Let no man add to these, neither let him take ought from these. For concerning these the Lord put to shame the Sadducees, and said, 'Ye do err, not knowing the Scriptures.' And He reproved the Jews, saying, 'Search the Scriptures, for these are they that testify of Me'",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Scripture as fountains of salvation; nothing may be added or taken away.'
    },
    {
        ID: 'FC329',
        Father: 'Athanasius',
        Died_AD: 'c.296-373',
        Era: 'Greek Patristic',
        Source_Work: 'Ad Episcopus Aegypti et Libyae',
        Source_Ref: 'Chapter 4',
        Quote_Text:
            'Now one might write at great length concerning these things, if one desired to go into details respecting them; for the impiety and perverseness of heresies will appear to be manifold and various, and the craft of the deceivers to be very terrible. But since holy Scripture is of all things most sufficient for us, therefore recommending to those who desire to know more of these matters, to read the Divine word',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scripture is most sufficient; the divine word suffices for knowing truth.'
    },
    {
        ID: 'FC330',
        Father: 'Basil of Caesarea',
        Died_AD: 'c.330-379',
        Era: 'Greek Patristic',
        Source_Work: 'Moralia',
        Source_Ref: 'Chapter 72',
        Quote_Text:
            'The hearers taught in the Scriptures ought to test what is said by teachers and accept that which agrees with the Scriptures but reject that which is foreign',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Teachers must be tested by Scripture; only what agrees with Scripture is accepted.'
    },
    {
        ID: 'FC331',
        Father: 'Basil of Caesarea',
        Died_AD: 'c.330-379',
        Era: 'Greek Patristic',
        Source_Work: 'Letter 189',
        Source_Ref: 'Section 3',
        Quote_Text:
            'Therefore let God-inspired Scripture decide between us; and on whichever side be found doctrines in harmony with the word of God, in favour of that side will be cast the vote of truth',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'God-inspired Scripture decides doctrinal disputes.'
    },
    {
        ID: 'FC332',
        Father: 'Basil of Caesarea',
        Died_AD: 'c.330-379',
        Era: 'Greek Patristic',
        Source_Work: 'Letter 283',
        Source_Ref: '',
        Quote_Text:
            'Enjoying as you do the consolation of the Holy Scriptures, you stand in need neither of my assistance nor of that of anybody else to help you to comprehend your duty. You have the all-sufficient counsel and guidance of the Holy Spirit to lead you to what is right',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scriptures provide all-sufficient counsel for duty.'
    },
    {
        ID: 'FC333',
        Father: 'Basil of Caesarea',
        Died_AD: 'c.330-379',
        Era: 'Greek Patristic',
        Source_Work: 'The Morals',
        Source_Ref: 'Rule 26 (The Fathers of the Church, Volume 9, Ascetical Works, p. 106)',
        Quote_Text:
            'Rule Twenty–six: That every word and deed should be ratified by the testimony of the Holy Scripture to confirm the good and cause shame to the wicked',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Every word and deed must be ratified by Holy Scripture.'
    },
    {
        ID: 'FC334',
        Father: 'Cyril of Jerusalem',
        Died_AD: 'c.313-386',
        Era: 'Greek Patristic',
        Source_Work: 'Catechetical Lectures',
        Source_Ref: 'Lecture 12, Chapter 5',
        Quote_Text:
            'Now mind not my argumentations, for perhaps you may be misled but unless thou receive testimony of the Prophets on each matter, believe not what I say: unless thou learn from the Holy Scriptures concerning the Virgin, and the place, the time, and the manner, receive not testimony from man. For one who at present thus teaches may possibly be suspected: but what man of sense will suspect one that prophesied a thousand and more years beforehand? If then you seek the cause of Christ’s coming, go back to the first book of the Scriptures',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Do not believe teaching without prophetic and scriptural testimony.'
    },
    {
        ID: 'FC335',
        Father: 'Nemesius of Emesa',
        Died_AD: 'c.390',
        Era: 'Greek Patristic',
        Source_Work: 'On the Nature of Man',
        Source_Ref: 'Chapter 2, Of the Soul',
        Quote_Text:
            'But for us the sufficient demonstration of the soul’s immortality is the teaching of Holy Scripture, which is self-authenticating because [it is] inspired of God',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scripture is self-authenticating as God-inspired.'
    },
    {
        ID: 'FC336',
        Father: 'Gregory of Nyssa',
        Died_AD: 'c.335-395',
        Era: 'Greek Patristic',
        Source_Work: 'On the Soul and the Resurrection',
        Source_Ref: '',
        Quote_Text:
            'And who, she replied, could deny that truth is to be found only in that upon which the seal of Scriptural testimony is set? So, if it is necessary that something from the Gospels should be adduced in support of our view, a study of the Parable of the Wheat and Tares will not be here out of place',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Truth is found only where Scriptural testimony is set (Macrina).'
    },
    {
        ID: 'FC337',
        Father: 'Gregory of Nyssa',
        Died_AD: 'c.335-395',
        Era: 'Greek Patristic',
        Source_Work: 'De Cognitione Dei',
        Source_Ref: 'PG 46.1115',
        Quote_Text:
            'Whatever is not supported by the testimony of Scripture we reject as false',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Latin: Cum id nullo Scripturæ testimonio fultum sit, ut falsum improbabimus.'
    },
    {
        ID: 'FC338',
        Father: 'Gregory of Nyssa',
        Died_AD: 'c.335-395',
        Era: 'Greek Patristic',
        Source_Work: 'Against Eunomius',
        Source_Ref: 'Book 2, Chapter 9',
        Quote_Text:
            'Let him tell us whence he has this boldness of assertion. From what inspired utterance? What evangelist, what apostle ever uttered such words as these? What prophet, what lawgiver, what patriarch, what other person of all who were divinely moved by the Holy Ghost, whose voices are preserved in writing, ever originated such a statement as this?',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Doctrines must be grounded in inspired written utterances of Scripture.'
    },
    {
        ID: 'FC339',
        Father: 'Ambrose',
        Died_AD: 'c.340-397',
        Era: 'Latin Patristic',
        Source_Work: 'On the Duties of the Clergy',
        Source_Ref: '1.23.102',
        Quote_Text: 'For how can we adopt those things which we do not find in the holy Scriptures?',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'We may not adopt what is not found in holy Scripture.'
    },
    {
        ID: 'FC340',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'Panarion',
        Source_Ref: 'Book 1, Chapter 31 Against Valentinians, Section 34.1-2 (Brill Edition, p. 206)',
        Quote_Text:
            'Secondly, their myths are unprovable since no scripture has said these things—neither the Law of Moses nor any prophet after Moses, neither the Savior nor his evangelists, and certainly not the apostles. If these things were true, the Lord who came to enlighten the world, and the prophets before him, would have told us things of this sort in plain language—and then the apostles too',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Unscriptural myths are unprovable; Scripture would have declared them plainly.'
    },
    {
        ID: 'FC341',
        Father: 'Epiphanius',
        Died_AD: 'c.315-403',
        Era: 'Greek Patristic',
        Source_Work: 'Panarion',
        Source_Ref: 'Books 2 and 3, Chapter 76 Against Anomoeans, Section 41.2 (Brill Edition, p. 562)',
        Quote_Text:
            'For since none of the ancient apostles or prophets in the Old and New Testaments held this opinion, you are asserting your superiority to God himself, and your unshakeability',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Doctrines absent from OT/NT apostles and prophets claim superiority to God.'
    },
    {
        ID: 'FC342',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Second Corinthians',
        Source_Ref: 'Homily 13',
        Quote_Text:
            'Wherefore I exhort and entreat you all, disregard what this man and that man thinks about these things, and inquire from the Scriptures all these things; and having learned what are the true riches, let us pursue after them that we may obtain also the eternal good things',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Disregard human opinion; inquire from the Scriptures.'
    },
    {
        ID: 'FC343',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Against Helvidius',
        Source_Ref: 'Chapter 21',
        Quote_Text: 'But as we do not deny what is written, so we do reject what is not written',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'What is not written is rejected.'
    },
    {
        ID: 'FC344',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Haggai',
        Source_Ref: '1:11 (PL 25.1398)',
        Quote_Text:
            'The sword of God smites whatever they draw and forge from a pretended (quasi) apostolic tradition, without the authority and testimony of the Scriptures',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Pretended apostolic tradition without scriptural authority is condemned.'
    },
    {
        ID: 'FC345',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'The Homilies of St. Jerome on the Psalms',
        Source_Ref: 'Homily 18 (The Fathers of the Church, Volume 48, p. 142-143)',
        Quote_Text:
            "In the sacred writings, in His Scripture that is read to all peoples in order that all may know. Thus the apostles have written; thus the Lord Himself has spoken, not merely for a few, but that all might know and understand. Plato wrote books, but he did not write for all people but only for a few, for there are not many more than two or three men who know him. But the princes of the Church and the princes of Christ did not write only for the few, but for everyone without exception. 'And princes': the apostles and evangelists. 'Of those who have been born in her.' Note 'who have been' and not 'who are.' That is to make sure that, with the exception of the apostles, whatever else is said afterwards should be removed and not, later on, hold the force of authority. No matter how holy anyone may be after the time of the apostles, no matter how eloquent, he does not have authority",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Only apostolic writings hold binding authority; post-apostolic teachers do not.'
    },
    {
        ID: 'FC346',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Of the Good of Widowhood',
        Source_Ref: 'Chapter 2',
        Quote_Text:
            'What more shall I teach you than what we read in the apostles? For Holy Scripture fixes the rule for our doctrine, lest we dare be wiser than we ought. Therefore I should not teach you anything else except to expound to you the words of the Teacher',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scripture fixes the rule for doctrine.'
    },
    {
        ID: 'FC347',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Letter 82',
        Source_Ref: '3.24',
        Quote_Text:
            'It is to the canonical Scriptures alone that I am bound to yield such implicit subjection as to follow their teaching, without admitting the slightest suspicion that in them any mistake or any statement intended to mislead could find a place',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Implicit subjection owed to canonical Scripture alone.'
    },
    {
        ID: 'FC348',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Letter 148',
        Source_Ref: '15',
        Quote_Text:
            'For the reasonings of any men whatsoever, even though they be Catholics, and of high reputation, are not to be treated by us in the same way as the canonical Scriptures are treated. We are at liberty, without doing any violence to the respect which these men deserve, to condemn and reject anything in their writings, if perchance we shall find that they have entertained opinions differing from that which others or we ourselves have, by the divine help, discovered to be the truth. I deal thus with the writings of others, and I wish my intelligent readers to deal thus with mine',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Patristic writings are not treated like canonical Scripture.'
    },
    {
        ID: 'FC349',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'On Baptism, Against the Donatists',
        Source_Ref: 'Book 2, Chapter 3',
        Quote_Text:
            'You are wont, indeed, to bring up against us the letters of Cyprian, his opinion, his Council; why do ye claim the authority of Cyprian for your schism, and reject his example when it makes for the peace of the Church? But who can fail to be aware that the sacred canon of Scripture, both of the Old and New Testament, is confined within its own limits, and that it stands so absolutely in a superior position to all later letters of the bishops, that about it we can hold no manner of doubt or disputation whether what is confessedly contained in it is right and true; but that all the letters of bishops which have been written, or are being written, since the closing of the canon, are liable to be refuted if there be anything contained in them which strays from the truth, either by the discourse of some one who happens to be wiser in the matter than themselves, or by the weightier authority and more learned experience of other bishops, by the authority of Councils; and further, that the Councils themselves, which are held in the several districts and provinces, must yield, beyond all possibility of doubt, to the authority of plenary Councils which are formed for the whole Christian world; and that even of the plenary Councils, the earlier are often corrected by those which follow them, when, by some actual experiment, things are brought to light which were before concealed, and that is known which previously lay hid, and this without any whirlwind of sacrilegious pride, without any puffing of the neck through arrogance, without any strife of envious hatred, simply with holy humility, catholic peace, and Christian charity?',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sacred canon of Scripture stands absolutely superior to later bishops, councils, and letters.'
    },
    {
        ID: 'FC350',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'On Nature and Grace',
        Source_Ref: 'Chapter 71',
        Quote_Text:
            'Especially as in writings of such authors I feel myself free to use my own judgment (owing unhesitating assent to nothing but the canonical Scriptures), whilst in fact there is not a passage which he has quoted from the works of this anonymous author that disturbs me',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Unhesitating assent owed to nothing but canonical Scripture.'
    },
    {
        ID: 'FC351',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Reply to Faustus the Manichaean',
        Source_Ref: 'Book 11, Chapter 5',
        Quote_Text:
            'As regards our writings, which are not a rule of faith or practice, but only a help to edification, we may suppose that they contain some things falling short of the truth in obscure and recondite matters, and that these mistakes may or may not be corrected in subsequent treatises. . . . Such writings are read with the right of judgment, and without any obligation to believe. In order to leave room for such profitable discussions of difficult questions, there is a distinct boundary line separating all productions subsequent to apostolic times from the authoritative canonical books of the Old and New Testaments. . . . In the innumerable books that have been written latterly we may sometimes find the same truth as in Scripture, but there is not the same authority. Scripture has a sacredness peculiar to itself. In other books the reader may form his own opinion, and perhaps, from not understanding the writer, may differ from him, and may pronounce in favor of what pleases him, or against what he dislikes. In such cases, a man is at liberty to withhold his belief, unless there is some clear demonstration or some canonical authority to show that the doctrine or statement either must or may be true. But in consequence of the distinctive peculiarity of the sacred writings, we are bound to receive as true whatever the canon shows to have been said by even one prophet, or apostle, or evangelist. Otherwise, not a single page will be left for the guidance of human fallibility, if contempt for the wholesome authority of the canonical books either puts an end to that authority altogether, or involves it in hopeless confusion',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Post-apostolic writings are not rule of faith; canonical Scripture alone binds belief.'
    },
    {
        ID: 'FC352',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Reply to Faustus the Manichaean',
        Source_Ref: 'Book 13, Chapter 5',
        Quote_Text:
            'This shows that the established authority of Scripture must outweigh every other; for it derives new confirmation from the progress of events which happen, as Scripture proves, in fulfillment of the predictions made so long before their occurrence',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Established authority of Scripture outweighs every other authority.'
    },
    {
        ID: 'FC353',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Reply to Faustus the Manichaean',
        Source_Ref: 'Book 23, Chapter 9',
        Quote_Text: 'In the matters of which we are now treating, only the canonical writings have any weight with us',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Only canonical writings have weight in doctrinal matters.'
    },
    {
        ID: 'FC354',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'De Cresconium',
        Source_Ref: '2.39–40 (as cited in A.D.R. Polman, The Word of God According to St. Augustine, p. 65)',
        Quote_Text:
            'We do no injustice to Cyprian when we make a distinction between his epistles and the canonical authority of the divine Scriptures. Apart from the Sacred canonical Scriptures, we may freely pass judgment on the writings of believers and disbelievers alike',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apart from canonical Scripture, patristic and other writings may be freely judged.'
    },
    {
        ID: 'FC355',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'The Unity of the Church',
        Source_Ref: '(as cited in Martin Chemnitz, An Examination of the Council of Trent, Volume 1, p. 157)',
        Quote_Text:
            'Let us not hear: This I say, this you say; but, thus says the Lord. Surely it is the books of the Lord on whose authority we both agree and which we both believe. There let us seek the church, there let us discuss our case. . . . Let those things be removed from our midst which we quote against each other not from divine canonical books but from elsewhere. Someone may perhaps ask: Why do you want to remove these things from the midst? Because I do not want the holy church proved by human documents but by divine oracles',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'The church is proved by divine oracles of canonical Scripture, not human documents.'
    },
    {
        ID: 'FC356',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'The Unity of the Church',
        Source_Ref: '(PL 43.429-430; as cited in William Goode, The Divine Rule of Faith and Practice, Volume 2, p. 428-429)',
        Quote_Text:
            'We ought to find the Church, as the Head of the Church, in the holy canonical Scriptures, not to inquire for it in the various reports, and opinions, and deeds, and words, and visions of men. . . . Whether they (i.e. the Donatists) hold the Church, they must show by the canonical books of the Divine Scriptures alone; for we do not say that we must be believed because we are in the Church of Christ, because Optatus of Milevi, or Ambrose of Milan, or innumerable other bishops of our communion, commended that Church to which we belong; or because it is extolled by the councils of our colleagues, or because through the whole world, in the holy places which those of our communion frequent, such wonderful answers to prayer or cures happen. . . . Whatever things of this kind take place in the Catholic Church, are therefore to be approved of, because they take place in the Catholic Church; but it is not proved to be the Catholic Church, because these things happen to be in it',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'The true church is identified by canonical Scripture alone, not miracles or human testimony.'
    },
    {
        ID: 'FC357',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'The City of God',
        Source_Ref: 'Book 11, Chapter 3',
        Quote_Text:
            'This Mediator, having spoken what He judged sufficient first by the prophets, then by His own lips, and afterwards by the apostles, has besides produced the Scripture which is called canonical, which has paramount authority, and to which we yield assent in all matters of which we ought not to be ignorant, and yet cannot know of ourselves',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Canonical Scripture has paramount authority for all necessary knowledge.'
    },
    {
        ID: 'FC358',
        Father: 'Theophilus of Alexandria',
        Died_AD: 'c.385-412',
        Era: 'Greek Patristic',
        Source_Work: 'Epistle 96',
        Source_Ref: 'PL 22.778',
        Quote_Text:
            'It would be the instigation of a demonical spirit to follow the conceits of the human mind, and to think anything divine, beyond what has the authority of the Scriptures',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Nothing divine may be held beyond what has scriptural authority.'
    },
    {
        ID: 'FC359',
        Father: 'Cyril of Alexandria',
        Died_AD: 'c.376-444',
        Era: 'Greek Patristic',
        Source_Work: 'De Sacrosancta Trinitate',
        Source_Ref: 'Chapter 1',
        Quote_Text:
            'All things, therefore, that have been delivered to us by the Law, and Prophets, and Apostles, we receive, and acknowledge, and confess; and beyond these, we seek not to know anything. For it is impossible for us to say, or at all think anything concerning God, beyond what has been divinely declared by the divine oracles of the Old and New Testament',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Knowledge of God is bounded by OT/NT divine oracles.'
    },
    {
        ID: 'FC360',
        Father: 'Theodoret',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue 1',
        Source_Ref: '',
        Quote_Text: 'Do not, I beg you, bring in human reason. I shall yield to scripture alone',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Yield to Scripture alone, not human reason.'
    },
    {
        ID: 'FC361',
        Father: 'Rupert of Deutz',
        Died_AD: 'c.1075-1129',
        Era: 'Medieval',
        Source_Work: 'De Omnipotentia Dei',
        Source_Ref: '(as cited in George Tavard, Holy Writ or Holy Church, p. 13)',
        Quote_Text:
            'Whatever may be arrived at outside of the rule of the Holy Scriptures, nobody can lawfully demand from a Catholic',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Nothing outside the rule of Holy Scripture may be demanded of Catholics.'
    },
    {
        ID: 'FC362',
        Father: 'Rupert of Deutz',
        Died_AD: 'c.1075-1129',
        Era: 'Medieval',
        Source_Work: 'Commentary on the Apocalypse',
        Source_Ref: '(as cited in Clark Pinnock, Biblical Revelation, p. 152)',
        Quote_Text:
            'Let us search for wisdom, let us consult sacred Scripture itself, apart from which nothing can be found, nothing can be said which is solid or certain',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apart from sacred Scripture nothing solid or certain can be found.'
    },
    {
        ID: 'FC363',
        Father: 'Gratian',
        Died_AD: 'c.1170',
        Era: 'Medieval',
        Source_Work: 'Decretum',
        Source_Ref: 'P. I, d. 9, c. 8 (as cited in George Tavard, Holy Writ or Holy Church, p. 16)',
        Quote_Text:
            'Who does not know that the holy canonical Scripture is contained within definite limits and that it has precedence over all letters of subsequent bishops?',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Canonical Scripture has definite limits and precedence over later episcopal letters.'
    },
    {
        ID: 'FC364',
        Father: 'Glossa Ordinaria',
        Died_AD: 'c.12th century',
        Era: 'Medieval',
        Source_Work: 'Glossa Ordinaria',
        Source_Ref: 'British Museum IB.37895, Volume 1',
        Quote_Text:
            'But the canonical books are of such authority that whatever is contained therein is held to be true firmly and indisputably, and likewise that which is clearly demonstrated from them. For just as in philosophy a truth is known through reduction to self-evident first principles, so too, in the writings handed down from holy teachers, the truth is known, as far as those things that must be held by faith, through reduction to the canonical scriptures that have been produced by divine revelation, which can contain nothing false. Hence, concerning them Augustine says to Jerome: To those writers alone who are called canonical I have learned to offer this reverence and honor: I hold most firmly that none of them has made an error in writing',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Faith-truth is known by reduction to canonical Scripture; Gloss cites Augustine on canonical inerrancy.'
    },
    {
        ID: 'FC365',
        Father: 'Thomas Aquinas',
        Died_AD: 'c.1274',
        Era: 'Medieval',
        Source_Work: 'Commentary on John',
        Source_Ref: 'XXI.24-25, paragraph 2656',
        Quote_Text:
            'The canonical scriptures alone are the rule (measure) of faith [Sola canonica scriptura est regula fidei]',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Latin: Sola canonica scriptura est regula fidei.'
    },
    {
        ID: 'FC366',
        Father: 'Thomas Aquinas',
        Died_AD: 'c.1274',
        Era: 'Medieval',
        Source_Work: 'Truth (Quaestiones Disputatae de Veritate)',
        Source_Ref: 'Question 14, Article 10, 11 (James V. McGlynn trans., p. 258)',
        Quote_Text:
            'We believe the prophets and apostles because the Lord has been their witness by performing miracles. . . . And we believe the successors of the apostles and prophets only in so far as they tell us those things which the apostles and prophets have left in their writings',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Apostolic successors are believed only insofar as they teach what is in apostolic writings.'
    },
    {
        ID: 'FC367',
        Father: 'Henry of Ghent',
        Died_AD: 'c.1293',
        Era: 'Medieval',
        Source_Work: 'Various',
        Source_Ref: '(as cited in Hermann Schüssler, Der Primat der Heiligen Schrift, p. 57; Reformation Theology, ed. Matthew Barrett, p. 151)',
        Quote_Text:
            'We must believe the Holy Scriptures simply and absolutely more than the church because the truth in Scripture is always kept steadfast and unchangeable and no one is allowed to add to, subtract from, or change it',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Holy Scripture is to be believed above the church; its truth is unchangeable.'
    },
    {
        ID: 'FC368',
        Father: 'Duns Scotus',
        Died_AD: 'c.1266-1308',
        Era: 'Medieval',
        Source_Work: 'Prologus in Sententiarum',
        Source_Ref: 'qu. 2 (as cited in Richard Field, Of the Church, Volume 2, p. 127-128)',
        Quote_Text:
            'Whatsoever pertaineth to the heavenly and supernatural knowledge, and is necessary to be known of man in this life, is sufficiently delivered in the sacred scriptures',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Latin: Patet quod sacra scriptura sufficienter continet doctrinam necessariam viatori.'
    },
    {
        ID: 'FC369',
        Father: 'Duns Scotus',
        Died_AD: 'c.1266-1308',
        Era: 'Medieval',
        Source_Work: 'Prologus in Sententiarum',
        Source_Ref: 'qu. 3, ad tertiam qu. (as cited in Richard Field, Of the Church, Volume 2, p. 128)',
        Quote_Text:
            'As the theology of those blessed ones that are in heaven hath a certain bound, without and beyond which it extendeth not itself; so also, that theological knowledge that we have, hath bounds set unto it by the will of God, that revealeth divine and heavenly truth unto us ; and the bound prefixed by the will of God, who generally will reveal no more, is within the compass of such things as are found in the holy scripture; because, as it is in the last of the Revelation, Whosoever shall add unto these things, God shall add unto him the plagues that are added in this book',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Theological knowledge for pilgrims is bounded by holy Scripture.'
    },
    {
        ID: 'FC370',
        Father: 'William of Ockham',
        Died_AD: 'c.1347',
        Era: 'Medieval',
        Source_Work: 'Prologus in Sententiarum',
        Source_Ref: 'part I, c. i (as cited in Richard Field, Of the Church, Volume 2, p. 128)',
        Quote_Text:
            'There is one opinion, that only those verities are to be esteemed catholic, and such as are necessarily to be believed for the attaining of salvation, which either expressly are delivered in scripture, or by necessary consequence may be inferred from things so expressed; and that they that follow this opinion, allege sundry authorities for proof of the same, as that of Augustine',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Catholic verities necessary for salvation are those in or necessarily inferred from Scripture.'
    },
    {
        ID: 'FC371',
        Father: 'Jean Gerson',
        Died_AD: '1363-1429',
        Era: 'Medieval',
        Source_Work: 'On the Hussites',
        Source_Ref: '(as cited in Heiko A. Oberman, Forerunners of the Reformation, p. 289)',
        Quote_Text:
            "Yes, O horror, even in France. . . . They disseminate heresies and oppose the truth which they acknowledge or should acknowledge, since they call themselves Catholics; they say that their doctrines are based on Scripture and Scripture's literal sense, which they call 'Scripture alone'",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Gerson reports Hussites appealing to Scripture alone and literal sense.'
    },
    {
        ID: 'FC372',
        Father: 'John Henry Newman',
        Died_AD: '1801-1890',
        Era: 'Post-Tridentine',
        Source_Work: 'Letter to Rev. R. H. Froude',
        Source_Ref: 'August 23, 1835 (Letters And Correspondence, Volume 2, p. 126-127)',
        Quote_Text:
            'The more I read of Athanasius, Theodoret, &c., the more I see that the ancients did make the Scriptures the basis of their belief. . . . when they met together in council they brought the witness of tradition as a matter of fact, but when they discussed the matter in council, cleared their views, &c., proved their power, they always went to Scripture alone',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Newman: patristic councils ultimately appealed to Scripture alone in doctrinal discussion.'
    },
    {
        ID: 'FC373',
        Father: 'John Henry Newman',
        Died_AD: '1801-1890',
        Era: 'Post-Tridentine',
        Source_Work: 'Letter to F. Rogers',
        Source_Ref: 'August 31, 1837 (Letters And Correspondence, Volume 2, p. 243)',
        Quote_Text:
            'All I have said is, that the Fathers do appeal in all their controversies to Scriptures as a final authority. When this occurs once only it may be an accident. When it occurs again and again uniformly, it does invest Scripture with the character of an exclusive Rule of Faith',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Newman: uniform patristic appeal to Scripture as final authority makes it exclusive rule of faith.'
    },
    {
        ID: 'FC374',
        Father: 'George Tavard',
        Died_AD: '1922-2007',
        Era: 'Post-Tridentine',
        Source_Work: 'Holy Writ or Holy Church',
        Source_Ref: 'p. 20',
        Quote_Text:
            "The greatest centuries of the Middle Ages—twelfth and thirteenth—were thus faithful to the patristic concept of 'Scripture alone'",
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Tavard: high medieval theology retained patristic Scripture-alone concept.'
    },
    {
        ID: 'FC375',
        Father: 'Alister E. McGrath',
        Died_AD: '1953-',
        Era: 'Post-Tridentine',
        Source_Work: 'The Intellectual Origins of the European Reformation',
        Source_Ref: '2nd edition, p. 144-145',
        Quote_Text:
            'Perhaps most interesting is the tendency of the medieval Augustinian tradition, initially with Giles of Rome and subsequently with Gregory of Rimini and the schola Augustiniana moderna, to emphasize that the basis of Christian theology was scriptura sola',
        Topic: 'Scripture & Canon',
        Subtopics: SUBTOPICS,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'McGrath: medieval Augustinian tradition emphasized scriptura sola as basis of theology.'
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
        console.log('All Sola Scriptura quotes already present in CSV.');
        return;
    }

    const suffix = csv.endsWith('\n') ? '' : '\n';
    const lines = toAdd.map(rowToCsv).join('\n');
    fs.appendFileSync(CSV_PATH, `${suffix}${lines}\n`, 'utf8');
    console.log(`Added ${toAdd.length} quotes (${toAdd.map((r) => r.ID).join(', ')})`);
}

main();
