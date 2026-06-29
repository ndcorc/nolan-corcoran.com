import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';

export const metadata = createPageMetadata({
    title: 'Quotes',
    description:
        'Patristic and historical quotations from early church fathers and primary sources, indexed from Reformed theological works including William Perkins\'s apologetic writings.',
    path: '/apologetics/quotes',
    ogImage: siteMetadata.apologeticsOgImage,
    ogImageAlt: 'Reformed Apologetics Quotes'
});

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
