// src/components/blog/BlogContent.tsx
'use client';

import { useState } from 'react';
import { AppShellMain, Container, Title, Text, SimpleGrid, Group, Pagination, Select } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from './BlogCard';
import CategoryFilter from './CategoryFilter';
import { FeaturedPost } from './FeaturedPost';
import type { BlogContentProps } from '@/types/sanity';

const POSTS_PER_PAGE = 9;

export function BlogContent({ posts, categories, featuredPost }: BlogContentProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(POSTS_PER_PAGE);

    const filteredPosts = selectedCategory
        ? posts.filter((post) => post.categories.some((category) => category._id === selectedCategory))
        : posts;

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    const handleCategoryChange = (categoryId: string | null) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };

    return (
        <AppShellMain className="pb-32 px-0">
            <div className="md:py-20 py-12">
                <Container size="lg">
                    <Title order={1} className="text-center mb-4 md:text-6xl text-4xl font-medium">
                        {`The Christian life isn't always easy,`}
                        <br />
                        {`but it's `}
                        <Text span inherit className="italic font-bold text-primary">
                            always
                        </Text>
                        {` good.`}
                    </Title>
                </Container>
            </div>

            {featuredPost ? <FeaturedPost post={featuredPost} /> : null}

            <Container
                fluid
                className="md:py-16 sm:mx-auto sm:px-4 py-8 px-2 sm:max-w-[1200px] md:max-w-[1390px] max-w-[576px] mx-auto">
                <Title order={2} className="md:mb-8 mb-2 px-2 md:px-0">
                    All Posts
                </Title>

                <div className="mb-8 px-2 md:px-0">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryChange}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory || 'all'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}>
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" className="max-w-full">
                            {currentPosts.length === 0 ? (
                                <Text c="dimmed" className="col-span-full text-center py-8">
                                    No posts found in this category.
                                </Text>
                            ) : (
                                currentPosts.map((post, index) => (
                                    <BlogCard key={post._id} post={post} index={index} excerpt={false} />
                                ))
                            )}
                        </SimpleGrid>
                    </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                    <Group justify="center" mt="xl">
                        <Pagination value={currentPage} onChange={setCurrentPage} total={totalPages} radius="md" />
                        <Select
                            value={postsPerPage.toString()}
                            onChange={(value) => {
                                setPostsPerPage(Number(value));
                                setCurrentPage(1);
                            }}
                            data={[
                                { value: '9', label: '9 per page' },
                                { value: '12', label: '12 per page' },
                                { value: '15', label: '15 per page' }
                            ]}
                            style={{ width: 130 }}
                        />
                    </Group>
                )}
            </Container>
        </AppShellMain>
    );
}
