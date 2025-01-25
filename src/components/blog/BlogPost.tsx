'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/blog/BlogPost.tsx

import Image from 'next/image';
import { format } from 'date-fns';
import { AppShellMain, Container, Title, Text, Divider, Center, List, Group, SimpleGrid } from '@mantine/core';
import { PortableText, toPlainText } from '@portabletext/react';
import { urlForImage } from '@/lib/sanity/image';
import type { Post } from '@/types/sanity';
import JsonLd from '../shared/JsonLd';
import { useEffect, useState } from 'react';
import BibleRefTagger from '../shared/BibleRefTagger';
import Loading from '../shared/Loading';
import CustomBlockquote from './CustomBlockquote';
import BlogNavigation from './BlogNavigation';
import ShareButtons from './ShareButtons';

interface BlogPostProps {
    post: Post;
    previousPost?: Post;
    nextPost?: Post;
}

const splitNumberAndText = (str: string) => {
    const regex = /^(\d+)\.\s*(.*)/;
    const match = str.match(regex);
    if (match) {
        return [Number(parseInt(match[1], 10)), match[2]];
    }
    return [null, str];
};

const basePtComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className="relative w-full h-96 my-8">
                    <Image
                        src={urlForImage(value).url()}
                        alt={value.alt || 'Blog post image'}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            );
        }
    },
    block: {
        h2: ({ children }: any) => (
            <Title order={2} className="mt-8 mb-4">
                {children}
            </Title>
        ),
        h3: ({ children }: any) => (
            <Title order={4} className="mt-8 mb-4">
                {children}
            </Title>
        ),
        normal: ({ children }: any) => {
            if (children[0].startsWith('--')) {
                return <Divider my="md" />;
            }
            const [point, text] = splitNumberAndText(children[0]);
            const newChildren = [...children];
            newChildren[0] = text;
            if (point) {
                return (
                    <div className="grid grid-cols-[1rem,1fr] gap-2 mt-3">
                        <Text className="leading-relaxed">{`${point}. `}</Text>
                        <Text className="leading-relaxed">{newChildren}</Text>
                    </div>
                );
            }
            return <Text className="mb-4 leading-relaxed">{children}</Text>;
        },
        blockquote: ({ children, value }: any) => {
            const citation = children[children.length - 1]?.props?.children?.[0];
            children = children.filter((child: any) => !child?.props || child?.props?.children?.[0] !== citation);
            return (
                <CustomBlockquote
                    citation={citation}
                    currentUrl={typeof window !== 'undefined' ? window.location.href : ''}
                    quoteText={toPlainText(value)}>
                    {children}
                </CustomBlockquote>
            );
        }
    },
    list: {
        bullet: ({ children }: any) => {
            return (
                <List type="unordered" className="list-disc">
                    {children.map((child: any, index: number) => (
                        <List.Item key={index}>{child.props.children}</List.Item>
                    ))}
                </List>
            );
        },
        number: ({ children }: any) => {
            return (
                <List type="ordered" className="list-decimal">
                    {children.map((child: any, index: number) => (
                        <List.Item key={index}>{child.props.children}</List.Item>
                    ))}
                </List>
            );
        }
    }
};

const nestedPtComponents = {
    ...basePtComponents,
    types: {
        ...basePtComponents.types,
        twoColumnBlock: undefined // prevent infinite recursion
    }
};

const ptComponents = {
    ...basePtComponents,
    types: {
        ...basePtComponents.types,
        twoColumnBlock: ({ value }: any) => {
            try {
                const { leftColumn, rightColumn } = value;
                if (!leftColumn || !rightColumn) return null;

                return (
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" verticalSpacing="xs">
                        <PortableText value={leftColumn} components={nestedPtComponents} />
                        <PortableText value={rightColumn} components={nestedPtComponents} />
                    </SimpleGrid>
                );
            } catch (error) {
                console.error('Error rendering twoColumnBlock:', error);
                return null;
            }
        }
    }
};

export default function BlogPost({ post, previousPost, nextPost }: BlogPostProps) {
    const { title, subtitle, mainImage, publishedAt, body } = post;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loading />;
    }

    return (
        <>
            {/* Add JSON-LD structured data */}
            <JsonLd post={post} />
            <BibleRefTagger />
            <AppShellMain className="pb-32 max-md:px-0">
                <article className="relative">
                    {/* Hero Section with Main Image */}
                    {mainImage && (
                        <Center>
                            <div className="relative md:w-[85vw] w-[100vw] h-[50vh] mb-8">
                                <Image
                                    src={urlForImage(mainImage).url()}
                                    alt={title}
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                />
                            </div>
                        </Center>
                    )}

                    {/* Post Content */}
                    <Container
                        size="md"
                        className="relative py-12 md:px-20 px-8 max-sm:-mt-[calc(50vh/2)] -mt-[calc(50vh/3)] mb-8 bg-[#F9F8F2] dark:bg-dark-600 rounded-lg shadow-dark-z">
                        {/* Post Header */}
                        <header className="mb-12 flex flex-col items-center gap-8">
                            {/* Publication Date and Author */}
                            <Group gap="xs" className="flex items-center justify-center">
                                <Text size="sm" className="dark:text-gray-500">
                                    {`${format(new Date(publishedAt), 'MMMM d, yyyy').toUpperCase()}`}
                                </Text>
                                <Text size="sm" className="dark:text-gray-500">
                                    •
                                </Text>
                                <Group gap="xs" className="items-center">
                                    <Text size="sm" className="dark:text-gray-500">
                                        NOLAN CORCORAN
                                    </Text>
                                </Group>
                            </Group>

                            {/* Title and Subtitle */}
                            <Title
                                order={1}
                                className="md:text-6xl text-3xl font-medium text-primary dark:text-white text-center">
                                {title}
                            </Title>
                            <Divider size="lg" className="w-24" />
                            {subtitle && (
                                <Text fs="italic" className="dark:text-gray-500 md:text-xl text-lg">
                                    {subtitle}
                                </Text>
                            )}
                        </header>

                        {/* Post Body */}
                        <div className="prose dark:prose-invert max-w-none">
                            <PortableText value={body!} components={ptComponents} />
                        </div>
                    </Container>
                    <Container size="md" className="relative px-0">
                        <ShareButtons post={post} url={typeof window !== 'undefined' ? window.location.href : ''} />
                        <BlogNavigation previousPost={previousPost} nextPost={nextPost} />
                    </Container>
                </article>
            </AppShellMain>
        </>
    );
}
