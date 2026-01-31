// src/components/apologetics/diagrams/DiagramNode.tsx
'use client';

import { memo, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { Box, Text } from '@mantine/core';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { TermTooltip } from '@/components/apologetics/common';
import type { DiagramNodeData, DiagramNodeType, DiagramNodeCategory } from '@/types/apologetics';

type DiagramNodeProps = NodeProps & {
    data: DiagramNodeData;
};

// Category-based color schemes for light mode
const categoryColorsLight: Record<DiagramNodeCategory, { bg: string; border: string; text: string }> = {
    metaphysical: { bg: '#ffedd5', border: '#fb923c', text: '#7c2d12' },
    logical: { bg: '#fee2e2', border: '#f87171', text: '#7f1d1d' },
    epistemological: { bg: '#dcfce7', border: '#22c55e', text: '#14532d' },
    semantic: { bg: '#cffafe', border: '#06b6d4', text: '#164e63' },
    moral: { bg: '#fef9c3', border: '#eab308', text: '#713f12' },
    social: { bg: '#f3e8ff', border: '#a855f7', text: '#581c87' },
    historical: { bg: '#ecfccb', border: '#84cc16', text: '#365314' },
    central: { bg: '#1d4ed8', border: '#3b82f6', text: '#ffffff' },
    default: { bg: '#f8fafc', border: '#e2e8f0', text: '#1e293b' }
};

// Category-based color schemes for dark mode
const categoryColorsDark: Record<DiagramNodeCategory, { bg: string; border: string; text: string }> = {
    metaphysical: { bg: '#9a3412', border: '#f97316', text: '#ffffff' },
    logical: { bg: '#991b1b', border: '#ef4444', text: '#ffffff' },
    epistemological: { bg: '#166534', border: '#22c55e', text: '#ffffff' },
    semantic: { bg: '#155e75', border: '#06b6d4', text: '#ffffff' },
    moral: { bg: '#a16207', border: '#eab308', text: '#ffffff' },
    social: { bg: '#6b21a8', border: '#a855f7', text: '#ffffff' },
    historical: { bg: '#3f6212', border: '#84cc16', text: '#ffffff' },
    central: { bg: '#1e40af', border: '#60a5fa', text: '#ffffff' },
    default: { bg: '#1e293b', border: '#475569', text: '#f8fafc' }
};

export const DiagramNode = memo(function DiagramNode({ data, selected }: DiagramNodeProps) {
    const { getGlossaryTerm } = useApologetics();
    const [isHovered, setIsHovered] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Check color scheme on client only to avoid hydration mismatch
    useEffect(() => {
        const checkColorScheme = () => {
            setIsDark(document.documentElement.getAttribute('data-mantine-color-scheme') === 'dark');
        };
        checkColorScheme();

        // Listen for color scheme changes
        const observer = new MutationObserver(checkColorScheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mantine-color-scheme'] });
        return () => observer.disconnect();
    }, []);

    const term = data.glossaryTermId ? getGlossaryTerm(data.glossaryTermId) : null;
    const nodeType: DiagramNodeType = data.nodeType || 'concept';
    const nodeCategory: DiagramNodeCategory = data.nodeCategory || 'default';

    // Get colors based on category AND current theme
    const colors = isDark ? categoryColorsDark[nodeCategory] : categoryColorsLight[nodeCategory];

    // Special styles for different node types
    const getNodeTypeStyles = (): React.CSSProperties => {
        switch (nodeType) {
            case 'connector':
                return { borderRadius: '999px', padding: '4px 12px' };
            case 'group':
                return { borderStyle: 'dashed' };
            default:
                return {};
        }
    };

    const content = (
        <Box
            px="md"
            py="xs"
            style={{
                backgroundColor: colors.bg,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: colors.border,
                borderRadius: 'var(--mantine-radius-md)',
                minWidth: '80px',
                transition: 'all 0.2s ease',
                boxShadow: selected
                    ? '0 0 0 2px var(--apologetics-primary), 0 4px 12px rgba(0,0,0,0.15)'
                    : isHovered && !selected
                      ? '0 4px 12px rgba(0,0,0,0.1)'
                      : undefined,
                transform: isHovered && !selected ? 'scale(1.05)' : undefined,
                cursor: term ? 'pointer' : 'default',
                ...getNodeTypeStyles()
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: colors.border
                }}
            />

            <Box className="text-center">
                <Text
                    size="sm"
                    fw={500}
                    style={{
                        color: colors.text,
                        textDecoration: term ? 'underline' : undefined,
                        textDecorationStyle: term ? 'dotted' : undefined,
                        textUnderlineOffset: '2px'
                    }}>
                    {data.label}
                </Text>
                {data.description && (
                    <Text
                        size="xs"
                        mt={4}
                        style={{
                            color: colors.text,
                            opacity: 0.8,
                            maxWidth: '150px'
                        }}>
                        {data.description}
                    </Text>
                )}
            </Box>

            <Handle
                type="source"
                position={Position.Bottom}
                style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: colors.border
                }}
            />
        </Box>
    );

    // Wrap in tooltip if term exists
    if (term) {
        return (
            <TermTooltip term={term.term} definition={term.definition} termId={term.id}>
                {content}
            </TermTooltip>
        );
    }

    return content;
});
