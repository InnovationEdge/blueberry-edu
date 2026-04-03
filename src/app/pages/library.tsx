import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CourseCard } from '../components/course-card';
import { CategoryIcon } from '../components/category-icon';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';
import { useCourses, useCategories } from '../hooks/use-courses';

const LEVELS = ['ყველა დონე', 'დამწყები', 'საშუალო', 'მოწინავე'] as const;
const LEVEL_API_MAP: Record<string, string> = {
  'დამწყები': 'BEGINNER',
  'საშუალო': 'INTERMEDIATE',
  'მოწინავე': 'ADVANCED',
};
const DURATIONS = [
  { id: 'all', label: 'ყველა' },
  { id: 'short', label: '< 3 საათი' },
  { id: 'medium', label: '3-6 საათი' },
  { id: 'long', label: '6+ საათი' },
];

export function Library() {
  const { language } = useAuth();
  const t = getAppT(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('ყველა დონე');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: apiCategories = [] } = useCategories();
  const categories = useMemo(() => [
    { id: 'all', name: 'ყველა კატეგორია', slug: 'all', icon: 'layers' },
    ...apiCategories.map(c => ({ ...c, icon: c.slug === 'business' ? 'briefcase' : c.slug === 'technology' ? 'cpu' : c.slug === 'design' ? 'layout' : c.slug === 'marketing' ? 'trending-up' : c.slug === 'photography' ? 'camera' : c.slug === 'music' ? 'music' : c.slug === 'food' ? 'utensils' : c.slug === 'arts-design' ? 'palette' : c.slug === 'data-science' ? 'bar-chart' : c.slug === 'writing' ? 'pen-tool' : 'layers' })),
  ], [apiCategories]);

  const apiParams = useMemo(() => ({
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    level: selectedLevel !== 'ყველა დონე' ? LEVEL_API_MAP[selectedLevel] : undefined,
    limit: 50,
  }), [selectedCategory, selectedLevel]);

  const { data: coursesData, isLoading } = useCourses(apiParams);
  const allCourses = coursesData?.data || [];

  const filtered = useMemo(() => {
    let result = allCourses;

    if (selectedDuration !== 'all') {
      result = result.filter(c => {
        const match = c.duration?.match(/(\d+)h/);
        const hours = match ? parseInt(match[1]) : 0;
        if (selectedDuration === 'short') return hours < 3;
        if (selectedDuration === 'medium') return hours >= 3 && hours <= 6;
        if (selectedDuration === 'long') return hours > 6;
        return true;
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.category.some(cat => cat.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allCourses, selectedDuration, searchQuery]);

  const activeFilters = (selectedLevel !== 'ყველა დონე' ? 1 : 0) + (selectedDuration !== 'all' ? 1 : 0);

  const clearAll = () => {
    setSelectedCategory('all');
    setSelectedLevel('ყველა დონე');
    setSelectedDuration('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      {/* Categories */}
      <div className="px-4 md:px-12 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded border transition-all active:scale-[0.97] ${
                selectedCategory === cat.slug
                  ? 'bg-brand border-brand text-white'
                  : 'bg-transparent border-border-muted text-foreground-subtle hover:border-foreground-faint hover:text-foreground'
              }`}
            >
              <CategoryIcon
                iconName={cat.icon}
                className={`w-4 h-4 ${selectedCategory === cat.slug ? 'text-white' : 'text-foreground-subtle'}`}
              />
              <span className="text-sm font-medium whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar + Grid */}
      <div className="px-4 md:px-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <p className="text-foreground text-sm font-bold mb-3">დონე</p>
                <div className="space-y-0.5">
                  {LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                        selectedLevel === level
                          ? 'bg-surface-hover text-foreground font-semibold'
                          : 'text-foreground-subtle hover:text-foreground hover:bg-surface'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-foreground text-sm font-bold mb-3">ხანგრძლივობა</p>
                <div className="space-y-0.5">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur.id}
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                        selectedDuration === dur.id
                          ? 'bg-surface-hover text-foreground font-semibold'
                          : 'text-foreground-subtle hover:text-foreground hover:bg-surface'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilters > 0 && (
                <button onClick={clearAll} className="text-brand text-xs font-semibold hover:underline">
                  ფილტრების გასუფთავება
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="კურსის ძებნა..."
                  className="w-full pl-9 pr-3 py-2 bg-surface border border-border-muted rounded text-foreground placeholder-foreground-faint focus:outline-none focus:border-foreground-subtle text-sm"
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-border-muted rounded text-foreground-secondary text-sm hover:bg-surface"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFilters > 0 && <span className="text-brand font-bold">{activeFilters}</span>}
              </button>
            </div>

            {showMobileFilters && (
              <div className="lg:hidden mb-6 p-4 bg-surface border border-border-subtle rounded space-y-6">
                <div>
                  <p className="text-foreground text-sm font-bold mb-2">დონე</p>
                  <div className="flex flex-wrap gap-2">
                    {LEVELS.map((level) => (
                      <button key={level} onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-1.5 rounded text-xs transition-all ${selectedLevel === level ? 'bg-foreground text-background font-semibold' : 'border border-border-muted text-foreground-subtle'}`}>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-foreground text-sm font-bold mb-2">ხანგრძლივობა</p>
                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map((dur) => (
                      <button key={dur.id} onClick={() => setSelectedDuration(dur.id)}
                        className={`px-3 py-1.5 rounded text-xs transition-all ${selectedDuration === dur.id ? 'bg-foreground text-background font-semibold' : 'border border-border-muted text-foreground-subtle'}`}>
                        {dur.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeFilters > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {selectedLevel !== 'ყველა დონე' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-raised rounded text-foreground text-xs">
                    {selectedLevel}
                    <X className="w-3 h-3 cursor-pointer hover:text-brand" onClick={() => setSelectedLevel('ყველა დონე')} />
                  </span>
                )}
                {selectedDuration !== 'all' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-raised rounded text-foreground text-xs">
                    {DURATIONS.find(d => d.id === selectedDuration)?.label}
                    <X className="w-3 h-3 cursor-pointer hover:text-brand" onClick={() => setSelectedDuration('all')} />
                  </span>
                )}
              </div>
            )}

            <p className="text-foreground-subtle text-xs mb-4">
              {isLoading ? '...' : `${filtered.length} კურსი`}
            </p>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-surface-raised rounded mb-4" />
                    <div className="h-3 bg-surface-raised rounded w-3/4 mb-2" />
                    <div className="h-3 bg-surface rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-foreground-secondary text-sm mb-2">{t.libNoResults}</p>
                <button onClick={clearAll} className="text-brand text-sm font-semibold hover:underline">
                  ფილტრების გასუფთავება
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
