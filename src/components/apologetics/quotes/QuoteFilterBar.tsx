'use client';

import { Box, Group, Text, TextInput, Select, MultiSelect, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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

/** iOS Safari zooms focused inputs below 16px. */
const MOBILE_INPUT_FONT_SIZE = 16;

/** Keep dropdowns usable above the on-screen keyboard on touch devices. */
const FILTER_MAX_DROPDOWN_HEIGHT = 260;

/**
 * On touch devices, ignore touchstart for outside-click detection so page
 * scrolling does not immediately dismiss an open dropdown.
 */
const FILTER_COMBOBOX_PROPS = {
    middlewares: { flip: true, shift: { padding: 8 } },
    hideDetached: false,
    clickOutsideEvents: ['mousedown'] as ('mousedown' | 'touchstart')[]
};

const searchInputStyles = {
    input: {
        borderColor: 'var(--mantine-color-default-border)',
        fontSize: MOBILE_INPUT_FONT_SIZE
    }
};

const filterInputStyles = {
    input: {
        cursor: 'pointer',
        borderColor: 'var(--mantine-color-default-border)',
        fontSize: MOBILE_INPUT_FONT_SIZE
    }
};

const filterSelectClassNames = {
    option: 'patristic-quotes-filter-option',
    dropdown: 'patristic-quotes-filter-dropdown'
};

const subtopicsSelectClassNames = {
    option: 'patristic-quotes-filter-option',
    dropdown: 'patristic-quotes-filter-dropdown',
    pill: 'patristic-quotes-filter-pill'
};

const subtopicsSelectStyles = {
    input: {
        ...filterInputStyles.input,
        display: 'flex',
        alignItems: 'center'
    }
};

export function QuoteFilterBar({
    filters,
    filterOptions,
    onChange,
    onClear,
    hasActiveFilters
}: QuoteFilterBarProps) {
    const isTouch = useMediaQuery('(hover: none)');
    const filterSearchable = !isTouch;
    const update = (partial: Partial<PatristicQuoteFilters>) => onChange({ ...filters, ...partial });

    const sharedFilterProps = {
        clearable: true,
        searchable: filterSearchable,
        comboboxProps: FILTER_COMBOBOX_PROPS,
        maxDropdownHeight: FILTER_MAX_DROPDOWN_HEIGHT,
        classNames: filterSelectClassNames,
        styles: filterInputStyles
    } as const;

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
                    {...sharedFilterProps}
                    placeholder="Topic"
                    data={toOptions(filterOptions.topics)}
                    value={filters.topic}
                    onChange={(value) => update({ topic: value })}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <MultiSelect
                    {...sharedFilterProps}
                    placeholder="Subtopics"
                    data={toOptions(filterOptions.subtopics)}
                    value={filters.subtopics}
                    onChange={(value) => update({ subtopics: value })}
                    hidePickedOptions
                    classNames={subtopicsSelectClassNames}
                    styles={subtopicsSelectStyles}
                    style={{ flex: '1 1 220px', minWidth: 220 }}
                />
                <Select
                    {...sharedFilterProps}
                    placeholder="Era"
                    data={toOptions(filterOptions.eras)}
                    value={filters.era}
                    onChange={(value) => update({ era: value })}
                    style={{ flex: '1 1 110px', minWidth: 110 }}
                />
                <Select
                    {...sharedFilterProps}
                    placeholder="Father"
                    data={toOptions(filterOptions.fathers)}
                    value={filters.father}
                    onChange={(value) => update({ father: value })}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    {...sharedFilterProps}
                    placeholder="Source Work"
                    data={toOptions(filterOptions.sources)}
                    value={filters.source}
                    onChange={(value) => update({ source: value })}
                    style={{ flex: '1 1 140px', minWidth: 140 }}
                />
                <Select
                    {...sharedFilterProps}
                    placeholder="Position"
                    data={toOptions(filterOptions.positions)}
                    value={filters.position}
                    onChange={(value) => update({ position: value })}
                    style={{ flex: '1 1 110px', minWidth: 110 }}
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
