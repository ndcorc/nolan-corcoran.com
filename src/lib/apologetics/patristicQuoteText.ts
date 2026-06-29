import { toPlainText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

function blockKey(): string {
    return Math.random().toString(36).slice(2, 12);
}

/** Converts a plain string into a single-block Portable Text value for Sanity. */
export function plainTextToPatristicQuoteBlocks(text: string): PortableTextBlock[] {
    return [
        {
            _type: 'block',
            _key: blockKey(),
            style: 'normal',
            markDefs: [],
            children: [
                {
                    _type: 'span',
                    _key: blockKey(),
                    text,
                    marks: []
                }
            ]
        }
    ];
}

export type PatristicQuoteTextInput = string | PortableTextBlock[] | null | undefined;

export function isPortableTextQuoteText(value: unknown): value is PortableTextBlock[] {
    return (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === 'object' &&
        value[0] !== null &&
        '_type' in value[0] &&
        value[0]._type === 'block'
    );
}

/** Normalizes legacy plain-text or Portable Text quote bodies from Sanity. */
export function normalizePatristicQuoteText(quoteText: PatristicQuoteTextInput): {
    blocks: PortableTextBlock[];
    plain: string;
} {
    if (!quoteText) {
        return { blocks: plainTextToPatristicQuoteBlocks(''), plain: '' };
    }

    if (typeof quoteText === 'string') {
        return { blocks: plainTextToPatristicQuoteBlocks(quoteText), plain: quoteText };
    }

    return { blocks: quoteText, plain: toPlainText(quoteText) };
}
