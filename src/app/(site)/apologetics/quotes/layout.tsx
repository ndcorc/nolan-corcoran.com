import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';

export const metadata = createPageMetadata({
    title: 'Quotes',
    description:
        'Patristic and historical quotations indexed from William Perkins\'s A Forged Catholicism and A Reformed Catholic.',
    path: '/apologetics/quotes',
    ogImage: siteMetadata.apologeticsOgImage,
    ogImageAlt: 'Reformed Apologetics Quotes'
});

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
