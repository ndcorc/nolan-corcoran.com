// src/app/apologetics/page.tsx
import type { Metadata } from 'next';
import { ApologeticsContent } from '@/components/apologetics/ApologeticsContent';

export const metadata: Metadata = {
    title: 'Reformed Apologetics',
    description:
        'Explore interactive diagrams, structured arguments, and a comprehensive glossary for understanding and defending the Reformed faith.',
    openGraph: {
        title: 'Reformed Apologetics | Every Thought Captive',
        description:
            'Explore interactive diagrams, structured arguments, and a comprehensive glossary for understanding and defending the Reformed faith.',
        url: 'https://nolan-corcoran.com/apologetics',
        siteName: 'Every Thought Captive',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/og-apologetics.png',
                width: 1200,
                height: 630,
                alt: 'Reformed Apologetics - Soli Deo Gloria'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Reformed Apologetics | Every Thought Captive',
        description:
            'Explore interactive diagrams, structured arguments, and a comprehensive glossary for understanding and defending the Reformed faith.',
        images: ['/og-apologetics.png']
    }
};

export default function ApologeticsPage() {
    return <ApologeticsContent />;
}
