// src/components/shared/Mermaid.tsx
'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useMantineColorScheme } from '@mantine/core';

interface MermaidProps {
    chart: string;
    className?: string;
}

export default function Mermaid({ chart, className }: MermaidProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: isDark ? 'dark' : 'default',
            sequence: {
                useMaxWidth: false
            },
            flowchart: {
                useMaxWidth: false
            }
        });

        if (ref.current) {
            mermaid.render('mermaid-svg', chart).then(({ svg }) => {
                if (ref.current) {
                    ref.current.innerHTML = svg;
                }
            });
        }
    }, [chart, isDark]);

    return <div ref={ref} className={className} style={{ textAlign: 'center' }} />;
}
