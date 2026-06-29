'use client';

import Link from 'next/link';
import { Box, Group, Text, Paper, UnstyledButton, Collapse, Badge, Anchor } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconExternalLink } from '@tabler/icons-react';
import { useSelectableToggle } from '@/lib/hooks/useSelectableToggle';
import { PatristicQuoteCopyButton } from './PatristicQuoteCopyButton';
import { PatristicQuoteText } from './PatristicQuoteText';
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
    const { onMouseDown, onMouseUp, stopToggle } = useSelectableToggle(onToggle);

    return (
        <Paper withBorder radius="md" className="patristic-quote-card" style={{ overflow: 'hidden' }}>
            <Box
                className="patristic-quote-card__header"
                data-expanded={expanded || undefined}
                p="md"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                style={{ cursor: 'pointer' }}>
                <Group justify="space-between" align="flex-start" wrap="nowrap" gap="xs">
                    <Box className="patristic-quote-card__trigger" style={{ flex: 1, minWidth: 0 }}>
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
                            {quote.subtopics.map((subtopic) => (
                                <Badge
                                    key={subtopic}
                                    size="sm"
                                    variant="light"
                                    className="patristic-quote-card__subtopic-badge">
                                    {subtopic}
                                </Badge>
                            ))}
                            {quote.position ? (
                                <QuoteBadge label={quote.position} style={posStyle} />
                            ) : null}
                        </Group>

                        <PatristicQuoteText
                            quote={quote}
                            variant="card"
                            className="patristic-quote-card__quote"
                            lineClamp={expanded ? undefined : 2}
                        />
                    </Box>

                    <Group
                        gap={2}
                        style={{ flexShrink: 0 }}
                        align="flex-start"
                        onMouseDown={stopToggle}
                        onMouseUp={stopToggle}>
                        <PatristicQuoteCopyButton quote={quote} />
                        <UnstyledButton
                            onClick={onToggle}
                            p={4}
                            aria-label={expanded ? 'Collapse quote' : 'Expand quote'}
                            style={{ lineHeight: 0 }}>
                            {expanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        </UnstyledButton>
                    </Group>
                </Group>
            </Box>

            <Collapse in={expanded}>
                <Box>
                    <Box
                        className="patristic-quote-card__notes"
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        style={{
                            borderTop: '1px solid var(--mantine-color-default-border)',
                            padding: 16,
                            cursor: 'pointer'
                        }}>
                        <Text size="sm" className="patristic-quote-card__quote" style={{ lineHeight: 1.6 }} mb="sm">
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
                            onMouseDown={stopToggle}
                            onMouseUp={stopToggle}
                            onClick={stopToggle}
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
