// src/components/blog/BlogContent.tsx
'use client';

import { useState } from 'react';
import { AppShellMain, Container, Title, Text, SimpleGrid, Alert, Group, Pagination, Select } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from './BlogCard';
import BlogCardSkeleton from './BlogCardSkeleton';
import CategoryFilter from './CategoryFilter';
import CategoryFilterSkeleton from './CategoryFilterSkeleton';
import { FeaturedPost } from './FeaturedPost';
import { FeaturedPostSkeleton } from './FeaturedPostSkeleton';
import { Category, Post } from '@/types/sanity';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getAllPosts, getFeaturedOrLatestPost } from '@/lib/sanity/sanity.client';

const POSTS_PER_PAGE = 9;

export function BlogContent() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(POSTS_PER_PAGE);

    // Client-side data fetching with initial data
    const {
        data: posts,
        isLoading: postsLoading,
        error: postsError
    } = useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: getAllPosts
    });

    const {
        data: categories,
        isLoading: categoriesLoading,
        error: categoriesError
    } = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: getAllCategories
    });

    const { data: featuredPost, isLoading: featuredLoading } = useQuery<Post, Error>({
        queryKey: ['featuredPost'],
        queryFn: getFeaturedOrLatestPost
    });

    // Filter posts by category
    const filteredPosts = selectedCategory
        ? posts?.filter((post) => post.categories.some((category) => category._id === selectedCategory))
        : posts;

    // Calculate pagination
    const totalPosts = filteredPosts?.length || 0;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts?.slice(startIndex, endIndex);

    // Handle category change
    const handleCategoryChange = (categoryId: string | null) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1); // Reset to first page when changing category
    };

    return (
        <AppShellMain className="pb-32">
            {/* Hero Quote Section */}
            <div className="xl:py-20 py-12">
                <Container size="lg">
                    <Title order={1} className="text-center mb-4 xl:text-6xl text-4xl font-medium">
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

            {/* Featured Post Section */}
            {featuredLoading ? <FeaturedPostSkeleton /> : featuredPost ? <FeaturedPost post={featuredPost} /> : null}

            {/* Blog Posts Section */}
            <Container fluid size="lg" className="xl:py-16 xl:mx-8 xl:px-4 py-8 mx-0 px-0">
                <Title order={2} className="xl:mb-8 mb-2 px-2 xl:px-0">
                    All Posts
                </Title>

                {/* Category Filter Section */}
                <div className="mb-8 px-2 xl:px-0">
                    {categoriesLoading ? (
                        <CategoryFilterSkeleton />
                    ) : categoriesError ? (
                        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                            Failed to load categories. Please try again later.
                        </Alert>
                    ) : categories ? (
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategoryChange}
                        />
                    ) : null}
                </div>

                {/* Posts Grid */}
                {postsError ? (
                    <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                        Failed to load blog posts. Please try again later.
                    </Alert>
                ) : (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory || 'all'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}>
                                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" className="max-w-full">
                                    {postsLoading ? (
                                        Array.from({ length: postsPerPage }).map((_, index) => (
                                            <BlogCardSkeleton key={index} />
                                        ))
                                    ) : currentPosts?.length === 0 ? (
                                        <Text c="dimmed" className="col-span-full text-center py-8">
                                            No posts found in this category.
                                        </Text>
                                    ) : (
                                        currentPosts?.map((post, index) => (
                                            <BlogCard key={post._id} post={post} index={index} excerpt={false} />
                                        ))
                                    )}
                                </SimpleGrid>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination Controls */}
                        {!postsLoading && totalPages > 1 && (
                            <Group justify="center" mt="xl">
                                <Pagination
                                    value={currentPage}
                                    onChange={setCurrentPage}
                                    total={totalPages}
                                    radius="md"
                                />
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
                    </>
                )}
            </Container>
        </AppShellMain>
    );
}
