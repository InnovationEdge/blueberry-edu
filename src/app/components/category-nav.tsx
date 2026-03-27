import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { categories, Category } from '../data/courses';
import { CategoryIcon } from './category-icon';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(() => {
        if (scrollRef.current) {
          setShowLeftArrow(scrollRef.current.scrollLeft > 0);
          setShowRightArrow(
            scrollRef.current.scrollLeft <
              scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
          );
        }
      }, 300);
    }
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/90 hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/20 hover:border-white/40"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex-shrink-0 px-6 py-4 rounded-xl border-2 transition-all shadow-lg hover:shadow-xl ${
              selectedCategory === category.id
                ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-500 text-white scale-105 shadow-red-500/50'
                : 'bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-900/80'
            }`}
          >
            <div className="flex flex-col items-center gap-2 min-w-[80px]">
              <CategoryIcon iconName={category.icon} className="w-6 h-6" />
              <span className="text-sm font-semibold whitespace-nowrap">{category.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/90 hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/20 hover:border-white/40"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}