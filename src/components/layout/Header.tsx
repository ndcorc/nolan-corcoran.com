// src/components/layout/Header.tsx
'use client';

import {
    Group,
    Text,
    Indicator,
    useMantineColorScheme,
    Title,
    AppShell,
    Burger,
    Menu,
    ScrollArea
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { animateScroll, scroller, Link as ScrollLink, Events, scrollSpy } from 'react-scroll';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useNavbar } from '@/providers/navbar-state';
import Loading from '../shared/Loading';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import useDevice from '@/lib/hooks/useDevice';
import { IconChevronDown } from '@tabler/icons-react';
import { buildApologeticsSubmenu } from '@/lib/apologetics/apologeticsNav';

interface NavLink {
    href: string;
    label: string;
    isScrollLink?: boolean;
    submenu?: NavLink[]; // Add this line to support dropdown menus
}

const NAVIGATION_LINKS: NavLink[] = [
    { href: '/', label: 'HOME' },
    {
        href: '#',
        label: 'ABOUT',
        submenu: [
            { href: '/#about', label: 'ABOUT', isScrollLink: true },
            { href: '/#contact', label: 'CONTACT', isScrollLink: true },
            { href: '/quotes', label: 'QUOTES' }
        ]
    },
    {
        href: '#',
        label: 'BLOG',
        submenu: [
            { href: '/blog', label: 'BLOG' },
            { href: '/portfolio', label: 'PORTFOLIO' }
        ]
    },
    { href: '/apologetics', label: 'APOLOGETICS' }
];

