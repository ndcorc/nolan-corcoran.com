// src/components/apologetics/common/ApologeticsCard.tsx
'use client';

import { Paper, Group, Box, Text, Badge } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ApologeticsCardProps {
    title: string;
    description?: string;
    href: string;
    icon?: ReactNode;
    category?: string;
    className?: string;
}

export function ApologeticsCard({ title, description, href, icon, category, className }: ApologeticsCardProps) {
    return (
        <Paper
            component={Link}
            href={href}
            p="lg"
            radius="md"
            withBorder
            className={`block no-underline transition-all duration-200 hover:shadow-md ${className || ''} border-[#CED4DA]`}
            style={{
                backgroundColor: 'var(--mantine-color-body)'
            }}>
            <Group align="flex-start" gap="md" wrap="nowrap">
                {icon && (
                    <Box
                        p="sm"
                        className="rounded-md transition-colors"
                        style={{
                            backgroundColor: 'var(--mantine-color-default-hover)',
                            color: 'var(--apologetics-primary)'
                        }}>
                        {icon}
                    </Box>
                )}
                <Box style={{ flex: 1, minWidth: 0 }}>
                    {category && (
                        <Badge
                            size="xs"
                            variant="light"
                            tt="capitalize"
                            radius="xs"
                            mb={4}
                            style={{
                                fontSize: '14px',
                                backgroundColor: 'var(--apologetics-badge-bg)'
                            }}>
                            {category}
                        </Badge>
                    )}
                    <Text fw={600} className="text-inherit" style={{ fontSize: '16px' }}>
                        {title}
                    </Text>
                    {description && (
                        <Text c="dimmed" mt={4} lineClamp={2} style={{ fontSize: '14px' }}>
                            {description}
                        </Text>
                    )}
                </Box>
            </Group>
        </Paper>
    );
}
