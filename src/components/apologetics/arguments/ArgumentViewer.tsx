// src/components/apologetics/arguments/ArgumentViewer.tsx
'use client';

import { useState } from 'react';
import { Box, Title, Text, Paper, Group, Stack, Collapse, UnstyledButton } from '@mantine/core';
import { IconGitBranch, IconMessage, IconChevronDown, IconChevronRight, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { ArgumentStep } from './ArgumentStep';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import type { ArgumentDefinition, Objection } from '@/types/apologetics';

interface ArgumentViewerProps {
    argument: ArgumentDefinition;
}

interface ObjectionCardProps {
    objection: Objection;
    index: number;
}

function ObjectionCard({ objection, index }: ObjectionCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
            <UnstyledButton
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full"
                p="md"
                style={{
                    backgroundColor: isExpanded ? 'var(--mantine-color-default-hover)' : undefined
                }}>
                <Group justify="space-between">
                    <Group gap="sm">
                        <IconMessage size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                        <Text fw={500} style={{ fontSize: '16px' }}>
                            Objection {index + 1}: {objection.title}
                        </Text>
                    </Group>
                    {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                </Group>
            </UnstyledButton>

            <Collapse in={isExpanded}>
                <Box p="md" pt={0} style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                    <Box mt="md">
                        <Text fw={500} c="dimmed" mb="xs" style={{ fontSize: '14px' }}>
                            Objection
                        </Text>
                        <Text style={{ lineHeight: 1.6, fontSize: '16px' }}>{objection.content}</Text>
                    </Box>

                    <Box mt="md">
                        <Text fw={500} c="dimmed" mb="xs" style={{ fontSize: '14px' }}>
                            Response
                        </Text>
                        <Text style={{ lineHeight: 1.6, fontSize: '16px' }}>{objection.response}</Text>
                    </Box>
                </Box>
            </Collapse>
        </Paper>
    );
}

export function ArgumentViewer({ argument }: ArgumentViewerProps) {
    const { arguments: allArguments } = useApologetics();

    // Helper to get argument title by ID
    const getArgumentTitle = (argId: string): string => {
        const arg = allArguments.find((a) => a.id === argId);
        return arg?.title || argId;
    };

    return (
        <Stack gap="xl">
            {/* Premises */}
            <Box component="section">
                <Title order={3} size="h4" mb="md">
                    Premises
                </Title>
                <Stack gap={4}>
                    {argument.premises.map((premise, index) => (
                        <ArgumentStep key={premise.id} step={premise} index={index + 1} />
                    ))}
                </Stack>
            </Box>

            {/* Conclusion */}
            <Box component="section">
                <Title order={3} size="h4" mb="md">
                    Conclusion
                </Title>
                <ArgumentStep step={argument.conclusion} isConclusion />
            </Box>

            {/* Related Diagram Link */}
            {argument.relatedDiagramId && (
                <Box component="section" pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                    <Paper
                        component={Link}
                        href={`/apologetics/diagrams/${argument.relatedDiagramId}`}
                        p="sm"
                        radius="md"
                        withBorder
                        className="no-underline inline-flex items-center gap-2"
                        style={{
                            color: 'var(--apologetics-primary)',
                            display: 'inline-flex'
                        }}>
                        <IconGitBranch size={18} />
                        <Text fw={500} style={{ fontSize: '16px' }}>
                            View Related Diagram
                        </Text>
                    </Paper>
                </Box>
            )}

            {/* Objections & Responses */}
            {argument.objections && argument.objections.length > 0 && (
                <Box component="section" pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                    <Title order={3} size="h4" mb="md">
                        Objections & Responses
                    </Title>
                    <Stack gap="md">
                        {argument.objections.map((objection, index) => (
                            <ObjectionCard key={objection.id} objection={objection} index={index} />
                        ))}
                    </Stack>
                </Box>
            )}

            {/* Related Arguments */}
            {argument.relatedArguments && argument.relatedArguments.length > 0 && (
                <Box component="section" pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                    <Title order={3} size="h4" mb="md">
                        Related Arguments
                    </Title>
                    <Stack gap="xs">
                        {argument.relatedArguments.map((argId) => (
                            <Paper
                                key={argId}
                                component={Link}
                                href={`/apologetics/arguments/${argId}`}
                                p="sm"
                                radius="md"
                                className="no-underline flex items-center gap-2"
                                style={{
                                    backgroundColor: 'var(--mantine-color-default-hover)'
                                }}>
                                <IconArrowRight size={16} style={{ color: 'var(--mantine-color-dimmed)' }} />
                                <Text style={{ fontSize: '16px' }}>{getArgumentTitle(argId)}</Text>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            )}
        </Stack>
    );
}
