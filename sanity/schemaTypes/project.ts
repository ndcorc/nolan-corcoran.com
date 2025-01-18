// sanity/schemaTypes/project.ts
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'project',
    title: 'Project',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'company',
            title: 'Company/Organization',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'period',
            title: 'Time Period',
            type: 'string',
            description: 'e.g., "2023-2024" or "Jan 2024"',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'type',
            title: 'Project Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Stack', value: 'full-stack' },
                    { title: 'Cloud Architecture', value: 'cloud-architecture' }
                ]
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'techStack',
            title: 'Technical Stack',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'category',
                            title: 'Category',
                            type: 'string',
                            options: {
                                list: [
                                    'Frontend',
                                    'Backend',
                                    'Database',
                                    'Cloud/Infrastructure',
                                    'DevOps',
                                    'Development Tools',
                                    'Testing',
                                    'Other'
                                ]
                            }
                        },
                        {
                            name: 'items',
                            title: 'Technologies',
                            type: 'array',
                            of: [{ type: 'string' }]
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url'
        }),
        defineField({
            name: 'liveUrl',
            title: 'Live URL',
            type: 'url'
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'challenges',
            title: 'Project Challenges',
            type: 'array',
            of: [{ type: 'text' }]
        }),
        defineField({
            name: 'solutions',
            title: 'Solutions Implemented',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Solution Title',
                            type: 'string'
                        },
                        {
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Enter a tabler.io icon name (https://tabler.io/icons)',
                            validation: (Rule) => Rule.required()
                        },
                        {
                            name: 'description',
                            title: 'Solution Description',
                            type: 'text'
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'implementation',
            title: 'Features & Implementation',
            type: 'array',
            of: [{ type: 'text' }]
        }),
        defineField({
            name: 'results',
            title: 'Project Results',
            type: 'array',
            of: [{ type: 'text' }]
        }),
        defineField({
            name: 'architectureDiagram',
            title: 'Architecture Diagram',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Diagram Title',
                    type: 'string'
                },
                {
                    name: 'mermaidCode',
                    title: 'Mermaid Diagram Code',
                    type: 'text',
                    description: 'Enter the Mermaid.js diagram code'
                }
            ]
        }),
        defineField({
            name: 'architectureDiagramImage',
            title: 'Architecture Diagram Image',
            type: 'image',
            options: { hotspot: true }
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'company',
            media: 'image'
        }
    }
});
