// src/app/quotes/page.tsx
import Loading from '@/components/shared/Loading';
import QuotesContent from '@/components/quotes/QuotesContext';
import { createPageMetadata } from '@/lib/config/metadata';
import { Suspense } from 'react';

export const metadata = createPageMetadata({
    title: 'Quotes',
    description: 'A collection of inspiring and thought-provoking quotes from various authors and sources.',
    path: '/quotes',
    ogImageAlt: 'Every Thought Captive Quotes'
});

export default function QuotesPage() {
    return (
        <Suspense fallback={<Loading />}>
            <QuotesContent />
        </Suspense>
    );
}
