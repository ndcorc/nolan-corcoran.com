/** Maps variant subtopic labels to a single canonical name (Latin preferred where standard). */
export const PATRISTIC_SUBTOPIC_ALIASES: Record<string, string> = {
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
    'Against Saint Invocation': 'Against Saint Worship',
    'Erroneous Invocation': 'Against Saint Worship',
    'Angel Worship Condemned': 'Worship of God Alone',
    'Against Omniscience of Saints': 'Uncertainty of Intercession',
    'Omnipresence of Saints': 'Uncertainty of Intercession',
    "Martyrs' Presence": 'Uncertainty of Intercession',

    // Purgatory (affirming Catholic view)
    Purgatory: 'Purgatorial Fire',

    // Supererogation
    'Supererogation Defined': 'Supererogation Qualified',
    'Impossibility of Supererogation': 'Supererogation Qualified',

    // Lord's Supper / Mass
    'Sacrifice of the Mass': 'Spiritual Sacrifice',
    'Eucharistic Hyperbole': 'Figurative Interpretation',
    'Spiritual Reception': 'Figurative Interpretation',
    'Two Modes of Presence': 'Figurative Interpretation',
    'Words of Consecration': 'Figurative Interpretation',
    'Sacramental Body': 'Figurative Interpretation',

    // Christology / mediation
    Mediatorship: 'Christ the Sole Mediator',

    // Free will / grace
    'Semi-Pelagian slip': 'Synergism',

    // Afterlife
    'Descent into Hell': 'Limbus Patrum',

    // Angels
    'Angelic Orders': 'Nine Choirs',

    // Fasting
    'Origin of Compulsory Fasting': 'Origin of Lent',
    'Set Fasting Times': 'Origin of Lent',

    // Papacy / church governance
    'Episcopal Collegiality': 'Apostolic Equality',
    'Honorific Primacy': 'Papal Hyperbole',
    "Peter's Chair": 'Papal Primacy',

    // Sign of the Cross
    'Cross + Invocation': "Power Through Christ's Name",

    // Liturgy / tradition
    'Early Practice': 'Canonical Hours',

    // Original sin
    'Original Sin': 'Original Sin Remains After Baptism'
};

export function canonicalizePatristicSubtopics(subtopics: string[]): string[] {
    const seen = new Set<string>();
    const result: string[] = [];

    for (const subtopic of subtopics) {
        const trimmed = subtopic.trim();
        if (!trimmed) continue;

        const canonical = PATRISTIC_SUBTOPIC_ALIASES[trimmed] ?? trimmed;
        if (!seen.has(canonical)) {
            seen.add(canonical);
            result.push(canonical);
        }
    }

    return result;
}
