import { slugify } from './patristicQuotesCsv';

export const PATRISTIC_VOCABULARY_TYPES = [
    'patristicTopic',
    'patristicSubtopic',
    'patristicEra',
    'patristicFather',
    'patristicSource',
    'patristicWork',
    'patristicPosition'
] as const;

export type PatristicVocabularyType = (typeof PATRISTIC_VOCABULARY_TYPES)[number];

export function patristicVocabularyId(type: PatristicVocabularyType, title: string): string {
    return `${type}-${slugify(title)}`;
}

export function patristicVocabularyDocument(type: PatristicVocabularyType, title: string) {
    const trimmed = title.trim();
    return {
        _id: patristicVocabularyId(type, trimmed),
        _type: type,
        title: trimmed,
        slug: { _type: 'slug' as const, current: slugify(trimmed) }
    };
}

export function patristicVocabularyReference(type: PatristicVocabularyType, title: string) {
    const trimmed = title.trim();
    if (!trimmed) return undefined;

    return {
        _type: 'reference' as const,
        _ref: patristicVocabularyId(type, trimmed)
    };
}

export function patristicVocabularyReferenceKey(
    type: PatristicVocabularyType,
    title: string,
    index = 0
): string {
    const base = `${type}-${slugify(title.trim())}` || `${type}-ref`;
    return index === 0 ? base : `${base}-${index}`;
}

export function patristicVocabularyReferences(type: PatristicVocabularyType, titles: string[]) {
    return titles
        .map((title, index) => {
            const ref = patristicVocabularyReference(type, title);
            if (!ref) return undefined;

            return {
                ...ref,
                _key: patristicVocabularyReferenceKey(type, title, index)
            };
        })
        .filter((ref): ref is NonNullable<typeof ref> => ref !== undefined);
}
