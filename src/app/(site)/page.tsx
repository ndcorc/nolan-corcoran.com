// src/app/page.tsx
import HomeContent from '@/components/home/HomeContent';
import Loading from '@/components/shared/Loading';
import { createPageMetadata } from '@/lib/config/metadata';
import { Suspense } from 'react';

export const metadata = createPageMetadata({
    title: 'Home',
    absoluteTitle: 'Nolan Corcoran | Every Thought Captive',
    description: 'Theology, Culture, and Cloud Engineering',
    path: '/',
    ogImageAlt: 'Nolan Corcoran'
});

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <HomeContent />
        </Suspense>
    );
}