const MOBILE_NAVIGATION_LINKS: NavLink[] = NAVIGATION_LINKS.map((link) =>
    link.href === '/apologetics' ? { ...link, submenu: buildApologeticsSubmenu() } : link
);

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
    const searchParams = useSearchParams();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [activeLink, setActiveLink] = useState<string | null>(pathname);
    const [isScrolling, setIsScrolling] = useState(false);
    const [mounted, setMounted] = useState(false);
    const isActive = useCallback(
        (href: string) => activeLink === href || (href !== '/' && activeLink?.startsWith(href)),
        [activeLink]
    );
    const isDark = useMemo(() => colorScheme === 'dark', [colorScheme]);
    const { opened, toggle, close } = useNavbar();
    const { isMobile } = useDevice();

    const toggleColorScheme = useCallback(() => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }, [colorScheme, setColorScheme]);

    const handleSectionClick = useCallback(
        (section: string) => {
            setActiveLink(section);
            if (pathname !== '/') {
                nprogress.start();
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
                nprogress.start();
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
            nprogress.start();
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
        if (!pathname.includes('#')) {
            setActiveLink(pathname);
        }
    }, [pathname]);

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

    useEffect(() => {
        nprogress.complete();
    }, [pathname, searchParams]);

    const handleLinkClick = (e: React.MouseEvent, href: string, isHash: boolean = false) => {
        setActiveLink(href);

        if (isHash && pathname === '/') {
            e.preventDefault();
            const element = document.querySelector(href.replace('/#', '#'));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', href);
            }
        }
        close();
    };

    const isMobileSubmenuItemActive = useCallback(
        (href: string) => (href === '/apologetics' ? activeLink === href : isActive(href)),
        [activeLink, isActive]
    );

    const renderMobileSubmenuItems = useCallback(
        (items: NavLink[]) =>
            items.map((subItem) => {
                if (subItem.submenu && subItem.submenu.length > 0) {
                    return (
                        <div key={subItem.label} className="mb-1">
                            <Text className="px-3 py-1 text-sm font-medium opacity-80">{subItem.label}</Text>
                            <div className="pl-4">{renderMobileSubmenuItems(subItem.submenu)}</div>
                        </div>
                    );
                }

                return (
                    <Link
                        key={`${subItem.href}-${subItem.label}`}
                        href={subItem.href}
                        onClick={(e) => handleLinkClick(e, subItem.href, subItem.isScrollLink)}
                        className="header-nav-menu-item block w-full px-3 py-2 rounded-md no-underline text-inherit"
                        data-active={isMobileSubmenuItemActive(subItem.href) ? 'true' : undefined}>
                        {subItem.label}
                    </Link>
                );
            }),
        [handleLinkClick, isMobileSubmenuItemActive]
    );

    const renderNavLink = useCallback(
        (link: NavLink) => {
            const isDisabled = !isActive(link.href) && hoveredLink !== link.href;

            // If this is a dropdown menu
            if (link.submenu && link.submenu.length > 0) {
                return (
                    <Menu
                        key={link.label}
                        trigger="hover"
                        openDelay={100}
                        closeDelay={400}
                        position="bottom"
                        offset={10}>
                        <Menu.Target>
                            <div
                                className="no-underline font-medium cursor-pointer"
                                onMouseEnter={() => setHoveredLink(link.href)}
                                onMouseLeave={() => setHoveredLink(null)}>
                                <Group gap={4}>
                                    <Text className="text-brand dark:text-gray-400">{link.label}</Text>
                                    <IconChevronDown size={16} className="text-brand dark:text-gray-400" />
                                </Group>
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown>
                            {link.submenu.map((sublink) => (
                                <Menu.Item
                                    key={sublink.href}
                                    component={Link}
                                    href={sublink.href}
                                    className="header-nav-menu-item rounded-md"
                                    data-active={isActive(sublink.href) ? 'true' : undefined}
                                    onClick={(e) => {
                                        if (sublink.isScrollLink && pathname === '/') {
                                            e.preventDefault();
                                            handleSectionClick(sublink.href);
                                        } else {
                                            handleRouteClick(e, sublink.href);
                                        }
                                        close();
                                    }}>
                                    {sublink.label}
                                </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                );
            }

            // For regular links (non-dropdown)
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
                                <Text className="text-brand dark:text-gray-400 md:text-[16px]">{link.label}</Text>
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
        [handleRouteClick, handleSectionClick, handleSetActive, hoveredLink, isActive, pathname, isDark, close]
    );

    if (!mounted) {
        return <Loading />;
    }

    return (
        <>
            <AppShell.Header
                withBorder={false}
                className={`p-4 transition-colors duration-200 ${scroll.y > 100 ? 'bg-white dark:bg-dark-700' : 'bg-transparent'}`}>
                <NavigationProgress color={isDark ? 'navy' : 'brand'} />
                <Group className="h-full w-full flex gap-0 lg:pl-0 pl-2" align="center" wrap="nowrap">
                    {isMobile && <Burger opened={opened} onClick={toggle} size="sm" />}
                    {!isMobile ? (
                        <>
                            <nav className="w-1/3 flex h-full">
                                <Group className="gap-3" wrap="nowrap">{NAVIGATION_LINKS.map(renderNavLink)}</Group>
                            </nav>
                            <Link href="/" className="no-underline dark:text-white w-1/3 flex justify-center">
                                <Title
                                    className="text-3xl font-bold text-brand dark:text-gray-400 whitespace-nowrap"
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
                        </>
                    ) : (
                        <>
                            <Link href="/" className="no-underline dark:text-white flex justify-center w-full">
                                <Title
                                    className="text-2xl w-full font-bold text-brand dark:text-gray-400 text-center"
                                    order={1}
                                    data-mantine-color-scheme={colorScheme}>
                                    Every Thought Captive
                                </Title>
                            </Link>
                            <div className="flex justify-end pr-0">
                                <DarkModeSwitch
                                    checked={colorScheme === 'dark'}
                                    onChange={toggleColorScheme}
                                    moonColor="#FFF"
                                    style={{ textAlign: 'right' }}
                                    size={24}
                                />
                            </div>
                        </>
                    )}
                </Group>
            </AppShell.Header>
            <AppShell.Navbar py="md" px={4}>
                <AppShell.Section grow component={ScrollArea} type="auto" offsetScrollbars className="min-h-0">
                    <div className="space-y-2">
                    {MOBILE_NAVIGATION_LINKS.map((item) => {
                        // If it's a dropdown menu
                        if (item.submenu && item.submenu.length > 0) {
                            return (
                                <div key={item.label} className="mb-2">
                                    <Text className="px-3 py-2 font-medium">{item.label}</Text>
                                    <div className="pl-4">{renderMobileSubmenuItems(item.submenu)}</div>
                                </div>
                            );
                        }

                        // Otherwise, render a regular link
                        return isActive(item.href) ? (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href, item.isScrollLink)}
                                className={`
                    block w-full px-3 py-2 rounded-md
                    hover:bg-brand-500 dark:hover:bg-navy-500 hover:bg-opacity-10 dark:hover:bg-opacity-20
                    bg-brand-500 dark:bg-navy-500 bg-opacity-10 dark:bg-opacity-20
                    no-underline text-inherit
                `}>
                                {item.label}
                            </Link>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href, item.isScrollLink)}
                                className={`
                    block w-full px-3 py-2 rounded-md font-medium 
                    hover:bg-brand-500 dark:hover:bg-navy-500 hover:bg-opacity-10 dark:hover:bg-opacity-20
                    no-underline text-inherit
                `}>
                                {item.label}
                            </Link>
                        );
                    })}
                    </div>
                </AppShell.Section>
            </AppShell.Navbar>
        </>
    );
}
