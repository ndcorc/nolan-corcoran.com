// Create a client component wrapper for AppShell
'use client';

import { useNavbar } from '@/providers/navbar-state';
import { AppShell } from '@mantine/core';
import Header from './Header';
import Footer from './Footer';

export default function AppShellWrapper({ children }: { children: React.ReactNode }) {
    const { opened } = useNavbar();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { desktop: true, mobile: !opened }
            }}
            padding="md"
            className="relative">
            <Header />
            {children}
            <Footer />
        </AppShell>
    );
}
