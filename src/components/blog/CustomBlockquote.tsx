// src/components/blog/CustomBlockquote.tsx
'use client';
import { Blockquote } from '@mantine/core';
import { ReactElement } from 'react';
import QuoteShareButtons from './QuoteShareButtons';
import QuotesIcon from './QuotesIcon';

interface CustomBlockquoteProps {
    children: ReactElement[];
    citation?: string;
    currentUrl: string;
    quoteText: string;
}

export default function CustomBlockquote({ children, citation, currentUrl, quoteText }: CustomBlockquoteProps) {
    return (
        <div className="bg-white dark:bg-dark-500 w-[100%] mb-4 rounded-md shadow-dark-md border-l-0 max-sm:mb-2 relative">
            <QuotesIcon
                size={24}
                color="bg-brand dark:bg-stone-50"
                className="absolute top-0 left-1 z-20 bg-transparent"
            />
            <QuotesIcon
                size={24}
                color="bg-brand dark:bg-stone-50"
                className="absolute bottom-0 right-1 z-20 bg-transparent rotate-180"
            />
            <QuoteShareButtons className="top-1 right-0 z-20 absolute" quote={quoteText} url={currentUrl} />
            <Blockquote
                cite={citation || undefined}
                className="border-l-0 pt-9 pb-6 bg-white dark:bg-dark-500"
                styles={{ cite: { marginTop: '0.5rem' } }}>
                {children}
            </Blockquote>
        </div>
    );
}
