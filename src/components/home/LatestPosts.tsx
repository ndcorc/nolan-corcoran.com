// src/components/home/LatestPosts.tsx
'use client';

import { Container, Title, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import BlogCard from '../blog/BlogCard';
import BlogCardSkeleton from '../blog/BlogCardSkeleton';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mantine/hooks';
import { usePosts } from '@/lib/sanity/sanity.hooks';

export default function LatestPosts() {
    const { data: posts, isLoading: postsLoading } = usePosts();
    const mobile = useMediaQuery('(max-width: 74em)');

    return (
        <section className="py-20">
            <motion.div whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 1 }}>
                <Container fluid className="md:px-32 px-4">
                    <Title order={2} size="h1" className="mb-12 text-center md:text-6xl text-4xl">
                        Latest from the Blog
                    </Title>
                    <Carousel
                        withIndicators
                        height={475}
                        align="start"
                        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
                        slideGap={{ base: 0, sm: 'md' }}
                        slidesToScroll={mobile ? 1 : 2}>
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
