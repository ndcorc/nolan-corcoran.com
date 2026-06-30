/** Maps legacy patristic subtopic labels to proposed canonical name(s). */
export const PATRISTIC_SUBTOPIC_ALIASES: Record<string, string | string[]> = {
    // Scripture
    "Scripture's Authority": 'Sola Scriptura',
    'Scripture as Judge': 'Sola Scriptura',
    'Sufficiency of Scripture': 'Sola Scriptura',
    'Inerrancy of Scripture': 'Inerrancy of Scripture',
    'Perspicuity of Scripture': 'Perspicuity of Scripture',
    'Biblical Canon': 'Old Testament Canon',
    'Old Testament Canon': 'Old Testament Canon',
    'New Testament Canon': 'New Testament Canon',
    'Patristic Fallibility': 'Patristic Fallibility',
    'Implicit Faith': 'Patristic Fallibility',

    // Trinity
    Trinity: 'Tri-personality',
    'Tri-personality': 'Tri-personality',
    Homoousion: 'Homoousios',
    Consubstantial: 'Homoousios',
    Hypostasis: 'Person and Hypostasis',
    'Person in Trinity': 'Person and Hypostasis',
    'Three Persons': 'Person and Hypostasis',
    'Procession of the Spirit': 'Procession of the Spirit',
    Filioque: 'Procession of the Spirit',
    'Holy Spirit Proceeds': 'Procession of the Spirit',
    'Eternal Generation': 'Eternal Generation',
    'Generation of the Son': 'Eternal Generation',

    // Christology
    'Two Natures': 'Two Natures',
    Chalcedon: 'Two Natures',
    Nestorianism: 'Two Natures',
    Monophysitism: 'Two Natures',
    Theotokos: 'Theotokos',
    'Mother of God': 'Theotokos',
    'Against Ransom to Satan': 'Against Ransom to Satan',
    'Ransom to Satan': 'Against Ransom to Satan',
    'Ransom to the Devil': 'Against Ransom to Satan',
    'Against Moral Influence': 'Against Moral Influence',
    'Moral Influence': 'Against Moral Influence',
    'Moral-influence': 'Against Moral Influence',

    // The Church
    'Extra Ecclesiam Nulla Salus': 'Extra Ecclesiam Nulla Salus',
    'No Salvation Outside Church': 'Extra Ecclesiam Nulla Salus',
    'Outside the Church': 'Extra Ecclesiam Nulla Salus',
    'Visible Church': 'Visible Church',
    'Apostolic Churches': 'Visible Church',
    'External Communion': 'Visible Church',
    'Church as Kingdom of God': 'Church as Kingdom of God',
    'Kingdom of Heaven': 'Church as Kingdom of God',
    'Kingdom of God': 'Church as Kingdom of God',

    // Atonement
    Atonement: 'Penal Substitution',
    'Penal Substitutionary Atonement': 'Penal Substitution',
    'Definite Atonement': 'Penal Substitution',
    'Works of Christ': 'Humiliation',
    Redemption: 'Satisfaction',
    'Christ the Sole Mediator': 'Mediator',
    Mediatorship: 'Mediator',
    'Divinity of Christ': 'Divinity of Christ',
    "Christ's Human Development": 'Incarnation',

    // Justification
    'Faith Alone': 'Sola Fide',
    'Faith and Salvation': 'Sola Fide',
    'Faith and Assurance': 'Sola Fide',
    'Works and Justification': 'Sola Fide',
    'Grace Alone': 'Sola Gratia',
    'Grace & Mercy': 'Sola Gratia',
    'Grace vs. Merit': 'Sola Gratia',
    Imputation: 'Imputed Righteousness',
    'Imputed Satisfaction': 'Imputed Righteousness',
    Assurance: 'Assurance',
    'Assurance of Faith': 'Assurance',
    Salvation: 'Assurance',
    'Supererogation Defined': 'Supererogation',
    'Impossibility of Supererogation': 'Supererogation',
    'Supererogation Qualified': 'Supererogation',

    // Predestination / doctrines of grace
    Calvinism: 'Election',
    Election: 'Election',
    'Unconditional Election': 'Unconditional Election',
    Predestination: 'Election',
    'Irresistible Grace': 'Irresistible Grace',
    'Total Depravity': 'Total Depravity',
    'Depravity of Man': 'Total Depravity',
    'Limited Atonement': 'Limited Atonement',
    'Perseverance of the Saints': 'Perseverance of the Saints',
    Perseverance: 'Perseverance of the Saints',

    // Original sin / will
    'Semi-Pelagian slip': 'Synergism',
    'Pre-Augustinian Free Will': 'Synergism',
    'Prevenient Grace': 'Synergism',
    'Original Sin Remains After Baptism': 'Original Sin',

    // Church governance
    'Church Governance': 'Papal Primacy',
    'Papal Supremacy': 'Papal Primacy',
    'Papal Primacy': 'Papal Primacy',
    'Papal Hyperbole': 'Papal Primacy',
    'Against Universal Bishop': 'Papal Primacy',
    'Against Papal Jurisdiction': 'Papal Primacy',
    'Episcopal Collegiality': 'Councils',
    'Honorific Primacy': 'Councils',
    "Peter's Chair": 'Councils',
    Authority: 'Councils',
    'Imperial Convocation of Councils': 'Councils',
    'Apostolic Equality': 'Councils',
    'Apostolic Power': 'Councils',
    'Matthew 16:18': 'Matthew 16:18',
    Antichrist: 'Matthew 16:18',

    // Images / angels
    'Against Religious Images': 'Iconoclasm',
    'Against Images in Churches': 'Iconoclasm',
    'Against Material Images': 'Iconoclasm',
    'Image = Idol': 'Iconoclasm',
    'Against Image Worship': 'Iconoclasm',
    'Saint & Idol Worship': 'Iconoclasm',
    'Against Saint Worship': 'Iconoclasm',
    'Against Relic Worship': 'Iconoclasm',
    'Worship of God Alone': 'Iconoclasm',
    'Against Marian Invocation': 'Iconoclasm',
    'Angel Worship Condemned': 'Iconoclasm',
    'Angelic Orders': 'Nine Choirs',
    'Nine Choirs': 'Nine Choirs',
    'Sola Deo Gloria': 'Sola Deo Gloria',

    // Mary / saints
    'Invocation & Intercession': 'Invocation',
    'Against Saint Invocation': 'Invocation',
    'Erroneous Invocation': 'Invocation',
    'Against Omniscience of Saints': 'Invocation',
    'Omnipresence of Saints': 'Invocation',
    "Martyrs' Presence": 'Invocation',
    'Uncertainty of Intercession': 'Invocation',
    'Apostrophe vs. Invocation': 'Invocation',
    'Apostrophe vs. Assertion': 'Invocation',
    'Commemoration vs. Invocation': 'Invocation',
    'Marian Veneration Qualified': 'Commemoration',
    "Mary's Sinlessness": 'Merits of Saints',
    'Mary as Mediatrix': 'Merits of Saints',
    'Merits of Saints': 'Merits of Saints',

    // Eucharist
    Sacraments: 'Real Presence',
    'Christ\'s Body in One Place': 'Real Presence',
    'Efficacy of Sacraments': 'Real Presence',
    'Sacramental Body': 'Real Presence',
    'Two Modes of Presence': 'Real Presence',
    'Words of Consecration': 'Real Presence',
    'Spiritual Language': 'Figurative Language',
    'Figurative Interpretation': 'Figurative Language',
    'Spiritual Sacrifice': 'Figurative Language',
    'Spiritual Eating': 'Figurative Language',
    'Spiritual Reception': 'Figurative Language',
    'Eucharistic Hyperbole': 'Figurative Language',
    'Sacrifice of the Mass': 'Figurative Language',
    'Against Transubstantiation': 'Against Transubstantiation',
    Eucharist: 'Real Presence',

    // Worship / spiritual practices
    'Origin of Compulsory Fasting': 'Fasting',
    'Set Fasting Times': 'Fasting',
    'Origin of Lent': 'Fasting',
    'Voluntary Fasting': 'Fasting',
    'Purpose of Fasting': 'Fasting',
    'Fasting with Teaching': 'Fasting',
    'Early Practice': 'Liturgical Practice',
    "The Lord's Prayer": 'Liturgical Practice',
    "Lord's Prayer": 'Liturgical Practice',
    'Lex Orandi Lex Credendi': 'Liturgical Practice',
    'Canonical Hours': 'Liturgical Practice',
    'Power in Faith not Sign': 'Sign of the Cross',
    "Power Through Christ's Name": 'Sign of the Cross',
    'Cross Efficacious': 'Sign of the Cross',
    'Cross + Invocation': 'Sign of the Cross',

    // Marriage
    'Denigration of Marriage': 'Marriage & Celibacy',
    'Dignity of Marriage': 'Marriage & Celibacy',
    'Praise of Virginity': 'Marriage & Celibacy',
    'Clerical Celibacy': 'Marriage & Celibacy',
    Marriage: 'Marriage & Celibacy',
    Virginity: 'Marriage & Celibacy',

    // Purgatory / afterlife
    'Against Purgatory': 'Intermediate State',
    'State of the Dead': 'Intermediate State',
    'Limbus Patrum': 'Intermediate State',
    'Purgatorial Fire': 'Intermediate State',
    'Descent into Hell': 'Intermediate State',
    Purgatory: 'Intermediate State',
    'Souls Cannot Return': 'Souls Cannot Return',
    'Pagan Antecedents': 'Eschatological Purging'
};

function expandAlias(label: string): string[] {
    const mapped = PATRISTIC_SUBTOPIC_ALIASES[label];
    if (mapped === undefined) return [label];
    return Array.isArray(mapped) ? mapped : [mapped];
}

export function canonicalizePatristicSubtopics(subtopics: string[]): string[] {
    const seen = new Set<string>();
    const result: string[] = [];

    for (const subtopic of subtopics) {
        const trimmed = subtopic.trim();
        if (!trimmed) continue;

        for (const canonical of expandAlias(trimmed)) {
            if (!seen.has(canonical)) {
                seen.add(canonical);
                result.push(canonical);
            }
        }
    }

    return result;
}
