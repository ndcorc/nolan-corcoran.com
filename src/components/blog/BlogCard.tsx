'use client';

import { Card, Text, Badge, Title, Group, CardProps, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { urlForListingImage } from '@/lib/sanity/image';
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
    return (
        <Link href={`/blog/${post.slug.current}`} onClick={nprogress.start} className="no-underline">
            <MotionCard
                className="h-full rounded-xl shadow-sm hover:shadow-md border border-solid dark:border-dark-400 bg-slate-50 dark:bg-dark-500 dark:shadow-dark-md"
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
                        <div className="relative h-48 w-full">
                            <Image
                                src={urlForListingImage(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </div>
                    </Card.Section>
                )}
                {!excerpt ? (
                    <Stack className="gap-0 mt-4 mb-1">
                        <Group gap="8" wrap="nowrap" className="flex items-center mb-4">
                            <IconNews size="24" className="mb-1" />
                            <Title order={5} className="font-[525]">
                                Article
                            </Title>
                        </Group>
                        <Title order={3} className="mb-1 font-[500]">
                            {post.title}
                        </Title>
                    </Stack>
                ) : (
                    <Title order={3} lineClamp={2} className="mt-2 mb-1 font-[500]">
                        {post.title}
                    </Title>
                )}

                <Text size="md" className="mt-0 mb-5 font-[IBM_Plex_Sans]">
                    {format(new Date(post.publishedAt), 'MMMM dd, yyyy').toUpperCase()}
                </Text>

                {excerpt && (
                    <Text className="mb-4" lineClamp={3}>
                        {post.excerpt}
                    </Text>
                )}

                <Group mb="xs" gap={4} className="mt-auto min-h-[44px] items-start">
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
