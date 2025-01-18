// src/data/diagrams.ts

// Portfolio Website Architecture
export const portfolioWebsiteDiagram = `
flowchart TD
    subgraph Client
        Browser[Browser]
    end

    subgraph Frontend
        Next[Next.js App]
        React[React Components]
        Mantine[Mantine UI]
    end

    subgraph CMS
        Sanity[Sanity.io]
        GROQ[GROQ Queries]
    end

    subgraph Deployment
        Vercel[Vercel Platform]
        Edge[Edge Functions]
        CDN[CDN]
    end

    Browser --> CDN
    CDN --> Next
    Next --> React
    React --> Mantine
    Next --> GROQ
    GROQ --> Sanity
    Next --> Edge
`;

// AWS 3-Tier Architecture
export const awsArchitectureDiagram = `
flowchart TD
    subgraph Client
        Browser[Browser]
    end

    subgraph Distribution
        CF[CloudFront]
        R53[Route 53]
    end

    subgraph Application
        ALB[ALB]
        ECS[ECS Containers]
        Lambda[Lambda Functions]
    end

    subgraph EventDriven
        SQS[SQS Queue]
        EB[EventBridge]
    end

    subgraph Storage
        S3[S3 Bucket]
        RDS[(RDS Database)]
    end

    Browser --> R53
    R53 --> CF
    CF --> ALB
    ALB --> ECS
    ECS --> Lambda
    Lambda --> SQS
    SQS --> EB
    ECS --> RDS
    ECS --> S3
`;

// Multi-Platform App Architecture
export const multiPlatformAppDiagram = `
flowchart TD
    subgraph Clients
        Web[Web Admin]
        iOS[iOS App]
        Android[Android App]
    end

    subgraph Backend
        CF[Cloud Functions]
        Auth[Firebase Auth]
        Store[Firestore]
        Storage[Cloud Storage]
    end

    subgraph ML
        Vision[AutoML Vision]
        Models[ML Models]
    end

    Web --> Auth
    iOS --> Auth
    Android --> Auth
    Auth --> CF
    CF --> Store
    CF --> Storage
    CF --> Vision
    Vision --> Models
`;
