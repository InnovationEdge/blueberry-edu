export function CourseCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-surface-raised rounded mb-4" />
      <div className="space-y-2.5 px-1">
        <div className="flex items-center gap-2">
          <div className="h-2.5 bg-surface-raised rounded w-12" />
          <div className="h-2.5 bg-surface rounded w-10" />
          <div className="h-2.5 bg-surface rounded w-16" />
        </div>
        <div className="h-4 bg-surface-raised rounded w-4/5" />
        <div className="h-3 bg-surface rounded w-full" />
        <div className="h-3 bg-surface rounded w-2/3" />
        <div className="flex items-center gap-4 pt-2">
          <div className="h-3 bg-surface rounded w-10" />
          <div className="h-3 bg-surface rounded w-16" />
          <div className="h-3 bg-surface rounded w-14" />
        </div>
      </div>
    </div>
  );
}
