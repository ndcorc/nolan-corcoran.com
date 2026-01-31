// src/app/apologetics/page.tsx
'use client';

import { Box, Title, Text, SimpleGrid, Paper, Group } from '@mantine/core';
import { IconGitBranch, IconFileText, IconBook } from '@tabler/icons-react';
import Link from 'next/link';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { ApologeticsCard, CategoryGrid } from '@/components/apologetics/common';

export default function ApologeticsPage() {
    const { diagrams, arguments: args, glossaryList } = useApologetics();

    // Group diagrams by category
    const diagramsByCategory = diagrams.reduce(
        (acc, diagram) => {
            const cat = diagram.category || 'Uncategorized';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(diagram);
            return acc;
        },
        {} as Record<string, typeof diagrams>
    );

    return (
        <Box p={{ base: 'md', md: 'xl' }} maw={1200} mx="auto">
            {/* Hero */}
            <Box mb="xl">
                <Title order={1} size="h1" mb="sm">
                    Reformed Apologetics
                </Title>
                <Text c="dimmed" maw={700} style={{ fontSize: '18px' }}>
                    Explore interactive diagrams, structured arguments, and a comprehensive glossary for understanding
                    and defending the Reformed faith.
                </Text>
            </Box>

            {/* Quick stats */}
            <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="md" mb="xl">
                <Paper
                    p="md"
                    radius="md"
                    withBorder
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}
                    className="border-[#CED4DA]">
                    <IconGitBranch size={20} style={{ color: 'var(--apologetics-primary)' }} />
                    <Text size="xl" fw={700} mt="xs">
                        {diagrams.length}
                    </Text>
                    <Text size="sm" c="dimmed">
                        Diagrams
                    </Text>
                </Paper>
                <Paper
                    p="md"
                    radius="md"
                    withBorder
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}
                    className="border-[#CED4DA]">
                    <IconFileText size={20} style={{ color: 'var(--apologetics-primary)' }} />
                    <Text size="xl" fw={700} mt="xs">
                        {args.length}
                    </Text>
                    <Text size="sm" c="dimmed">
                        Arguments
                    </Text>
                </Paper>
                <Paper
                    p="md"
                    radius="md"
                    withBorder
                    style={{
                        backgroundColor: 'var(--mantine-color-body)'
                    }}
                    className="border-[#CED4DA]">
                    <IconBook size={20} style={{ color: 'var(--apologetics-primary)' }} />
                    <Text size="xl" fw={700} mt="xs">
                        {glossaryList.length}
                    </Text>
                    <Text size="sm" c="dimmed">
                        Glossary Terms
                    </Text>
                </Paper>
            </SimpleGrid>

            {/* Diagrams by category */}
            {Object.entries(diagramsByCategory).map(([category, categoryDiagrams]) => (
                <CategoryGrid
                    key={category}
                    title={category}
                    description={`Interactive diagrams exploring ${category.toLowerCase()} concepts`}>
                    {categoryDiagrams.map((diagram) => (
                        <ApologeticsCard
                            key={diagram.id}
                            title={diagram.title}
                            description={diagram.description}
                            href={`/apologetics/diagrams/${diagram.id}`}
                            icon={<IconGitBranch size={20} />}
                        />
                    ))}
                </CategoryGrid>
            ))}

            {/* Arguments */}
            <CategoryGrid title="Arguments" description="Structured apologetic arguments with premises and conclusions">
                {args.map((arg) => (
                    <ApologeticsCard
                        key={arg.id}
                        title={arg.title}
                        description={arg.description}
                        href={`/apologetics/arguments/${arg.id}`}
                        icon={<IconFileText size={20} />}
                        category={arg.category}
                    />
                ))}
            </CategoryGrid>

            {/* Glossary link */}
            <Paper
                component="section"
                p="lg"
                radius="md"
                withBorder
                mt="xl"
                style={{
                    backgroundColor: 'var(--mantine-color-body)'
                }}
                className="border-[#CED4DA]">
                <Group align="flex-start" gap="md" wrap="nowrap">
                    <Box
                        p="sm"
                        className="rounded-lg"
                        style={{
                            backgroundColor: 'var(--apologetics-primary)',
                            color: 'white'
                        }}>
                        <IconBook size={24} />
                    </Box>
                    <Box>
                        <Title order={2} size="h4" mb={4}>
                            Glossary
                        </Title>
                        <Text c="dimmed" mb="sm" style={{ fontSize: '16px' }}>
                            Browse {glossaryList.length} theological and philosophical terms with definitions,
                            cross-references, and scripture citations.
                        </Text>
                        <Text
                            component={Link}
                            href="/apologetics/glossary"
                            className="no-underline hover:underline"
                            style={{ color: 'var(--apologetics-primary)', fontSize: '16px' }}>
                            Explore the glossary →
                        </Text>
                    </Box>
                </Group>
            </Paper>
        </Box>
    );
}
