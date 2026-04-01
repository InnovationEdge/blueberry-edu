export function HeroSkeleton() {
  return (
    <div className="relative h-[85vh] w-full bg-white/[0.03] animate-pulse">
      <div className="absolute bottom-20 left-4 md:left-12 space-y-4 max-w-xl">
        <div className="h-12 bg-white/[0.06] rounded w-3/4" />
        <div className="h-4 bg-white/[0.04] rounded w-full" />
        <div className="h-4 bg-white/[0.04] rounded w-2/3" />
        <div className="flex gap-3 pt-4">
          <div className="h-10 bg-white/[0.08] rounded w-28" />
          <div className="h-10 bg-white/[0.04] rounded w-32" />
        </div>
      </div>
    </div>
  );
}
