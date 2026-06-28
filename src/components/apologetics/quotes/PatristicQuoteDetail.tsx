import Link from 'next/link';
import { Badge, Box, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { QuoteBadge } from './QuoteBadge';
import { ERA_COLORS, POSITION_COLORS } from '@/lib/apologetics/patristicQuotesTheme';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

interface PatristicQuoteDetailProps {
    quote: PatristicQuote;
    relatedQuotes: PatristicQuote[];
}

export function PatristicQuoteDetail({ quote, relatedQuotes }: PatristicQuoteDetailProps) {
    const eraStyle = ERA_COLORS[quote.era];
    const posStyle = POSITION_COLORS[quote.position];

    return (
        <Stack gap="lg">
            <Link
                href="/apologetics/quotes"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    width: 'fit-content',
                    fontSize: 'var(--mantine-font-size-sm)',
                    color: 'var(--mantine-color-dimmed)',
                    textDecoration: 'none'
                }}>
                <IconArrowLeft size={14} />
                All patristic quotes
            </Link>

            <Paper withBorder radius="md" p={{ base: 'md', md: 'xl' }}>
                <Group gap="xs" wrap="wrap" mb="sm">
                    <Title order={1} size="h2">
                        {quote.father}
                    </Title>
                    <Text c="dimmed" size="lg">
                        †{quote.died}
                    </Text>
                    <QuoteBadge label={quote.era} style={eraStyle} />
                    {quote.position ? <QuoteBadge label={quote.position} style={posStyle} /> : null}
                </Group>

                <Text c="dimmed" mb="md" style={{ fontSize: '16px' }}>
                    <Text component="span" fs="italic">
                        {quote.source}
                    </Text>
                    {quote.ref ? ` ${quote.ref}` : ''}
                    {quote.book ? ` · ${quote.book}` : ''}
                    {quote.section ? ` · ${quote.section}` : ''}
                </Text>

                <Group gap="xs" wrap="wrap" mb="lg">
                    <Badge size="md" variant="light">
                        {quote.topic}
                    </Badge>
                    {quote.subtopic ? (
                        <Badge size="md" variant="light">
                            {quote.subtopic}
                        </Badge>
                    ) : null}
                    <Badge size="md" variant="outline" c="dimmed">
                        {quote.id}
                    </Badge>
                </Group>

                <Box
                    component="blockquote"
                    m={0}
                    p="lg"
                    style={{
                        borderLeft: '4px solid var(--apologetics-primary)',
                        backgroundColor: 'var(--apologetics-badge-bg)',
                        borderRadius: 'var(--mantine-radius-md)'
                    }}>
                    <Text
                        style={{
                            fontFamily: 'Merriweather, serif',
                            fontStyle: 'italic',
                            lineHeight: 1.8,
                            fontSize: '18px'
                        }}>
                        &ldquo;{quote.quote}&rdquo;
                    </Text>
                </Box>

                {quote.notes ? (
                    <Box mt="lg">
                        <Text fw={600} c="dimmed" size="sm" mb={4}>
                            NOTES
                        </Text>
                        <Text style={{ lineHeight: 1.7 }}>{quote.notes}</Text>
                    </Box>
                ) : null}
            </Paper>

            {relatedQuotes.length > 0 ? (
                <Box>
                    <Title order={2} size="h3" mb="md">
                        Related quotations
                    </Title>
                    <Stack gap="sm">
                        {relatedQuotes.map((related) => (
                            <Link
                                key={related.id}
                                href={`/apologetics/quotes/${related.slug}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Paper withBorder radius="md" p="md">
                                    <Group gap="xs" wrap="wrap" mb={4}>
                                        <Text fw={600}>{related.father}</Text>
                                        <QuoteBadge label={related.era} style={ERA_COLORS[related.era]} />
                                    </Group>
                                    <Text
                                        size="sm"
                                        style={{
                                            fontFamily: 'Merriweather, serif',
                                            fontStyle: 'italic',
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                        &ldquo;{related.quote}&rdquo;
                                    </Text>
                                </Paper>
                            </Link>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Stack>
    );
}
