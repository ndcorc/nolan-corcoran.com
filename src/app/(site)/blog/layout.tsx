// src/app/blog/layout.tsx

import { DisableDraftMode } from '@/components/shared/DisableDraftMode';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';

export default async function BlogLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen">
            {children}
            {(await draftMode()).isEnabled && (
                <>
                    <DisableDraftMode />
                    <VisualEditing />
                </>
            )}
        </div>
    );
}
