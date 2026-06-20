// src/app/apologetics/arguments/[id]/page.tsx
'use client';

import { use } from 'react';
import { Box, Title, Text, Badge, Paper, Group, Alert } from '@mantine/core';
import { IconArrowLeft, IconGitBranch, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { ArgumentViewer } from '@/components/apologetics/arguments';
import type { ArgumentDefinition } from '@/types/apologetics';

// Import actual argument data
import synergismDilemmaData from '@/data/apologetics/arguments/synergism-dilemma.json';
import externalInfallibilityData from '@/data/apologetics/arguments/external-infallibility-dilemma.json';

// Map argument IDs to their full data
const argumentDataMap: Record<string, ArgumentDefinition> = {
    'synergism-dilemma': synergismDilemmaData as ArgumentDefinition,
    'external-infallibility-dilemma': externalInfallibilityData as ArgumentDefinition
};

interface ArgumentPageProps {
    params: Promise<{ id: string }>;
}

export default function ArgumentPage({ params }: ArgumentPageProps) {
    const { id: argumentId } = use(params);
    const { arguments: args, diagrams } = useApologetics();

    const argumentMeta = args.find((a) => a.id === argumentId);
    const relatedDiagram = argumentMeta?.relatedDiagramId
        ? diagrams.find((d) => d.id === argumentMeta.relatedDiagramId)
        : undefined;

    if (!argumentMeta) {
        return (
            <Box p={{ base: 'md', md: 'xl' }} ta="center">
                <Title order={1} size="h2" mb="md">
                    Argument Not Found
                </Title>
                <Text c="dimmed" mb="md">
                    The argument &quot;{argumentId}&quot; could not be found.
                </Text>
                <Text
                    component={Link}
                    href="/apologetics"
                    className="inline-flex items-center gap-2 no-underline"
                    style={{ color: 'var(--apologetics-primary)' }}>
                    <IconArrowLeft size={16} />
                    Back to Apologetics
                </Text>
            </Box>
        );
    }

    // Load actual argument data if available, otherwise show placeholder message
    const argument = argumentDataMap[argumentId];
    const isPlaceholder = !argument;

    return (
        <Box p={{ base: 'md', md: 'xl' }} maw={900} mx="auto">
            {/* Back link */}
            <Text
                component={Link}
                href="/apologetics"
                size="sm"
                c="dimmed"
                className="inline-flex items-center gap-1 no-underline hover:underline mb-4"
                style={{ display: 'inline-flex' }}>
                <IconArrowLeft size={16} />
                Back to Apologetics
            </Text>

            {/* Header */}
            <Box mb="lg">
                <Badge
                    size="sm"
                    variant="light"
                    tt="capitalize"
                    radius="xs"
                    mb="xs"
                    style={{ backgroundColor: 'var(--apologetics-badge-bg)' }}>
                    {argument?.category || argumentMeta.category}
                </Badge>
                <Title order={1} size="h2" mb="xs">
                    {argument?.title || argumentMeta.title}
                </Title>
                <Text c="dimmed" style={{ fontSize: '18px' }}>
                    {argument?.description || argumentMeta.description}
                </Text>
            </Box>

            {/* Related diagram link */}
            {relatedDiagram && (
                <Paper
                    component={Link}
                    href={`/apologetics/diagrams/${relatedDiagram.id}`}
                    p="md"
                    radius="md"
                    withBorder
                    className="no-underline flex items-center gap-3 mb-6 transition-colors apologetics-card-link"
                    style={{
                        backgroundColor: 'var(--mantine-color-body)',
                        display: 'flex'
                    }}>
                    <Box style={{ color: 'var(--apologetics-primary)' }}>
                        <IconGitBranch size={20} />
                    </Box>
                    <Box>
                        <Text size="md" fw={500} c="dimmed">
                            Related Diagram
                        </Text>
                        <Text size="lg" fw={500}>
                            {relatedDiagram.title}
                        </Text>
                    </Box>
                </Paper>
            )}

            {/* Placeholder notice for arguments without full data */}
            {isPlaceholder && (
                <Alert icon={<IconInfoCircle size={18} />} title="Content Coming Soon" color="yellow" mb="lg">
                    This argument&apos;s full content is still being developed. Check back soon for the complete
                    premises, conclusion, and objections.
                </Alert>
            )}

            {/* Argument viewer */}
            {argument && (
                <Paper
                    p={{ base: 'md', md: 'lg' }}
                    radius="md"
                    withBorder
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}>
                    <ArgumentViewer argument={argument} />
                </Paper>
            )}
        </Box>
    );
}
