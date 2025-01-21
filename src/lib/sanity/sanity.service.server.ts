// sanity.service.server.ts
import { createLiveClient } from '@/../sanity/lib/live.server';
import { SanityService } from './sanity.service';

// Create an async function to initialize the service
export async function createServerSanity() {
    const { sanityFetch } = await createLiveClient();
    return new SanityService(sanityFetch, true);
}
