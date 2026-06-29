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
    'Sufficiency of Scripture': 'Sola Scriptura',
    "Scripture's Authority": 'Sola Scriptura',
    'Scripture as Judge': 'Sola Scriptura',

    Imputation: 'Imputed Righteousness',
    'Imputed Satisfaction': 'Imputed Righteousness',

    // Assurance
    Assurance: 'Assurance of Faith',

    // Images
    'Against Religious Images': 'Against Image Worship',
    'Against Images in Churches': 'Against Image Worship',
    'Against Material Images': 'Against Image Worship',
    'Image = Idol': 'Against Image Worship',

    // Invocation of saints
    'Against Saint Invocation': 'Saint & Idol Worship',
    'Erroneous Invocation': 'Saint & Idol Worship',
    'Against Saint Worship': 'Saint & Idol Worship',
    'Against Marian Invocation': 'Saint & Idol Worship',
    'Against Relic Worship': 'Saint & Idol Worship',
    'Angel Worship Condemned': 'Saint & Idol Worship',
    'Worship of God Alone': 'Saint & Idol Worship',
    'Against Omniscience of Saints': 'Uncertainty of Intercession',
    'Omnipresence of Saints': 'Uncertainty of Intercession',
    "Martyrs' Presence": 'Uncertainty of Intercession',
    'Apostrophe vs. Invocation': 'Invocation & Intercession',
    'Apostrophe vs. Assertion': 'Invocation & Intercession',

    // Purgatory / afterlife
    'State of the Dead': 'Purgatory',
    'Limbus Patrum': 'Purgatory',
    'Purgatorial Fire': 'Purgatory',
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
    'Episcopal Collegiality': 'Papal Supremacy',
    'Honorific Primacy': 'Papal Hyperbole',
    "Peter's Chair": 'Papal Supremacy',
    'Against Universal Bishop': 'Papal Supremacy',
    'Against Papal Jurisdiction': 'Papal Supremacy',
    'Matthew 16:18': 'Papal Supremacy',
    'Papal Primacy': 'Papal Supremacy',
    'Apostolic Equality': 'Papal Supremacy',

    // Sign of the Cross
    'Cross + Invocation': "Power Through Christ's Name",

    // Liturgy / tradition / prayer
    'Early Practice': 'Canonical Hours',
    "Lord's Prayer": "The Lord's Prayer",
    'Lex Orandi Lex Credendi': "The Lord's Prayer",

    // Marriage / celibacy
    'Denigration of Marriage': 'Marriage',
    'Dignity of Marriage': 'Marriage',
    'Praise of Virginity': 'Virginity',
    'Clerical Celibacy': 'Virginity',

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
