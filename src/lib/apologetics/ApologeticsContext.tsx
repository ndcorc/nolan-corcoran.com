// src/lib/apologetics/ApologeticsContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import type { GlossaryEntry, GlossaryMap, DiagramMeta, ArgumentMeta } from '@/types/apologetics';
import glossaryData from '@/data/apologetics/glossary.json';
import diagramsIndex from '@/data/apologetics/diagrams/index.json';
import argumentsIndex from '@/data/apologetics/arguments/index.json';
import { buildTermMap } from './glossaryUtils';

interface ApologeticsContextType {
    // Glossary
    glossary: GlossaryMap;
    glossaryList: GlossaryEntry[];
    glossaryTermMap: Map<string, string>;
    getGlossaryTerm: (id: string) => GlossaryEntry | undefined;
    findTermByName: (name: string) => GlossaryEntry | undefined;

    // Diagrams & Arguments metadata
    diagrams: DiagramMeta[];
    arguments: ArgumentMeta[];

    // Search
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (open: boolean) => void;

    // Sidebar sections expansion
    isDiagramsOpen: boolean;
    setIsDiagramsOpen: (open: boolean) => void;
    isArgumentsOpen: boolean;
    setIsArgumentsOpen: (open: boolean) => void;
}

const ApologeticsContext = createContext<ApologeticsContextType | undefined>(undefined);

export function ApologeticsProvider({ children }: { children: ReactNode }) {
    // Glossary
    const glossary: GlossaryMap = glossaryData as GlossaryMap;
    const glossaryList = useMemo(() => Object.values(glossary), [glossary]);

    // Build term map for auto-linking (memoized)
    const glossaryTermMap = useMemo(() => buildTermMap(glossaryList), [glossaryList]);

    const getGlossaryTerm = useCallback((id: string) => glossary[id], [glossary]);

    const findTermByName = useCallback(
        (name: string): GlossaryEntry | undefined => {
            const normalized = name.toLowerCase().trim();
            return glossaryList.find(
                (entry) =>
                    entry.term.toLowerCase() === normalized ||
                    entry.aliases?.some((alias) => alias.toLowerCase() === normalized)
            );
        },
        [glossaryList]
    );

    // Diagrams & Arguments
    const diagrams: DiagramMeta[] = diagramsIndex as DiagramMeta[];
    const argumentsList: ArgumentMeta[] = argumentsIndex as ArgumentMeta[];

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Sidebar section states
    const [isDiagramsOpen, setIsDiagramsOpen] = useState(true);
    const [isArgumentsOpen, setIsArgumentsOpen] = useState(false);

    // Keyboard shortcut for search (Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <ApologeticsContext.Provider
            value={{
                glossary,
                glossaryList,
                glossaryTermMap,
                getGlossaryTerm,
                findTermByName,
                diagrams,
                arguments: argumentsList,
                searchQuery,
                setSearchQuery,
                isSearchOpen,
                setIsSearchOpen,
                isDiagramsOpen,
                setIsDiagramsOpen,
                isArgumentsOpen,
                setIsArgumentsOpen
            }}>
            {children}
        </ApologeticsContext.Provider>
    );
}

export function useApologetics() {
    const context = useContext(ApologeticsContext);
    if (!context) {
        throw new Error('useApologetics must be used within an ApologeticsProvider');
    }
    return context;
}
