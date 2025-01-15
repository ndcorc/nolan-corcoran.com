// /components/shared/StructuredData.tsx
import { siteMetadata } from '@/lib/config/metadata';

export const generateStructuredData = {
    organization: () => ({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteMetadata.siteName,
        url: siteMetadata.siteUrl,
        logo: `${siteMetadata.siteUrl}/logo.png`,
        sameAs: [
            'https://twitter.com/yourprofile',
            'https://linkedin.com/company/yourcompany'
            // Add other social profiles
        ]
    }),

    breadcrumb: (items: { name: string; item: string }[]) => ({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item
        }))
    })
};
