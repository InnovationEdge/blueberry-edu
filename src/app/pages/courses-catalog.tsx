import { useState } from 'react';
import { ChevronDown, Clock, Globe, ArrowRight, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '../components/logo';
import { useNavigate } from 'react-router';

/* ─── Course data ─── */
const ALL_COURSES = [
  { id: 1, title: 'React Native', desc: 'მობილური აპლიკაციების შექმნა iOS და Android-ისთვის. კომპონენტები, ნავიგაცია, API ინტეგრაცია.', tribe: 'ინჟინერია', duration: '3 თვე', price: 900, format: 'ონლაინ', popular: true, gradient: 'from-[#1a1a2e] to-[#16213e]', logo: '<svg viewBox="-11.5 -10.23174 23 20.46348" width="28" height="28"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>', img: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=500&fit=crop' },
  { id: 2, title: 'UI/UX Design', desc: 'Figma-ში მუშაობა, wireframe და პროტოტიპების შექმნა, დიზაინ სისტემები.', tribe: 'დიზაინი', duration: '2 თვე', price: 800, format: 'ონლაინ', popular: false, gradient: 'from-[#2d1b3d] to-[#1a1a2e]', logo: '<svg width="22" height="32" viewBox="0 0 38 57" fill="none"><path d="M19 28.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19z" fill="#1ABCFE"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/><path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/></svg>', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop' },
  { id: 3, title: 'Meta Advertising', desc: 'Facebook & Instagram რეკლამა, ტარგეტინგი და ანალიტიკა.', tribe: 'მარკეტინგი', duration: '1.5 თვე', price: 600, format: 'ონლაინ', popular: false, gradient: 'from-[#1a1a2e] to-[#1a2e3e]', logo: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.12 8.24 8.9v-6.3H7.9v-2.6h2.38V10c0-2.36 1.4-3.66 3.54-3.66 1.03 0 2.1.18 2.1.18v2.32h-1.18c-1.17 0-1.53.72-1.53 1.47v1.77h2.6l-.42 2.6h-2.18v6.3c4.64-.78 8.24-4.49 8.24-8.9 0-5.5-4.46-9.96-9.96-9.96z" fill="#1877F2"/></svg>', img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop' },
  { id: 4, title: 'SEO & Content', desc: 'საძიებო ოპტიმიზაცია, კონტენტ სტრატეგია და Google ანალიტიკა.', tribe: 'მარკეტინგი', duration: '1 თვე', price: 500, format: 'ონლაინ', popular: false, gradient: 'from-[#1a2e1a] to-[#1a1a2e]', logo: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop' },
  { id: 5, title: 'Vibe Coding', desc: 'AI-ით კოდის წერა, Cursor, Claude და აპლიკაციების შექმნა.', tribe: 'AI', duration: '2 თვე', price: 700, format: 'ონლაინ', popular: true, gradient: 'from-[#1a1a3e] to-[#2e1a3e]', logo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/><path d="M9 17v-2M15 17v-2"/></svg>', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop' },
  { id: 6, title: 'Data Analytics', desc: 'მონაცემთა ანალიზი Python-ით, Pandas, ვიზუალიზაცია.', tribe: 'AI', duration: '2.5 თვე', price: 750, format: 'ონლაინ', popular: false, gradient: 'from-[#2e1a1a] to-[#1a1a2e]', logo: '<svg width="24" height="24" viewBox="0 0 256 255"><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072z" fill="#366A96"/><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.746h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897z" fill="#FFC331"/></svg>', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop' },
  { id: 7, title: 'Cyber Security', desc: 'კიბერუსაფრთხოება, ეთიკური ჰაკინგი, ქსელის დაცვა.', tribe: 'ინჟინერია', duration: '3 თვე', price: 850, format: 'ონლაინ', popular: false, gradient: 'from-[#1a1a2e] to-[#2e1a2e]', logo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop' },
  { id: 8, title: 'Product Management', desc: 'პროდუქტის მართვა, ანალიტიკა, Agile და სტრატეგია.', tribe: 'მენეჯმენტი', duration: '2 თვე', price: 650, format: 'ონლაინ', popular: false, gradient: 'from-[#2e2e1a] to-[#1a1a2e]', logo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop' },
  { id: 9, title: 'გაყიდვების კურსი', desc: 'გაყიდვების ტექნიკები, მოლაპარაკებები, CRM სისტემები.', tribe: 'მენეჯმენტი', duration: '1 თვე', price: 450, format: 'ონლაინ', popular: false, gradient: 'from-[#1a2e2e] to-[#1a1a2e]', logo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', img: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=500&fit=crop' },
];

const TRIBES = ['ყველა', 'ინჟინერია', 'დიზაინი', 'მარკეტინგი', 'AI', 'მენეჯმენტი'];

export function CoursesCatalog() {
  const [selectedTribe, setSelectedTribe] = useState('ყველა');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const navigate = useNavigate();

  const featured = ALL_COURSES[0]; // React Native as featured

  const filtered = ALL_COURSES.filter(c => selectedTribe === 'ყველა' || c.tribe === selectedTribe);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center px-5 md:px-12 lg:px-16 h-[72px]">
          <a href="/">
            <Logo variant="academy" className="h-[110px] w-auto -my-6" />
          </a>
          <div className="flex-1" />
          <nav className="hidden lg:flex items-center gap-7 mr-6">
            {[
              { label: 'კურსები', href: '/courses' },
              { label: 'მასტერკლასები', href: '#' },
              { label: 'სერტიფიკატები', href: '#' },
              { label: 'კარიერა', href: '#' },
              { label: 'ჩვენს შესახებ', href: '#' },
            ].map((item) => (
              <a key={item.label} href={item.href} className={`text-sm font-medium transition-colors ${item.href === '/courses' ? 'text-[#004aad]' : 'text-gray-700 hover:text-[#004aad]'}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ═══ FEATURED BANNER — digitaledu.ge style ═══ */}
      <section className="relative bg-gradient-to-r from-[#e8f4fd] to-[#f0f4ff] overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 md:py-16">
            {/* Left — text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {featured.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-5 flex-wrap">
                <span className="font-bold text-2xl text-gray-900">{featured.price}₾</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#004aad]" />{featured.tribe}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.duration}</span>
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{featured.format}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-md">{featured.desc}</p>
              <button className="px-7 py-3 bg-[#004aad] text-white rounded-lg font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] inline-flex items-center gap-2">
                გაიგე მეტი
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Right — image */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative hidden md:block">
              {/* Most Popular badge */}
              <div className="absolute top-4 right-4 z-10 bg-[#ef4444] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Flame className="w-3.5 h-3.5" /> Most Popular
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={featured.img} alt={featured.title} className="w-full h-[320px] object-cover" />
              </div>
              {/* Decorative blob */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#004aad]/10 rounded-full blur-[60px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ COURSES CATALOG ═══ */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
          {/* Title + filters row */}
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

          {/* Course grid — same style as landing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sorted.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-border-subtle hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col"
              >
                {/* Gradient header with logo */}
                <div className={`bg-gradient-to-br ${course.gradient} h-[130px] relative flex items-end p-5`}>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center" dangerouslySetInnerHTML={{ __html: course.logo }} />
                  {course.popular && (
                    <div className="absolute top-4 left-4 bg-[#ef4444] text-white px-2.5 py-1 rounded-full text-[9px] font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Popular
                    </div>
                  )}
                  <div className="flex items-end justify-between w-full">
                    <h3 className="font-bold text-white text-lg leading-snug">{course.title}</h3>
                    <span className="text-xl font-bold text-white shrink-0">{course.price}₾</span>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-card p-5 flex-1 flex flex-col">
                  <p className="text-xs text-foreground-secondary leading-relaxed mb-auto line-clamp-2">{course.desc}</p>

                  {/* Info row — same as landing */}
                  <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border-subtle text-center">
                    <div>
                      <span className="block text-[10px] text-foreground-faint uppercase tracking-wide mb-1">Tribe</span>
                      <span className="text-xs font-semibold text-foreground">{course.tribe}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-foreground-faint uppercase tracking-wide mb-1">ხანგრძლივობა</span>
                      <span className="text-xs font-semibold text-foreground">{course.duration}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-foreground-faint uppercase tracking-wide mb-1">ფორმატი</span>
                      <span className="text-xs font-semibold text-foreground">{course.format}</span>
                    </div>
                  </div>
                </div>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
