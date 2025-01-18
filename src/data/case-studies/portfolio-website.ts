// src/data/case-studies/portfolio-website.ts
export const portfolioWebsiteContent = {
    challenges: [
        'Creating a seamless dark/light mode experience with consistent branding',
        'Implementing responsive navigation that works across all device sizes',
        'Building a performant blog with CMS integration and SEO optimization',
        'Ensuring fast page loads while maintaining rich content and animations'
    ],

    solutions: [
        {
            title: 'Modern Tech Stack',
            description:
                'Leveraged Next.js 15 with App Router and React Server Components for optimal performance. Used Mantine UI with TailwindCSS for consistent styling and dark mode support.'
        },
        {
            title: 'CMS Integration',
            description:
                'Integrated Sanity.io as a headless CMS for blog content management, with GROQ queries for efficient data fetching and real-time updates.'
        },
        {
            title: 'Performance Optimization',
            description:
                "Implemented image optimization, lazy loading, and edge caching through Vercel's CDN. Used Turbopack for faster development builds."
        },
        {
            title: 'SEO & Accessibility',
            description:
                'Added comprehensive meta tags, structured data, and sitemap generation. Ensured WCAG compliance and responsive design across all devices.'
        }
    ],

    features: [
        'App Router with dynamic routing for blog posts and portfolio items',
        'Server-side rendering for optimal performance and SEO',
        'Dark/light mode with smooth transitions',
        'Responsive navigation with mobile burger menu',
        'Blog platform with CMS integration',
        'Portfolio showcase with case studies',
        'Animation and interaction effects using Framer Motion',
        'Tailwind and Mantine UI for consistent styling',
        'TypeScript for type safety and better development experience'
    ],

    implementation: [
        "Utilized Next.js 15's new App Router for improved routing and layouts",
        'Implemented server components for better performance and SEO',
        'Created reusable components with TypeScript for type safety',
        'Set up Sanity.io schemas and queries for blog content',
        'Configured deployment optimizations in Vercel',
        'Added comprehensive meta tags and structured data'
    ],

    results: [
        'Achieved 90+ scores in all Lighthouse metrics',
        'Sub-second load times for all pages',
        'Seamless content management through Sanity.io',
        'Perfect accessibility and SEO scores',
        'Smooth responsive experience across all devices'
    ]
};
