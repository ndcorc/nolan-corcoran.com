/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    title: 'Every Thought Captive',
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    plugins: [
        structureTool({ structure }), 
        visionTool({ defaultApiVersion: apiVersion }), 
        presentationTool({
            previewUrl: {
                previewMode: {
                    enable: '/api/draft-mode/enable',
                },
            },
        })
    ],
    document: {
        // prev is the result from previous plugins and thus can be composed
        productionUrl: async (prev, context) => {
          // context includes the client and other details
          const {dataset, document} = context
          //const client = getClient({apiVersion: '2023-05-31'})
    
          if (document._type === 'post') {
            console.log("document", document);
            /* const slug = await client.fetch(
              `*[_type == 'post' && post._id == 'drafts.'+$postId][0].slug.current`,
              {postId: document._id}
            ) */
              const slug = (document as any).slug.current;
            console.log("slug", slug);
    
            const params = new URLSearchParams()
            console.log("params", params);
            params.set('preview', 'true')
            params.set('dataset', dataset)
    
            return `/blog/${slug}`
          }
    
          return prev
        }
    }
});
