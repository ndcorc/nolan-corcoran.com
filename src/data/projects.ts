// src/data/projects.ts
import { Project } from '@/types/portfolio';

export const projects: Project[] = [
    {
        id: 'portfolio-website',
        title: 'Personal Blog & Portfolio Platform',
        description:
            'A modern, responsive portfolio and blog platform built with Next.js 15 and Mantine UI. Features include dark/light mode, responsive design, CMS integration, and SEO optimization.',
        company: 'Personal Project',
        period: '2024',
        type: 'full-stack',
        image: '/img/blog-portfolio.png',
        featured: true,
        techStack: [
            {
                category: 'Frontend',
                items: ['Next.js 15', 'React', 'TypeScript', 'Mantine UI', 'TailwindCSS', 'Framer Motion']
            },
            {
                category: 'Backend & CMS',
                items: ['Sanity.io', 'GROQ', 'Server Components']
            },
            {
                category: 'Deployment & Infrastructure',
                items: ['Vercel', 'CDN', 'Edge Functions']
            },
            {
                category: 'Development Tools',
                items: ['Turbopack', 'ESLint', 'Prettier']
            }
        ],
        links: [
            {
                type: 'github',
                url: 'https://github.com/ndcorc/nolan-corcoran.com'
            },
            {
                type: 'demo',
                url: 'https://nolan-corcoran.com'
            },
            {
                type: 'case-study',
                url: '/portfolio/portfolio-website'
            }
        ]
    },
    {
        id: 'retail-ar',
        title: 'Retail AR Product Detection',
        description:
            'An innovative retail solution featuring real-time product detection with AR interactivity, adopted by a major retail store. The application leverages computer vision and AR technology for an enhanced shopping experience.',
        company: 'Oracle',
        period: '2019',
        type: 'full-stack',
        image: '/img/retail-app.png', // Add your image
        featured: true,
        techStack: [
            {
                category: 'Frontend',
                items: ['React Native', 'AR Kit', 'AR Core']
            },
            {
                category: 'Backend',
                items: ['Oracle Cloud Functions', 'RESTful APIs']
            },
            {
                category: 'AI/ML',
                items: ['Oracle Vision AI', 'Real-time Detection']
            },
            {
                category: 'Cloud',
                items: ['OCI', 'Object Storage', 'API Gateway']
            }
        ],
        links: [
            {
                type: 'github',
                url: 'https://github.com/ndcorc/retail-app'
            },
            {
                type: 'demo',
                url: 'https://drive.google.com/file/d/1AzOBsd33tZUzuQWIfiL-3hD_QvmZPA4n/view?usp=sharing'
            },
            {
                type: 'case-study',
                url: '/portfolio/retail-ar' // Updated URL
            }
        ],
        archImage: '/img/retail-arch.png'
    },
    {
        id: 'multi-platform-app',
        title: 'Multi-Platform Role-Based Application',
        description:
            'A comprehensive platform featuring web admin interface and mobile applications with role-based access control, leveraging cloud services for scalable performance and machine learning capabilities.',
        company: 'Seth Cooper',
        period: '2021-2022',
        type: 'full-stack',
        image: '/projects/multi-platform.jpg', // Add your image
        featured: true,
        techStack: [
            {
                category: 'Frontend',
                items: ['React', 'Flutter', 'iOS', 'Android']
            },
            {
                category: 'Backend',
                items: ['Cloud Functions', 'Firestore']
            },
            {
                category: 'ML/AI',
                items: ['AutoML Vision', 'Image Processing']
            },
            {
                category: 'Authentication',
                items: ['Identity Platform', 'Firebase Auth']
            }
        ],
        links: [
            {
                type: 'github',
                url: 'https://github.com/yourusername/project'
            },
            {
                type: 'case-study',
                url: '/portfolio/multi-platform-app' // Updated URL
            }
        ]
    },
    {
        id: 'aws-architecture',
        title: 'Enterprise AWS Architecture',
        description:
            'Designed and implemented a scalable 3-tier AWS architecture with automated deployments, secure access controls, and event-driven workflows.',
        company: 'Prominent',
        period: '2023-2024',
        type: 'cloud-architecture',
        image: '/projects/aws-arch.jpg', // Add your image
        featured: true,
        techStack: [
            {
                category: 'IaC',
                items: ['CloudFormation', 'AWS CDK']
            },
            {
                category: 'CI/CD',
                items: ['GitLab', 'GitHub Actions']
            },
            {
                category: 'Services',
                items: ['Lambda', 'EventBridge', 'SQS', 'S3']
            },
            {
                category: 'Database',
                items: ['RDS', 'PostgreSQL', 'MySQL']
            }
        ],
        links: [
            {
                type: 'case-study',
                url: '/portfolio/aws-architecture'
            }
        ]
    }
    // Add more projects...
];
