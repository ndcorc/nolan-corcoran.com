/** Maps variant subtopic labels to canonical name(s). */
export const PATRISTIC_SUBTOPIC_ALIASES: Record<string, string | string[]> = {
    // Sola Fide
    'Faith Alone': 'Sola Fide',
    'Faith and Salvation': 'Sola Fide',
    'Faith and Assurance': 'Sola Fide',
    'Works and Justification': 'Sola Fide',

    // Sola Gratia
    'Grace Alone': 'Sola Gratia',
    'Grace & Mercy': 'Sola Gratia',
    'Grace vs. Merit': 'Sola Gratia',

    // Sola Scriptura
    "Scripture's Authority": 'Sola Scriptura',
    'Scripture as Judge': 'Sola Scriptura',

    Imputation: 'Imputed Righteousness',
    'Imputed Satisfaction': 'Imputed Righteousness',

    // Assurance
    Assurance: 'Assurance of Faith',

    // Images / saint worship
    'Against Religious Images': 'Saint & Idol Worship',
    'Against Images in Churches': 'Saint & Idol Worship',
    'Against Material Images': 'Saint & Idol Worship',
    'Image = Idol': 'Saint & Idol Worship',
    'Against Image Worship': 'Saint & Idol Worship',

    // Invocation of saints
    'Against Saint Invocation': 'Saint & Idol Worship',
    'Erroneous Invocation': 'Invocation & Intercession',
    'Against Saint Worship': 'Saint & Idol Worship',
    'Against Marian Invocation': 'Invocation & Intercession',
    'Against Relic Worship': 'Saint & Idol Worship',
    'Angel Worship Condemned': 'Saint & Idol Worship',
    'Worship of God Alone': 'Saint & Idol Worship',
    'Against Omniscience of Saints': 'Invocation & Intercession',
    'Omnipresence of Saints': 'Invocation & Intercession',
    "Martyrs' Presence": 'Invocation & Intercession',
    'Uncertainty of Intercession': 'Invocation & Intercession',
    'Merits of Saints': 'Saint & Idol Worship',
    "Mary's Sinlessness": ['Invocation & Intercession', 'Saint & Idol Worship'],
    'Mary as Mediatrix': ['Invocation & Intercession', 'Saint & Idol Worship'],
    'Marian Veneration Qualified': ['Invocation & Intercession', 'Saint & Idol Worship'],
    'Apostrophe vs. Invocation': 'Invocation & Intercession',
    'Apostrophe vs. Assertion': 'Invocation & Intercession',
    'Commemoration vs. Invocation': 'Invocation & Intercession',

    // Purgatory / afterlife
    'Against Purgatory': 'Purgatory',
    'Descent into Hell': 'Purgatory',

    // Supererogation
    'Supererogation Defined': 'Supererogation Qualified',
    'Impossibility of Supererogation': 'Supererogation Qualified',

    // Lord's Supper / Mass / sacraments
    'Sacrifice of the Mass': ['Sacraments', 'Spiritual Language'],
    'Eucharistic Hyperbole': ['Sacraments', 'Spiritual Language'],
    'Spiritual Reception': ['Sacraments', 'Spiritual Language'],
    'Two Modes of Presence': ['Sacraments', 'Spiritual Language'],
    'Words of Consecration': ['Sacraments', 'Spiritual Language'],
    'Sacramental Body': ['Sacraments', 'Spiritual Language'],
    'Figurative Interpretation': ['Sacraments', 'Spiritual Language'],
    'Spiritual Sacrifice': ['Sacraments', 'Spiritual Language'],
    'Spiritual Eating': ['Sacraments', 'Spiritual Language'],

    // Christology / mediation
    Mediatorship: 'Christ the Sole Mediator',

    // Free will / grace
    'Semi-Pelagian slip': 'Synergism',
    'Pre-Augustinian Free Will': 'Synergism',

    // Angels
    'Angelic Orders': 'Nine Choirs',

    // Fasting
    'Origin of Compulsory Fasting': 'Fasting',
    'Set Fasting Times': 'Fasting',
    'Origin of Lent': 'Fasting',
    'Voluntary Fasting': 'Fasting',
    'Purpose of Fasting': 'Fasting',
    'Fasting with Teaching': 'Fasting',

    // Papacy / church governance
    'Episcopal Collegiality': ['Church Governance', 'Authority'],
    'Honorific Primacy': ['Church Governance', 'Authority'],
    "Peter's Chair": ['Church Governance', 'Authority'],
    'Against Universal Bishop': ['Church Governance', 'Authority'],
    'Against Papal Jurisdiction': ['Church Governance', 'Authority'],
    'Matthew 16:18': ['Church Governance', 'Authority'],
    'Papal Primacy': ['Church Governance', 'Authority'],
    'Papal Hyperbole': ['Church Governance', 'Authority'],
    'Apostolic Equality': ['Church Governance', 'Authority'],
    'Papal Supremacy': ['Church Governance', 'Authority'],
    'Imperial Convocation of Councils': ['Church Governance', 'Authority'],
    'Apostolic Power': ['Church Governance', 'Authority'],
    Antichrist: ['Church Governance', 'Authority'],

    // Sign of the Cross
    'Power in Faith not Sign': 'Sign of the Cross',
    "Power Through Christ's Name": 'Sign of the Cross',
    'Cross Efficacious': 'Sign of the Cross',
    'Cross + Invocation': 'Sign of the Cross',

    // Liturgy / tradition / prayer
    'Early Practice': 'Canonical Hours',
    "The Lord's Prayer": "Lord's Prayer",
    'Lex Orandi Lex Credendi': "Lord's Prayer",

    // Marriage / celibacy
    'Denigration of Marriage': 'Marriage & Celibacy',
    'Dignity of Marriage': 'Marriage & Celibacy',
    'Praise of Virginity': 'Marriage & Celibacy',
    'Clerical Celibacy': 'Marriage & Celibacy',
    Marriage: 'Marriage & Celibacy',
    Virginity: 'Marriage & Celibacy',

    // Original sin
    'Original Sin': 'Original Sin Remains After Baptism'
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
