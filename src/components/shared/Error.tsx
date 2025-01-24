// src/components/shared/Error.tsx
'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Something went wrong!</h1>
                <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Try again
                </button>
            </div>
        </div>
    );
}
