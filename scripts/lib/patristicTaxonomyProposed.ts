import fs from 'fs';
import path from 'path';

export interface TaxonomyEntry {
    topicSort: number;
    topic: string;
    subtopic: string;
    list1Cap: string;
    list3Section: string;
    legacyTopicAliases: string[];
    legacySubtopicAliases: string[];
}

const AMBIGUOUS_LEGACY_TOPICS = new Set(['Scripture & Canon']);

function splitAliases(value: string): string[] {
    return value
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean);
}

function parseCsvLine(line: string): string[] {
    const fields: string[] = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
            if (ch === '"' && line[i + 1] === '"') {
                field += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                field += ch;
            }
            continue;
        }

        if (ch === '"') {
            inQuotes = true;
        } else if (ch === ',') {
            fields.push(field);
            field = '';
        } else {
            field += ch;
        }
    }

    fields.push(field);
    return fields;
}

export function parseTaxonomyCsv(text: string): TaxonomyEntry[] {
    const lines = text.trim().split('\n');
    const header = parseCsvLine(lines[0] ?? '');
    const index = Object.fromEntries(header.map((name, i) => [name, i]));

    return lines.slice(1).map((line) => {
        const values = parseCsvLine(line);
        const get = (name: string) => values[index[name]]?.trim() ?? '';

        return {
            topicSort: Number(get('topic_sort')),
            topic: get('topic'),
            subtopic: get('subtopic'),
            list1Cap: get('list1_cap'),
            list3Section: get('list3_section'),
            legacyTopicAliases: splitAliases(get('legacy_topic_aliases')),
            legacySubtopicAliases: splitAliases(get('legacy_subtopic_aliases'))
        };
    });
}

export function loadProposedTaxonomy(csvPath?: string): TaxonomyEntry[] {
    const resolvedPath =
        csvPath ?? path.join(process.cwd(), 'data/patristic_quotes_taxonomy_proposed.csv');
    return parseTaxonomyCsv(fs.readFileSync(resolvedPath, 'utf8'));
}

export function buildTaxonomyIndex(entries: TaxonomyEntry[]) {
    const topicSort = new Map<string, number>();
    const topics = new Set<string>();
    const subtopicsByTopic = new Map<string, Set<string>>();
    const orderedTopics: string[] = [];

    for (const entry of entries) {
        topics.add(entry.topic);
        if (!topicSort.has(entry.topic)) {
            topicSort.set(entry.topic, entry.topicSort);
            orderedTopics.push(entry.topic);
        }

        if (!subtopicsByTopic.has(entry.topic)) {
            subtopicsByTopic.set(entry.topic, new Set());
        }
        if (entry.subtopic) {
            subtopicsByTopic.get(entry.topic)!.add(entry.subtopic);
        }
    }

    orderedTopics.sort((a, b) => topicSort.get(a)! - topicSort.get(b)!);

    return { entries, topicSort, topics, subtopicsByTopic, orderedTopics };
}

function findTargetsForLegacySubtopic(
    alias: string,
    rowTopic: string,
    entries: TaxonomyEntry[]
): TaxonomyEntry[] {
    const matches = entries.filter((entry) => entry.legacySubtopicAliases.includes(alias));
    if (matches.length <= 1) return matches;

    const topicMatches = matches.filter((entry) => entry.legacyTopicAliases.includes(rowTopic));
    if (topicMatches.length > 0) {
        return topicMatches;
    }

    return matches;
}

function addCandidate(
    candidates: Map<string, number>,
    topic: string,
    topicSort: Map<string, number>
) {
    const sort = topicSort.get(topic);
    if (sort === undefined) return;

    const existing = candidates.get(topic);
    if (existing === undefined || sort < existing) {
        candidates.set(topic, sort);
    }
}

export function resolveProposedTaxonomyForQuote(
    rowTopic: string,
    rawSubtopics: string[],
    index: ReturnType<typeof buildTaxonomyIndex>
) {
    const { entries, topicSort, topics, subtopicsByTopic } = index;

    if (topics.has(rowTopic)) {
        const allowed = subtopicsByTopic.get(rowTopic) ?? new Set<string>();
        const subtopics =
            allowed.size === 0
                ? rawSubtopics
                : rawSubtopics.filter((subtopic) => allowed.has(subtopic));
        return { topic: rowTopic, subtopics: [...new Set(subtopics)].sort() };
    }

    const subtopicCandidates = new Map<string, number>();
    const topicCandidates = new Map<string, number>();
    const subtopicsForTopic = new Map<string, Set<string>>();

    for (const alias of rawSubtopics) {
        const targets = findTargetsForLegacySubtopic(alias, rowTopic, entries);
        for (const target of targets) {
            addCandidate(subtopicCandidates, target.topic, topicSort);
            if (target.subtopic) {
                if (!subtopicsForTopic.has(target.topic)) {
                    subtopicsForTopic.set(target.topic, new Set());
                }
                subtopicsForTopic.get(target.topic)!.add(target.subtopic);
            }
        }
    }

    const hasExplicitOt = rawSubtopics.includes('Old Testament Canon');
    const hasExplicitNt = rawSubtopics.includes('New Testament Canon');
    const hasBiblical = rawSubtopics.includes('Biblical Canon');

    if (rawSubtopics.includes('Particular Redemption')) {
        subtopicCandidates.delete('Atonement');
        addCandidate(subtopicCandidates, 'Particular Redemption', topicSort);
    }

    if (hasExplicitNt || hasExplicitOt || hasBiblical) {
        subtopicCandidates.delete('The Old Testament Canon');
        subtopicCandidates.delete('The New Testament Canon');

        if (hasExplicitNt && hasExplicitOt) {
            addCandidate(subtopicCandidates, 'The Old Testament Canon', topicSort);
        } else if (hasExplicitNt) {
            addCandidate(subtopicCandidates, 'The New Testament Canon', topicSort);
        } else {
            addCandidate(subtopicCandidates, 'The Old Testament Canon', topicSort);
        }
    }

    if (!AMBIGUOUS_LEGACY_TOPICS.has(rowTopic)) {
        const topicMatches = entries.filter((entry) => entry.legacyTopicAliases.includes(rowTopic));
        for (const match of topicMatches) {
            addCandidate(topicCandidates, match.topic, topicSort);
        }
    }

    let candidatePool = subtopicCandidates;
    if (candidatePool.size === 0) {
        candidatePool = topicCandidates;
    }

    if (candidatePool.size === 0) {
        const fallbackMatches = entries.filter((entry) => entry.legacyTopicAliases.includes(rowTopic));
        for (const match of fallbackMatches) {
            addCandidate(candidatePool, match.topic, topicSort);
        }
    }

    if (candidatePool.size === 0) {
        throw new Error(`Unable to resolve taxonomy for topic "${rowTopic}"`);
    }

    const chosenTopic = [...candidatePool.entries()].sort((a, b) => a[1] - b[1])[0][0];
    const newSubtopics = [...(subtopicsForTopic.get(chosenTopic) ?? [])].sort();

    return { topic: chosenTopic, subtopics: newSubtopics };
}

export function getProposedTopicOrder(index: ReturnType<typeof buildTaxonomyIndex>): string[] {
    return index.orderedTopics;
}
