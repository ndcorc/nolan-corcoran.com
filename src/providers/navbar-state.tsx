// src/providers/navbar-state.tsx
'use client';

import { useDisclosure } from '@mantine/hooks';
import { createContext, useContext, ReactNode } from 'react';

interface NavbarContextType {
    opened: boolean;
    open: () => void;
    toggle: () => void;
    close: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarStateProvider({ children }: { children: ReactNode }) {
    const [opened, { toggle, open, close }] = useDisclosure();

    return <NavbarContext.Provider value={{ opened, toggle, close, open }}>{children}</NavbarContext.Provider>;
}

export function useNavbar() {
    const context = useContext(NavbarContext);
    if (context === undefined) {
        throw new Error('useNavbar must be used within a NavbarStateProvider');
    }
    return context;
}
