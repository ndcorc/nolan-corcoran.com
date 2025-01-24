// src/app/404/page.tsx
import Loading from '@/components/shared/Loading';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';

export default function NotFound() {
    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
                <p className="text-gray-600 mb-8">{`The page you're looking for doesn't exist or has been moved.`}</p>
                <Button component={Link} href="/" size="lg" variant="filled">
                    Return Home
                </Button>
            </div>
        </Suspense>
    );
}
