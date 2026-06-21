import { Box, Group, Text, TextInput, Select, Button } from '@mantine/core';
import { IconSearch, IconFilterX } from '@tabler/icons-react';
import {
    PATRISTIC_BOOKS,
    PATRISTIC_ERAS,
    PATRISTIC_FATHERS,
    PATRISTIC_POSITIONS,
    PATRISTIC_SECTIONS,
    PATRISTIC_TOPICS
} from '@/lib/apologetics/patristicQuotesTheme';
import type { PatristicQuoteFilters } from '@/types/apologetics/patristicQuote';

interface QuoteFilterBarProps {
    filters: PatristicQuoteFilters;
    onChange: (filters: PatristicQuoteFilters) => void;
    onClear: () => void;
    hasActiveFilters: boolean;
}

const toOptions = (values: string[]) => values.map((value) => ({ value, label: value }));

export function QuoteFilterBar({ filters, onChange, onClear, hasActiveFilters }: QuoteFilterBarProps) {
    const update = (partial: Partial<PatristicQuoteFilters>) => onChange({ ...filters, ...partial });

    return (
        <Box>
            <TextInput
                placeholder="Search quotes, fathers, sources, topics..."
                value={filters.search}
                onChange={(e) => update({ search: e.currentTarget.value })}
                leftSection={<IconSearch size={16} />}
                mb="md"
            />

            <Group gap="sm" align="flex-end" wrap="wrap">
                <Text size="sm" c="dimmed" fw={500} mb={4}>
                    Filter
                </Text>
                <Select
                    placeholder="Topic"
                    data={toOptions(PATRISTIC_TOPICS)}
                    value={filters.topic}
                    onChange={(value) => update({ topic: value })}
                    clearable
                    searchable
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Section"
                    data={toOptions(PATRISTIC_SECTIONS)}
                    value={filters.section}
                    onChange={(value) => update({ section: value })}
                    clearable
                    searchable
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Era"
                    data={toOptions(PATRISTIC_ERAS)}
                    value={filters.era}
                    onChange={(value) => update({ era: value })}
                    clearable
                    searchable
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Father"
                    data={toOptions(PATRISTIC_FATHERS)}
                    value={filters.father}
                    onChange={(value) => update({ father: value })}
                    clearable
                    searchable
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Book"
                    data={toOptions(PATRISTIC_BOOKS)}
                    value={filters.book}
                    onChange={(value) => update({ book: value })}
                    clearable
                    searchable
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    placeholder="Position"
                    data={toOptions(PATRISTIC_POSITIONS)}
                    value={filters.position}
                    onChange={(value) => update({ position: value })}
                    clearable
                    searchable
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
