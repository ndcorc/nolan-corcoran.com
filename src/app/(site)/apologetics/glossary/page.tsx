// src/app/apologetics/glossary/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Box, Title, Text, Paper, useMantineColorScheme } from '@mantine/core';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { GlossaryList, GlossarySearch } from '@/components/apologetics/glossary';

export default function GlossaryPage() {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    const { glossaryList } = useApologetics();
    const [searchFilter, setSearchFilter] = useState('');
    const [highlightedId, setHighlightedId] = useState<string | undefined>();

    // Handle hash navigation (e.g., /glossary#epistemic-warrant)
    useEffect(() => {
        const hash = window.location.hash.slice(1); // Remove the #
        if (hash) {
            setHighlightedId(hash);
            // Clear highlight after animation
            const timer = setTimeout(() => setHighlightedId(undefined), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Listen for hash changes (in-app navigation)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                setHighlightedId(hash);
                const timer = setTimeout(() => setHighlightedId(undefined), 3000);
                return () => clearTimeout(timer);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <Box p={{ base: 'md', md: 'xl' }} maw={900} mx="auto">
            {/* Header */}
            <Box mb="lg">
                <Title order={1} size="h2" mb="xs">
                    Glossary
                </Title>
                <Text c="dimmed" style={{ fontSize: '18px' }}>
                    {glossaryList.length} theological and philosophical terms with definitions and cross-references.
                </Text>
            </Box>

            {/* Search */}
            <Box mb="lg">
                <GlossarySearch value={searchFilter} onChange={setSearchFilter} />
            </Box>

            {/* Glossary list */}
            <Paper
                p={{ base: 'md', md: 'lg' }}
                radius="md"
                withBorder
                style={{
                    backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)'
                }}>
                <GlossaryList highlightedId={highlightedId} searchFilter={searchFilter} />
            </Paper>
        </Box>
    );
}
