import { Box, Group, Text, TextInput, Select, Button } from '@mantine/core';
import { IconSearch, IconFilterX } from '@tabler/icons-react';
import type { PatristicFilterOptions } from '@/lib/apologetics/patristicQuotes';
import type { PatristicQuoteFilters } from '@/types/apologetics/patristicQuote';

interface QuoteFilterBarProps {
    filters: PatristicQuoteFilters;
    filterOptions: PatristicFilterOptions;
    onChange: (filters: PatristicQuoteFilters) => void;
    onClear: () => void;
    hasActiveFilters: boolean;
}

const toOptions = (values: string[]) => values.map((value) => ({ value, label: value }));

const searchInputStyles = {
    input: {
        borderColor: 'var(--mantine-color-default-border)'
    }
};

const filterInputStyles = {
    input: {
        cursor: 'pointer',
        borderColor: 'var(--mantine-color-default-border)'
    }
};

const filterSelectClassNames = {
    option: 'patristic-quotes-filter-option'
};

export function QuoteFilterBar({
    filters,
    filterOptions,
    onChange,
    onClear,
    hasActiveFilters
}: QuoteFilterBarProps) {
    const update = (partial: Partial<PatristicQuoteFilters>) => onChange({ ...filters, ...partial });

    return (
        <Box>
            <TextInput
                placeholder="Search quotes, fathers, sources, topics..."
                value={filters.search}
                onChange={(e) => update({ search: e.currentTarget.value })}
                leftSection={<IconSearch size={16} />}
                mb="md"
                styles={searchInputStyles}
            />

            <Group gap="sm" align="flex-end" wrap="wrap">
                <Text size="sm" c="dimmed" fw={500} mb={4}>
                    Filter
                </Text>
                <Select
                    placeholder="Topic"
                    data={toOptions(filterOptions.topics)}
                    value={filters.topic}
                    onChange={(value) => update({ topic: value })}
                    clearable
                    searchable
                    classNames={filterSelectClassNames}
                    styles={filterInputStyles}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Subtopic"
                    data={toOptions(filterOptions.subtopics)}
                    value={filters.subtopic}
                    onChange={(value) => update({ subtopic: value })}
                    clearable
                    searchable
                    classNames={filterSelectClassNames}
                    styles={filterInputStyles}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Era"
                    data={toOptions(filterOptions.eras)}
                    value={filters.era}
                    onChange={(value) => update({ era: value })}
                    clearable
                    searchable
                    classNames={filterSelectClassNames}
                    styles={filterInputStyles}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Father"
                    data={toOptions(filterOptions.fathers)}
                    value={filters.father}
                    onChange={(value) => update({ father: value })}
                    clearable
                    searchable
                    classNames={filterSelectClassNames}
                    styles={filterInputStyles}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Book"
                    data={toOptions(filterOptions.books)}
                    value={filters.book}
                    onChange={(value) => update({ book: value })}
                    clearable
                    searchable
                    classNames={filterSelectClassNames}
                    styles={filterInputStyles}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Position"
                    data={toOptions(filterOptions.positions)}
                    value={filters.position}
                    onChange={(value) => update({ position: value })}
                    clearable
                    searchable
                    classNames={filterSelectClassNames}
                    styles={filterInputStyles}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                {hasActiveFilters && (
                    <Button variant="subtle" leftSection={<IconFilterX size={16} />} onClick={onClear}>
                        Clear
                    </Button>
                )}
            </Group>
        </Box>
    );
}
