// src/app/rss.xml/route.ts
import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { createServerSanity } from '@/lib/sanity/sanity.service.server';
import { urlForImage } from '@/lib/sanity/image';
import { toHTML } from '@portabletext/to-html';

export async function GET() {
    const serverSanity = await createServerSanity();
    const posts = await serverSanity.getFeedPosts();
    
    const feed = new Feed({
        title: "Every Thought Captive",
        description: "Exploring theology, apologetics, culture, and cloud engineering",
        id: "https://nolan-corcoran.com/",
        link: "https://nolan-corcoran.com/",
        language: "en",
        favicon: "https://nolan-corcoran.com/favicon.ico",
        copyright: `All rights reserved ${new Date().getFullYear()}`,
        author: {
            name: "Nolan Corcoran",
            email: "nd.corc@gmail.com",
            link: "https://nolan-corcoran.com"
        }
    });

    posts.forEach((post) => {
        const url = `https://nolan-corcoran.com/blog/${post.slug.current}`;
        const categories = post.categories.map(cat => cat.title);
        
        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.excerpt,
            content: post.body ? toHTML(post.body) : undefined,
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

    return new NextResponse(feed.rss2(), {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}