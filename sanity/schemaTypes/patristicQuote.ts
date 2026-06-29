import { defineField, defineType } from 'sanity';
import { toPlainText } from '@portabletext/react';
import { patristicQuoteTextBlock } from './blocks/patristicQuoteTextBlock';
import {
    defineVocabularyReferenceArrayField,
    defineVocabularyReferenceField
} from './patristicVocabulary';

export default defineType({
    name: 'patristicQuote',
    title: 'Patristic Quote',
    type: 'document',
    fields: [
        defineField({
            name: 'legacyId',
            title: 'Legacy ID',
            type: 'string',
            description: 'Original citation ID (e.g. FC001). Used for stable references.',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'legacyId',
                maxLength: 120
            },
            validation: (Rule) => Rule.required()
        }),
        defineVocabularyReferenceField('father', 'Church Father / Author', 'patristicFather', true),
        defineField({
            name: 'died',
            title: 'Died (AD)',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'diedSort',
            title: 'Died Sort Key',
            type: 'number',
            description: 'Numeric sort key derived from died date (auto-set during migration).'
        }),
        defineVocabularyReferenceField('era', 'Era', 'patristicEra', true),
        defineVocabularyReferenceField('sourceWork', 'Work', 'patristicWork'),
        defineField({
            name: 'sourceRef',
            title: 'Source Reference',
            type: 'string',
            description: 'Citation within the work (e.g. book/chapter).'
        }),
        defineField({
            name: 'quoteText',
            title: 'Quote Text',
            type: 'array',
            of: [patristicQuoteTextBlock],
            validation: (Rule) => Rule.required().min(1)
        }),
        defineVocabularyReferenceField('topic', 'Topic', 'patristicTopic', true),
        defineVocabularyReferenceArrayField(
            'subtopics',
            'Subtopics',
            'patristicSubtopic',
            'One or more thematic labels. Quotes match a subtopic filter if any value is included.'
        ),
        defineVocabularyReferenceField('position', 'Position', 'patristicPosition'),
        defineVocabularyReferenceField('book', 'Source', 'patristicSource'),
        defineField({
            name: 'section',
            title: 'Section',
            type: 'string'
        }),
        defineField({
            name: 'notes',
            title: 'Notes',
            type: 'text',
            rows: 3
        })
    ],
    orderings: [
        {
            title: 'Father, A → Z',
            name: 'fatherAsc',
            by: [
                { field: 'father.title', direction: 'asc' },
                { field: 'diedSort', direction: 'asc' }
            ]
        },
        {
            title: 'Legacy ID',
            name: 'legacyIdAsc',
            by: [{ field: 'legacyId', direction: 'asc' }]
        }
    ],
    preview: {
        select: {
            father: 'father.title',
            quoteText: 'quoteText',
            description: 'legacyId'
        },
        prepare({ father, quoteText, description }) {
            const subtitle =
                typeof quoteText === 'string' ? quoteText : toPlainText(quoteText ?? []);
            return {
                title: `${description} — ${father ?? 'Unknown'}`,
                subtitle: subtitle?.length > 80 ? subtitle.substring(0, 80) + '…' : subtitle
            };
        }
    }
});
