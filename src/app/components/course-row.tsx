import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Course } from '../data/courses';
import { CourseCard } from './course-card';

interface CourseRowProps {
  title: string;
  courses: Course[];
}

export function CourseRow({ title, courses }: CourseRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === 'left'
          ? rowRef.current.scrollLeft - scrollAmount
          : rowRef.current.scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(() => {
        if (rowRef.current) {
          setShowLeftArrow(rowRef.current.scrollLeft > 0);
          setShowRightArrow(
            rowRef.current.scrollLeft <
              rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
          );
        }
      }, 300);
    }
  };

  if (courses.length === 0) return null;

  return (
    <div className="space-y-3 px-4 md:px-12">
      <h2 className="text-base md:text-lg font-bold text-white">{title}</h2>
      <div className="relative group/row">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-14 md:w-20 bg-gradient-to-r from-black via-black/95 to-transparent flex items-center justify-start pl-2 md:pl-3 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/90 border-2 border-white/30 flex items-center justify-center hover:bg-black hover:border-white/50 hover:scale-110 transition-all shadow-xl">
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white rotate-180" />
            </div>
          </button>
        )}

        {/* Course Grid */}
        <div
          ref={rowRef}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => (
            <div key={course.id} className="w-[200px] md:w-[240px] lg:w-[260px] xl:w-[280px] flex-shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-14 md:w-20 bg-gradient-to-l from-black via-black/95 to-transparent flex items-center justify-end pr-2 md:pr-3 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/90 border-2 border-white/30 flex items-center justify-center hover:bg-black hover:border-white/50 hover:scale-110 transition-all shadow-xl">
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}