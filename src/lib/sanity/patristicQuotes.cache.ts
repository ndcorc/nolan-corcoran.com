import { cache } from 'react';
import { mapSanityPatristicQuote, mapSanityPatristicQuotes } from '@/lib/apologetics/mapPatristicQuote';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';
import { createServerSanity } from './sanity.service.server';

export const getCachedPatristicQuotes = cache(async (): Promise<PatristicQuote[]> => {
    const serverSanity = await createServerSanity();
    const docs = await serverSanity.getAllPatristicQuotes();
    return mapSanityPatristicQuotes(docs);
});

export const getCachedPatristicQuoteBySlug = cache(async (slug: string) => {
    const serverSanity = await createServerSanity();
    const doc = await serverSanity.getPatristicQuoteBySlug(slug);
    return doc ? mapSanityPatristicQuote(doc) : null;
});

export const getCachedRelatedPatristicQuotes = cache(
    async (slug: string, father: string, topic: string, limit: number = 5): Promise<PatristicQuote[]> => {
        const serverSanity = await createServerSanity();
        const docs = await serverSanity.getRelatedPatristicQuotes(slug, father, topic, limit);
        return mapSanityPatristicQuotes(docs);
    }
);

export const getCachedPatristicQuoteSlugs = cache(async () => {
    const serverSanity = await createServerSanity();
    return serverSanity.getPatristicQuoteSlugs();
});
