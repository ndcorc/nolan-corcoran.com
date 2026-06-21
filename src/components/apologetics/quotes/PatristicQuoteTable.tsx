import { Box, Group, Text, Paper, Table, ScrollArea, Button } from '@mantine/core';
import { QuoteBadge } from './QuoteBadge';
import { ERA_COLORS, POSITION_COLORS } from '@/lib/apologetics/patristicQuotesTheme';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

interface PatristicQuoteTableProps {
    quotes: PatristicQuote[];
    expandedId: string | null;
    onSelect: (id: string | null) => void;
}

export function PatristicQuoteTable({ quotes, expandedId, onSelect }: PatristicQuoteTableProps) {
    const activeQuote = quotes.find((q) => q.id === expandedId);

    return (
        <Box>
            <ScrollArea>
                <Table highlightOnHover striped withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Father</Table.Th>
                            <Table.Th>†Died</Table.Th>
                            <Table.Th>Era</Table.Th>
                            <Table.Th>Source / Ref</Table.Th>
                            <Table.Th>Topic</Table.Th>
                            <Table.Th>Subtopic</Table.Th>
                            <Table.Th>Section</Table.Th>
                            <Table.Th>Position</Table.Th>
                            <Table.Th>Book</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {quotes.length === 0 ? (
                            <Table.Tr>
                                <Table.Td colSpan={9}>
                                    <Text ta="center" c="dimmed" py="lg">
                                        No quotations match your filters.
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            quotes.map((quote) => {
                                const isSelected = quote.id === expandedId;
                                return (
                                    <Table.Tr
                                        key={quote.id}
                                        onClick={() => onSelect(isSelected ? null : quote.id)}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: isSelected
                                                ? 'var(--apologetics-navlink-active-bg)'
                                                : undefined
                                        }}>
                                        <Table.Td>{quote.father}</Table.Td>
                                        <Table.Td>{quote.died}</Table.Td>
                                        <Table.Td>
                                            <QuoteBadge label={quote.era} style={ERA_COLORS[quote.era]} />
                                        </Table.Td>
                                        <Table.Td>
                                            <Text component="span" fs="italic">
                                                {quote.source}
                                            </Text>{' '}
                                            {quote.ref}
                                        </Table.Td>
                                        <Table.Td>{quote.topic}</Table.Td>
                                        <Table.Td>{quote.subtopic}</Table.Td>
                                        <Table.Td>{quote.section}</Table.Td>
                                        <Table.Td>
                                            <QuoteBadge
                                                label={quote.perkinsPosition}
                                                style={POSITION_COLORS[quote.perkinsPosition]}
                                            />
                                        </Table.Td>
                                        <Table.Td>{quote.book}</Table.Td>
                                    </Table.Tr>
                                );
                            })
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

            {activeQuote && (
                <Paper withBorder radius="md" p="md" mt="md">
                    <Group justify="space-between" mb="sm">
                        <Text fw={500}>
                            {activeQuote.father} —{' '}
                            <Text component="span" fs="italic">
                                {activeQuote.source}
                            </Text>{' '}
                            {activeQuote.ref}
                        </Text>
                        <Button size="compact-sm" variant="subtle" onClick={() => onSelect(null)}>
                            Close
                        </Button>
                    </Group>
                    <Text
                        mb="sm"
                        style={{
                            fontFamily: 'Merriweather, serif',
                            fontStyle: 'italic',
                            lineHeight: 1.6,
                            fontSize: '15px'
                        }}>
                        &ldquo;{activeQuote.quote}&rdquo;
                    </Text>
                    <Text size="sm" style={{ lineHeight: 1.6 }}>
                        <Text component="span" fw={600} c="dimmed">
                            PERKINS&apos;S USE ▸{' '}
                        </Text>
                        {activeQuote.notes}
                    </Text>
                </Paper>
            )}
        </Box>
    );
}
