/** Display order for patristic quote topics (matches data/patristic_quotes_taxonomy_proposed.csv). */
export const PATRISTIC_TOPIC_ORDER = [
    'The Old Testament Canon',
    'The New Testament Canon',
    'The Inerrancy of Scripture',
    'The Sufficiency of Scripture',
    'The Perspicuity of Scripture',
    'The Trinity',
    'Christology',
    'Atonement',
    'Particular Redemption',
    'Justification by Faith Alone',
    'Predestination',
    'Original Sin',
    'The Church',
    'The Rock',
    'Images',
    'Praying to Mary and the Saints',
    'The Eucharist',
    "The Lord's Day Worship",
    'The Law of Continence',
    'Purgatory'
] as const;

export function comparePatristicTopics(a: string, b: string): number {
    const indexA = PATRISTIC_TOPIC_ORDER.indexOf(a as (typeof PATRISTIC_TOPIC_ORDER)[number]);
    const indexB = PATRISTIC_TOPIC_ORDER.indexOf(b as (typeof PATRISTIC_TOPIC_ORDER)[number]);
    const rankA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const rankB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

    if (rankA !== rankB) return rankA - rankB;
    return a.localeCompare(b);
}
