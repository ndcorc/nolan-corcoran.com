'use client';

import { useMemo, useState } from 'react';
import { Box, Paper, Stack, Text, Title } from '@mantine/core';
import { IconCross } from '@tabler/icons-react';
import {
    PATRISTIC_QUOTES,
    computePatristicQuoteStats,
    filterAndSortPatristicQuotes,
    hasActivePatristicFilters
} from '@/lib/apologetics/patristicQuotes';
import { QuoteFilterBar } from './QuoteFilterBar';
import { QuoteSortBar } from './QuoteSortBar';
import { QuoteStats } from './QuoteStats';
import { PatristicQuoteCard } from './PatristicQuoteCard';
import { PatristicQuoteTable } from './PatristicQuoteTable';
import type {
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
    book: null,
    subtopic: null,
    position: null
};

export function PatristicQuotesApp() {
    const [filters, setFilters] = useState<PatristicQuoteFilters>(EMPTY_FILTERS);
    const [sortBy, setSortBy] = useState<PatristicQuoteSortField>('father');
    const [sortDir, setSortDir] = useState<SortDirection>('asc');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [view, setView] = useState<PatristicQuoteViewMode>('cards');

    const stats = useMemo(() => computePatristicQuoteStats(PATRISTIC_QUOTES), []);

    const filteredQuotes = useMemo(
        () => filterAndSortPatristicQuotes(PATRISTIC_QUOTES, filters, sortBy, sortDir),
        [filters, sortBy, sortDir]
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
                <GroupHeader quoteCount={PATRISTIC_QUOTES.length} />
                <QuoteStats stats={stats} />
            </Paper>

            <Paper withBorder radius="md" p="md" className="patristic-quotes-controls">
                <QuoteFilterBar
                    filters={filters}
                    onChange={setFilters}
                    onClear={handleClearFilters}
                    hasActiveFilters={hasActivePatristicFilters(filters)}
                />
                <QuoteSortBar
                    sortBy={sortBy}
                    sortDir={sortDir}
                    view={view}
                    filteredCount={filteredQuotes.length}
                    totalCount={PATRISTIC_QUOTES.length}
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

function GroupHeader({ quoteCount }: { quoteCount: number }) {
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
                        Extracted from Perkins&apos;s <em>A Forged Catholicism</em> &{' '}
                        <em>A Reformed Catholic</em> · {quoteCount} citations indexed
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}
