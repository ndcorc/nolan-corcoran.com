// src/app/apologetics/page.tsx
import { ApologeticsContent } from '@/components/apologetics/ApologeticsContent';
import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';

export const metadata = createPageMetadata({
    title: 'Reformed Apologetics',
    description:
        'Explore interactive diagrams, structured arguments, and a comprehensive glossary for understanding and defending the Reformed faith.',
    path: '/apologetics',
    ogImage: siteMetadata.apologeticsOgImage,
    ogImageAlt: 'Reformed Apologetics - Soli Deo Gloria'
});

export default function ApologeticsPage() {
    return <ApologeticsContent />;
}
