export function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[70vh] bg-white/[0.03] relative">
        <div className="absolute bottom-12 left-4 md:left-12 space-y-4 max-w-3xl">
          <div className="h-10 bg-white/[0.06] rounded w-3/4" />
          <div className="h-6 bg-white/[0.04] rounded w-1/2" />
          <div className="flex gap-4">
            <div className="h-4 bg-white/[0.04] rounded w-20" />
            <div className="h-4 bg-white/[0.04] rounded w-24" />
            <div className="h-4 bg-white/[0.04] rounded w-16" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-10 bg-white/[0.06] rounded w-32" />
            <div className="h-10 bg-white/[0.04] rounded w-28" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/[0.03] rounded p-8 space-y-4">
              <div className="h-6 bg-white/[0.06] rounded w-48" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 bg-white/[0.04] rounded" />
                ))}
              </div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 bg-white/[0.03] rounded" />
            ))}
          </div>
          <div className="space-y-4">
            <div className="aspect-video bg-white/[0.06] rounded" />
            <div className="h-10 bg-white/[0.06] rounded" />
            <div className="h-10 bg-white/[0.04] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
