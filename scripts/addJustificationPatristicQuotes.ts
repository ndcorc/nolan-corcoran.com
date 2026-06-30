/**
 * Append Justification / Sola Fide quotes to CSV
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

const TOPIC = 'Justification';
const SOLA_FIDE = 'Sola Fide';
const SOLA_GRATIA = 'Sola Gratia';
const IMPUTED = 'Imputed Righteousness';

const NEW_QUOTES: PatristicQuoteCsvRow[] = [
    {
        ID: 'FC612',
        Father: 'Author of the Epistle to Diognetus',
        Died_AD: 'c.130-200',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle to Diognetus',
        Source_Ref: '9:2-5',
        Quote_Text:
            'But when our wickedness had reached its height, and it had been clearly shown that its reward, punishment and death, was impending over us; and when the time had come which God had before appointed for manifesting His own kindness and power, how the one love of God, through exceeding regard for men, did not regard us with hatred, nor thrust us away, nor remember our iniquity against us, but showed great long-suffering, and bore with us, He Himself took on Him the burden of our iniquities, He gave His own Son as a ransom for us, the holy One for transgressors, the blameless One for the wicked, the righteous One for the unrighteous, the incorruptible One for the corruptible, the immortal One for them that are mortal. For what other thing was capable of covering our sins than His righteousness? By what other one was it possible that we, the wicked and ungodly, could be justified, than by the only Son of God? O sweet exchange! O unsearchable operation! O benefits surpassing all expectation! that the wickedness of many should be hid in a single righteous One, and that the righteousness of One should justify many transgressors!',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${IMPUTED}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'The righteousness of One justifies many transgressors — classic exchange motif.'
    },
    {
        ID: 'FC613',
        Father: 'Irenaeus',
        Died_AD: 'c.202',
        Era: 'Greek Patristic',
        Source_Work: 'Demonstration of the Apostolic Preaching',
        Source_Ref: 'Chapter 35',
        Quote_Text:
            "For 'Abraham believed God, and it was counted unto him for righteousness.' In like manner we also are justified by faith in God: for 'the just shall live by faith.' Now 'not by the law is the promise to Abraham, but by faith' for Abraham was justified by faith: and 'for a righteous man the law is not made.' In like manner we also are justified not by the law, but by faith, which is witnessed to in the law and in the prophets",
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Justified by faith, not by the law — Abraham as the pattern.'
    },
    {
        ID: 'FC614',
        Father: 'Commodianus',
        Died_AD: 'c.250',
        Era: 'Latin Patristic',
        Source_Work: 'The Instructions',
        Source_Ref: 'Chapter 25',
        Quote_Text:
            'Believe in Christ; for the Old Testament proclaims concerning Him. For it is needful only to believe in Him who was dead, to be able to rise again to live for all time',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Eternal life through faith in the crucified Christ alone.'
    },
    {
        ID: 'FC615',
        Father: 'Origen',
        Died_AD: 'c.185-253',
        Era: 'Greek Patristic',
        Source_Work: 'Commentary on Romans',
        Source_Ref: '3.9 (PG 14.952-953)',
        Quote_Text:
            "He is saying that the justification of faith alone suffices, so that the one who only believes is justified, even if he has not accomplished a single work. It is incumbent upon us, therefore, as those who are attempting to defend the harmoniousness of the Apostle's writings and to establish that they are entirely consistent in their arrangement, that we should ask: Who has been justified by faith alone without works of the law? Thus, in my opinion, that thief who was crucified with Christ should suffice for a suitable example. He called out to him from the cross, 'Lord Jesus, remember me when you come into your kingdom!' In the Gospels nothing else is recorded about his good works, but for the sake of this faith alone Jesus said to him, 'Truly I say to you: Today you will be with me in paradise.' If it seems appropriate, let us now apply the words of the Apostle Paul to the case of this thief and say to the Jews, 'Where then is your boasting?' Certainly it is excluded, but excluded not through the law of works but through the law of faith. For through faith this thief was justified without works of the law, since the Lord did not require in addition to this that he should first accomplish works, nor did he wait for him to perform some works when he had believed",
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Thief on the cross justified by faith alone without works of the law.'
    },
    {
        ID: 'FC616',
        Father: 'Firmicus Maternus',
        Died_AD: 'c.350',
        Era: 'Latin Patristic',
        Source_Work: 'The Error of the Pagan Religions',
        Source_Ref: 'Chapter 4 (Ancient Christian Writers, Volume 37, p. 51; trans. Clarence A. Forbes)',
        Quote_Text:
            'The mercy of God is rich, and He forgives gladly. He leaves the ninety-nine sheep and seeks the one that is lost, and to the prodigal son who returns the father gives a garment and prepares him a feast. I do not want you to despair because of the multitude of your sins: the Supreme Deity through His Son Jesus Christ our Lord saves all who are willing and gladly pardons the repentant, nor is it much that He asks as the condition of pardon. Merely by faith and repentance you can redeem whatever you have lost through the wicked insinuations of the devil',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Pardon conditioned on faith and repentance, not works.'
    },
    {
        ID: 'FC617',
        Father: 'Marius Victorinus',
        Died_AD: 'c.304',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Galatians',
        Source_Ref: '2:15-16 (PL 8.1164)',
        Quote_Text:
            'A man is not justified by the works of the law but through faith and the faith of Jesus Christ . . . It is faith alone that gives justification and sanctification',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Explicit sola fide language in a fourth-century Latin commentator.'
    },
    {
        ID: 'FC618',
        Father: 'Marius Victorinus',
        Died_AD: 'c.304',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Galatians',
        Source_Ref: '3:21 (PL 8.1172)',
        Quote_Text:
            'Therefore righteousness is not from the law; that is, justification and salvation come not from the law but from faith; as is promised',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Justification and salvation from faith, not from the law.'
    },
    {
        ID: 'FC619',
        Father: 'Marius Victorinus',
        Died_AD: 'c.304',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Ephesians',
        Source_Ref: '2:15 (PL 8.1258)',
        Quote_Text: 'Only faith in Christ is salvation for us',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Salvation through faith in Christ alone.'
    },
    {
        ID: 'FC620',
        Father: 'Hilary of Poitiers',
        Died_AD: 'c.315-368',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Matthew',
        Source_Ref: '8.6 (PL 9.961)',
        Quote_Text:
            'It disturbed the scribes that sin was forgiven by a man (for they considered that Jesus Christ was only a man) and that sin was forgiven by Him whereas the Law was not able to absolve it, since faith alone justifies',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Faith alone justifies — the Law cannot absolve sin.'
    },
    {
        ID: 'FC621',
        Father: 'Hilary of Poitiers',
        Died_AD: 'c.315-368',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Matthew',
        Source_Ref: '21.15 (PL 9.1041)',
        Quote_Text:
            'Because faith alone justifies . . . publicans and prostitutes will be first in the kingdom of heaven',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Faith alone justifies — not the works of the scribes.'
    },
    {
        ID: 'FC623',
        Father: 'Ambrosiaster',
        Died_AD: 'c.384',
        Era: 'Latin Patristic',
        Source_Work: 'On Romans',
        Source_Ref: 'Commentary on Romans 1:11 (PL 17.53)',
        Quote_Text:
            'For the mercy of God had been given for this reason, that the law should cease, as I have often said, because God, taking pity on our weaknesses, decreed that the human race would be saved by faith alone',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Human race saved by faith alone — explicit sola fide in Ambrosiaster.'
    },
    {
        ID: 'FC624',
        Father: 'Ambrosiaster',
        Died_AD: 'c.384',
        Era: 'Latin Patristic',
        Source_Work: 'On Romans',
        Source_Ref: 'Commentary on Romans 3:24 (PL 17.79)',
        Quote_Text:
            'They are justified freely because, while doing nothing or providing any repayment, they are justified by faith alone as a gift of God',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Justified by faith alone as a gift — without works or repayment.'
    },
    {
        ID: 'FC625',
        Father: 'Ambrosiaster',
        Died_AD: 'c.384',
        Era: 'Latin Patristic',
        Source_Work: 'On Romans',
        Source_Ref: 'Commentary on Romans 3:27 (PL 17.80)',
        Quote_Text:
            'Paul tells those who live under the law that they have no reason to boast basing themselves on the law and claiming to be of the race of Abraham, seeing that no one is justified before God except by faith',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'No one justified before God except by faith.'
    },
    {
        ID: 'FC626',
        Father: 'Ambrosiaster',
        Died_AD: 'c.384',
        Era: 'Latin Patristic',
        Source_Work: 'On Romans',
        Source_Ref: 'Commentary on Romans 4:5 (PL 17.82-83)',
        Quote_Text:
            'How then can the Jews think that they have been justified by the works of the law in the same way as Abraham, when they see that Abraham was not justified by the works of the law but by faith alone? Therefore there is no need of the law when the ungodly is justified before God by faith alone',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Abraham justified by faith alone — the ungodly likewise.'
    },
    {
        ID: 'FC627',
        Father: 'Ambrosiaster',
        Died_AD: 'c.384',
        Era: 'Latin Patristic',
        Source_Work: 'On Romans',
        Source_Ref: 'Commentary on Romans 4:6 (PL 17.83)',
        Quote_Text:
            'Those are blessed of whom God has decreed that, without work or any keeping of the law, they are justified before God by faith alone',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Blessed are those justified by faith alone without works or law-keeping.'
    },
    {
        ID: 'FC628',
        Father: 'Ambrosiaster',
        Died_AD: 'c.384',
        Era: 'Latin Patristic',
        Source_Work: 'On 1 Corinthians',
        Source_Ref: 'Commentary on 1 Corinthians 1:4 (PL 17.185)',
        Quote_Text:
            'Because this has been determined by God, that he who believes in Christ will be saved without work: by faith alone freely he receives forgiveness of sins',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Saved without works — forgiveness received by faith alone.'
    },
    {
        ID: 'FC629',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Acts',
        Source_Ref: 'Homily 32 on Acts 15 (PG 60.235)',
        Quote_Text:
            "Everywhere he places the Gentiles on an equal footing. 'And he made no distinction between us and them but cleansed their hearts by faith.' From faith alone, he says, they obtained the same gifts. This is also meant as a lesson to those (objectors); this is able to teach them that faith alone is necessary, and not works or circumcision",
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Gentiles cleansed by faith alone — not works or circumcision.'
    },
    {
        ID: 'FC631',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Romans',
        Source_Ref: 'Homily 9 on Romans 5:2 (PG 60.468)',
        Quote_Text:
            'For he died for us, and further reconciled us, and brought us to Himself, and gave us grace unspeakable. But we brought faith only as our contribution',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ gave grace; we contribute faith only.'
    },
    {
        ID: 'FC632',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Ephesians',
        Source_Ref: 'Homily 4 on Ephesians 2:8',
        Quote_Text:
            "God's mission was not to save people in order that they may remain barren or inert. For Scripture says that faith has saved us. Put better: since God has willed it, faith has saved us. Now in what case, tell me, does faith save without itself doing anything at all? Faith's workings themselves are a gift of God, lest anyone should boast. What then is Paul saying? Not that God has forbidden works but that he has forbidden us to be justified by works. No one, Paul says, is justified by works, precisely in order that the grace and benevolence of God may become apparent!",
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Forbidden to be justified by works — faith saves; its workings are God’s gift.'
    },
    {
        ID: 'FC633',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Ephesians',
        Source_Ref: 'Homily 5 on Ephesians 2:13-15 (PG 62.39-40)',
        Quote_Text:
            'For by faith alone He saved us. . . . Instead of a certain manner of life, He brought in faith. For that He might not save us to no purpose, He both Himself underwent the penalty, and also required of them the faith that is by doctrines',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Saved by faith alone — Christ underwent the penalty and requires doctrinal faith.'
    },
    {
        ID: 'FC634',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on 1 Timothy',
        Source_Ref: 'on 1 Timothy 1:15-16 (PG 62.520-521)',
        Quote_Text:
            'What then was it that was thought incredible? That those who were enemies and sinners, justified by neither the law nor works, should immediately through faith alone be advanced to the highest favor. . . . It seemed to them incredible that a person who had misspent all his former life in vain and wicked actions should afterwards be saved by his faith alone',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Sinners advanced to highest favor through faith alone — not law or works.'
    },
    {
        ID: 'FC635',
        Father: 'John Chrysostom',
        Died_AD: 'c.347-407',
        Era: 'Greek Patristic',
        Source_Work: 'Homilies on Genesis',
        Source_Ref: '27.3 (PG 53.243)',
        Quote_Text:
            "The patriarch Abraham himself before receiving circumcision had been declared righteous on the score of faith: before circumcision, the text says, 'Abraham believed God, and credit for it brought him to righteousness'",
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Abraham declared righteous by faith before circumcision.'
    },
    {
        ID: 'FC636',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Against Pelagius',
        Source_Ref: '2.7 (PL 23.568)',
        Quote_Text:
            '[Paul] shows clearly that righteousness depends not on the merit of man, but on the grace of God, who accepts the faith of those who believe, without the works or the Law',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Righteousness from God’s grace accepting faith — not human merit or Law.'
    },
    {
        ID: 'FC637',
        Father: 'Jerome',
        Died_AD: 'c.347-420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Galatians',
        Source_Ref: '3:6 (PL 30.812A; as cited in George Stanley Faber, The Primitive Doctrine of Justification, p. 122)',
        Quote_Text:
            'Abraham believed in God: and it was imputed unto him for righteousness. Thus likewise to you faith alone is sufficient for righteousness',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Latin: Ita et vobis ad justitiam sola sufficit fides — faith alone sufficient for righteousness.'
    },
    {
        ID: 'FC638',
        Father: 'Pseudo-Jerome',
        Died_AD: 'c.420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Romans',
        Source_Ref: '5 (PL 30.665D-666A; as cited in George Stanley Faber, The Primitive Doctrine of Justification, p. 122)',
        Quote_Text:
            'Being justified therefore from faith. The matter having been handled, that no one is justified from works, but all from faith; which he proves by the example of Abraham whose sons the Jews deemed themselves exclusively: he shows by argument, that neither descent nor circumcision, but faith alone, makes sons of Abraham, who from faith alone was first justified. Which argument being concluded, he exhorts them to have peace: because no one by his own merit, but all equally by the grace of God, are saved',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Faith alone makes sons of Abraham — all saved by grace, not merit.'
    },
    {
        ID: 'FC639',
        Father: 'Pseudo-Jerome',
        Died_AD: 'c.420',
        Era: 'Latin Patristic',
        Source_Work: 'Commentary on Romans',
        Source_Ref: '4 (PL 30.688C)',
        Quote_Text:
            'God justifies the ungodly through faith alone, not by good works, which he did not have',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Latin: Convertentem impium, per solam fidem justificat Deus, non opera bona, quae non habuit.'
    },
    {
        ID: 'FC640',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'A Treatise on the Spirit and the Letter',
        Source_Ref: 'Chapter 22 (PL 44.214-215)',
        Quote_Text:
            'We conclude that a man is not justified by the precepts of a holy life, but by faith in Jesus Christ; in a word, not by the law of works, but by the law of faith; not by the letter, but by the spirit; not by the merits of deeds, but by free grace',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Classic Augustine: justified by faith and free grace, not by works.'
    },
    {
        ID: 'FC641',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Against Two Letters of the Pelagians',
        Source_Ref: '1.21.39 (PL 44.569)',
        Quote_Text:
            'Of whatever virtue you may declare that the ancient righteous people were possessed, nothing saved them but the belief in the Mediator who shed his blood for the remission of their sins',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Ancient saints saved only by faith in the Mediator — not by their virtue.'
    },
    {
        ID: 'FC642',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'Exposition of the Psalms',
        Source_Ref: '31.7 (PL 36.263)',
        Quote_Text:
            'When someone believes in him who justifies the impious, that faith is reckoned as justice to the believer, as David too declares that person blessed whom God has accepted and endowed with righteousness, independently of any righteous actions. What righteousness is this? The righteousness of faith, preceded by no good works, but with good works as its consequence',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Righteousness of faith precedes good works — works follow as consequence.'
    },
    {
        ID: 'FC643',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'On the Proceedings of Pelagius',
        Source_Ref: '14.34 (PL 44.341)',
        Quote_Text:
            'The very reason, indeed, why he so often declares that righteousness is imputed to us, not out of our works, but of our faith, whereas faith rather works through love, is that no man should think that he arrives at faith itself through the merit of his works; for it is faith which is the beginning whence good works first proceed',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${IMPUTED}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes:
            'Alternate translation (Nick Needham, The Doctrine on Which the Church Stands or Falls): faith is the wellspring from which good works flow; whatever does not proceed from faith is sin.'
    },
    {
        ID: 'FC644',
        Father: 'Augustine',
        Died_AD: '354-430',
        Era: 'Latin Patristic',
        Source_Work: 'A Treatise on the Spirit and the Letter',
        Source_Ref: 'Chapter 15, Section 9 (PL 44.209; as cited in Ancient Christian Commentary on Scripture, Volume 6, Romans, p. 95)',
        Quote_Text:
            'The righteousness of God is not that by which God is righteous but that with which he clothes man when he justifies the ungodly',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${IMPUTED}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Alien righteousness imputed when God justifies the ungodly.'
    },
    {
        ID: 'FC645',
        Father: 'Cyril of Alexandria',
        Died_AD: 'c.444',
        Era: 'Greek Patristic',
        Source_Work: 'Against Nestorius',
        Source_Ref: '3.2 (PG 76.132)',
        Quote_Text:
            'For we are justified by faith, not by works of the law, as Scripture says. By faith in whom, then, are we justified? Is it not in him who suffered death according to the flesh for our sake? Is it not in one Lord Jesus Christ? Have we not been redeemed by proclaiming his death and confessing his resurrection?',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Justified by faith in Christ crucified and risen — not by works of the law.'
    },
    {
        ID: 'FC646',
        Father: 'Theodoret of Cyrus',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'Interpretation of the Letter to the Romans',
        Source_Ref: 'on Romans 1:17 (PG 82.57, 60)',
        Quote_Text:
            "The righteousness of God is not revealed to everyone but only to those with the eyes of faith. . . . Paul quoted Habakkuk for the benefit of the Jews, because he wanted to teach them not to cling to the provisions of the law but to follow [their own] prophets. For many centuries before they had predicted that one day there would be salvation by faith alone",
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Prophets predicted salvation by faith alone centuries before Christ.'
    },
    {
        ID: 'FC647',
        Father: 'Theodoret of Cyrus',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'Interpretation of the Letter to the Romans',
        Source_Ref: 'on Romans 3:25 (PG 82.84-85)',
        Quote_Text:
            'The Lord Christ is both God and the mercy seat, both the priest and the lamb, and he performed the work of our salvation by his blood, demanding only faith from us',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Christ accomplished salvation by his blood — demanding only faith from us.'
    },
    {
        ID: 'FC648',
        Father: 'Theodoret of Cyrus',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'Interpretation of Ephesians',
        Source_Ref: 'on Ephesians 2:8-9 (PG 82.521)',
        Quote_Text:
            'It is not of our own accord that we have believed, but we have come to belief after having been called; and even when we had come to believe, He did not require of us purity of life, but approving mere faith, God bestowed on us forgiveness of sins',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'God approved mere faith and bestowed forgiveness — not purity of life first.'
    },
    {
        ID: 'FC649',
        Father: 'Theodoret of Cyrus',
        Died_AD: 'c.393-458',
        Era: 'Greek Patristic',
        Source_Work: 'Epistle 83',
        Source_Ref: 'PG 83.1269',
        Quote_Text:
            "I consider myself wretched – in fact, wretched three times over. I am guilty of all kinds of errors. Through faith alone I look for finding some mercy in the day of the Lord's appearing",
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Personal appeal to mercy through faith alone at the day of judgment.'
    },
    {
        ID: 'FC650',
        Father: 'Bede',
        Died_AD: 'c.673-735',
        Era: 'Medieval',
        Source_Work: 'Exposition on James',
        Source_Ref: 'PL 93.22 (as cited in Ancient Christian Commentary on Scripture, Volume 11, James, p. 31)',
        Quote_Text:
            'What Paul meant was that no one obtains the gift of justification on the basis of merits derived from works performed beforehand, because the gift of justification comes only from faith',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Justification is a gift from faith — not from prior works.'
    },
    {
        ID: 'FC651',
        Father: 'Claudius of Turin',
        Died_AD: 'c.827',
        Era: 'Medieval',
        Source_Work: 'Commentary on Galatians',
        Source_Ref: 'as cited in Early Medieval Theology, ed. George E. McCracken, p. 233',
        Quote_Text:
            'If the law justifies, then Abraham who lived long before the law was not justified. Since that cannot be admitted, one is compelled to acknowledge that man is not justified by works of the law but by faith. At the same time we are compelled also to realize that all the ancient fathers who were justified were justified by faith alone',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'All ancient fathers justified by faith alone — Abraham before the law.'
    },
    {
        ID: 'FC661',
        Father: 'Bernard of Clairvaux',
        Died_AD: 'c.1090-1153',
        Era: 'Medieval',
        Source_Work: 'Epistle 190',
        Source_Ref: '6 (PL 182.1065; as cited in Life and Works of Saint Bernard, ed. John Mabillon, p. 2:580-581)',
        Quote_Text:
            'For what could man, the slave of sin, fast bound by the devil, do of himself to recover that righteousness which he had formerly lost? Therefore he who lacked righteousness had another’s imputed to him. . . . It was man who owed the debt, it was man who paid it. For if one, says [the Apostle Paul], died for all, then all were dead, so that, as One bore the sins of all, the satisfaction of One is imputed to all',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${IMPUTED}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Bernard: alien righteousness imputed — one’s satisfaction imputed to all.'
    },
    {
        ID: 'FC652',
        Father: 'Bernard of Clairvaux',
        Died_AD: 'c.1090-1153',
        Era: 'Medieval',
        Source_Work: 'Sermons on the Song of Songs',
        Source_Ref: '22.8 (PL 183.881; as cited in Franz Posset, Pater Bernhardus, p. 186)',
        Quote_Text:
            'Therefore let the man, who through sorrow for sin hungers and thirsts for righteousness, trust in the One who changes the sinner into a righteous man, and judged righteous in terms of faith alone, he will have peace with God',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Judged righteous in terms of faith alone — peace with God.'
    },
    {
        ID: 'FC653',
        Father: 'Bernard of Clairvaux',
        Died_AD: 'c.1090-1153',
        Era: 'Medieval',
        Source_Work: 'Sermons on the Song of Songs',
        Source_Ref: '50.2 (as cited in Nick Needham, The Doctrine on Which the Church Stands or Falls)',
        Quote_Text:
            'No human being will be justified in the sight of God through the works of the law. . . . Aware of our imperfection, we must cry to heaven—and God will show us mercy. On the last day, we will then know that God has saved us, not on the basis of good works done by ourselves but on the basis of his own mercy',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${SOLA_GRATIA}`,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Saved on the basis of God’s mercy — not our own good works.'
    },
    {
        ID: 'FC654',
        Father: 'Thomas Aquinas',
        Died_AD: 'c.1274',
        Era: 'Medieval',
        Source_Work: 'Expositio in Ep. I ad Timotheum',
        Source_Ref: 'cap. 1, lect. 3 (Parma ed., 13.588)',
        Quote_Text:
            'Therefore the hope of justification is not found in them (the moral and ceremonial requirements of the law), but in faith alone, Rom 3:28: We consider a human being to be justified by faith, without the works of the law',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Reformed',
        Book: '',
        Section: '',
        Notes: 'Latin: Non est ergo in eis moralibus et caeremonialibus legis spes iustificationis, sed in sola fide.'
    },
    {
        ID: 'FC655',
        Father: 'Pelagius',
        Died_AD: 'c.418',
        Era: 'Latin Patristic',
        Source_Work: "Pelagius's Commentary on St Paul's Epistle to the Romans",
        Source_Ref: 'on Romans 1:17',
        Quote_Text:
            'Because it was just that the rest of the believers should be saved in the same way that Abraham was, who when he believed was saved from among the Gentiles initially by faith alone',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Nuanced',
        Book: '',
        Section: '',
        Notes: 'Even the heretic Pelagius affirmed salvation by faith alone in this commentary passage.'
    },
    {
        ID: 'FC656',
        Father: 'Pelagius',
        Died_AD: 'c.418',
        Era: 'Latin Patristic',
        Source_Work: "Pelagius's Commentary on St Paul's Epistle to the Romans",
        Source_Ref: 'on Romans 4:3',
        Quote_Text:
            "Abraham's faith was in fact so great that his previous sins were forgiven him and righteousness was reckoned as credit for every one of them by faith alone, and thereafter he burnt with such love that he furnished himself works over and above them all",
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Nuanced',
        Book: '',
        Section: '',
        Notes: 'Pelagius: righteousness reckoned by faith alone before works followed.'
    },
    {
        ID: 'FC657',
        Father: 'Pelagius',
        Died_AD: 'c.418',
        Era: 'Latin Patristic',
        Source_Work: "Pelagius's Commentary on St Paul's Epistle to the Romans",
        Source_Ref: 'on Romans 4:5',
        Quote_Text:
            'When an ungodly person converts, God justifies him by faith alone, not for the good works justified he did not have. Otherwise he should have been punished for works of ungodliness. At the same time one should note that he did not declare the sinner justified by faith, but rather the ungodly, that is, one who has just come to believe',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Nuanced',
        Book: '',
        Section: '',
        Notes: 'Pelagius: God justifies the ungodly by faith alone — not for works he did not have.'
    },
    {
        ID: 'FC658',
        Father: 'Pelagius',
        Died_AD: 'c.418',
        Era: 'Latin Patristic',
        Source_Work: "Pelagius's Commentary on St Paul's Epistle to the Romans",
        Source_Ref: 'on Romans 10:3',
        Quote_Text:
            'Because they did not know that God justifies by faith alone, and because they thought that they were righteous by the works of a law they did not keep, they refused to submit themselves to the forgiveness of sins, to prevent the appearance of their having been sinners',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Nuanced',
        Book: '',
        Section: '',
        Notes: 'Pelagius: Jews refused forgiveness because they did not know God justifies by faith alone.'
    },
    {
        ID: 'FC659',
        Father: 'Pelagius',
        Died_AD: 'c.418',
        Era: 'Latin Patristic',
        Source_Work: "Pelagius's Commentary on St Paul's Epistle to the Romans",
        Source_Ref: 'on Romans 11:25',
        Quote_Text:
            'All of Israel, thus, was being saved in the same way as the full number of Gentiles–by faith alone–so that, because they had been equals in transgression, they were equals in Christ',
        Topic: TOPIC,
        Subtopics: SOLA_FIDE,
        Position: 'Nuanced',
        Book: '',
        Section: '',
        Notes: 'Pelagius: Israel and Gentiles saved alike by faith alone.'
    },
    {
        ID: 'FC660',
        Father: 'Robert Bellarmine',
        Died_AD: '1542-1621',
        Era: 'Post-Tridentine',
        Source_Work: 'De Controversiis',
        Source_Ref: 'De Justificatione, Liber II, Caput 10, p. 523 (Opera Omnia, Neapoli, 1858)',
        Quote_Text:
            'And in this way, it were not absurd, if any one should say that the righteousness and merits of Christ are imputed unto us, when they are given and applied unto us, as if we ourselves had satisfied God',
        Topic: TOPIC,
        Subtopics: `${SOLA_FIDE}|${IMPUTED}`,
        Position: 'Nuanced',
        Book: '',
        Section: '',
        Notes:
            'Cardinal Bellarmine conceded that an imputational understanding of justification was not inconsistent with Catholic doctrine.'
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
    if (na.includes('basil') && nb.includes('basil')) return true;
    if (na.includes('chrysostom') && nb.includes('chrysostom')) return true;
    if (na.includes('bernard') && nb.includes('bernard')) return true;
    if (na.includes('anselm') && nb.includes('anselm')) return true;
    if (na.includes('clement') && nb.includes('clement')) return true;
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
    if (skipped.length) console.log(`Skipped ${skipped.length} duplicate(s): ${skipped.join(', ')}`);
    if (!added.length && !updated.length) console.log('No changes needed.');
}

main();
