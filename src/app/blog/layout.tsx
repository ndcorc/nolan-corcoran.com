// src/app/(blog)/layout.tsx

import { DisableDraftMode } from '@/components/shared/DisableDraftMode';
import SanityPreview from '@/components/shared/SanityPreview.server';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            {children}
            <SanityPreview />
            {(await draftMode()).isEnabled && (
                <>
                    <DisableDraftMode />
                    <VisualEditing />
                </>
            )}
        </div>
    );
}
