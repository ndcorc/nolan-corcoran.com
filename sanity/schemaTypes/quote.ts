// sanity/schemaTypes/quote.ts
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'quote',
    title: 'Quote',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            title: 'Text',
            type: 'text',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string'
        }),
        defineField({
            name: 'topic',
            title: 'Topic',
            type: 'string',
            options: {
                list: [
                    // You can customize this list with your specific topics
                    { title: 'Theology', value: 'theology' },
                    { title: 'Philosophy', value: 'philosophy' },
                    { title: 'Christian Living', value: 'christian-living' },
                    { title: 'Apologetics', value: 'apologetics' },
                    { title: 'Worldview', value: 'worldview' }
                ]
            }
        }),
        defineField({
            name: 'subtopic',
            title: 'Sub-topic',
            type: 'string'
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'author',
                maxLength: 96
            }
        })
    ],
    preview: {
        select: {
            title: 'text',
            subtitle: 'author'
        },
        prepare(selection) {
            const { title, subtitle } = selection;
            return {
                title: title?.length > 50 ? title.substring(0, 50) + '...' : title,
                subtitle: `by ${subtitle}`
            };
        }
    }
});
