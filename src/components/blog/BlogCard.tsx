// src/components/blog/BlogCard.tsx
'use client';

import { useState } from 'react';
import { Card, Image, Text, Badge, Title, Group, Skeleton, CardProps } from '@mantine/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { urlForImage } from '@/lib/sanity/image';
import type { Post } from '@/types/sanity';
import { IconNews } from '@tabler/icons-react';
import { nprogress } from '@mantine/nprogress';

interface BlogCardProps {
    post: Post;
    index: number;
    excerpt: boolean;
}

const MotionCard = motion<CardProps>(Card);

export default function BlogCard({ post, index, excerpt }: BlogCardProps) {
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <Link href={`/blog/${post.slug.current}`} onClick={nprogress.start} className="no-underline">
            <MotionCard
                className="h-full rounded-xl shadow-sm hover:shadow-md border border-solid dark:border-dark-400 bg-slate-50 dark:bg-dark-600 dark:shadow-dark-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: 'easeOut'
                }}
                whileHover={{ y: -4 }}>
                {post.mainImage && (
                    <Card.Section>
                        {imageLoading && <Skeleton height={200} />}
                        <Image
                            src={urlForImage(post.mainImage).url()}
                            alt={post.title}
                            onLoad={() => setImageLoading(false)}
                            className="max-h-48 object-cover"
                            style={{ display: imageLoading ? 'none' : 'block' }}
                        />
                    </Card.Section>
                )}

                {!excerpt ? (
                    <Group gap="8" className="flex items-center">
                        <IconNews size="24" className="mt-2 mb-1" />
                        <Title order={4} lineClamp={2} className="mt-2 mb-1 font-bold text-[20px]">
                            {post.title}
                        </Title>
                    </Group>
                ) : (
                    <Title order={4} lineClamp={2} className="mt-2 mb-1 font-bold">
                        {post.title}
                    </Title>
                )}

                {post.subtitle && (
                    <Text size="sm" c="dimmed" className="mb-1">
                        {post.subtitle}
                    </Text>
                )}

                <Text size="sm" c="dimmed" className="mb-1">
                    {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                </Text>

                {excerpt && <Text lineClamp={3}>{post.excerpt}</Text>}

                <Group mt="md" mb="xs">
                    {post.categories.map((category) => (
                        <Badge
                            key={category._id}
                            color={category.color}
                            className={category.title === 'Apologetics' ? 'text-[#6B6042]' : ''}>
                            {category.title}
                        </Badge>
                    ))}
                </Group>
            </MotionCard>
        </Link>
    );
}
