// src/lib/apologetics/glossaryUtils.tsx
'use client';

import Link from 'next/link';
import type { GlossaryEntry } from '@/types/apologetics';

/**
 * Creates a map of terms/aliases to their glossary entry IDs for efficient lookup.
 * Includes both the main term and any aliases.
 */
export function buildTermMap(glossaryEntries: GlossaryEntry[]): Map<string, string> {
    const termMap = new Map<string, string>();

    for (const entry of glossaryEntries) {
        // Add main term (lowercase for case-insensitive matching)
        termMap.set(entry.term.toLowerCase(), entry.id);

        // Add aliases
        if (entry.aliases) {
            for (const alias of entry.aliases) {
                termMap.set(alias.toLowerCase(), entry.id);
            }
        }
    }

    return termMap;
}

/**
 * Parses text and replaces glossary terms with linked components.
 * Returns an array of React nodes (strings and Link components).
 *
 * @param text - The text to parse
 * @param termMap - Map of term/alias -> glossary ID
 * @param excludeTermId - Optional term ID to exclude from linking (e.g., the current entry's own term)
 */
export function parseTextWithGlossaryLinks(
    text: string,
    termMap: Map<string, string>,
    excludeTermId?: string
): React.ReactNode[] {
    if (!text || termMap.size === 0) {
        return [text];
    }

    // Build a sorted array of terms (longest first to match longer phrases before shorter ones)
    const terms = Array.from(termMap.keys()).sort((a, b) => b.length - a.length);

    // Build regex pattern that matches whole words only
    // Escape special regex characters in terms
    const escapedTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    // Create pattern that matches any of the terms as whole words (case-insensitive)
    const pattern = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');

    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let keyCounter = 0;

    // Track which terms we've already linked to avoid duplicate links
    const linkedTermIds = new Set<string>();

    while ((match = pattern.exec(text)) !== null) {
        const matchedText = match[0];
        const matchedLower = matchedText.toLowerCase();
        const termId = termMap.get(matchedLower);

        // Skip if this is the excluded term or we've already linked to this term
        if (!termId || termId === excludeTermId || linkedTermIds.has(termId)) {
            continue;
        }

        // Add text before the match
        if (match.index > lastIndex) {
            result.push(text.slice(lastIndex, match.index));
        }

        // Add the linked term
        linkedTermIds.add(termId);
        result.push(
            <Link
                key={`term-${keyCounter++}`}
                href={`/apologetics/glossary#${termId}`}
                style={{
                    color: 'var(--apologetics-primary)',
                    textDecoration: 'underline',
                    textDecorationStyle: 'dotted',
                    textUnderlineOffset: '2px'
                }}>
                {matchedText}
            </Link>
        );

        lastIndex = match.index + matchedText.length;
    }

    // Add any remaining text after the last match
    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    // If no matches were found, return original text
    if (result.length === 0) {
        return [text];
    }

    return result;
}
