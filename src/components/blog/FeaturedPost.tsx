'use client';

import Link from 'next/link';
import { Button, Container, Text, Title, useMantineColorScheme } from '@mantine/core';
import { Post } from '@/types/sanity';
import Image from 'next/image';

interface FeaturedPostProps {
    post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <div className="w-full">
            <Container size="lg" className="xl:py-20 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
                    <div className="xl:space-y-4 space-y-2 gap-0 flex flex-col justify-center">
                        {/* Date */}
                        <Text className="xl:text-2xl text-lg">
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Text>

                        {/* Title */}
                        <Title order={2} size="h1" className="font-normal xl:text-6xl text-4xl">
                            {post.title}
                        </Title>

                        {/* Subtitle */}
                        <Title order={4} size="h4" className="font-normal xl:text-2xl text-lg">
                            {post.subtitle}
                        </Title>

                        {/* Excerpt */}
                        <Text lineClamp={3} className="xl:text-lg text-sm leading-tight">
                            {post.excerpt}
                        </Text>

                        {/* Read More Button */}
                        <Link href={`/blog/${post.slug.current}`} className="inline-block no-underline mt-4">
                            <Button
                                variant="outline"
                                size="md"
                                rightSection="→"
                                className="rounded-md border-[#6E0909] text-[#6E0909] hover:bg-[#6E0909] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white transition-colors">
                                Read More
                            </Button>
                        </Link>
                    </div>

                    {/* Right side decorative rounded rectangle */}
                    <div className="relative w-full h-[40vh]">
                        <Image
                            src={isDark ? '/img/gradient-dark.png' : '/img/gradient.png'}
                            alt="Decorative shape"
                            fill
                            className="object-cover rounded-[110px] w-full h-[40vh]"
                            priority
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}
