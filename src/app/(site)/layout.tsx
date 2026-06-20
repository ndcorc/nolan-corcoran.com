import AppShellWrapper from '@/components/layout/AppShellWrapper';
import SanityPreview from '@/components/shared/SanityPreview.server';
import { NavbarStateProvider } from '@/providers/navbar-state';

export default function SiteLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SanityPreview />
            <NavbarStateProvider>
                <AppShellWrapper>{children}</AppShellWrapper>
            </NavbarStateProvider>
        </>
    );
}
