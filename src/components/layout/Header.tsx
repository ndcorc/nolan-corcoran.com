'use client';

import { Group, Text, AppShellHeader, Indicator, useMantineColorScheme, Title } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { animateScroll, scroller, Link as ScrollLink, Events, scrollSpy } from 'react-scroll';
import { usePathname, useRouter } from 'next/navigation';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface NavLink {
    href: string;
    label: string;
    isScrollLink?: boolean;
}

const NAVIGATION_LINKS: NavLink[] = [
    { href: '/', label: 'HOME' },
    { href: '/#about', label: 'ABOUT', isScrollLink: true },
    { href: '/#contact', label: 'CONTACT', isScrollLink: true },
    { href: '/blog', label: 'BLOG' }
];

const SCROLL_SETTINGS = {
    duration: 800,
    smooth: true,
    offset: 0
};

export default function Header() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [scroll] = useWindowScroll();
    const router = useRouter();
    const pathname = usePathname();

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [activeLink, setActiveLink] = useState<string | null>(pathname);
    const [isScrolling, setIsScrolling] = useState(false);
    const [mounted, setMounted] = useState(false);

    const toggleColorScheme = useCallback(() => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }, [colorScheme, setColorScheme]);

    const isActive = useCallback((href: string) => activeLink === href, [activeLink]);

    const isDark = useMemo(() => colorScheme === 'dark', [colorScheme]);

    const handleSectionClick = useCallback(
        (section: string) => {
            setActiveLink(section);
            if (pathname !== '/') {
                router.push(section);
                return;
            }

            scroller.scrollTo(section.replace('/#', ''), SCROLL_SETTINGS);
            window.history.replaceState(null, '', section);
        },
        [pathname, router]
    );

    const handleSetActive = useCallback(
        (to: string) => {
            if (isScrolling) return;

            const newPath = `/#${to}`;
            setActiveLink(newPath);
            if (pathname === '/') {
                router.replace(newPath);
            }
        },
        [isScrolling, pathname, router]
    );

    const handleRouteClick = useCallback(
        (e: React.MouseEvent, path: string) => {
            if (!isScrolling) {
                setActiveLink(path);
            }

            if (path === '/' && pathname === '/') {
                e.preventDefault();
                animateScroll.scrollToTop({
                    ...SCROLL_SETTINGS
                });
                window.history.replaceState(null, '', path);
                return;
            }

            router.push(path);
        },
        [isScrolling, pathname, router]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (pathname !== '/') return;

        const hash = window.location.hash.replace('#', '');
        if (hash) {
            setTimeout(() => {
                scroller.scrollTo(hash, SCROLL_SETTINGS);
            }, 100);
        }
    }, [pathname]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash || (pathname === '/' && !isScrolling)) {
            setActiveLink(`/${hash}`);
        }
    }, [pathname, isScrolling]);

    useEffect(() => {
        const handleScrollBegin = () => setIsScrolling(true);
        const handleScrollEnd = () => setIsScrolling(false);

        Events.scrollEvent.register('begin', handleScrollBegin);
        Events.scrollEvent.register('end', handleScrollEnd);
        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    const renderNavLink = useCallback(
        (link: NavLink) => {
            const isDisabled = !isActive(link.href) && hoveredLink !== link.href;

            return (
                <Indicator
                    key={link.href}
                    inline
                    size={8}
                    offset={-6}
                    position="top-center"
                    disabled={isDisabled}
                    color={isDark ? 'gray' : 'brand'}
                    className="cursor-pointer">
                    {link.isScrollLink && pathname === '/' ? (
                        <div
                            className="no-underline font-medium cursor-pointer"
                            onClick={() => handleSectionClick(link.href)}
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}>
                            <ScrollLink
                                to={link.href.replace('/#', '')}
                                spy={false}
                                hashSpy={false}
                                smooth={true}
                                duration={800}
                                onSetActive={() => handleSetActive(link.href.replace('/#', ''))}
                                onClick={() => handleSectionClick(link.href)}
                                ignoreCancelEvents={true}
                                className="no-underline font-medium cursor-pointer">
                                <Text className="text-brand dark:text-gray-400">{link.label}</Text>
                            </ScrollLink>
                        </div>
                    ) : (
                        <Link
                            href={link.href}
                            className="no-underline font-medium"
                            onClick={(e) => handleRouteClick(e, link.href)}
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}>
                            <Text className="text-brand dark:text-gray-400">{link.label}</Text>
                        </Link>
                    )}
                </Indicator>
            );
        },
        [handleRouteClick, handleSectionClick, handleSetActive, hoveredLink, isActive, pathname, isDark]
    );

    if (!mounted) {
        return null; // or return a skeleton/placeholder
    }

    return (
        <AppShellHeader
            withBorder={false}
            className={`pl-2 pr-4 py-4 transition-colors duration-200 ${
                scroll.y > 100 ? 'bg-white dark:bg-dark-600' : 'bg-transparent'
            }`}>
            <Group className="h-full gap-0" align="center">
                <nav className="w-1/3 flex h-full">
                    <Group gap={32} className="pl-4 gap-4">
                        {NAVIGATION_LINKS.map(renderNavLink)}
                    </Group>
                </nav>
                <Link href="/" className="no-underline dark:text-white w-1/3 flex justify-center">
                    <Title
                        className="text-3xl font-bold text-brand dark:text-gray-400"
                        order={1}
                        data-mantine-color-scheme={colorScheme}>
                        Every Thought Captive
                    </Title>
                </Link>
                <div className="w-1/3 flex justify-end pr-4">
                    <DarkModeSwitch
                        checked={colorScheme === 'dark'}
                        onChange={toggleColorScheme}
                        moonColor="#FFF"
                        style={{ textAlign: 'right' }}
                        size={24}
                    />
                </div>
            </Group>
        </AppShellHeader>
    );
}
