/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { AppShellMain, Container, Title, Text, Divider, Blockquote, Center, List } from '@mantine/core';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/lib/sanity/image';
import type { Post } from '@/types/sanity';
import { IconQuotes } from '@tabler/icons-react';
import JsonLd from '../shared/JsonLd';
import { useEffect, useState } from 'react';

interface BlogPostProps {
    post: Post;
}

const splitNumberAndText = (str: string) => {
    const regex = /^(\d+)\.\s*(.*)/;
    const match = str.match(regex);
    if (match) {
        return [Number(parseInt(match[1], 10)), match[2]];
    }
    return [null, str];
};

const ptComponents = {
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
        blockquote: ({ children }: any) => {
            const citation = children[children.length - 1]?.props?.children?.[0];
            children = children.filter((child: any) => !child?.props || child?.props?.children?.[0] !== citation);
            const icon = <IconQuotes size={32} className="dark:text-white" />;
            return (
                <Center>
                    <Blockquote
                        cite={citation || undefined}
                        icon={icon}
                        iconSize={36}
                        className="bg-white dark:bg-dark-500 max-w-[50%] my-2 rounded-md shadow-dark-md border-l-0">
                        {children}
                    </Blockquote>
                </Center>
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

export default function BlogPost({ post }: BlogPostProps) {
    const { title, subtitle, mainImage, publishedAt, body } = post;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Add JSON-LD structured data */}
            <JsonLd post={post} />
            <AppShellMain>
                <article className="relative">
                    {/* Hero Section with Main Image */}
                    {mainImage && (
                        <Center>
                            <div className="relative w-[85vw] h-[50vh] mb-8">
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
                        className="relative py-12 px-20 -mt-[calc(50vh/3)] mb-24 bg-[#F9F8F2] dark:bg-dark-600 rounded-lg shadow-dark-z">
                        {/* Post Header */}
                        <header className="mb-12 flex flex-col items-center gap-8">
                            {/* Publication Date */}
                            <Text size="sm" className="dark:text-gray-500">
                                {format(new Date(publishedAt), 'MMMM d, yyyy').toUpperCase()}
                            </Text>

                            {/* Title and Subtitle */}
                            <Title order={1} className="text-6xl font-medium text-primary dark:text-white">
                                {title}
                            </Title>
                            <Divider size="lg" className="w-24" />
                            {subtitle && (
                                <Text size="xl" fs="italic" className="dark:text-gray-500">
                                    {subtitle}
                                </Text>
                            )}
                        </header>

                        {/* Post Body */}
                        <div className="prose dark:prose-invert max-w-none">
                            <PortableText value={body!} components={ptComponents} />
                        </div>
                    </Container>
                </article>
            </AppShellMain>
        </>
    );
}
