export type QuotePosition = 'Reformed' | 'Roman Catholic' | 'Nuanced';

export interface PatristicQuote {
    id: string;
    slug: string;
    father: string;
    died: string;
    diedSort: number;
    era: string;
    source: string;
    ref: string;
    quote: string;
    topic: string;
    subtopic: string;
    position: QuotePosition | '';
    book: string;
    section: string;
    notes: string;
}

export type PatristicQuoteSortField = 'father' | 'died' | 'era' | 'topic';
export type PatristicQuoteViewMode = 'cards' | 'table';
export type SortDirection = 'asc' | 'desc';

export interface PatristicQuoteFilters {
    search: string;
    topic: string | null;
    father: string | null;
    era: string | null;
    book: string | null;
    subtopic: string | null;
    position: string | null;
}

export interface PatristicQuoteStats {
    byEra: Record<string, number>;
    byPosition: Record<string, number>;
}

export interface BadgeStyle {
    bg: string;
    text: string;
    border?: string;
}
