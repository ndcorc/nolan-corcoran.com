import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  timeout: 30000,
  stega: { studioUrl: "http://localhost:3000/studio" },
})
