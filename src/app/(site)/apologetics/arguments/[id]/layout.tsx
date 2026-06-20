import type { Metadata } from 'next';
import argumentsIndex from '@/data/apologetics/arguments/index.json';
import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';

interface ArgumentLayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Pick<ArgumentLayoutProps, 'params'>): Promise<Metadata> {
    const { id } = await params;
    const argument = argumentsIndex.find((entry) => entry.id === id);

    if (!argument) {
        return { title: 'Argument Not Found' };
    }

    return createPageMetadata({
        title: argument.title,
        description: argument.description,
        path: `/apologetics/arguments/${id}`,
        ogImage: siteMetadata.apologeticsOgImage,
        ogImageAlt: argument.title
    });
}

export default function ArgumentLayout({ children }: ArgumentLayoutProps) {
    return children;
}
