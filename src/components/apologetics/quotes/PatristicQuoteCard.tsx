import Link from 'next/link';
import { Box, Group, Text, Paper, UnstyledButton, Collapse, Badge, Anchor } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconExternalLink } from '@tabler/icons-react';
import { QuoteBadge } from './QuoteBadge';
import { ERA_COLORS, POSITION_COLORS } from '@/lib/apologetics/patristicQuotesTheme';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

interface PatristicQuoteCardProps {
    quote: PatristicQuote;
    expanded: boolean;
    onToggle: () => void;
}

export function PatristicQuoteCard({ quote, expanded, onToggle }: PatristicQuoteCardProps) {
    const eraStyle = ERA_COLORS[quote.era];
    const posStyle = POSITION_COLORS[quote.position];
    const quotePath = `/apologetics/quotes/${quote.slug}`;

    return (
        <Paper withBorder radius="md" className="patristic-quote-card" style={{ overflow: 'hidden' }}>
            <UnstyledButton
                onClick={onToggle}
                className="patristic-quote-card__trigger w-full"
                data-expanded={expanded || undefined}
                p="md"
                style={{ transition: 'background-color 150ms ease' }}>
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Box style={{ flex: 1, minWidth: 0 }}>
                        <Group gap="xs" wrap="wrap" mb={4}>
                            <Text fw={600} style={{ fontSize: '16px' }}>
                                {quote.father}
                            </Text>
                            <Text c="dimmed" size="sm">
                                †{quote.died}
                            </Text>
                            <QuoteBadge label={quote.era} style={eraStyle} />
                        </Group>

                        <Text size="sm" c="dimmed" mb={4}>
                            <Text component="span" fs="italic">
                                {quote.source}
                            </Text>
                            {quote.ref ? ` ${quote.ref}` : ''}
                            {' · '}
                            {quote.book}
                            {quote.section ? ` · ${quote.section}` : ''}
                        </Text>

                        <Group gap="xs" wrap="wrap">
                            <Badge size="sm" variant="light" className="patristic-quote-card__topic-badge">
                                {quote.topic}
                            </Badge>
                            <Badge size="sm" variant="light" className="patristic-quote-card__subtopic-badge">
                                {quote.subtopic}
                            </Badge>
                            {quote.position ? (
                                <QuoteBadge label={quote.position} style={posStyle} />
                            ) : null}
                        </Group>

                        <Text
                            mt="sm"
                            style={{
                                fontFamily: 'Merriweather, serif',
                                fontStyle: 'italic',
                                lineHeight: 1.6,
                                fontSize: '15px',
                                display: '-webkit-box',
                                WebkitLineClamp: expanded ? undefined : 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: expanded ? 'visible' : 'hidden'
                            }}>
                            &ldquo;{quote.quote}&rdquo;
                        </Text>
                    </Box>

                    {expanded ? (
                        <IconChevronUp size={16} style={{ flexShrink: 0 }} />
                    ) : (
                        <IconChevronDown size={16} style={{ flexShrink: 0 }} />
                    )}
                </Group>
            </UnstyledButton>

            <Collapse in={expanded}>
                <Box>
                    <Box
                        className="patristic-quote-card__notes"
                        style={{
                            borderTop: '1px solid var(--mantine-color-default-border)',
                            padding: 16
                        }}>
                        <Text size="sm" style={{ lineHeight: 1.6 }} mb="sm">
                            <Text component="span" fw={600} c="dimmed">
                                NOTES ▸{' '}
                            </Text>
                            {quote.notes}
                        </Text>
                        <Anchor
                            component={Link}
                            href={quotePath}
                            size="sm"
                            className="patristic-quotes-page-link"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            View full page
                            <IconExternalLink size={14} />
                        </Anchor>
                    </Box>
                </Box>
            </Collapse>
        </Paper>
    );
}
