// src/components/blog/BlogCardSkeleton.tsx
import { Card, Skeleton, Group } from '@mantine/core';

export default function BlogCardSkeleton() {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Skeleton height={200} radius={0} />
            </Card.Section>

            <Group mt="md" mb="xs">
                <Skeleton height={20} width={60} radius="xl" />
                <Skeleton height={20} width={80} radius="xl" />
            </Group>

            <Skeleton height={24} mb="sm" />
            <Skeleton height={20} width="70%" mb="sm" />

            <Skeleton height={16} width={100} mb="lg" />

            <Skeleton height={16} mb="xs" />
            <Skeleton height={16} width="90%" mb="xs" />
            <Skeleton height={16} width="80%" />
        </Card>
    );
}
