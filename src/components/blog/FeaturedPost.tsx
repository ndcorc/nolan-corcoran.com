// src/components/blog/FeaturedPost.tsx
'use client';

import Link from 'next/link';
import { Button, Container, Text, Title, useMantineColorScheme } from '@mantine/core';
import { Post } from '@/types/sanity';
import Image from 'next/image';
import { nprogress } from '@mantine/nprogress';

interface FeaturedPostProps {
    post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <Container
            fluid
            className="md:py-16 sm:mx-auto sm:px-4 py-8 px-2 sm:max-w-[1200px] md:max-w-[1390px] max-w-[576px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-[60%_40%] gap-4">
                <div className="md:space-y-4 space-y-2 gap-0 flex flex-col justify-center px-2">
                    {/* Date */}
                    <Text className="md:text-2xl text-lg">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </Text>

                    {/* Title */}
                    <Title order={2} size="h1" className="font-normal md:text-6xl text-4xl">
                        {post.title}
                    </Title>

                    {/* Subtitle */}
                    <Title order={4} size="h4" className="font-normal md:text-2xl text-lg">
                        {post.subtitle}
                    </Title>

                    {/* Excerpt */}
                    <Text lineClamp={3} className="md:text-lg text-sm leading-tight">
                        {post.excerpt}
                    </Text>

                    {/* Read More Button */}
                    <Link
                        onClick={nprogress.start}
                        href={`/blog/${post.slug.current}`}
                        className="inline-block no-underline mt-4">
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
                <div className="relative max-w-[37vw] max-md:max-w-full h-[40vh]">
                    <Image
                        src={isDark ? '/img/gradient-dark.png' : '/img/gradient.png'}
                        alt="Decorative shape"
                        fill
                        className="object-cover rounded-[110px] max-w-[37vw] max-md:max-w-full h-[40vh]"
                        priority
                    />
                </div>
            </div>
        </Container>
    );
}
