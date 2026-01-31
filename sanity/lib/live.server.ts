// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { apiVersion, dataset, projectId } from '../env';
import { draftMode } from 'next/headers';

const token = process.env.SANITY_API_READ_TOKEN;

export async function createLiveClient() {
    const { isEnabled: isDraftMode } = await draftMode();

    return defineLive({
        client: client.withConfig({
            apiVersion,
            projectId,
            dataset,
            perspective: isDraftMode ? 'previewDrafts' : 'published',
            useCdn: !isDraftMode,
            stega: {
                enabled: isDraftMode,
                studioUrl: '/studio'
            }
        }),
        // Set to false to silence warnings when tokens aren't configured
        // Set actual tokens in production for draft mode support
        serverToken: token || false,
        browserToken: token || false,
    });
}
