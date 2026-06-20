import type { Metadata } from 'next';
import diagramsIndex from '@/data/apologetics/diagrams/index.json';
import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';

interface DiagramLayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Pick<DiagramLayoutProps, 'params'>): Promise<Metadata> {
    const { id } = await params;
    const diagram = diagramsIndex.find((entry) => entry.id === id);

    if (!diagram) {
        return { title: 'Diagram Not Found' };
    }

    return createPageMetadata({
        title: diagram.title,
        description: diagram.description,
        path: `/apologetics/diagrams/${id}`,
        ogImage: siteMetadata.apologeticsOgImage,
        ogImageAlt: diagram.title
    });
}

export default function DiagramLayout({ children }: DiagramLayoutProps) {
    return children;
}
