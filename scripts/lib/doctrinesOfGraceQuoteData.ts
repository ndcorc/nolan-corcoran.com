/** Raw quote inputs for doctrines-of-grace patristic import. */
export type DoctrineTag = 'P' | 'T' | 'L' | 'I' | 'Per';

export interface DoctrinesOfGraceQuoteInput {
    Father: string;
    Died_AD: string;
    Era: string;
    Source_Work: string;
    Source_Ref: string;
    Quote_Text: string;
    Doctrine: DoctrineTag;
    /** Additional subtopics beyond the doctrine defaults (e.g. Sola Fide). */
    ExtraSubtopics?: string;
    Notes?: string;
}

export const SOURCE_BOOK = 'Doctrines of Grace in the Early Church (Gill et al.)';

export const DOCTRINES_OF_GRACE_QUOTES: DoctrinesOfGraceQuoteInput[] = [
    // ── Clement of Rome ──
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'Let us therefore consider, brethren, out of what matter we are made; who and what we were when we came into the world, as out of the grave and darkness itself; who, having made and formed us, brought us into his world having first prepared his good things for us, before we were born',
        Doctrine: 'P',
        Notes: 'Gill compilation; LEGEND (P) Predestination / Unconditional Election.'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'This blessedness comes upon those that are chosen of God by Jesus Christ our Lord',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'He that is chaste in the flesh, let him not be proud or insolent: knowing that it is another who furnishes him with the gift of continence',
        Doctrine: 'I'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'Making it manifest, that through the blood of the Lord there should be redemption for all those that believe and hope in God',
        Doctrine: 'L'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'Therefore He (that is, God), being desirous that all his beloved ones should partake of repentance, confirmed it by his almighty will',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text: 'God hath chosen the Lord Jesus Christ, and us by him',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'When he wills, and as he wills, he does all things; none of those things which are decreed by him, shall pass away',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'Without love nothing is well-pleasing to God; in love the Lord assumed us to himself; because of the love which Christ our Lord hath towards us, he hath given his blood for us, his flesh for our flesh, and his soul for our souls',
        Doctrine: 'L'
    },
    {
        Father: 'Clement of Rome',
        Died_AD: 'c.101',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Corinthians (1 Clement)',
        Source_Ref: '',
        Quote_Text:
            'Whereas it is the will of God, that all whom he loves should partake of repentance, and so not perish with the unbelieving and impenitent, he has established it by his almighty will. But if any of those whom God wills should partake of the grace of repentance, should afterwards perish, where is his almighty will? And how is this matter settled and established by such a will of his?',
        Doctrine: 'Per'
    },

    // ── Barnabas ──
    {
        Father: 'Barnabas',
        Died_AD: 'c.130',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle of Barnabas',
        Source_Ref: 'Part 1, s. 6',
        Quote_Text:
            'I see that I shall thus offer my flesh, for the sins of the new people; meaning a special and peculiar people that should be taken out from among the Gentiles under the New Testament dispensation, called a new people, to distinguish them from God\'s ancient people the Jews',
        Doctrine: 'L'
    },
    {
        Father: 'Barnabas',
        Died_AD: 'c.130',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle of Barnabas',
        Source_Ref: 'Part 1, sect. 11',
        Quote_Text:
            'When we receive the righteous promise, of sin being no more, being made all new by the Lord, then shall we be able to sanctify it, being first sanctified ourselves',
        Doctrine: 'T'
    },
    {
        Father: 'Barnabas',
        Died_AD: 'c.130',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle of Barnabas',
        Source_Ref: 'Part 1, c. 5',
        Quote_Text: 'He that hopes in Christ, the firm and solid rock, shall live for ever',
        Doctrine: 'Per'
    },
    {
        Father: 'Barnabas',
        Died_AD: 'c.130',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle of Barnabas',
        Source_Ref: 'Part 1, c. 6',
        Quote_Text:
            'Because, the kingdom of Jesus depends upon the tree (he means the cross,) wherefore they that hope in him shall live for ever',
        Doctrine: 'Per'
    },

    // ── Ignatius of Antioch ──
    {
        Father: 'Ignatius of Antioch',
        Died_AD: 'c.107',
        Era: 'Apostolic Father',
        Source_Work: 'Epistle to the Magnesians',
        Source_Ref: '',
        Quote_Text:
            'Ignatius speaks of two sorts of persons, signified by two pieces of money; the one belongs to God, and the other to the world; which have each their own characters upon them, and every one shall go to his own place',
        Doctrine: 'P',
        Notes: 'Gill compilation summary of Ignatius.'
    },
    {
        Father: 'Ignatius of Antioch',
        Died_AD: 'c.107',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Ephesians',
        Source_Ref: '',
        Quote_Text:
            'They that are carnal cannot do the things that are spiritual, nor they that are spiritual do the things that are carnal, as neither faith the things of unbelief, nor unbelief the things of faith',
        Doctrine: 'T'
    },
    {
        Father: 'Ignatius of Antioch',
        Died_AD: 'c.107',
        Era: 'Apostolic Father',
        Source_Work: 'Letter to the Ephesians',
        Source_Ref: 'c. 15',
        Quote_Text: 'there was such a difference between the infidels and the elect',
        Doctrine: 'P'
    },
    {
        Father: 'Ignatius of Antioch',
        Died_AD: 'c.107',
        Era: 'Apostolic Father',
        Source_Work: 'Letters (Smyrnaeans, Polycarp, Ephesians, Romans, Tralles)',
        Source_Ref: '',
        Quote_Text:
            'That Christ suffered for us, that we might be saved, for our sins. Jesus Christ died for us, that believing in his death, you may escape dying, for Jesus is the life of believers',
        Doctrine: 'L',
        Notes: 'Compiled from Ignatius ep. ad Smyrn., ad Polycarp, ad Ephes., ad Romans, ad Tralles.'
    },

    // ── Justin Martyr ──
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: '',
        Quote_Text:
            'I am able to show, that all the things appointed by Moses were types, symbols, and declarations of what should be done to Christ; and of them that were foreknown to believe in him: and likewise of those things that were to be done by Christ',
        Doctrine: 'P'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: '',
        Quote_Text:
            'We bear, that we may not, with our voice deny Christ, by whom we are called unto the salvation which is before prepared by our Father',
        Doctrine: 'P'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Epistle to Zenam et Sereu.',
        Source_Ref: '',
        Quote_Text:
            'The Lord of glory, who exists for ever, would give to them all to enjoy honor and rest, with the elect',
        Doctrine: 'P'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Epistle to Zenam',
        Source_Ref: '',
        Quote_Text:
            'Mankind by Adam fell under death, and the deception of the serpent; that we are born sinners; and that we are entirely flesh, and no good thing dwells in us; he asserts the weakness and disability of men either to understand or perform spiritual things, and denies that man, by the natural sharpness of his wit, can attain to the knowledge of divine things, or by any innate power in him save himself, and procure eternal life',
        Doctrine: 'T',
        Notes: 'Gill compilation summary of Justin.'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Epistle to Diognetus',
        Source_Ref: '',
        Quote_Text:
            'Having sometime before convinced us of the impossibility of our nature to obtain life, hath now shown us the Savior, who is able to save that which otherwise were impossible to be saved',
        Doctrine: 'T'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: 'Matthew 8:11-12; 7:22-23',
        Quote_Text:
            'The great things, which the Father hath in his counsel appointed for all men, that are or shall be well-pleasing to him, and likewise those that depart from his will, whether angels or men, he only (Christ) hath most clearly taught, when he will condemn the unworthy that shall not be saved, he will say to them, Go ye into outer darkness, which the Father hath prepared for Satan and his angels',
        Doctrine: 'P',
        Notes: 'Gill compilation summary.'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: '',
        Quote_Text:
            'God, out of all nations, took your nation to himself, a nation unprofitable, disobedient, and unfaithful; thereby pointing out, those that are chosen out of every nation to obey his will, by Christ, whom also he calls Jacob, and names Israel',
        Doctrine: 'P'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: '',
        Quote_Text:
            'The offering of fine flour for the leper, was a figure of the bread of the Eucharist, which Jesus Christ our Lord hath delivered unto us to do in commemoration of his sufferings; which he endured for those men whose souls are purified from all iniquity',
        Doctrine: 'L'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: '',
        Quote_Text:
            'As Jacob served Laban for the cattle that were spotted, and of various forms, so Christ served even to the cross, for men of every kind, of many and various shapes, procuring them by his blood, and the mystery of the cross',
        Doctrine: 'L',
        Notes: 'Justin: Christ died for men of every kind — not all men without exception.'
    },
    {
        Father: 'Justin Martyr',
        Died_AD: 'c.100-165',
        Era: 'Greek Patristic',
        Source_Work: 'Dialogue with Trypho',
        Source_Ref: '',
        Quote_Text:
            'Do you think, O men, that we could ever have been able to have understood these things in the Scriptures, unless by the will of him that wills these things, we had received grace to understand them',
        Doctrine: 'I'
    },

    // ── Minucius Felix ──
    {
        Father: 'Minucius Felix',
        Died_AD: 'c.170',
        Era: 'Latin Patristic',
        Source_Work: 'Octavius',
        Source_Ref: '',
        Quote_Text:
            'For what else is fate, but what God says of every one of us? Who, since he can foreknow matter, even determines the fates according to the merits and qualities of every one; so that not our nativity (that is, as depending on the position of the stars) but our natural disposition is punished',
        Doctrine: 'P'
    },

    // ── Irenaeus ──
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, ch. 72',
        Quote_Text:
            'God predetermining all things for the perfection of man, and for the bringing about and manifestation of his dispositions, that goodness may be shown, and righteousness perfected, and the church be conformed to the image of his Son, and at length become a perfect man, and by such things be made ripe to see God, and enjoy him',
        Doctrine: 'P'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 2, ch. 62',
        Quote_Text:
            'God is not so poor and indigent as not to give to every body its own soul as its proper form. Hence, having completed the number which he before determined with himself, all those who are written, or ordained unto life, shall rise again, having their own bodies, souls, and spirits, in which they pleased God; but those who are deserving of punishment shall go into it, having also their own souls and bodies in which they departed from the grace of God',
        Doctrine: 'P'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, ch. 70',
        Quote_Text: 'The tower of election being everywhere exalted and glorious',
        Doctrine: 'P'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, ch. 16',
        Quote_Text:
            'Man will be justly condemned, because being made rational, he has lost true reason, and lives irrationally, is contrary to the justice of God, giving himself up to every earthly spirit, and serves all pleasure',
        Doctrine: 'T'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, ch. 47',
        Quote_Text:
            'All things he did for the younger Rachel, who had good eyes, who prefigured the church, for whom Christ endured, that is, sufferings and death',
        Doctrine: 'L'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, ch. 76',
        Quote_Text:
            'God foreknowing all things, has prepared for both suitable habitations',
        Doctrine: 'P'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, ch. 48',
        Quote_Text:
            'If therefore now, as many as God knows, will not believe, since he foreknows all things, he hath given them up to their infidelity, and turns his face from them, leaving them in the darkness which they have chosen for themselves; is it to be wondered at, that he then gave up Pharaoh, who would never believe, with them that were with him, to their own infidelity?',
        Doctrine: 'P'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 4, ch. 19',
        Quote_Text:
            'Him we rightly show is known by none, unless by the Son, and such to whom the Son will reveal him; for the Son reveals him to all to whom the Father would be known, and neither without the good will and pleasure of the Father, nor without the administration of the Son, can any one know God',
        Doctrine: 'I'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 3, ch. 19',
        Quote_Text:
            'And as the dry earth, if it receives not moisture, does not bring forth fruit, so likewise we, being first a dry tree, can never bring forth fruit unto life, without the rain which comes freely from above, that is, the Holy Spirit',
        Doctrine: 'I'
    },
    {
        Father: 'Irenaeus',
        Died_AD: 'c.130-202',
        Era: 'Greek Patristic',
        Source_Work: 'Against the Heresies',
        Source_Ref: 'Book 5, ch. 12',
        Quote_Text:
            'But the Spirit encompasses man within and without, as always abiding, and never leaves him',
        Doctrine: 'Per'
    },

    // ── Clement of Alexandria ──
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: 'Book 2',
        Quote_Text:
            'That virtue which holds the church together is faith, by which the elect of God are saved',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: 'Book 7',
        Quote_Text:
            'According to the fitness which every one has, He, that is, God, distributes his benefits both to the Greeks and to the Barbarians; and to them who are predestinated from among them, and are in his own time called, faithful, and elect',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: 'Book 2',
        Quote_Text:
            'Faith is not to be calumniated, as easy and vulgar, and what every one has. I say, therefore, that faith, whether it is founded on love or on fear, as the adversaries say, is something divine',
        Doctrine: 'I'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: 'Book 5',
        Quote_Text:
            'It remains, that by divine grace, and by the word alone, which is from God, we understand that which is unknown',
        Doctrine: 'I'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: 'Book 6',
        Quote_Text:
            'Such a soul shall never at any time be separated from God',
        Doctrine: 'Per'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Paedagogus',
        Source_Ref: 'Book 1, ch. 9',
        Quote_Text:
            'We shall not fall into corruption, who pass through into incorruption, because he sustains us; for he hath said, and he will do it. And a little after he says, his, that is, Christ\'s goodness towards them, who through hearing have believed, is immoveable, and turns neither one way nor another',
        Doctrine: 'Per'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Recognitions of Clement',
        Source_Ref: 'Book 3, ch. 26',
        Quote_Text:
            'But how can that be called good which is not done of purpose? And on this account the world required long periods, until the number of souls which were predestined to fill it should be completed, and then that visible heaven should be folded up like a scroll, and that which is higher should appear, and the souls of the blessed, being restored to their bodies, should be ushered into light; but the souls of the wicked, for their impure actions being surrounded with fiery spirit, should be plunged into the abyss of unquenchable fire, to endure punishments through eternity',
        Doctrine: 'P',
        Notes: 'Gill compilation; consult Recognitions for verbatim wording.'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Paedagogus',
        Source_Ref: 'Book 1, ch. 7',
        Quote_Text:
            'Jeremiah 1:5, 7, Do not say, I am a child; before I formed thee in the belly, I knew thee, etc., his note upon it is, this prophecy intimates unto us, that those who before the foundation of the world are known by God unto faith; that is, are appointed by him to faith, are now babes, because of the will of God lately fulfilled, as we are new-born unto vocation and salvation',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: 'Book 6',
        Quote_Text:
            'It is not becoming, that a friend of God, on whom God has predestinated before the foundation of the world, to be put into the high adoption of children, should fall into pleasures or fears, and be unemployed in repressing the passions',
        Doctrine: 'P'
    },
    {
        Father: 'Clement of Alexandria',
        Died_AD: 'c.150-215',
        Era: 'Greek Patristic',
        Source_Work: 'Stromata',
        Source_Ref: 'Book 7',
        Quote_Text:
            'He is the Savior of them that believe; but the Lord of them that believe not',
        Doctrine: 'L',
        Notes: 'Clement distinguishes Christ as Savior of believers and Lord of unbelievers.'
    },

    // ── Tertullian ──
    {
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'De Corona',
        Source_Ref: 'ch. 13',
        Quote_Text:
            'But thine order and thy magistracy, and the name of thy court is the church of Christ: thou art his, written in the books of life',
        Doctrine: 'P'
    },
    {
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'De Testimonio Animae',
        Source_Ref: 'ch. 3',
        Quote_Text:
            'Satan is the angel of wickedness, the artificer of every error, the interpolator of every age; by whom man from the beginning being circumvented, so as to transgress the commands of God, was therefore delivered unto death, hence he has also made the whole kind, or all mankind, which springs from his seed, infected, partaker of his damnation',
        Doctrine: 'T'
    },
    {
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Marcion',
        Source_Ref: 'Book 5, ch. 19',
        Quote_Text:
            'Yea, in that body in which he could die through the flesh, he died, not through the church, but verily for the church, by changing body for body, and that which is fleshly for that which is spiritual',
        Doctrine: 'L'
    },
    {
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'De Anima',
        Source_Ref: 'ch. 4',
        Quote_Text:
            'For what is of God is not so extinguished, as it is overshadowed; for it may be overshadowed, because it is not God; it cannot be extinguished, because it is of God',
        Doctrine: 'Per'
    },
    {
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'De Resurrectione Carnis',
        Source_Ref: 'ch. 59',
        Quote_Text:
            'He distinguishes the issues of things, not substances; for who does not place the judgment of God in a twofold sentence of salvation and punishment? Wherefore all flesh is grass, which is appointed to the fire, and all flesh shall see the salvation of God; which is ordained to salvation',
        Doctrine: 'P'
    },
    {
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'De Anima',
        Source_Ref: 'ch. 1',
        Quote_Text:
            'By whom is truth found out without God? To whom is God known without Christ? By whom is Christ explored without the Holy Spirit? To whom is the Holy Spirit applied without the mystery of faith?',
        Doctrine: 'I'
    },
    {
        Father: 'Tertullian',
        Died_AD: 'c.220',
        Era: 'Latin Patristic',
        Source_Work: 'Against Marcion',
        Source_Ref: 'Book 5, ch. 17',
        Quote_Text:
            'It is one thing to make, and another to create, but both he gives to one; man is the workmanship of the Creator, the same therefore who hath made, hath created in Christ. With respect to substance, he hath made him; with respect to grace, he hath created him',
        Doctrine: 'I'
    }
];