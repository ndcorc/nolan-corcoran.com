/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/rss.xml/route.ts
import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { createServerSanity } from '@/lib/sanity/sanity.service.server';
import { urlForImage } from '@/lib/sanity/image';
import { toHTML } from '@portabletext/to-html';
import { type PortableTextBlock } from '@portabletext/types';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const customPortableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return '';
        return `<img src="${urlForImage(value).url()}" alt="${value.alt || ''}" />`;
      },
      twoColumnBlock: ({ value }: any) => {
                  try {
                      const { leftColumn, rightColumn } = value;
                      if (!leftColumn || !rightColumn) return '';

                      const leftContent = toHTML(leftColumn, { components: customPortableTextComponents });
                      const rightContent = toHTML(rightColumn, { components: customPortableTextComponents });
                      return `<div class="two-column-block"><div class="left-column">${leftContent}</div><div class="right-column">${rightContent}</div></div>`;
                  } catch (error) {
                      console.error('Error rendering twoColumnBlock:', error);
                      return '';
                  }
              }
    },
    marks: {
      link: ({ children, value }: any) => {
        return `<a href="${value?.href || ''}">${children}</a>`;
      },
    },
  };

export async function GET() {
    try {
        const serverSanity = await createServerSanity();
        const posts = await serverSanity.getFeedPosts();
        
        const feed = new Feed({
          title: "Every Thought Captive",
          description: "Exploring theology, apologetics, culture, and cloud engineering",
          id: "https://nolan-corcoran.com/",
          link: "https://nolan-corcoran.com/",
          language: "en",
          copyright: `All rights reserved ${new Date().getFullYear()}`,
          author: {
            name: "Nolan Corcoran",
            email: "nd.corc@gmail.com",
            link: "https://nolan-corcoran.com"
          },
          feed: "https://nolan-corcoran.com/blog/rss.xml",
          feedLinks: {
            rss2: "https://nolan-corcoran.com/blog/rss.xml"
          }
        });
    
        posts.forEach((post) => {
          const url = `https://nolan-corcoran.com/blog/${post.slug.current}`;
          const categories = post.categories.map(cat => cat.title);
          
          const content = post.body ? 
            toHTML(post.body as PortableTextBlock[], { components: customPortableTextComponents }) : undefined;
    
          feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.excerpt || '',
            content: content,
            author: [{
              name: "Nolan Corcoran",
              email: "nd.corc@gmail.com",
              link: "https://nolan-corcoran.com"
            }],
            date: new Date(post.publishedAt),
            image: post.mainImage ? urlForImage(post.mainImage).url() : undefined,
            category: categories.map(cat => ({ name: cat }))
          });
        });
    
        // Generate RSS feed with XML declaration
        const rssXml = '<?xml version="1.0" encoding="UTF-8"?>\n' + feed.rss2();
    
        return new NextResponse(rssXml, {
          headers: {
            'Content-Type': 'application/rss+xml;charset=UTF-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
          }
        });
      } catch (error) {
        console.error('RSS generation error:', error);
        return new NextResponse('Error generating RSS feed', { status: 500 });
      }
}
