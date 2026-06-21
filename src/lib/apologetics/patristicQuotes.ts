import { PATRISTIC_QUOTES } from '@/data/apologetics/quotes/patristicQuotes';
import { ERA_ORDER } from '@/lib/apologetics/patristicQuotesTheme';
import type {
    PatristicQuote,
    PatristicQuoteFilters,
    PatristicQuoteSortField,
    PatristicQuoteStats,
    SortDirection
} from '@/types/apologetics/patristicQuote';

export { PATRISTIC_QUOTES };

export function computePatristicQuoteStats(quotes: PatristicQuote[]): PatristicQuoteStats {
    const byEra: Record<string, number> = {};
    const byPosition: Record<string, number> = {};

    quotes.forEach((quote) => {
        byEra[quote.era] = (byEra[quote.era] || 0) + 1;
        byPosition[quote.perkinsPosition] = (byPosition[quote.perkinsPosition] || 0) + 1;
    });

    return { byEra, byPosition };
}

export function filterAndSortPatristicQuotes(
    quotes: PatristicQuote[],
    filters: PatristicQuoteFilters,
    sortBy: PatristicQuoteSortField,
    sortDir: SortDirection
): PatristicQuote[] {
    const search = filters.search.toLowerCase();

    const filtered = quotes.filter((quote) => {
        const matchesSearch =
            !search ||
            quote.father.toLowerCase().includes(search) ||
            quote.quote.toLowerCase().includes(search) ||
            quote.source.toLowerCase().includes(search) ||
            quote.topic.toLowerCase().includes(search) ||
            quote.subtopic.toLowerCase().includes(search) ||
            quote.section.toLowerCase().includes(search) ||
            quote.notes.toLowerCase().includes(search);

        return (
            matchesSearch &&
            (!filters.topic || quote.topic === filters.topic) &&
            (!filters.father || quote.father === filters.father) &&
            (!filters.era || quote.era === filters.era) &&
            (!filters.book || quote.book === filters.book) &&
            (!filters.subtopic || quote.subtopic === filters.subtopic) &&
            (!filters.position || quote.perkinsPosition === filters.position)
        );
    });

    return [...filtered].sort((a, b) => {
        let valueA: string | number;
        let valueB: string | number;

        if (sortBy === 'died') {
            valueA = a.diedSort;
            valueB = b.diedSort;
        } else if (sortBy === 'era') {
            valueA = ERA_ORDER[a.era] ?? 99;
            valueB = ERA_ORDER[b.era] ?? 99;
        } else {
            valueA = a[sortBy];
            valueB = b[sortBy];
        }

        if (valueA < valueB) return sortDir === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDir === 'asc' ? 1 : -1;
        return 0;
    });
}

export function hasActivePatristicFilters(filters: PatristicQuoteFilters): boolean {
    return Boolean(
        filters.search ||
            filters.topic ||
            filters.father ||
            filters.era ||
            filters.book ||
            filters.subtopic ||
            filters.position
    );
}
