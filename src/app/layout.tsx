// src/app/layout.ts
import type { Metadata } from 'next';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import QueryProvider from '@/providers/query-provider';
import MantineThemeProvider from '@/providers/mantine-provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { siteMetadata } from '@/lib/config/metadata';

import '@/styles/globals.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/nprogress/styles.css';

export const metadata: Metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.siteName}`
    },
    description: siteMetadata.description,
    keywords: ['Theology', 'Apologetics', 'Culture', 'Cloud Engineering', 'Christianity', 'Technology'],
    authors: [{ name: 'Nolan Corcoran' }],
    creator: 'Nolan Corcoran',
    publisher: 'Nolan Corcoran',
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    twitter: {
        card: 'summary_large_image',
        creator: siteMetadata.twitterHandle
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
        <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
            <head>
                <ColorSchemeScript nonce="8IBTHwOdqNKAWeKl7plt8g==" defaultColorScheme="light" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className="antialiased min-h-lvh">
                <QueryProvider>
                    <MantineThemeProvider>{children}</MantineThemeProvider>
                </QueryProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
