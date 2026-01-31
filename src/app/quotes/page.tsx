// src/app/quotes/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '@/components/shared/Loading';
import QuotesContent from '@/components/quotes/QuotesContext';

export const metadata: Metadata = {
    title: 'Quotes | Every Thought Captive',
    description: 'A collection of inspiring and thought-provoking quotes from various authors and sources.',
    openGraph: {
        title: 'Quotes | Every Thought Captive',
        description: 'A collection of inspiring and thought-provoking quotes from various authors and sources.',
        url: 'https://nolan-corcoran.com/quotes',
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
        title: 'Quotes | Every Thought Captive',
        description: 'A collection of inspiring and thought-provoking quotes from various authors and sources.'
    }
};

export default function QuotesPage() {
    return (
        <Suspense fallback={<Loading />}>
            <QuotesContent />
        </Suspense>
    );
}
