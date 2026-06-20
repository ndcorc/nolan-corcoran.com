import { defineArrayMember } from 'sanity';
import { BlockquoteStyle } from '../../components/blockStyles';

export const richTextBlock = defineArrayMember({
    type: 'block',
    styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote', component: BlockquoteStyle }
    ],
    marks: {
        decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Code', value: 'code' }
        ],
        annotations: [
            {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                    {
                        title: 'URL',
                        name: 'href',
                        type: 'url'
                    }
                ]
            }
        ]
    }
});
