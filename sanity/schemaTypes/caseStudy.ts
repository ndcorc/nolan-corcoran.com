// sanity/schemaTypes/caseStudy.ts
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        defineField({
            name: 'project',
            title: 'Project',
            type: 'reference',
            to: [{ type: 'project' }],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'challenges',
            title: 'Challenges',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'solutions',
            title: 'Solutions',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string'
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text'
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'implementation',
            title: 'Implementation Details',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'results',
            title: 'Results',
            type: 'array',
            of: [{ type: 'string' }]
        })
    ],
    preview: {
        select: {
            title: 'project.title'
        },
        prepare({ title }) {
            return {
                title: `Case Study: ${title}`
            };
        }
    }
});
