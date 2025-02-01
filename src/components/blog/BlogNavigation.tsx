'use client';
import { Group, Card, Text, Title, Stack } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { nprogress } from '@mantine/nprogress';
import { Post } from '@/types/sanity';

interface BlogNavigationProps {
    previousPost?: Post;
    nextPost?: Post;
}

const BlogNavigation = ({ previousPost, nextPost }: BlogNavigationProps) => {
    return (
        <Group justify="space-between" className="my-8 max-sm:px-2">
            {previousPost ? (
                <Link
                    href={`/blog/${previousPost.slug.current}`}
                    onClick={nprogress.start}
                    className="no-underline w-full md:w-[48%]">
                    <Card
                        className="bg-[#F9F8F2] dark:bg-dark-600 hover:shadow-z dark:hover:shadow-dark-z transition-shadow rounded-md shadow-sm text-brand dark:text-stone-50 border border-solid border-dark-100 dark:border-dark-400"
                        padding="lg">
                        <Group>
                            <IconArrowLeft size={20} className="text-gray-500" />
                            <div>
                                <Text size="sm" c="dimmed">
                                    Previous Article
                                </Text>
                                <Title order={4} lineClamp={1}>
                                    {previousPost.title}
                                </Title>
                            </div>
                        </Group>
                    </Card>
                </Link>
            ) : (
                <div className="w-[48%]" />
            )}

            {nextPost ? (
                <Link
                    href={`/blog/${nextPost.slug.current}`}
                    onClick={nprogress.start}
                    className="no-underline w-full md:w-[48%]">
                    <Card
                        className="bg-[#F9F8F2] dark:bg-dark-600 hover:shadow-z dark:hover:shadow-dark-z transition-shadow rounded-md shadow-sm text-brand dark:text-stone-50 border border-solid border-dark-100 dark:border-dark-400"
                        padding="lg">
                        <Group justify="flex-end" wrap="nowrap">
                            <Stack className="text-right gap-0 overflow-hidden whitespace-nowrap">
                                <Text size="sm" c="dimmed">
                                    Next Article
                                </Text>
                                <Title order={4} className="text-ellipsis">
                                    {nextPost.title}
                                </Title>
                            </Stack>
                            <IconArrowRight size={20} className="text-gray-500" />
                        </Group>
                    </Card>
                </Link>
            ) : (
                <div className="w-[48%]" />
            )}
        </Group>
    );
};

export default BlogNavigation;
