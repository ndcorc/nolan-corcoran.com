// src/app/blog/loading.tsx
import { AppShellMain, Container, Skeleton, SimpleGrid } from '@mantine/core';

export default function BlogPageSkeleton() {
    return (
        <AppShellMain>
            {/* Hero Quote Section Skeleton */}
            <div className="py-20">
                <Container size="lg">
                    <Skeleton height={80} mb={8} />
                    <Skeleton height={80} width="80%" mx="auto" />
                </Container>
            </div>

            {/* Featured Post Section Skeleton */}
            <Container size="lg" className="py-8">
                <Skeleton height={400} radius="md" mb={32} />
            </Container>

            {/* Blog Posts Section Skeleton */}
            <Container size="lg" className="py-16">
                <Skeleton height={40} width={200} mb={32} />

                {/* Category Filter Skeleton */}
                <div className="mb-8">
                    <Skeleton height={50} />
                </div>

                {/* Posts Grid Skeleton */}
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <Skeleton height={200} radius="md" />
                            <Skeleton height={24} width="80%" />
                            <Skeleton height={20} width="60%" />
                            <Skeleton height={60} />
                        </div>
                    ))}
                </SimpleGrid>
            </Container>
        </AppShellMain>
    );
}
