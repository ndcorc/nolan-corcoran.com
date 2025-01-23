import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import QueryProvider from '@/providers/query-provider';
import BibleRefTagger from '@/components/shared/BibleRefTagger';
import { NavbarStateProvider } from '@/providers/navbar-state';
import AppShellWrapper from '@/components/layout/AppShellWrapper';
import { Notifications } from '@mantine/notifications';

import '@/styles/globals.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/nprogress/styles.css';
import SanityPreview from '@/components/shared/SanityPreview.server';

// Define default metadata
export const metadata: Metadata = {
    metadataBase: new URL('https://nolan-corcoran.com'),
    title: {
        default: 'Every Thought Captive',
        template: '%s | Every Thought Captive'
    },
    description: 'Exploring theology, apologetics, culture, and cloud engineering.',
    keywords: ['Theology', 'Apologetics', 'Culture', 'Cloud Engineering', 'Christianity', 'Technology'],
    authors: [{ name: 'Nolan Corcoran' }],
    creator: 'Nolan Corcoran',
    publisher: 'Nolan Corcoran',
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    alternates: {
        canonical: '/'
    },
    openGraph: {
        type: 'website',
        siteName: 'Every Thought Captive',
        title: 'Every Thought Captive',
        description: 'Exploring theology, apologetics, culture, and cloud engineering.',
        url: 'https://nolan-corcoran.com',
        locale: 'en_US',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Every Thought Captive'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@nolancorcoran',
        images: '/og-image.jpg' // Add your Twitter card image
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    icons: {
        icon: [{ url: '/icon.ico' }]
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ColorSchemeScript nonce="8IBTHwOdqNKAWeKl7plt8g==" defaultColorScheme="light" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className="antialiased min-h-lvh">
                <SanityPreview />
                <QueryProvider>
                    <MantineProvider theme={theme}>
                        <BibleRefTagger />
                        <Notifications position="top-right" />
                        <NavbarStateProvider>
                            <AppShellWrapper>{children}</AppShellWrapper>
                        </NavbarStateProvider>
                    </MantineProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
