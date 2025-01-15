// src/components/blog/CategoryFilterSkeleton.tsx
import { Group, Skeleton } from '@mantine/core';

export default function CategoryFilterSkeleton() {
    return (
        <Group gap="xs">
            <Skeleton height={36} width={60} radius="md" />
            <Skeleton height={36} width={80} radius="md" />
            <Skeleton height={36} width={100} radius="md" />
            <Skeleton height={36} width={90} radius="md" />
            <Skeleton height={36} width={70} radius="md" />
        </Group>
    );
}
