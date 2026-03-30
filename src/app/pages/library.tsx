import { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CourseCard } from '../components/course-card';
import { CategoryIcon } from '../components/category-icon';
import { courses, categories } from '../data/courses';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'] as const;
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
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categoryMap: Record<string, string> = {
    food: 'Food', arts: 'Arts & Entertainment', music: 'Music', writing: 'Writing',
    sports: 'Sports & Gaming', design: 'Design & Style', business: 'Business',
    tech: 'Science & Tech', lifestyle: 'Home & Lifestyle',
  };

  let filtered = selectedCategory === 'all'
    ? courses
    : courses.filter(c => c.category.some(cat => cat.includes(categoryMap[selectedCategory])));

  if (selectedLevel !== 'All Levels') {
    filtered = filtered.filter(c => c.level === selectedLevel);
  }

  if (selectedDuration !== 'all') {
    filtered = filtered.filter(c => {
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
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.category.some(cat => cat.toLowerCase().includes(q))
    );
  }

  const activeFilters = (selectedLevel !== 'All Levels' ? 1 : 0) + (selectedDuration !== 'all' ? 1 : 0);

  const clearAll = () => {
    setSelectedCategory('all');
    setSelectedLevel('All Levels');
    setSelectedDuration('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Categories — red active, like my-progress style */}
      <div className="px-4 md:px-12 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#E50914] border-[#E50914] text-white'
                  : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white'
              }`}
            >
              <CategoryIcon
                iconName={cat.icon}
                className={`w-4 h-4 ${selectedCategory === cat.id ? 'text-white' : 'text-white/40'}`}
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
              {/* Level */}
              <div>
                <p className="text-white text-sm font-bold mb-3">დონე</p>
                <div className="space-y-0.5">
                  {LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                        selectedLevel === level
                          ? 'bg-white/[0.08] text-white font-semibold'
                          : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <p className="text-white text-sm font-bold mb-3">ხანგრძლივობა</p>
                <div className="space-y-0.5">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur.id}
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                        selectedDuration === dur.id
                          ? 'bg-white/[0.08] text-white font-semibold'
                          : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilters > 0 && (
                <button onClick={clearAll} className="text-[#E50914] text-xs font-semibold hover:underline">
                  ფილტრების გასუფთავება
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Search + mobile filter — above grid */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="კურსის ძებნა..."
                  className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 rounded text-white placeholder-white/30 focus:outline-none focus:border-white/25 text-sm"
                />
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-white/10 rounded text-white/70 text-sm hover:bg-white/[0.04]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {activeFilters > 0 && <span className="text-[#E50914] font-bold">{activeFilters}</span>}
              </button>
            </div>

            {/* Mobile filters */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6 p-4 bg-white/[0.02] border border-white/[0.06] rounded space-y-6">
                <div>
                  <p className="text-white text-sm font-bold mb-2">დონე</p>
                  <div className="flex flex-wrap gap-2">
                    {LEVELS.map((level) => (
                      <button key={level} onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-1.5 rounded text-xs transition-all ${selectedLevel === level ? 'bg-white text-black font-semibold' : 'border border-white/10 text-white/50'}`}>
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white text-sm font-bold mb-2">ხანგრძლივობა</p>
                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map((dur) => (
                      <button key={dur.id} onClick={() => setSelectedDuration(dur.id)}
                        className={`px-3 py-1.5 rounded text-xs transition-all ${selectedDuration === dur.id ? 'bg-white text-black font-semibold' : 'border border-white/10 text-white/50'}`}>
                        {dur.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active filter tags */}
            {activeFilters > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {selectedLevel !== 'All Levels' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.06] rounded text-white text-xs">
                    {selectedLevel}
                    <X className="w-3 h-3 cursor-pointer hover:text-[#E50914]" onClick={() => setSelectedLevel('All Levels')} />
                  </span>
                )}
                {selectedDuration !== 'all' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.06] rounded text-white text-xs">
                    {DURATIONS.find(d => d.id === selectedDuration)?.label}
                    <X className="w-3 h-3 cursor-pointer hover:text-[#E50914]" onClick={() => setSelectedDuration('all')} />
                  </span>
                )}
              </div>
            )}

            {/* Results */}
            <p className="text-white/40 text-xs mb-4">{filtered.length} კურსი</p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-white/70 text-sm mb-2">{t.libNoResults}</p>
                <button onClick={clearAll} className="text-[#E50914] text-sm font-semibold hover:underline">
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
