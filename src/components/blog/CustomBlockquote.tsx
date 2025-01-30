// src/components/blog/CustomBlockquote.tsx
'use client';
import { IconQuotes } from '@tabler/icons-react';
import { Center, Blockquote } from '@mantine/core';
import { ReactElement } from 'react';
import QuoteShareButtons from './QuoteShareButtons';

interface CustomBlockquoteProps {
    children: ReactElement[];
    citation?: string;
    currentUrl: string;
    quoteText: string;
}

export default function CustomBlockquote({ children, citation, currentUrl, quoteText }: CustomBlockquoteProps) {
    const icon = <IconQuotes size={32} className="dark:text-white" />;

    return (
        <Center>
            <div className="bg-white dark:bg-dark-500 w-[100%] my-2 rounded-md shadow-dark-md border-l-0 max-sm:my-2 relative">
                <QuoteShareButtons className="top-1 right-0 z-20 absolute" quote={quoteText} url={currentUrl} />
                <Blockquote
                    cite={citation || undefined}
                    icon={icon}
                    iconSize={36}
                    className="border-l-0 pt-10 pb-8 bg-white dark:bg-dark-500"
                    styles={{ cite: { marginTop: '0.5rem' } }}>
                    {children}
                </Blockquote>
            </div>
        </Center>
    );
}
