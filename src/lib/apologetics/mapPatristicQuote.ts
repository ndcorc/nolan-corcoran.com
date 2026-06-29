import { canonicalizePatristicSubtopics } from '@/lib/apologetics/canonicalizePatristicSubtopics';
import { normalizePatristicQuoteText } from '@/lib/apologetics/patristicQuoteText';
import { resolvePatristicEra } from '@/lib/apologetics/patristicQuotesEras';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';
import type { SanityPatristicQuote } from '@/types/sanity';

export function mapSanityPatristicQuote(doc: SanityPatristicQuote): PatristicQuote {
    const rawSubtopics = doc.subtopics?.length
        ? doc.subtopics
        : doc.subtopic
          ? [doc.subtopic]
          : [];

    const { blocks, plain } = normalizePatristicQuoteText(doc.quoteText);

    return {
        id: doc.legacyId,
        slug: doc.slug.current,
        father: doc.father,
        died: doc.died,
        diedSort: doc.diedSort ?? 0,
        era: resolvePatristicEra(doc.father, doc.era),
        source: doc.sourceWork ?? '',
        ref: doc.sourceRef ?? '',
        quote: plain,
        quoteBlocks: blocks,
        topic: doc.topic,
        subtopics: canonicalizePatristicSubtopics(rawSubtopics),
        position: doc.position ?? '',
        book: doc.book ?? '',
        section: doc.section ?? '',
        notes: doc.notes ?? ''
    };
}

export function mapSanityPatristicQuotes(docs: SanityPatristicQuote[]): PatristicQuote[] {
    return docs.map(mapSanityPatristicQuote);
}
