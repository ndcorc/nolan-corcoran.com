import { toPlainText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

function blockKey(): string {
    return Math.random().toString(36).slice(2, 12);
}

type QuoteSpan = { text: string; marks: string[] };

/** Converts a plain string into a single-block Portable Text value for Sanity. */
export function plainTextToPatristicQuoteBlocks(text: string): PortableTextBlock[] {
    if (/\*\*\*|\*\*|\*(?!\*)/.test(text)) {
        return formattedTextToPatristicQuoteBlocks(text);
    }

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

/**
 * Converts markdown-style emphasis (**bold**, *italic*, nested) to Portable Text.
 * Used when importing formatted patristic quote bodies from source documents.
 */
export function formattedTextToPatristicQuoteBlocks(text: string): PortableTextBlock[] {
    const spans: QuoteSpan[] = [];
    let index = 0;
    let openStrong = false;
    let openEm = false;

    const pushSpan = (chunk: string) => {
        if (!chunk) return;
        const marks: string[] = [];
        if (openStrong) marks.push('strong');
        if (openEm) marks.push('em');
        spans.push({ text: chunk, marks });
    };

    while (index < text.length) {
        if (text.startsWith('***', index)) {
            openStrong = !openStrong;
            openEm = !openEm;
            index += 3;
            continue;
        }

        if (text.startsWith('**', index)) {
            openStrong = !openStrong;
            index += 2;
            continue;
        }

        if (text.startsWith('*', index)) {
            openEm = !openEm;
            index += 1;
            continue;
        }

        const nextMarker = (() => {
            const positions = ['***', '**', '*']
                .map((marker) => text.indexOf(marker, index))
                .filter((pos) => pos !== -1);
            return positions.length ? Math.min(...positions) : -1;
        })();

        const end = nextMarker === -1 ? text.length : nextMarker;
        pushSpan(text.slice(index, end));
        index = end;
    }

    return [
        {
            _type: 'block',
            _key: blockKey(),
            style: 'normal',
            markDefs: [],
            children: spans.map((span) => ({
                _type: 'span' as const,
                _key: blockKey(),
                text: span.text,
                marks: span.marks
            }))
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
