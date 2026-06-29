import { defineField, defineType } from 'sanity';

function definePatristicVocabulary(name: string, title: string) {
    return defineType({
        name,
        title,
        type: 'document',
        fields: [
            defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: 'slug',
                title: 'Slug',
                type: 'slug',
                options: {
                    source: 'title',
                    maxLength: 96
                },
                validation: (Rule) => Rule.required()
            })
        ],
        preview: {
            select: { title: 'title' }
        }
    });
}

export const patristicTopic = definePatristicVocabulary('patristicTopic', 'Topic');
export const patristicSubtopic = definePatristicVocabulary('patristicSubtopic', 'Subtopic');
export const patristicEra = definePatristicVocabulary('patristicEra', 'Era');
export const patristicFather = definePatristicVocabulary('patristicFather', 'Father');
export const patristicSource = definePatristicVocabulary('patristicSource', 'Source');
export const patristicWork = definePatristicVocabulary('patristicWork', 'Work');
export const patristicPosition = definePatristicVocabulary('patristicPosition', 'Position');

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

export const PATRISTIC_QUOTE_TYPES = ['patristicQuote', ...PATRISTIC_VOCABULARY_TYPES] as const;

function vocabularyReference(to: PatristicVocabularyType) {
    return {
        type: 'reference' as const,
        to: [{ type: to }],
        options: {
            disableNew: false
        }
    };
}

export function defineVocabularyReferenceField(
    name: string,
    title: string,
    to: PatristicVocabularyType,
    required = false
) {
    if (required) {
        return defineField({
            name,
            title,
            type: 'reference',
            to: [{ type: to }],
            options: {
                disableNew: false
            },
            validation: (Rule) => Rule.required()
        });
    }

    return defineField({
        name,
        title,
        type: 'reference',
        to: [{ type: to }],
        options: {
            disableNew: false
        }
    });
}

export function defineVocabularyReferenceArrayField(
    name: string,
    title: string,
    to: PatristicVocabularyType,
    description?: string
) {
    const ref = vocabularyReference(to);
    return defineField({
        name,
        title,
        type: 'array',
        of: [
            {
                type: ref.type,
                to: ref.to,
                options: ref.options
            }
        ],
        description
    });
}
