import { useSearchParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { courses, Course } from '../data/courses';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

export function Search() {
  const { language } = useAuth();
  const t = getAppT(language);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Course[]>([]);
  const [relatedSearches, setRelatedSearches] = useState<string[]>([]);

  useEffect(() => {
    if (query) {
      // Filter courses based on search query
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.instructor.toLowerCase().includes(query.toLowerCase()) ||
          course.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          course.category.some((cat) => cat.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);

      // Generate related searches
      const related: string[] = [];
      filtered.forEach((course) => {
        if (!related.includes(course.title) && related.length < 10) {
          related.push(course.title);
        }
        course.category.forEach((cat) => {
          const searchTerm = `${query} ${cat}`;
          if (!related.includes(searchTerm) && related.length < 10) {
            related.push(searchTerm);
          }
        });
      });
      setRelatedSearches(related.slice(0, 10));
    } else {
      setResults([]);
      setRelatedSearches([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-black pt-24 px-4 md:px-12">
      {/* Related Searches */}
      {relatedSearches.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-3">
            {t.searchExplore}{' '}
            {relatedSearches.map((term, index) => (
              <span key={index}>
                <Link
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {term}
                </Link>
                {index < relatedSearches.length - 1 && (
                  <span className="text-gray-600"> | </span>
                )}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Search Results Grid */}
      {results.length > 0 ? (
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
              {/* Top gradient */}
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/80 to-transparent" />
              {/* New Season / Coming Soon badges */}
              {course.isNew && (
                <div className="absolute bottom-2 left-2 flex gap-1">
                  <span className="px-2 py-0.5 bg-[#E50914] text-white text-xs font-bold rounded">
                    {t.searchNewSeason}
                  </span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div>
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 text-xs">{course.instructor}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-2">
            {t.searchNoResults}
          </p>
          <p className="text-gray-500 text-sm">{t.searchSuggestions}</p>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Enter a search term to find courses</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-20 mb-10 pt-8 border-t border-white/[0.06]">
        <span className="text-white font-black text-lg tracking-tight">BRIGHTMIND</span>
      </div>
    </div>
  );
}
