import { useSearchParams, Link } from 'react-router';
import { Logo } from '../components/logo';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';
import { useCourses } from '../hooks/use-courses';

export function Search() {
  const { language } = useAuth();
  const t = getAppT(language);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: coursesData, isLoading } = useCourses({ q: query, limit: 20 });
  const results = coursesData?.data || [];

  return (
    <div className="min-h-screen bg-background pt-24 px-4 md:px-12">
      {/* Search Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="animate-pulse aspect-[2/3] bg-surface-raised rounded" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
          {results.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="group relative aspect-[2/3] overflow-hidden rounded"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-overlay/80 to-transparent" />
              {course.isNew && (
                <div className="absolute bottom-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 bg-brand text-white text-xs font-bold rounded-full">
                    {t.searchNewSeason}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-overlay/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div>
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-white/60 text-xs">{course.instructor}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20">
          <p className="text-foreground-subtle text-lg mb-2">{t.searchNoResults}</p>
          <p className="text-foreground-faint text-sm">{t.searchSuggestions}</p>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-foreground-subtle text-lg">{t.progressSearch}</p>
        </div>
      )}

      <div className="mt-20 mb-10 pt-8 border-t border-border-subtle">
        <Logo className="h-6 w-auto" />
      </div>
    </div>
  );
}
