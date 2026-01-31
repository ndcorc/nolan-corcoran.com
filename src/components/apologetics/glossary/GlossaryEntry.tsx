// src/components/apologetics/glossary/GlossaryEntry.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Box, Text, Group, Badge } from '@mantine/core';
import Link from 'next/link';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { TermTooltip } from '@/components/apologetics/common/TermTooltip';
import type { GlossaryEntry as GlossaryEntryType } from '@/types/apologetics';

interface GlossaryEntryProps {
    entry: GlossaryEntryType;
    isHighlighted?: boolean;
    depth?: number;
    showTooltips?: boolean;
}

interface GlossaryTermData {
    term: string;
    definition: string;
}

/**
 * Parses text and replaces glossary terms with linked components.
 * Returns an array of React nodes (strings and Link components).
 * If glossaryData is provided, wraps links with tooltips.
 */
function parseTextWithGlossaryLinks(
    text: string,
    termMap: Map<string, string>,
    excludeTermId?: string,
    glossaryData?: Map<string, GlossaryTermData>
): React.ReactNode[] {
    if (!text || termMap.size === 0) {
        return [text];
    }

    // Build a sorted array of terms (longest first to match longer phrases before shorter ones)
    const terms = Array.from(termMap.keys()).sort((a, b) => b.length - a.length);

    // Build regex pattern that matches whole words only
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

        const linkElement = (
            <Link
                key={`term-${keyCounter}`}
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

        // Wrap with tooltip if glossary data is provided
        if (glossaryData) {
            const termData = glossaryData.get(termId);
            if (termData) {
                result.push(
                    <TermTooltip
                        key={`tooltip-${keyCounter++}`}
                        term={termData.term}
                        definition={termData.definition}
                        termId={termId}>
                        {linkElement}
                    </TermTooltip>
                );
            } else {
                result.push(linkElement);
                keyCounter++;
            }
        } else {
            result.push(linkElement);
            keyCounter++;
        }

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

export function GlossaryEntry({ entry, isHighlighted, depth = 0, showTooltips = false }: GlossaryEntryProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { glossaryTermMap, glossaryList } = useApologetics();

    // Scroll into view when highlighted
    useEffect(() => {
        if (isHighlighted && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isHighlighted]);

    // Build glossary data map for tooltips if needed
    const glossaryData: Map<string, GlossaryTermData> | undefined = showTooltips
        ? new Map(
              glossaryList.map((term) => [
                  term.id,
                  { term: term.term, definition: term.definition }
              ])
          )
        : undefined;

    // Parse the description text to auto-link glossary terms
    const descriptionText = entry.fullDescription || entry.definition;
    const parsedDescription = parseTextWithGlossaryLinks(descriptionText, glossaryTermMap, entry.id, glossaryData);

    return (
        <Box
            ref={ref}
            id={entry.id}
            py="sm"
            className="scroll-mt-20"
            style={{
                marginLeft: depth > 0 ? `${depth * 16}px` : undefined,
                borderBottom: '1px solid var(--mantine-color-default-border)',
                backgroundColor: isHighlighted ? 'var(--mantine-color-default-hover)' : undefined,
                borderRadius: isHighlighted ? 'var(--mantine-radius-md)' : undefined,
                padding: isHighlighted ? 'var(--mantine-spacing-sm) var(--mantine-spacing-md)' : undefined
            }}>
            <Group gap="xs" align="baseline" wrap="wrap">
                <Text fw={600} style={{ fontSize: depth === 0 ? '18px' : '16px' }}>
                    {entry.term}
                </Text>

                {entry.aliases && entry.aliases.length > 0 && (
                    <Text style={{ fontSize: '14px' }} c="dimmed" fs="italic">
                        ({entry.aliases.join(', ')})
                    </Text>
                )}

                {entry.category && (
                    <Badge
                        size="xs"
                        variant="light"
                        tt="capitalize"
                        radius="xs"
                        style={{
                            fontSize: '14px',
                            backgroundColor: 'var(--apologetics-badge-bg)'
                        }}>
                        {entry.category}
                    </Badge>
                )}
            </Group>

            <Text c="dimmed" mt={4} style={{ lineHeight: 1.6, fontSize: '16px' }}>
                {parsedDescription}
            </Text>

            {entry.scriptureReferences && entry.scriptureReferences.length > 0 && (
                <Text style={{ fontSize: '16px' }} c="dimmed" mt={6}>
                    <Text component="span" fw={500}>
                        Scripture:{' '}
                    </Text>
                    {entry.scriptureReferences.join('; ')}
                </Text>
            )}
        </Box>
    );
}
