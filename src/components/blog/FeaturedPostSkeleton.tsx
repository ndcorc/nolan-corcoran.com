// src/components/blog/FeaturedPostSkeleton.tsx
import { Container, Skeleton } from '@mantine/core';

export function FeaturedPostSkeleton() {
    return (
        <div className={`w-full`}>
            <Container size="lg" className="py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        {/* Date skeleton */}
                        <Skeleton height={20} width={120} radius="sm" />

                        {/* Title skeletons */}
                        <Skeleton height={48} width="90%" radius="sm" />
                        <Skeleton height={48} width="70%" radius="sm" />

                        {/* Subtitle skeleton */}
                        <Skeleton height={24} width="80%" radius="sm" />

                        {/* Excerpt skeletons */}
                        <div className="space-y-2">
                            <Skeleton height={20} width="95%" radius="sm" />
                            <Skeleton height={20} width="90%" radius="sm" />
                            <Skeleton height={20} width="85%" radius="sm" />
                        </div>

                        {/* Button skeleton */}
                        <Skeleton height={36} width={120} radius="md" mt="lg" />
                    </div>

                    {/* Image skeleton */}
                    <div className="relative aspect-[4/3] w-full">
                        <Skeleton height="100%" radius="lg" />
                    </div>
                </div>
            </Container>
        </div>
    );
}
