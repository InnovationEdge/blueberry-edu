export function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[70vh] bg-surface relative">
        <div className="absolute bottom-12 left-4 md:left-12 space-y-4 max-w-3xl">
          <div className="h-10 bg-surface-raised rounded w-3/4" />
          <div className="h-6 bg-surface rounded w-1/2" />
          <div className="flex gap-4">
            <div className="h-4 bg-surface rounded w-20" />
            <div className="h-4 bg-surface rounded w-24" />
            <div className="h-4 bg-surface rounded w-16" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-10 bg-surface-raised rounded w-32" />
            <div className="h-10 bg-surface rounded w-28" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface rounded p-8 space-y-4">
              <div className="h-6 bg-surface-raised rounded w-48" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 bg-surface rounded" />
                ))}
              </div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 bg-surface rounded" />
            ))}
          </div>
          <div className="space-y-4">
            <div className="aspect-video bg-surface-raised rounded" />
            <div className="h-10 bg-surface-raised rounded" />
            <div className="h-10 bg-surface rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
