import { defineField, defineType } from 'sanity';

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
                source: (doc) => {
                    const father = doc.father as string | undefined;
                    const subtopic = doc.subtopic as string | undefined;
                    const topic = doc.topic as string | undefined;
                    const legacyId = doc.legacyId as string | undefined;
                    return [father, subtopic || topic, legacyId].filter(Boolean).join(' ');
                },
                maxLength: 120
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'father',
            title: 'Church Father / Author',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
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
        defineField({
            name: 'era',
            title: 'Era',
            type: 'string',
            options: {
                list: [
                    { title: 'Latin Patristic', value: 'Latin Patristic' },
                    { title: 'Greek Patristic', value: 'Greek Patristic' },
                    { title: 'Byzantine', value: 'Byzantine' },
                    { title: 'Medieval', value: 'Medieval' },
                    { title: 'Post-Tridentine', value: 'Post-Tridentine' },
                    { title: 'Reformation', value: 'Reformation' }
                ]
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'sourceWork',
            title: 'Source Work',
            type: 'string'
        }),
        defineField({
            name: 'sourceRef',
            title: 'Source Reference',
            type: 'string'
        }),
        defineField({
            name: 'quoteText',
            title: 'Quote Text',
            type: 'text',
            rows: 6,
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'topic',
            title: 'Topic',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'subtopic',
            title: 'Subtopic',
            type: 'string'
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
            options: {
                list: [
                    { title: 'Reformed', value: 'Reformed' },
                    { title: 'Roman Catholic', value: 'Roman Catholic' },
                    { title: 'Nuanced', value: 'Nuanced' }
                ]
            }
        }),
        defineField({
            name: 'book',
            title: 'Book',
            type: 'string'
        }),
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
                { field: 'father', direction: 'asc' },
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
            title: 'father',
            subtitle: 'quoteText',
            description: 'legacyId'
        },
        prepare({ title, subtitle, description }) {
            return {
                title: `${description} — ${title}`,
                subtitle: subtitle?.length > 80 ? subtitle.substring(0, 80) + '…' : subtitle
            };
        }
    }
});
