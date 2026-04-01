import { CourseCardSkeleton } from './course-card-skeleton';

export function CourseRowSkeleton() {
  return (
    <div className="space-y-3 px-4 md:px-12">
      <div className="h-5 bg-white/[0.06] rounded w-40 animate-pulse" />
      <div className="flex gap-2 md:gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-[200px] md:w-[240px] lg:w-[260px] xl:w-[280px] flex-shrink-0">
            <CourseCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
