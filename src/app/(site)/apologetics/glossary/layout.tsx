import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';

export const metadata = createPageMetadata({
    title: 'Glossary',
    description: 'Theological and philosophical terms with definitions and cross-references for Reformed apologetics.',
    path: '/apologetics/glossary',
    ogImage: siteMetadata.apologeticsOgImage,
    ogImageAlt: 'Reformed Apologetics Glossary'
});

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
    return children;
}
