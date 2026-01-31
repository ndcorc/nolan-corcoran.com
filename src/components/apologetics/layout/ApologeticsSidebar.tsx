// src/components/apologetics/layout/ApologeticsSidebar.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import {
    Box,
    TextInput,
    NavLink,
    ScrollArea,
    Text,
    Stack,
    Collapse,
    UnstyledButton,
    Group,
    Badge
} from '@mantine/core';
import {
    IconSearch,
    IconHome,
    IconGitBranch,
    IconFileText,
    IconBook,
    IconChevronRight,
    IconChevronDown
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';

interface SearchResult {
    id: string;
    title: string;
    description?: string;
    type: 'glossary' | 'diagram' | 'argument';
    path: string;
}

export function ApologeticsSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const {
        diagrams,
        arguments: args,
        glossaryList,
        isDiagramsOpen,
        setIsDiagramsOpen,
        isArgumentsOpen,
        setIsArgumentsOpen
    } = useApologetics();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Search results
    const searchResults = useMemo<SearchResult[]>(() => {
        if (!searchQuery.trim()) return [];

        const normalizedQuery = searchQuery.toLowerCase().trim();
        const matches: SearchResult[] = [];

        // Search glossary (highest priority)
        glossaryList.forEach((entry) => {
            const termMatch = entry.term.toLowerCase().includes(normalizedQuery);
            const aliasMatch = entry.aliases?.some((a) => a.toLowerCase().includes(normalizedQuery));
            const defMatch = entry.definition.toLowerCase().includes(normalizedQuery);

            if (termMatch || aliasMatch || defMatch) {
                matches.push({
                    id: entry.id,
                    title: entry.term,
                    description: entry.definition,
                    type: 'glossary',
                    path: `/apologetics/glossary#${entry.id}`
                });
            }
        });

        // Search diagrams
        diagrams.forEach((diagram) => {
            const titleMatch = diagram.title.toLowerCase().includes(normalizedQuery);
            const descMatch = diagram.description.toLowerCase().includes(normalizedQuery);

            if (titleMatch || descMatch) {
                matches.push({
                    id: diagram.id,
                    title: diagram.title,
                    description: diagram.description,
                    type: 'diagram',
                    path: `/apologetics/diagrams/${diagram.id}`
                });
            }
        });

        // Search arguments
        args.forEach((arg) => {
            const titleMatch = arg.title.toLowerCase().includes(normalizedQuery);
            const descMatch = arg.description.toLowerCase().includes(normalizedQuery);

            if (titleMatch || descMatch) {
                matches.push({
                    id: arg.id,
                    title: arg.title,
                    description: arg.description,
                    type: 'argument',
                    path: `/apologetics/arguments/${arg.id}`
                });
            }
        });

        return matches.slice(0, 10); // Limit results
    }, [searchQuery, glossaryList, diagrams, args]);

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchResults]);

    // Handle keyboard navigation in search
    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (searchResults.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((i) => Math.min(i + 1, searchResults.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
            e.preventDefault();
            router.push(searchResults[selectedIndex].path);
            setSearchQuery('');
        } else if (e.key === 'Escape') {
            setSearchQuery('');
        }
    };

    const handleResultClick = (path: string) => {
        router.push(path);
        setSearchQuery('');
    };

    const getTypeIcon = (type: SearchResult['type']) => {
        switch (type) {
            case 'glossary':
                return <IconBook size={14} />;
            case 'diagram':
                return <IconGitBranch size={14} />;
            case 'argument':
                return <IconFileText size={14} />;
        }
    };

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    return (
        <Box
            className="h-full flex flex-col border-r"
            style={{
                borderColor: 'var(--mantine-color-default-border)',
                backgroundColor: 'var(--mantine-color-body)'
            }}>
            {/* Search - Fixed at top */}
            <Box p="md" className="border-b" style={{ borderColor: 'var(--mantine-color-default-border)' }}>
                <TextInput
                    placeholder="Search... (Cmd+K)"
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    size="sm"
                />

                {/* Search Results Dropdown */}
                {searchQuery && searchResults.length > 0 && (
                    <Box
                        mt="xs"
                        className="rounded-md border overflow-hidden"
                        style={{
                            borderColor: 'var(--mantine-color-default-border)',
                            backgroundColor: 'var(--mantine-color-default)'
                        }}>
                        <ScrollArea.Autosize mah={200}>
                            {searchResults.map((result, index) => (
                                <UnstyledButton
                                    key={`${result.type}-${result.id}`}
                                    onClick={() => handleResultClick(result.path)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className="w-full"
                                    p="xs"
                                    style={{
                                        backgroundColor:
                                            index === selectedIndex
                                                ? 'var(--mantine-color-default-hover)'
                                                : 'transparent'
                                    }}>
                                    <Group gap="xs" wrap="nowrap">
                                        <Box c="dimmed">{getTypeIcon(result.type)}</Box>
                                        <Box style={{ flex: 1, minWidth: 0 }}>
                                            <Group gap="xs">
                                                <Text size="sm" truncate fw={500}>
                                                    {result.title}
                                                </Text>
                                                <Badge
                                                    size="xs"
                                                    variant="light"
                                                    tt="capitalize"
                                                    radius="xs"
                                                    style={{ backgroundColor: 'var(--apologetics-badge-bg)' }}>
                                                    {result.type}
                                                </Badge>
                                            </Group>
                                            {result.description && (
                                                <Text size="xs" c="dimmed" truncate>
                                                    {result.description}
                                                </Text>
                                            )}
                                        </Box>
                                    </Group>
                                </UnstyledButton>
                            ))}
                        </ScrollArea.Autosize>
                    </Box>
                )}

                {searchQuery && searchResults.length === 0 && (
                    <Text size="sm" c="dimmed" ta="center" py="md">
                        No results found
                    </Text>
                )}
            </Box>

            {/* Home/Apologetics Link - Fixed below search */}
            <Box px="md" pt="md">
                <NavLink
                    component={Link}
                    href="/apologetics"
                    label="Apologetics"
                    leftSection={<IconHome size={18} />}
                    active={pathname === '/apologetics'}
                    variant="subtle"
                    className="apologetics-navlink rounded-md"
                    styles={{
                        label: { fontSize: '14px' }
                    }}
                />
            </Box>

            {/* Navigation Sections - flex container for dynamic height sharing */}
            <Box className="flex-1 flex flex-col min-h-0 overflow-hidden" px="md" py="sm">
                {/* Diagrams Section */}
                <Box
                    className="flex flex-col min-h-0"
                    style={{
                        // When open: take available space (50% if both, all if alone), when closed: header only
                        flex: isDiagramsOpen
                            ? isArgumentsOpen
                                ? '1 1 50%' // Both open: take 50%
                                : '1 1 auto' // Only this open: take remaining space
                            : '0 0 auto' // Closed: header only
                    }}>
                    <UnstyledButton
                        onClick={() => setIsDiagramsOpen(!isDiagramsOpen)}
                        className="w-full rounded-md transition-colors flex-shrink-0 apologetics-section-header"
                        p="xs"
                        style={{
                            backgroundColor: isActive('/apologetics/diagrams')
                                ? 'var(--apologetics-navlink-active-bg)'
                                : undefined,
                            color: isActive('/apologetics/diagrams')
                                ? 'var(--apologetics-primary)'
                                : undefined
                        }}>
                        <Group justify="space-between">
                            <Group gap="xs">
                                <IconGitBranch size={18} />
                                <Text style={{ fontSize: '14px' }} fw={500}>
                                    Diagrams
                                </Text>
                            </Group>
                            {isDiagramsOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                        </Group>
                    </UnstyledButton>

                    <Collapse in={isDiagramsOpen} className="flex-1 min-h-0 overflow-hidden">
                        <ScrollArea className="h-full" ml="md" mt="xs">
                            <Stack
                                gap={2}
                                pl="md"
                                className="border-l"
                                style={{ borderColor: 'var(--mantine-color-default-border)' }}>
                                {diagrams.map((diagram) => (
                                    <NavLink
                                        key={diagram.id}
                                        component={Link}
                                        href={`/apologetics/diagrams/${diagram.id}`}
                                        label={diagram.title}
                                        active={pathname === `/apologetics/diagrams/${diagram.id}`}
                                        variant="subtle"
                                        className="apologetics-navlink rounded-md"
                                        styles={{
                                            label: { fontSize: '14px' }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </ScrollArea>
                    </Collapse>
                </Box>

                {/* Arguments Section */}
                <Box
                    className="flex flex-col min-h-0"
                    style={{
                        // When open: take available space (50% if both, all if alone), when closed: header only
                        flex: isArgumentsOpen
                            ? isDiagramsOpen
                                ? '1 1 50%' // Both open: take 50%
                                : '1 1 auto' // Only this open: take remaining space
                            : '0 0 auto' // Closed: header only
                    }}>
                    <UnstyledButton
                        onClick={() => setIsArgumentsOpen(!isArgumentsOpen)}
                        className="w-full rounded-md transition-colors flex-shrink-0 apologetics-section-header"
                        p="xs"
                        style={{
                            backgroundColor: isActive('/apologetics/arguments')
                                ? 'var(--apologetics-navlink-active-bg)'
                                : undefined,
                            color: isActive('/apologetics/arguments')
                                ? 'var(--apologetics-primary)'
                                : undefined
                        }}>
                        <Group justify="space-between">
                            <Group gap="xs">
                                <IconFileText size={18} />
                                <Text style={{ fontSize: '14px' }} fw={500}>
                                    Arguments
                                </Text>
                            </Group>
                            {isArgumentsOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                        </Group>
                    </UnstyledButton>

                    <Collapse in={isArgumentsOpen} className="flex-1 min-h-0 overflow-hidden">
                        <ScrollArea className="h-full" ml="md" mt="xs">
                            <Stack
                                gap={2}
                                pl="md"
                                className="border-l"
                                style={{ borderColor: 'var(--mantine-color-default-border)' }}>
                                {args.map((arg) => (
                                    <NavLink
                                        key={arg.id}
                                        component={Link}
                                        href={`/apologetics/arguments/${arg.id}`}
                                        label={arg.title}
                                        active={pathname === `/apologetics/arguments/${arg.id}`}
                                        variant="subtle"
                                        className="apologetics-navlink rounded-md"
                                        styles={{
                                            label: { fontSize: '14px' }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </ScrollArea>
                    </Collapse>
                </Box>
            </Box>

            {/* Glossary - Fixed at bottom */}
            <Box
                p="md"
                className="border-t mt-auto"
                style={{ borderColor: 'var(--mantine-color-default-border)' }}>
                <NavLink
                    component={Link}
                    href="/apologetics/glossary"
                    label="Glossary"
                    leftSection={<IconBook size={18} />}
                    active={pathname === '/apologetics/glossary' || pathname.startsWith('/apologetics/glossary#')}
                    variant="subtle"
                    className="apologetics-navlink rounded-md"
                    styles={{
                        label: { fontSize: '14px' }
                    }}
                />
            </Box>
        </Box>
    );
}
