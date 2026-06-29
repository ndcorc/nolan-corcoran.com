'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/blog/BlogPost.tsx

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { AppShellMain, Container, Title, Text, Divider, Center, List, Group, SimpleGrid, Stack } from '@mantine/core';
import { PortableText, toPlainText } from '@portabletext/react';
import { urlForImage } from '@/lib/sanity/image';
import type { Post } from '@/types/sanity';
import BibleRefTagger from '../shared/BibleRefTagger';
import CustomBlockquote from './CustomBlockquote';
import BlogNavigation from './BlogNavigation';
import QuotesIcon from './QuotesIcon';
import { splitByLastDash, splitNumberAndText } from '@/lib/utils';

const ShareButtons = dynamic(() => import('./ShareButtons'), {
    ssr: false,
    loading: () => null
});

interface BlogPostProps {
    post: Post;
    previousPost?: Post;
    nextPost?: Post;
    url: string;
}

function createPtComponents(postUrl: string) {
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
                <Title order={2} className="my-4">
                    {children}
                </Title>
            ),
            h3: ({ children }: any) => (
                <Title order={4} className="my-4">
                    {children}
                </Title>
            ),
            normal: ({ children }: any) => {
                if (children[0].startsWith('--')) {
                    return <Divider size="md" className="text-dark-500 my-4" />;
                }
                const [point, text] = splitNumberAndText(children[0]);
                const newChildren = [...children];
                newChildren[0] = text;
                if (point) {
                    return (
                        <div className="grid grid-cols-[1rem,1fr] gap-2 mb-4">
                            <Text className="leading-relaxed">{`${point}. `}</Text>
                            <Text className="leading-relaxed">{newChildren}</Text>
                        </div>
                    );
                }
                return <Text className="mb-4 leading-relaxed">{children}</Text>;
            },
            blockquote: ({ children, value }: any) => {
                const [quote, citation] = splitByLastDash(children);
                children = quote;
                return (
                    <CustomBlockquote
                        citation={`— ${citation}`}
                        currentUrl={postUrl}
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
                    <List type="ordered" className="list-decimal mb-4">
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
            twoColumnBlock: undefined
        }
    };

    return {
        ...basePtComponents,
        types: {
            ...basePtComponents.types,
            twoColumnBlock: ({ value }: any) => {
                try {
                    const { leftColumn, rightColumn } = value;
                    if (!leftColumn || !rightColumn) return null;

                    return (
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" verticalSpacing="xs">
                            <Stack className="gap-0">
                                <PortableText value={leftColumn} components={nestedPtComponents} />
                            </Stack>
                            <Stack className="gap-0">
                                <PortableText value={rightColumn} components={nestedPtComponents} />
                            </Stack>
                        </SimpleGrid>
                    );
                } catch (error) {
                    console.error('Error rendering twoColumnBlock:', error);
                    return null;
                }
            }
        }
    };
}

export default function BlogPost({ post, previousPost, nextPost, url }: BlogPostProps) {
    const { title, subtitle, mainImage, publishedAt, body } = post;
    const ptComponents = useMemo(() => createPtComponents(url), [url]);

    return (
        <>
            <BibleRefTagger />
            <AppShellMain className="pb-32 max-md:px-0">
                <article className="relative">
                    {mainImage && (
                        <Center>
                            <div className="relative md:w-[85vw] w-[100vw] h-[50vh] mb-8">
                                <Image
                                    src={urlForImage(mainImage).width(1600).height(900).fit('crop').url()}
                                    alt={title}
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    sizes="100vw"
                                />
                            </div>
                        </Center>
                    )}

                    <Container
                        size="md"
                        className="relative py-12 md:px-20 px-8 max-sm:-mt-[calc(50vh/2)] -mt-[calc(50vh/3)] mb-8 bg-[#F9F8F2] dark:bg-dark-500 rounded-lg shadow-dark-z">
                        <header className="mb-12 flex flex-col items-center gap-8">
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

                        <div className="prose dark:prose-invert max-w-none">
                            <PortableText value={body!} components={ptComponents} />
                        </div>
                    </Container>
                    <Container size="md" className="relative px-0">
                        <ShareButtons post={post} url={url} />
                        <BlogNavigation previousPost={previousPost} nextPost={nextPost} />
                        <QuotesIcon size={36} color="currentColor" className="z-20" />
                    </Container>
                </article>
            </AppShellMain>
        </>
    );
}
