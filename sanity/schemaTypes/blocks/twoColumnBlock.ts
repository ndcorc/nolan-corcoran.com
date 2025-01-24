import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'twoColumnBlock',
    type: 'object',
    title: 'Two Column Block',
    fields: [
        defineField({
        name: 'leftColumn',
        type: 'array',
        title: 'Left Column',
        of: [{ type: 'block' }],
      }),
      defineField({
        name: 'rightColumn',
        type: 'array',
        title: 'Right Column',
        of: [{ type: 'block' }],
      }),
    ],
  });