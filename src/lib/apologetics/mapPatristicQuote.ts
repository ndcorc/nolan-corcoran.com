import type { PatristicQuote } from '@/types/apologetics/patristicQuote';
import type { SanityPatristicQuote } from '@/types/sanity';

export function mapSanityPatristicQuote(doc: SanityPatristicQuote): PatristicQuote {
    return {
        id: doc.legacyId,
        slug: doc.slug.current,
        father: doc.father,
        died: doc.died,
        diedSort: doc.diedSort ?? 0,
        era: doc.era,
        source: doc.sourceWork ?? '',
        ref: doc.sourceRef ?? '',
        quote: doc.quoteText,
        topic: doc.topic,
        subtopic: doc.subtopic ?? '',
        position: doc.position ?? '',
        book: doc.book ?? '',
        section: doc.section ?? '',
        notes: doc.notes ?? ''
    };
}

export function mapSanityPatristicQuotes(docs: SanityPatristicQuote[]): PatristicQuote[] {
    return docs.map(mapSanityPatristicQuote);
}
