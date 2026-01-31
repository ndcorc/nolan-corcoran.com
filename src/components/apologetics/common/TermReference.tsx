// src/components/apologetics/common/TermReference.tsx
'use client';

import React from 'react';
import { Box } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useApologetics } from '@/lib/apologetics/ApologeticsContext';
import { TermTooltip } from './TermTooltip';

interface TermReferenceProps {
    termId: string;
    children?: React.ReactNode;
}

/**
 * TermReference component for diagrams and arguments.
 * - Hover: Shows tooltip with term name, definition, and "Go to definition" link
 * - Click: Navigates directly to glossary entry
 */
export function TermReference({ termId, children }: TermReferenceProps) {
    const { getGlossaryTerm } = useApologetics();
    const router = useRouter();

    const term = getGlossaryTerm(termId);

    if (!term) {
        // If term not found, render children without tooltip/link behavior
        return <Box component="span">{children}</Box>;
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/apologetics/glossary#${termId}`);
    };

    // If children is provided (e.g., a Badge), clone it and add the term text
    const content = children ? (
        <Box component="span" onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-block' }}>
            {typeof children === 'object' && React.isValidElement(children)
                ? React.cloneElement(children as React.ReactElement, {}, term.term)
                : children}
        </Box>
    ) : (
        <Box
            component="a"
            href={`/apologetics/glossary#${termId}`}
            onClick={handleClick}
            className="term-reference"
            style={{
                color: 'var(--apologetics-badge-color)',
                cursor: 'pointer',
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                textUnderlineOffset: '2px'
            }}>
            {term.term}
        </Box>
    );

    return (
        <TermTooltip term={term.term} definition={term.definition} termId={termId}>
            {content}
        </TermTooltip>
    );
}
