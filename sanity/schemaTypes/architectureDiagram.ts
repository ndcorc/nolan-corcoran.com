// sanity/schemaTypes/architectureDiagram.ts
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'architectureDiagram',
    title: 'Architecture Diagram',
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
            name: 'title',
            title: 'Diagram Title',
            type: 'string'
        }),
        defineField({
            name: 'mermaidCode',
            title: 'Mermaid Diagram Code',
            type: 'text',
            description: 'Enter the Mermaid.js diagram code',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        })
    ],
    preview: {
        select: {
            title: 'project.title',
            subtitle: 'title'
        },
        prepare({ title, subtitle }) {
            return {
                title: `Diagram: ${title}`,
                subtitle
            };
        }
    }
});
