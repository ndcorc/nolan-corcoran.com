import { siteMetadata } from '@/lib/config/metadata';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

interface PatristicQuoteJsonLdProps {
    quote: PatristicQuote;
}

export default function PatristicQuoteJsonLd({ quote }: PatristicQuoteJsonLdProps) {
    const url = `${siteMetadata.siteUrl}/apologetics/quotes/${quote.slug}`;
    const description = quote.quote.length > 160 ? `${quote.quote.slice(0, 157)}…` : quote.quote;

    const quotationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Quotation',
        text: quote.quote,
        description,
        url,
        author: {
            '@type': 'Person',
            name: quote.father
        },
        ...(quote.source
            ? {
                  isPartOf: {
                      '@type': 'CreativeWork',
                      name: quote.source,
                      ...(quote.ref ? { citation: quote.ref } : {})
                  }
              }
            : {}),
        about: quote.topic,
        keywords: [quote.topic, quote.subtopic, quote.era, quote.position, quote.father]
            .filter(Boolean)
            .join(', ')
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteMetadata.siteUrl
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Apologetics Quotes',
                item: `${siteMetadata.siteUrl}/apologetics/quotes`
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: `${quote.father} — ${quote.subtopic || quote.topic}`,
                item: url
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify([quotationSchema, breadcrumbSchema]) }}
        />
    );
}
