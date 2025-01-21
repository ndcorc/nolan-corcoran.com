import { client } from '@/../sanity/lib/client';
import { Fetcher, SanityService } from './sanity.service';

const clientFetcher: Fetcher = async ({ query, params = {} }) => client.fetch(query, params);

export const clientSanity = new SanityService(clientFetcher, false);
