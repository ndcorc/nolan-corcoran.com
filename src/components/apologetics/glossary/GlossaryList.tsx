// src/components/apologetics/glossary/GlossaryList.tsx
'use client';

import React, { useMemo } from 'react';
import { Box, Text } from '@mantine/core';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { GlossaryEntry } from './GlossaryEntry';
import type { GlossaryEntry as GlossaryEntryType } from '@/types/apologetics';

interface GlossaryListProps {
    highlightedId?: string;
    searchFilter?: string;
}

interface TreeNode {
    entry: GlossaryEntryType;
    children: TreeNode[];
}

export function GlossaryList({ highlightedId, searchFilter }: GlossaryListProps) {
    const { glossaryList } = useApologetics();

    // Build hierarchical tree structure
    const tree = useMemo(() => {
        const rootNodes: TreeNode[] = [];
        const nodeMap = new Map<string, TreeNode>();

        // First pass: create all nodes
        glossaryList.forEach((entry) => {
            nodeMap.set(entry.id, { entry, children: [] });
        });

        // Second pass: build tree
        glossaryList.forEach((entry) => {
            const node = nodeMap.get(entry.id)!;
            if (entry.parentId && nodeMap.has(entry.parentId)) {
                nodeMap.get(entry.parentId)!.children.push(node);
            } else {
                rootNodes.push(node);
            }
        });

        // Sort nodes alphabetically
        const sortNodes = (nodes: TreeNode[]) => {
            nodes.sort((a, b) => a.entry.term.localeCompare(b.entry.term));
            nodes.forEach((node) => sortNodes(node.children));
        };
        sortNodes(rootNodes);

        return rootNodes;
    }, [glossaryList]);

    // Filter tree if search is active
    const filteredTree = useMemo(() => {
        if (!searchFilter) return tree;

        const normalizedSearch = searchFilter.toLowerCase().trim();

        const filterNode = (node: TreeNode): TreeNode | null => {
            const matchesSelf =
                node.entry.term.toLowerCase().includes(normalizedSearch) ||
                node.entry.aliases?.some((a) => a.toLowerCase().includes(normalizedSearch)) ||
                node.entry.definition.toLowerCase().includes(normalizedSearch) ||
                node.entry.fullDescription?.toLowerCase().includes(normalizedSearch);

            const filteredChildren = node.children
                .map((child) => filterNode(child))
                .filter((n): n is TreeNode => n !== null);

            if (matchesSelf || filteredChildren.length > 0) {
                return {
                    entry: node.entry,
                    children: filteredChildren
                };
            }

            return null;
        };

        return tree.map((node) => filterNode(node)).filter((n): n is TreeNode => n !== null);
    }, [tree, searchFilter]);

    // Render tree recursively
    const renderNode = (node: TreeNode, depth: number = 0): React.ReactNode => (
        <Box key={node.entry.id}>
            <GlossaryEntry entry={node.entry} isHighlighted={node.entry.id === highlightedId} depth={depth} />
            {node.children.map((child) => renderNode(child, depth + 1))}
        </Box>
    );

    if (filteredTree.length === 0) {
        return (
            <Text ta="center" py="xl" c="dimmed">
                No glossary entries found matching your search.
            </Text>
        );
    }

    return <Box>{filteredTree.map((node) => renderNode(node))}</Box>;
}
