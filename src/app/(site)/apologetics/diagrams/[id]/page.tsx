// src/app/apologetics/diagrams/[id]/page.tsx
'use client';

import { use } from 'react';
import { Box, Title, Text, Badge, Paper, Group, Alert } from '@mantine/core';
import { IconArrowLeft, IconFileText, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { DiagramViewer } from '@/components/apologetics/diagrams';
import type { DiagramDefinition } from '@/types/apologetics';

// Import diagram data files
import preconditionsData from '@/data/apologetics/diagrams/preconditions-of-intelligibility.json';

// Map of diagram IDs to their data
const diagramDataMap: Record<string, DiagramDefinition> = {
    'preconditions-of-intelligibility': preconditionsData as DiagramDefinition
};

// Placeholder diagram data for diagrams not yet built
const getPlaceholderDiagram = (
    id: string,
    meta: { title: string; description: string; category: string }
): DiagramDefinition => ({
    id,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    nodes: [
        {
            id: 'placeholder-1',
            type: 'concept',
            position: { x: 250, y: 50 },
            data: {
                label: meta.title,
                description: 'Diagram content coming soon',
                nodeType: 'concept'
            }
        },
        {
            id: 'placeholder-2',
            type: 'concept',
            position: { x: 100, y: 200 },
            data: {
                label: 'Component A',
                description: 'Placeholder node',
                nodeType: 'concept'
            }
        },
        {
            id: 'placeholder-3',
            type: 'concept',
            position: { x: 400, y: 200 },
            data: {
                label: 'Component B',
                description: 'Placeholder node',
                nodeType: 'concept'
            }
        }
    ],
    edges: [
        {
            id: 'e1-2',
            source: 'placeholder-1',
            target: 'placeholder-2',
            type: 'default'
        },
        {
            id: 'e1-3',
            source: 'placeholder-1',
            target: 'placeholder-3',
            type: 'default'
        }
    ]
});

interface DiagramPageProps {
    params: Promise<{ id: string }>;
}

export default function DiagramPage({ params }: DiagramPageProps) {
    const { id: diagramId } = use(params);
    const { diagrams, arguments: args } = useApologetics();

    const diagramMeta = diagrams.find((d) => d.id === diagramId);
    const relatedArgument = args.find((a) => a.relatedDiagramId === diagramId);

    if (!diagramMeta) {
        return (
            <Box p={{ base: 'md', md: 'xl' }} ta="center">
                <Title order={1} size="h2" mb="md">
                    Diagram Not Found
                </Title>
                <Text c="dimmed" mb="md">
                    The diagram &quot;{diagramId}&quot; could not be found.
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

    // Try to load actual diagram data, fall back to placeholder
    const diagram = diagramDataMap[diagramId] || getPlaceholderDiagram(diagramId, diagramMeta);
    const isPlaceholder = !diagramDataMap[diagramId];

    return (
        <Box p={{ base: 'md', md: 'xl' }} maw={1400} mx="auto">
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
                    {diagram.category}
                </Badge>
                <Title order={1} size="h2" mb="xs">
                    {diagram.title}
                </Title>
                <Text c="dimmed" style={{ fontSize: '18px' }}>{diagram.description}</Text>
            </Box>

            {/* Diagram viewer */}
            <Box mb="lg">
                <DiagramViewer diagram={diagram} />
            </Box>

            {/* Placeholder notice - only show for placeholder diagrams */}
            {isPlaceholder && (
                <Alert icon={<IconInfoCircle size={18} />} title="Placeholder Diagram" color="yellow" mb="lg">
                    This diagram is a placeholder. Full diagram content will be provided in follow-up information.
                </Alert>
            )}

            {/* Instructions for interactive diagrams */}
            {!isPlaceholder && (
                <Alert icon={<IconInfoCircle size={18} />} title="Interactive Diagram" color="blue" mb="lg">
                    Hover over nodes to see connections highlighted. Click nodes linked to glossary terms to see their
                    definitions. Use the controls in the bottom-right to zoom, fit to view, or enter fullscreen.
                </Alert>
            )}

            {/* Related argument link */}
            {relatedArgument && (
                <Paper
                    p="md"
                    radius="md"
                    withBorder
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}>
                    <Text size="sm" fw={500} c="dimmed" mb="xs">
                        Related Argument
                    </Text>
                    <Link
                        href={`/apologetics/arguments/${relatedArgument.id}`}
                        className="no-underline block p-2 -m-2 rounded-md transition-colors apologetics-inline-link">
                        <Group gap="md" wrap="nowrap">
                            <Box style={{ color: 'var(--apologetics-primary)' }}>
                                <IconFileText size={20} />
                            </Box>
                            <Box>
                                <Text fw={500}>{relatedArgument.title}</Text>
                                <Text size="sm" c="dimmed">
                                    {relatedArgument.description}
                                </Text>
                            </Box>
                        </Group>
                    </Link>
                </Paper>
            )}
        </Box>
    );
}
