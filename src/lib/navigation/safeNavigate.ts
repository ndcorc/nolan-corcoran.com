type AppRouter = {
    push: (href: string, options?: { scroll?: boolean }) => void;
};

function parseHref(href: string) {
    const url = new URL(href, window.location.origin);
    return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        hasHash: url.hash.length > 0
    };
}

export function isCrossPageHashLink(href: string): boolean {
    if (typeof window === 'undefined') return false;
    const { pathname, hasHash } = parseHref(href);
    return hasHash && pathname !== window.location.pathname;
}

/** Full document navigation for cross-page hash links (avoids Next.js 16 App Router bug). */
export function assignHref(href: string): void {
    const { pathname, search, hash } = parseHref(href);
    window.location.assign(`${pathname}${search}${hash}`);
}

/** Navigate without triggering Next.js cross-page hash client routing bugs. */
export function safeNavigate(router: AppRouter, href: string): void {
    const { pathname, search, hash, hasHash } = parseHref(href);
    const currentPath = window.location.pathname;
    const isCrossPage = pathname !== currentPath;

    if (isCrossPage && hasHash) {
        assignHref(href);
        return;
    }

    if (!isCrossPage && hasHash) {
        window.history.pushState(null, '', `${pathname}${search}${hash}`);
        const id = hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    router.push(`${pathname}${search}`);
}

/** Update the URL hash on the current page without App Router dispatch. */
export function replaceHash(hash: string): void {
    const normalized = hash.startsWith('#') ? hash : `#${hash}`;
    window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}${normalized}`
    );
}

/** Use on Link onClick to bypass client routing for cross-page hash hrefs. */
export function handleCrossPageHashClick(e: React.MouseEvent, href: string): boolean {
    if (!isCrossPageHashLink(href)) return false;
    e.preventDefault();
    assignHref(href);
    return true;
}
