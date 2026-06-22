'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const categories = [
  { value: '', label: 'All Classes' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'strength-training', label: 'Strength' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'hiit', label: 'HIIT' },
  { value: 'pilates', label: 'Pilates' }
];

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  const handleCategoryClick = (categoryValue) => {
    if (categoryValue) {
      router.push(`?category=${encodeURIComponent(categoryValue)}`, { scroll: false });
    } else {
      router.push(`?`, { scroll: false });
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start">
      {categories.map((cat) => {
        const isActive = currentCategory === cat.value;
        return (
          <button
            key={cat.label}
            onClick={() => handleCategoryClick(cat.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all duration-300 ${
              isActive
                ? 'bg-[#22C55E] text-white shadow-md scale-105'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#8FE3B0] hover:text-[#16A34A] shadow-sm hover:shadow'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
