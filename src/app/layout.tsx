import type { Metadata, Viewport } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@/styles/globals.css';
import '@mantine/carousel/styles.css';
import { theme } from '@/theme';
import QueryProvider from '@/providers/query-provider';
import BibleRefTagger from '@/components/shared/BibleRefTagger';
import { NavbarStateProvider } from '@/providers/navbar-state';
import AppShellWrapper from '@/components/layout/AppShellWrapper';

// Define default metadata
export const metadata: Metadata = {
    metadataBase: new URL('https://nolan-corcoran.com'),
    title: {
        default: 'Every Thought Captive',
        template: '%s | Every Thought Captive'
    },
    description: 'Exploring theology, apologetics, culture, and cloud engineering.',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Every Thought Captive'
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#F8F6F4' },
        { media: '(prefers-color-scheme: dark)', color: '#121212' }
    ],
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
                url: '/og-image.jpg', // Add your OG image
                width: 1200,
                height: 630,
                alt: 'Every Thought Captive'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@yourtwitterhandle',
        images: '/twitter-image.jpg' // Add your Twitter card image
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
    other: {
        'apple-mobile-web-app-status-bar-style': 'default'
    }
};

// Define viewport
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#6E0909' },
        { media: '(prefers-color-scheme: dark)', color: '#38BDF8' }
    ],
    width: 'device-width',
    viewportFit: 'cover',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
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
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="theme-color" content="#F8F6F4" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
                />
            </head>
            <body className="antialiased">
                <QueryProvider>
                    <MantineProvider theme={theme}>
                        <BibleRefTagger />
                        <NavbarStateProvider>
                            <AppShellWrapper>{children}</AppShellWrapper>
                        </NavbarStateProvider>
                    </MantineProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
