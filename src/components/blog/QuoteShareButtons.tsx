// src/components/blog/ShareButtons.tsx
'use client';
import { IconBrandX, IconBrandFacebook } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

interface ShareButtonsProps {
    quote: string;
    url: string;
    className: string;
}

export default function QuoteShareButtons({ quote, url, className }: ShareButtonsProps) {
    url = url.replace('http://localhost:3000', 'https://nolan-corcoran.com');

    return (
        <Group justify="flex-end" className={`px-4 pb-2 gap-0 ${className}`}>
            <TwitterShareButton url={url} title={quote}>
                <ActionIcon variant="subtle" className="hover:bg-gray-100 dark:hover:bg-dark-400">
                    <IconBrandX size={20} />
                </ActionIcon>
            </TwitterShareButton>
            <FacebookShareButton url={url}>
                <ActionIcon variant="subtle" className="hover:bg-gray-100 dark:hover:bg-dark-400">
                    <IconBrandFacebook size={20} />
                </ActionIcon>
            </FacebookShareButton>
        </Group>
    );
}
