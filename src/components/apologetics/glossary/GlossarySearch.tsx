// src/components/apologetics/glossary/GlossarySearch.tsx
'use client';

import { TextInput, CloseButton } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface GlossarySearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function GlossarySearch({ value, onChange }: GlossarySearchProps) {
    return (
        <TextInput
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Filter glossary terms..."
            leftSection={<IconSearch size={16} />}
            rightSection={
                value ? (
                    <CloseButton size="sm" onClick={() => onChange('')} aria-label="Clear search" />
                ) : undefined
            }
            size="md"
        />
    );
}
