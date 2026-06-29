import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Box } from '@mantine/core';
import { PatristicQuoteDetail } from '@/components/apologetics/quotes/PatristicQuoteDetail';
import PatristicQuoteJsonLd from '@/components/apologetics/quotes/PatristicQuoteJsonLd';
import { createPageMetadata, siteMetadata } from '@/lib/config/metadata';
import {
    getCachedPatristicQuoteBySlug,
    getCachedRelatedPatristicQuotes
} from '@/lib/sanity/patristicQuotes.cache';
import { client } from '@/../sanity/lib/client';

interface PatristicQuotePageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

function buildQuoteTitle(quote: { father: string; subtopics: string[]; topic: string }) {
    const subject = quote.subtopics[0] || quote.topic;
    return `${quote.father} on ${subject}`;
}

function buildQuoteDescription(quote: {
    father: string;
    quote: string;
    source: string;
    topic: string;
}) {
    const excerpt = quote.quote.length > 120 ? `${quote.quote.slice(0, 117)}…` : quote.quote;
    return `${quote.father} (${quote.source || quote.topic}): "${excerpt}"`;
}

export async function generateMetadata({ params }: PatristicQuotePageProps): Promise<Metadata> {
    const { slug } = await params;
    const quote = await getCachedPatristicQuoteBySlug(slug);

    if (!quote) {
        return { title: 'Quote Not Found' };
    }

    return createPageMetadata({
        title: buildQuoteTitle(quote),
        description: buildQuoteDescription(quote),
        path: `/apologetics/quotes/${quote.slug}`,
        ogImage: siteMetadata.apologeticsOgImage,
        ogImageAlt: `${quote.father} — Patristic Quote`,
        type: 'article',
        tags: [quote.topic, ...quote.subtopics, quote.era, quote.father].filter(Boolean)
    });
}

export async function generateStaticParams() {
    const quotes = await client.fetch<{ slug: { current: string } }[]>(
        `*[_type == "patristicQuote" && defined(slug.current)]{ slug }`
    );

    return quotes.map((quote) => ({
        slug: quote.slug.current
    }));
}

export default async function PatristicQuotePage({ params }: PatristicQuotePageProps) {
    const { slug } = await params;
    const quote = await getCachedPatristicQuoteBySlug(slug);

    if (!quote) {
        redirect('/not-found');
    }

    const relatedQuotes = await getCachedRelatedPatristicQuotes(
        slug,
        quote.father,
        quote.topic,
        quote.subtopics,
        5
    );

    return (
        <>
            <PatristicQuoteJsonLd quote={quote} />
            <Box p={{ base: 'md', md: 'xl' }} maw={900} mx="auto">
                <PatristicQuoteDetail quote={quote} relatedQuotes={relatedQuotes} />
            </Box>
        </>
    );
}
