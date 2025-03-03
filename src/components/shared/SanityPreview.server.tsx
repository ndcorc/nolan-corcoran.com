// src/components/shared/SanityPreview.server.tsx
import { createLiveClient } from '@/../sanity/lib/live.server';

export default async function SanityPreview() {
    const { SanityLive } = await createLiveClient();
    return <SanityLive />;
}
