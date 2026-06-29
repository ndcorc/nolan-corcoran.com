'use client';

import type { CSSProperties } from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { normalizePatristicQuoteText } from '@/lib/apologetics/patristicQuoteText';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

const quoteTextComponents: PortableTextComponents = {
    block: ({ children }) => <span className="patristic-quote-text__block">{children}</span>,
    marks: {
        strong: ({ children }) => <strong className="patristic-quote-text__strong">{children}</strong>,
        em: ({ children }) => <em className="patristic-quote-text__em">{children}</em>
    }
};

export type PatristicQuoteTextVariant = 'card' | 'detail' | 'snippet' | 'table';

const VARIANT_CLASS: Record<PatristicQuoteTextVariant, string> = {
    card: 'patristic-quote-text--card',
    detail: 'patristic-quote-text--detail',
    snippet: 'patristic-quote-text--snippet',
    table: 'patristic-quote-text--table'
};

interface PatristicQuoteTextProps {
    quote: PatristicQuote;
    variant?: PatristicQuoteTextVariant;
    lineClamp?: number;
    className?: string;
    style?: CSSProperties;
    withQuotes?: boolean;
}

function resolveQuoteBlocks(quote: PatristicQuote): PortableTextBlock[] {
    if (quote.quoteBlocks?.length) {
        return quote.quoteBlocks;
    }

    return normalizePatristicQuoteText(quote.quote).blocks;
}

export function PatristicQuoteText({
    quote,
    variant = 'card',
    lineClamp,
    className,
    style,
    withQuotes = true
}: PatristicQuoteTextProps) {
    const blocks = resolveQuoteBlocks(quote);
    const classes = [
        'patristic-quote-text',
        VARIANT_CLASS[variant],
        lineClamp ? `patristic-quote-text--clamp-${lineClamp}` : '',
        className
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={classes} style={style}>
            {withQuotes ? '\u201C' : null}
            <PortableText value={blocks} components={quoteTextComponents} />
            {withQuotes ? '\u201D' : null}
        </span>
    );
}
