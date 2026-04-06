import { useState } from 'react';
import { ChevronDown, Clock, Globe, ArrowRight, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { LandingHeader } from '../components/landing-header';
import { CourseCardLanding } from '../components/course-card-landing';
import { LANDING_COURSES } from '../data/courses-landing';
import { Logo } from '../components/logo';
import { useAuth } from '../context/auth-context';
import { useTheme } from 'next-themes';

const TRIBES = ['ყველა', 'ინჟინერია', 'დიზაინი', 'მარკეტინგი', 'AI', 'მენეჯმენტი'];

export function CoursesCatalog() {
  const [selectedTribe, setSelectedTribe] = useState('ყველა');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const { openLogin } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const featured = LANDING_COURSES.find(c => c.popular) ?? LANDING_COURSES[0];

  const filtered = LANDING_COURSES.filter(c => selectedTribe === 'ყველა' || c.tribe === selectedTribe);
  const sorted = [...filtered].sort((a, b) => {
    const priceA = typeof a.price === 'string' ? parseInt(a.price) : a.price;
    const priceB = typeof b.price === 'string' ? parseInt(b.price) : b.price;
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Shared header */}
      <LandingHeader activePath="/courses" />

      {/* Spacer for fixed header */}
      <div className="h-[72px]" />

      {/* ═══ FEATURED BANNER — digitaledu.ge style ═══ */}
      <section className="relative bg-gradient-to-r from-[#e8f4fd] to-[#f0f4ff] overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 md:py-16">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{featured.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-5 flex-wrap">
                <span className="font-bold text-2xl text-gray-900">{featured.price}₾</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#004aad]" />{featured.tribe}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.duration}</span>
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{featured.format ?? 'ონლაინ'}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-md">{featured.desc}</p>
              <button
                onClick={() => navigate(`/courses/${featured.id}`)}
                className="px-7 py-3 bg-[#004aad] text-white rounded-lg font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] inline-flex items-center gap-2"
              >
                გაიგე მეტი
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Right — course card preview */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="hidden md:block">
              <div className="relative">
                {/* Most Popular badge */}
                <div className="absolute -top-3 -right-3 z-10 bg-[#ef4444] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5" /> Most Popular
                </div>
                <div className="max-w-[320px] ml-auto">
                  <CourseCardLanding course={featured} onClick={() => navigate(`/courses/${featured.id}`)} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ COURSES CATALOG ═══ */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
          {/* Title + filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">კურსები</h2>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-9 text-sm text-gray-700 cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <option value="popular">პოპულარული</option>
                  <option value="price-asc">ფასი: დაბლიდან</option>
                  <option value="price-desc">ფასი: მაღლიდან</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Tribe filter */}
              <div className="flex items-center gap-2">
                {TRIBES.map((tribe) => (
                  <button
                    key={tribe}
                    onClick={() => setSelectedTribe(tribe)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTribe === tribe
                        ? 'bg-[#004aad] text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {tribe}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course grid — same cards as landing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sorted.map((course, i) => (
              <motion.div
                key={course.id ?? i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <CourseCardLanding course={course} onClick={() => navigate(`/courses/${course.id}`)} />
              </motion.div>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-20 text-foreground-faint">
              <p className="text-lg">ამ კატეგორიაში კურსები ჯერ არ არის</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border-subtle py-10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="academy" className="h-6 w-auto" />
            <div className="flex items-center gap-6 text-sm text-foreground-faint">
              <span>&copy; 2026 Blueberry Academy</span>
              <a href="#" className="hover:text-foreground transition-colors">პირობები</a>
              <a href="#" className="hover:text-foreground transition-colors">კონფიდენციალურობა</a>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:text-foreground transition-colors">
                {theme === 'dark' ? 'ღია თემა' : 'მუქი თემა'}
              </button>
              <button onClick={() => openLogin()} className="hover:text-foreground transition-colors">შესვლა</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
