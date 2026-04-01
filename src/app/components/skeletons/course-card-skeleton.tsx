export function CourseCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-white/[0.06] rounded mb-4" />
      <div className="space-y-2.5 px-1">
        <div className="flex items-center gap-2">
          <div className="h-2.5 bg-white/[0.06] rounded w-12" />
          <div className="h-2.5 bg-white/[0.04] rounded w-10" />
          <div className="h-2.5 bg-white/[0.04] rounded w-16" />
        </div>
        <div className="h-4 bg-white/[0.06] rounded w-4/5" />
        <div className="h-3 bg-white/[0.04] rounded w-full" />
        <div className="h-3 bg-white/[0.04] rounded w-2/3" />
        <div className="flex items-center gap-4 pt-2">
          <div className="h-3 bg-white/[0.04] rounded w-10" />
          <div className="h-3 bg-white/[0.04] rounded w-16" />
          <div className="h-3 bg-white/[0.04] rounded w-14" />
        </div>
      </div>
    </div>
  );
}
