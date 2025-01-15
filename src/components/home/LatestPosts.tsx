// src/components/home/LatestPosts.tsx
'use client';

import { Container, Title, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/lib/sanity/sanity.client';
import { Carousel } from '@mantine/carousel';
import BlogCard from '../blog/BlogCard';
import BlogCardSkeleton from '../blog/BlogCardSkeleton';
import { motion } from 'framer-motion';

export default function LatestPosts() {
    const { data: posts, isLoading: postsLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: getAllPosts
    });

    return (
        <section className="py-20">
            <motion.div whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 1 }}>
                <Container fluid className="px-32">
                    <Title order={2} size="h1" className="mb-12 text-center">
                        Latest from the Blog
                    </Title>
                    <Carousel
                        withIndicators
                        height={475}
                        slideSize="33.333333%"
                        slideGap="md"
                        align="start"
                        slidesToScroll={3}>
                        {postsLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <Carousel.Slide key={index}>
                                    <BlogCardSkeleton key={index} />
                                </Carousel.Slide>
                            ))
                        ) : posts?.length === 0 ? (
                            <Text c="dimmed" className="col-span-full text-center py-8">
                                No posts found in this category.
                            </Text>
                        ) : (
                            posts?.map((post, index) => (
                                <Carousel.Slide key={index}>
                                    <BlogCard key={post._id} post={post} index={index} excerpt />
                                </Carousel.Slide>
                            ))
                        )}
                    </Carousel>
                </Container>
            </motion.div>
        </section>
    );
}
