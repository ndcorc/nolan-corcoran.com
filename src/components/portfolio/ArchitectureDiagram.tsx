// src/components/portfolio/ArchitectureDiagram.tsx
'use client';

import { Title } from '@mantine/core';
import Mermaid from '@/components/shared/Mermaid';

interface ArchitectureDiagramProps {
    title?: string;
    diagram: string;
}

export default function ArchitectureDiagram({ title, diagram }: ArchitectureDiagramProps) {
    return (
        <div className="my-8">
            {title && (
                <Title order={3} className="mb-4 font-serif text-center">
                    {title}
                </Title>
            )}
            <div className="p-6 rounded-xl bg-[#FFF]/40 dark:bg-dark/80 border border-white-300 dark:border-dark-500 shadow-dark-md dark:shadow-dark-z max-lg:overflow-scroll">
                <Mermaid chart={diagram} />
            </div>
        </div>
    );
}
