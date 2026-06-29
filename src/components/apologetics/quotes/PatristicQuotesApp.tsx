'use client';

import { Fragment, useMemo, useState, type ReactNode } from 'react';
import { Box, Paper, Stack, Text, Title } from '@mantine/core';
import { IconCross } from '@tabler/icons-react';
import {
    computePatristicQuoteStats,
    filterAndSortPatristicQuotes,
    getPatristicFilterOptions,
    hasActivePatristicFilters
} from '@/lib/apologetics/patristicQuotes';
import { QuoteFilterBar } from './QuoteFilterBar';
import { QuoteSortBar } from './QuoteSortBar';
import { QuoteStats } from './QuoteStats';
import { PatristicQuoteCard } from './PatristicQuoteCard';
import { PatristicQuoteTable } from './PatristicQuoteTable';
import type {
    PatristicQuote,
    PatristicQuoteFilters,
    PatristicQuoteSortField,
    PatristicQuoteViewMode,
    SortDirection
} from '@/types/apologetics/patristicQuote';

const EMPTY_FILTERS: PatristicQuoteFilters = {
    search: '',
    topic: null,
    father: null,
    era: null,
    source: null,
    subtopics: [],
    position: null
};

interface PatristicQuotesAppProps {
    quotes: PatristicQuote[];
}

export function PatristicQuotesApp({ quotes }: PatristicQuotesAppProps) {
    const [filters, setFilters] = useState<PatristicQuoteFilters>(EMPTY_FILTERS);
    const [sortBy, setSortBy] = useState<PatristicQuoteSortField>('father');
    const [sortDir, setSortDir] = useState<SortDirection>('asc');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [view, setView] = useState<PatristicQuoteViewMode>('cards');

    const filterOptions = useMemo(() => getPatristicFilterOptions(quotes), [quotes]);
    const stats = useMemo(() => computePatristicQuoteStats(quotes), [quotes]);

    const filteredQuotes = useMemo(
        () => filterAndSortPatristicQuotes(quotes, filters, sortBy, sortDir),
        [quotes, filters, sortBy, sortDir]
    );

    const handleSortChange = (field: PatristicQuoteSortField) => {
        if (sortBy === field) {
            setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(field);
            setSortDir('asc');
        }
    };

    const handleClearFilters = () => setFilters(EMPTY_FILTERS);

    return (
        <Stack gap="lg" className="patristic-quotes-page">
            <Paper withBorder radius="md" p="md">
                <GroupHeader quotes={quotes} />
                <QuoteStats stats={stats} />
            </Paper>

            <Paper withBorder radius="md" p="md" className="patristic-quotes-controls">
                <QuoteFilterBar
                    filters={filters}
                    filterOptions={filterOptions}
                    onChange={setFilters}
                    onClear={handleClearFilters}
                    hasActiveFilters={hasActivePatristicFilters(filters)}
                />
                <QuoteSortBar
                    sortBy={sortBy}
                    sortDir={sortDir}
                    view={view}
                    filteredCount={filteredQuotes.length}
                    totalCount={quotes.length}
                    onSortChange={handleSortChange}
                    onViewChange={setView}
                />
            </Paper>

            <Box>
                {view === 'cards' ? (
                    <Stack gap="sm">
                        {filteredQuotes.length === 0 ? (
                            <Text ta="center" c="dimmed" py="xl">
                                No quotations match your filters.
                            </Text>
                        ) : (
                            filteredQuotes.map((quote) => (
                                <PatristicQuoteCard
                                    key={quote.id}
                                    quote={quote}
                                    expanded={expandedId === quote.id}
                                    onToggle={() =>
                                        setExpandedId(expandedId === quote.id ? null : quote.id)
                                    }
                                />
                            ))
                        )}
                    </Stack>
                ) : (
                    <PatristicQuoteTable
                        quotes={filteredQuotes}
                        expandedId={expandedId}
                        onSelect={setExpandedId}
                    />
                )}
            </Box>
        </Stack>
    );
}

function formatIndexingSource(book: string): ReactNode {
    switch (book) {
        case 'Forged Catholicism':
            return <em>A Forged Catholicism</em>;
        case 'Reformed Catholic':
            return <em>A Reformed Catholic</em>;
        default:
            return book;
    }
}

function formatIndexingSources(books: string[]): ReactNode {
    if (books.length === 0) return null;
    if (books.length === 1) return formatIndexingSource(books[0]);

    return books.map((book, index) => (
        <Fragment key={book}>
            {index > 0 && (index === books.length - 1 ? ' & ' : ', ')}
            {formatIndexingSource(book)}
        </Fragment>
    ));
}

function GroupHeader({ quotes }: { quotes: PatristicQuote[] }) {
    const indexingSources = useMemo(
        () => [...new Set(quotes.map((quote) => quote.book).filter(Boolean))].sort(),
        [quotes]
    );

    return (
        <Box>
            <Box style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Box
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--mantine-radius-md)',
                        backgroundColor: 'var(--apologetics-badge-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                    <IconCross size={20} style={{ color: 'var(--apologetics-primary)' }} />
                </Box>
                <Box>
                    <Title order={3} size="h4" mb={4}>
                        Patristic & Theological Quotation Database
                    </Title>
                    <Text c="dimmed" style={{ fontSize: '16px' }}>
                        {quotes.length} citations from early church fathers and other primary sources
                        {indexingSources.length > 0 ? (
                            <>
                                {' '}
                                · indexed from {formatIndexingSources(indexingSources)}
                            </>
                        ) : null}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}
