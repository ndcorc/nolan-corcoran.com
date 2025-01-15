// src/components/layout/Footer.tsx
'use client';

import { AppShellFooter, Container, Group, Text } from '@mantine/core';
import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { animateScroll, scroller } from 'react-scroll';

export default function Footer() {
    const pathname = usePathname();
    const handleHomeClick = (e: React.MouseEvent, path: string) => {
        if (pathname === '/') {
            e.preventDefault();
            if (path === '/') {
                animateScroll.scrollToTop({
                    duration: 800,
                    smooth: true
                });
            } else {
                scroller.scrollTo(path.replace('/#', ''), {
                    duration: 800,
                    smooth: true
                });
            }
            window.history.replaceState(null, '', path);
        }
    };

    if (pathname.startsWith('/studio')) {
        return null;
    }

    return (
        <AppShellFooter className="border-t border-gray-400 dark:border-gray-800 p-4 absolute bottom-0">
            <Container fluid className="h-full">
                <Group justify="space-between" align="center" className="h-full px-4">
                    <Link href="/" className="no-underline" onClick={(e) => handleHomeClick(e, '/')}>
                        <Text className="text-lg font-serif text-brand-500 dark:text-white">Every Thought Captive</Text>
                    </Link>

                    <Group gap="xl" visibleFrom="sm">
                        <Link
                            href="/"
                            className="text-sm text-brand-600 dark:text-white hover:opacity-70 transition-opacity no-underline"
                            onClick={(e) => handleHomeClick(e, '/')}>
                            HOME
                        </Link>
                        <Link
                            href="/#about"
                            className="text-sm text-brand-600 dark:text-white hover:opacity-70 transition-opacity no-underline"
                            onClick={(e) => handleHomeClick(e, '/#about')}>
                            ABOUT
                        </Link>
                        <Link
                            href="/#contact"
                            className="text-sm text-brand-600 dark:text-white hover:opacity-70 transition-opacity no-underline"
                            onClick={(e) => handleHomeClick(e, '/#contact')}>
                            CONTACT
                        </Link>
                        <Link
                            href="/blog"
                            className="text-sm text-brand-600 dark:text-white hover:opacity-70 transition-opacity no-underline">
                            BLOG
                        </Link>
                    </Group>

                    <Group gap="md">
                        {[
                            { icon: IconBrandX, href: 'https://twitter.com' },
                            { icon: IconBrandYoutube, href: 'https://youtube.com' },
                            { icon: IconBrandInstagram, href: 'https://instagram.com' }
                        ].map((social, index) => (
                            <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                                <social.icon
                                    size={20}
                                    className="text-brand-600 dark:text-white hover:opacity-70 transition-opacity"
                                />
                            </Link>
                        ))}
                    </Group>
                </Group>
            </Container>
        </AppShellFooter>
    );
}
