import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

/** Formats a patristic quote for pasting into documents or footnotes. */
export function formatPatristicQuoteCitation(quote: PatristicQuote): string {
    const sourcePart = [quote.source, quote.ref].filter(Boolean).join(' ');
    const tailParts = [sourcePart, quote.book, quote.section].filter(Boolean);

    const attribution =
        tailParts.length > 0 ? `${quote.father}, ${tailParts.join(' · ')}` : quote.father;

    return `"${quote.quote}" — ${attribution}`;
}
