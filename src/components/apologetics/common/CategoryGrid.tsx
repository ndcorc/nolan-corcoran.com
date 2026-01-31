// src/components/apologetics/common/CategoryGrid.tsx
'use client';

import { Box, Title, Text, SimpleGrid } from '@mantine/core';
import { ReactNode } from 'react';

interface CategoryGridProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function CategoryGrid({ title, description, children, className }: CategoryGridProps) {
    return (
        <Box component="section" mb="xl" className={className}>
            <Box mb="md">
                <Title order={2} size="h3">
                    {title}
                </Title>
                {description && (
                    <Text c="dimmed" mt="xs" style={{ fontSize: '16px' }}>
                        {description}
                    </Text>
                )}
            </Box>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                {children}
            </SimpleGrid>
        </Box>
    );
}
