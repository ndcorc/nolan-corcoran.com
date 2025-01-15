// src/components/shared/GradientButton.tsx
'use client';

import Link from 'next/link';

interface GradientButtonProps {
    href: string;
    className?: string;
}

export function GradientButton({ href, className = '' }: GradientButtonProps) {
    return (
        <Link
            href={href}
            className={`
				text-[#FFF] hover:text-brand-500 dark:text-white dark:hover:text-navy-500
				inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 
                bg-gradient-to-b from-brand-600 to-brand-300 hover:bg-none hover:border hover:border-brand-500 hover:bg-transparent
				dark:bg-gradient-to-b dark:from-navy-800 dark:to-navy-50 dark:hover:bg-none dark:hover:border dark:hover:border-navy-500 dark:hover:bg-transparent
				${className}
      		`}>
            Read On
            <span className="text-lg">→</span>
        </Link>
    );
}
