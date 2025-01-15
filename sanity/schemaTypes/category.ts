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
                    { title: 'Theology', value: 'theology' },
                    { title: 'Christian Living', value: 'christian-living' },
                    { title: 'Apologetics', value: 'apologetics' },
                    { title: 'Philosophy', value: 'philosophy' },
                    { title: 'Worldview & Culture', value: 'worldview-culture' }
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
