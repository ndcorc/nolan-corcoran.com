import { defineField, defineType } from 'sanity';
import { richTextBlock } from './blocks/richTextBlock';

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string'
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
        }),
        defineField({
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
            validation: (Rule) => Rule.required().min(1)
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                richTextBlock,
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            description: 'Important for SEO and accessibility.',
                            validation: (Rule) => Rule.required()
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption'
                        }
                    ]
                },
                { type: 'twoColumnBlock' }
            ]
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            subtitle: 'subtitle'
        }
    }
});
