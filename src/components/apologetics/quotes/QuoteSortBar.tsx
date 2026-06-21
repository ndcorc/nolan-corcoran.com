import { Group, Text, Button, SegmentedControl } from '@mantine/core';
import type { PatristicQuoteSortField, PatristicQuoteViewMode, SortDirection } from '@/types/apologetics/patristicQuote';

interface QuoteSortBarProps {
    sortBy: PatristicQuoteSortField;
    sortDir: SortDirection;
    view: PatristicQuoteViewMode;
    filteredCount: number;
    totalCount: number;
    onSortChange: (field: PatristicQuoteSortField) => void;
    onViewChange: (view: PatristicQuoteViewMode) => void;
}

const SORT_OPTIONS: { field: PatristicQuoteSortField; label: string }[] = [
    { field: 'father', label: 'Father' },
    { field: 'died', label: 'Date' },
    { field: 'era', label: 'Era' },
    { field: 'topic', label: 'Topic' }
];

const controlBorder = 'calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-default-border)';

const inactiveSortButtonStyles = {
    root: {
        '--button-bd': controlBorder
    }
};

const segmentedControlStyles = {
    root: {
        border: controlBorder
    }
};

export function QuoteSortBar({
    sortBy,
    sortDir,
    view,
    filteredCount,
    totalCount,
    onSortChange,
    onViewChange
}: QuoteSortBarProps) {
    return (
        <Group justify="space-between" align="center" wrap="wrap" gap="md" mt="md">
            <Group gap="xs" wrap="wrap">
                <Text size="sm" c="dimmed" fw={500}>
                    Sort
                </Text>
                {SORT_OPTIONS.map(({ field, label }) => {
                    const isActive = sortBy === field;
                    return (
                        <Button
                            key={field}
                            size="compact-sm"
                            variant={isActive ? 'filled' : 'light'}
                            color={isActive ? 'brand' : 'gray'}
                            styles={isActive ? undefined : inactiveSortButtonStyles}
                            onClick={() => onSortChange(field)}>
                            {label}
                            {isActive ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                        </Button>
                    );
                })}
            </Group>

            <Group gap="md" wrap="wrap">
                <SegmentedControl
                    value={view}
                    onChange={(value) => onViewChange(value as PatristicQuoteViewMode)}
                    styles={segmentedControlStyles}
                    data={[
                        { value: 'cards', label: 'Cards' },
                        { value: 'table', label: 'Table' }
                    ]}
                />
                <Text size="sm" c="dimmed">
                    {filteredCount} of {totalCount} quotations
                </Text>
            </Group>
        </Group>
    );
}
