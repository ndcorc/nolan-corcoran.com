import { defineArrayMember } from 'sanity';

/** Inline-focused Portable Text for patristic quote bodies (bold / italic only). */
export const patristicQuoteTextBlock = defineArrayMember({
    type: 'block',
    styles: [{ title: 'Normal', value: 'normal' }],
    lists: [],
    marks: {
        decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' }
        ],
        annotations: []
    }
});
