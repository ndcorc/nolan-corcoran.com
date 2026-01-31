// src/components/apologetics/common/TermTooltip.tsx
'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { Box, Text, Paper } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

interface TermTooltipProps {
    term: string;
    definition: string;
    termId: string;
    children: ReactNode;
}

export function TermTooltip({ term, definition, termId, children }: TermTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState<'top' | 'bottom'>('top');
    const triggerRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const showTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setIsVisible(true), 200);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setIsVisible(false), 150);
    };

    // Calculate position to avoid overflow
    useEffect(() => {
        if (isVisible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;

            // Prefer top, but use bottom if not enough space above
            setPosition(spaceAbove < 200 && spaceBelow > spaceAbove ? 'bottom' : 'top');
        }
    }, [isVisible]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Box component="span" className="relative inline">
            <Box
                component="span"
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                tabIndex={0}
                className="term-reference">
                {children}
            </Box>

            {isVisible && (
                <Paper
                    ref={tooltipRef}
                    onMouseEnter={showTooltip}
                    onMouseLeave={hideTooltip}
                    p="sm"
                    radius="md"
                    shadow="md"
                    withBorder
                    className="absolute z-50 w-72 animate-in fade-in duration-200"
                    style={{
                        backgroundColor: 'var(--mantine-color-body)',
                        ...(position === 'top'
                            ? { bottom: '100%', marginBottom: '8px', left: '50%', transform: 'translateX(-50%)' }
                            : { top: '100%', marginTop: '8px', left: '50%', transform: 'translateX(-50%)' })
                    }}>
                    {/* Arrow */}
                    <Box
                        className="absolute w-3 h-3 rotate-45"
                        style={{
                            backgroundColor: 'var(--mantine-color-body)',
                            borderColor: 'var(--mantine-color-default-border)',
                            ...(position === 'top'
                                ? {
                                      bottom: '-7px',
                                      left: '50%',
                                      transform: 'translateX(-50%)',
                                      borderRight: '1px solid',
                                      borderBottom: '1px solid'
                                  }
                                : {
                                      top: '-7px',
                                      left: '50%',
                                      transform: 'translateX(-50%)',
                                      borderLeft: '1px solid',
                                      borderTop: '1px solid'
                                  })
                        }}
                    />

                    {/* Content */}
                    <Box className="relative">
                        <Text fw={600} mb={4}>
                            {term}
                        </Text>
                        <Text size="sm" style={{ lineHeight: 1.5 }} mb="xs">
                            {definition}
                        </Text>
                        <Text
                            component={Link}
                            href={`/apologetics/glossary#${termId}`}
                            size="sm"
                            className="inline-flex items-center gap-1 no-underline hover:underline"
                            style={{ color: 'var(--apologetics-primary)' }}
                            onClick={(e) => e.stopPropagation()}>
                            Go to definition
                            <IconArrowRight size={12} />
                        </Text>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}
