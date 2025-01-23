// Create a client component wrapper for AppShell
'use client';

import { useNavbar } from '@/providers/navbar-state';
import { AppShell } from '@mantine/core';
import Header from './Header';
import Footer from './Footer';
import { Suspense, useEffect } from 'react';
import Loading from '../shared/Loading';

export default function AppShellWrapper({ children }: { children: React.ReactNode }) {
    const { opened } = useNavbar();

    useEffect(() => {
        if (opened) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [opened]);

    return (
        <Suspense fallback={<Loading />}>
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
        </Suspense>
    );
}
