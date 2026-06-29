'use client';

import { useCallback, useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { formatPatristicQuoteCitation } from '@/lib/apologetics/formatPatristicQuoteCitation';
import type { PatristicQuote } from '@/types/apologetics/patristicQuote';

interface PatristicQuoteCopyButtonProps {
    quote: PatristicQuote;
}

export function PatristicQuoteCopyButton({ quote }: PatristicQuoteCopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(
        async (event: React.MouseEvent) => {
            event.stopPropagation();

            try {
                await navigator.clipboard.writeText(formatPatristicQuoteCitation(quote));
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
            } catch {
                // Clipboard access can fail in insecure contexts or without permission.
            }
        },
        [quote]
    );

    return (
        <Tooltip label={copied ? 'Copied!' : 'Copy citation'} position="left">
            <ActionIcon
                variant="subtle"
                size="sm"
                color={copied ? 'teal' : 'gray'}
                onClick={handleCopy}
                aria-label="Copy citation to clipboard">
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            </ActionIcon>
        </Tooltip>
    );
}
