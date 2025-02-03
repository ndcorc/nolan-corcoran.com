// src/components/blog/CategoryFilter.tsx
import { Group, Button } from '@mantine/core';
import type { Category } from '@/types/sanity';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (categoryId: string | null) => void;
    className?: string;
}

export default function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
    className
}: CategoryFilterProps) {
    return (
        <Group gap="xs" className={className}>
            <Button variant={selectedCategory === null ? 'filled' : 'light'} onClick={() => onSelectCategory(null)}>
                All
            </Button>
            {categories.map((category) => (
                <Button
                    key={category._id}
                    variant={selectedCategory === category._id ? 'filled' : 'light'}
                    onClick={() => onSelectCategory(category._id)}
                    color={category.color}
                    className={category.title === 'Apologetics' ? 'text-[#6B6042] border-[#6B6042] border-0.5' : ''}>
                    {category.title}
                </Button>
            ))}
        </Group>
    );
}
