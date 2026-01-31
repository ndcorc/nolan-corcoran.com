// src/components/apologetics/diagrams/DiagramEdge.tsx
'use client';

import { memo, useState, useEffect } from 'react';
import { BaseEdge, EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import { Box, Text } from '@mantine/core';

export const DiagramEdge = memo(function DiagramEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    label,
    data
}: EdgeProps) {
    const [isDark, setIsDark] = useState(false);

    // Check color scheme on client only to avoid hydration mismatch
    useEffect(() => {
        const checkColorScheme = () => {
            setIsDark(document.documentElement.getAttribute('data-mantine-color-scheme') === 'dark');
        };
        checkColorScheme();

        const observer = new MutationObserver(checkColorScheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mantine-color-scheme'] });
        return () => observer.disconnect();
    }, []);

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    const edgeType = (data as { edgeType?: string })?.edgeType || 'default';

    // Edge colors based on type
    const getEdgeColor = () => {
        switch (edgeType) {
            case 'dependency':
                return isDark ? '#60a5fa' : '#3b82f6'; // blue
            case 'contrast':
                return isDark ? '#f87171' : '#ef4444'; // red
            case 'derivation':
                return isDark ? '#4ade80' : '#22c55e'; // green
            default:
                return 'var(--mantine-color-dimmed)';
        }
    };

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: selected ? 'var(--apologetics-primary)' : getEdgeColor(),
                    strokeWidth: selected ? 3 : 2,
                    transition: 'all 0.2s ease'
                }}
            />
            {label && (
                <EdgeLabelRenderer>
                    <Box
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                            backgroundColor: 'var(--mantine-color-body)',
                            border: '1px solid var(--mantine-color-default-border)',
                            borderRadius: 'var(--mantine-radius-sm)',
                            padding: '2px 8px'
                        }}>
                        <Text size="xs" c="dimmed">
                            {String(label)}
                        </Text>
                    </Box>
                </EdgeLabelRenderer>
            )}
        </>
    );
});
