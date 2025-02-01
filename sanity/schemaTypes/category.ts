import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'category',
    title: 'Category',
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
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Theology', value: '#364e62' },
                    { title: 'Christian Living', value: '#797d62' },
                    { title: 'Apologetics', value: '#f1dca7' },
                    { title: 'Philosophy', value: '#6E0909' },
                    { title: 'Worldview & Culture', value: '#997b66' }
                ]
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        })
    ]
});
