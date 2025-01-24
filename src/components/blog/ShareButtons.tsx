'use client';
import { Group, Card } from '@mantine/core';
import { IconBrandX, IconBrandFacebook } from '@tabler/icons-react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { Post } from '@/types/sanity';

interface ShareButtonsProps {
    post: Post;
    url: string;
}

const ShareButtons = ({ post, url }: ShareButtonsProps) => {
    return (
        <Group gap="sm" className="mt-0">
            <FacebookShareButton url={url}>
                <Card className="pl-4 py-sm w-[148px] bg-[#F9F8F2] dark:bg-dark-600 hover:shadow-z dark:hover:shadow-dark-z transition-shadow rounded-md shadow-sm text-brand dark:text-stone-50 border border-solid border-dark-100 dark:border-dark-400">
                    <Group gap="xs">
                        <IconBrandFacebook size={20} />
                    </Group>
                </Card>
            </FacebookShareButton>

            <TwitterShareButton url={url} title={post.title}>
                <Card className="pl-4 py-sm w-[148px] bg-[#F9F8F2] dark:bg-dark-600 hover:shadow-z dark:hover:shadow-dark-z transition-shadow rounded-md shadow-sm text-brand dark:text-stone-50 border border-solid border-dark-100 dark:border-dark-400">
                    <Group gap="xs">
                        <IconBrandX size={20} />
                    </Group>
                </Card>
            </TwitterShareButton>
        </Group>
    );
};

export default ShareButtons;
