// src/app/page.tsx
import HomeContent from '@/components/home/HomeContent';
import Loading from '@/components/shared/Loading';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Nolan Corcoran | Every Thought Captive',
    description: 'Theology, Culture, and Cloud Engineering',
    openGraph: {
        title: 'Every Thought Captive',
        description: 'Theology, Culture, and Cloud Engineering',
        url: 'https://nolan-corcoran.com',
        siteName: 'Every Thought Captive',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Nolan Corcoran'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Every Thought Captive',
        description: 'Theology, Culture, and Cloud Engineering'
    }
};

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <HomeContent />
        </Suspense>
    );
}
