import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown, Tv, Download, Smartphone, Users, Award, CheckCircle, Infinity, Plus, Star, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/auth-context';
import { useTheme } from 'next-themes';
import { getAppT } from '../i18n/app';
import { Logo } from '../components/logo';
import { usePopularCourses } from '../hooks/use-courses';

export function Landing() {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const { openLogin, language, setLanguage } = useAuth();
  const { theme, setTheme } = useTheme();
  const t = getAppT(language);
  const { data: apiCourses = [] } = usePopularCourses();

  // Fallback thumbnails for mosaic while API loads
  const fallbackThumbnails = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=250&fit=crop',
  ].map((thumbnail, i) => ({ id: String(i), title: '', subtitle: '', instructor: '', category: [] as string[], thumbnail, duration: '', level: 'All Levels' as const, lessons: 0, rating: 0, students: 0 }));

  const courses = apiCourses.length > 0 ? apiCourses : fallbackThumbnails;

  const languages = ['ქართული', 'English', 'Русский'];

  // Testimonials — 7 students
  const testimonials = [
    {
      quote: "Blueberry-ზე ბიზნეს კურსის შემდეგ საკუთარი სტარტაპი წამოვიწყე. რეალური ქეისები ვისწავლე.",
      name: "ნინო კვარაცხელია",
      role: "სტარტაპის დამფუძნებელი",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop&q=80"
    },
    {
      quote: "პროგრამირების კურსი ნულიდან დავიწყე და 4 თვეში პირველი სამსახური ვიშოვე. ინსტრუქტორის მიდგომა იყო ისეთი, რომ ყველაფერი გასაგები ხდებოდა.",
      name: "გიორგი ბერიძე",
      role: "Junior Developer, საქართველო",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&q=80"
    },
    {
      quote: "დიზაინის კურსმა კარიერა შემიცვალა. ფრილანსერად ვმუშაობ და საერთაშორისო კლიენტები მყავს. Blueberry-მა მომცა ის საფუძველი, რაც მჭირდებოდა.",
      name: "მარიამ ჯავახიშვილი",
      role: "UX/UI დიზაინერი, საქართველო",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop&q=80"
    },
    {
      quote: "კულინარიის კურსმა რესტორნის გახსნის თავდაჯერებულობა მომცა. ახლა საკუთარი ბისტრო მაქვს და ყოველდღე ახალ რეცეპტებს ვქმნი.",
      name: "დავით ხარაიშვილი",
      role: "შეფ-მზარეული, საქართველო",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&q=80"
    },
    {
      quote: "მარკეტინგის კურსმა კომპანიის გაყიდვები 3-ჯერ გაზარდა. ყველა თანამშრომელს ვურჩევ. პრაქტიკული ცოდნა მივიღე, არა მხოლოდ თეორია.",
      name: "ანა გოგიჩაიშვილი",
      role: "მარკეტინგის მენეჯერი, საქართველო",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&q=80"
    },
    {
      quote: "ფოტოგრაფიის კურსი საუკეთესო იყო. ახლა წვეულებებსა და ქორწილებს ვიღებ პროფესიონალურად. კამერა 5 წლის წინ გადავდე და ამ კურსმა დამაბრუნა.",
      name: "ლუკა მჭედლიშვილი",
      role: "ფოტოგრაფი, საქართველო",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop&q=80"
    },
    {
      quote: "ფინანსური გრამოტნულობის კურსმა ფულის მართვა მასწავლა. ახლა თავდაჯერებულად ვგეგმავ მომავალს და ინვესტიციებსაც ვაკეთებ.",
      name: "თეო ნაკაშიძე",
      role: "ფინანსური კონსულტანტი, საქართველო",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80"
    }
  ];

  // Features
  const features = [
    {
      icon: Tv,
      title: t.landingEnjoyOnTV,
      description: t.landingEnjoyOnTVDesc
    },
    {
      icon: Download,
      title: t.landingDownloadCourses,
      description: t.landingDownloadCoursesDesc
    },
    {
      icon: Smartphone,
      title: t.landingWatchEverywhere,
      description: t.landingWatchEverywhereDesc
    },
    {
      icon: Users,
      title: t.landingCreateProfiles,
      description: t.landingCreateProfilesDesc
    }
  ];

  const handleSignIn = () => {
    openLogin();
  };

  // Auto-rotate testimonials every 7s, pause on hover
  useEffect(() => {
    if (testimonialPaused) return;
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonialPaused, testimonials.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header — Google Grow: clean, sticky with border */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-border-subtle">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Logo */}
          <Logo className="h-7 md:h-8 w-auto" />

          <div className="flex items-center gap-3">
            {/* Language Selector — pill style */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-4 py-1.5 border border-border rounded-full text-foreground hover:border-foreground-secondary transition-colors text-sm bg-background"
              >
                <span className="text-base font-bold">文A</span>
                <span>{language}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showLanguageDropdown && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div className="fixed inset-0 z-40" onClick={() => setShowLanguageDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 bg-background border border-border-subtle rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      {languages.map((lang, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setLanguage(lang);
                            setShowLanguageDropdown(false);
                          }}
                          className={`block w-full px-4 py-2.5 text-sm text-left transition-colors ${
                            language === lang
                              ? 'bg-surface-hover text-foreground font-medium'
                              : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-foreground-secondary hover:text-foreground transition-colors hover:bg-surface-hover rounded-full"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Sign In — pill, brand */}
            <button
              onClick={handleSignIn}
              className="px-5 py-1.5 bg-brand text-white rounded-full font-semibold text-sm hover:bg-brand-hover transition-colors"
            >
              {t.landingSignIn}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section — mosaic with lighter overlays */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Mosaic — keep perspective/transform as style props */}
        <div
          className="absolute inset-0"
          style={{ perspective: '500px', perspectiveOrigin: '50% 50%' }}
        >
          <div
            className="absolute opacity-90"
            style={{
              top: '-50%',
              left: '-40%',
              right: '-40%',
              bottom: '-50%',
              transform: 'rotateX(15deg) rotateZ(-6deg) translateZ(-50px)',
              transformStyle: 'preserve-3d',
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '6px',
            }}
          >
            {[
              ...courses,
              ...courses,
              ...courses,
              ...courses,
              ...courses,
              ...courses,
              ...courses,
              ...courses,
              ...courses,
            ].slice(0, 72).map((course, i) => (
              <div key={i} className="aspect-[16/10] rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlays — lighter, Google Grow airy feel */}
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)] opacity-50" />

        {/* Content — left aligned */}
        <div className="relative z-10 px-4 md:px-12 lg:px-16 max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 text-foreground">
            {t.landingHeroTitle1}<br />
            {t.landingHeroTitle2}
          </h2>

          <div className="flex items-center gap-4">
            <p className="text-sm md:text-base text-foreground-secondary">{t.landingHeroSubtitle}</p>
            <button
              onClick={handleSignIn}
              className="px-7 py-3 bg-brand text-white rounded-full hover:bg-brand-hover transition-all font-bold text-sm flex items-center gap-2 group flex-shrink-0"
            >
              {t.landingGetStarted}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom convex oval — brand tint instead of dark navy */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcGrad" x1="720" y1="50" x2="720" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" className="[stop-color:var(--color-brand)]" stopOpacity="0.15" />
                <stop offset="50%" className="[stop-color:var(--color-brand)]" stopOpacity="0.08" />
                <stop offset="100%" className="[stop-color:var(--color-background)]" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" className="[stop-color:var(--color-brand)]" stopOpacity="0.2" />
                <stop offset="20%" className="[stop-color:var(--color-brand)]" stopOpacity="0.6" />
                <stop offset="50%" className="[stop-color:var(--color-brand)]" stopOpacity="0.8" />
                <stop offset="80%" className="[stop-color:var(--color-brand)]" stopOpacity="0.6" />
                <stop offset="100%" className="[stop-color:var(--color-brand)]" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="6" /></filter>
            </defs>
            {/* Convex fill — center bulges UP, edges at bottom */}
            <path d="M0 200V160Q720 40 1440 160V200H0Z" fill="url(#arcGrad)" />
            {/* Glow */}
            <path d="M0 160Q720 40 1440 160" stroke="url(#lineGrad)" strokeWidth="10" fill="none" opacity="0.4" filter="url(#glow)" />
            {/* Sharp brand line */}
            <path d="M0 160Q720 40 1440 160" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </section>

      {/* Trusted by employees from top companies */}
      <section className="py-10 px-4 bg-surface">
        <p className="text-center text-foreground-faint text-xs tracking-[0.15em] uppercase mb-6">
          ჩვენს სტუდენტებს ენდობიან
        </p>
        <div className="overflow-hidden relative max-w-[900px] mx-auto">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[60px] bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
          <div className="trusted-logos flex items-center gap-12 whitespace-nowrap">
            {[...Array(2)].map((_, setIdx) => (
              [
                /* Google */
                <svg key={`${setIdx}-google`} viewBox="0 0 272 92" className="h-6 flex-shrink-0 opacity-25 fill-foreground-faint"><path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="currentColor"/><path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="currentColor"/><path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="currentColor"/><path d="M225 3v65h-9.5V3h9.5z" fill="currentColor"/><path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="currentColor"/><path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z" fill="currentColor"/></svg>,
                /* Microsoft */
                <svg key={`${setIdx}-ms`} viewBox="0 0 234 50" className="h-5 flex-shrink-0 opacity-25 fill-foreground-faint"><rect x="1" y="1" width="22" height="22" fill="currentColor"/><rect x="25" y="1" width="22" height="22" fill="currentColor"/><rect x="1" y="25" width="22" height="22" fill="currentColor"/><rect x="25" y="25" width="22" height="22" fill="currentColor"/><text x="58" y="36" fill="currentColor" fontSize="28" fontFamily="system-ui" fontWeight="600">Microsoft</text></svg>,
                /* Apple */
                <svg key={`${setIdx}-apple`} viewBox="0 0 170 55" className="h-[22px] flex-shrink-0 opacity-25 fill-foreground-faint"><path d="M28.2 12.1c-1.6 1.9-4.2 3.3-6.8 3.1-.3-2.6.9-5.3 2.4-7 1.6-1.9 4.4-3.2 6.6-3.3.3 2.7-.8 5.4-2.2 7.2zm2.2 3.6c-3.7-.2-6.9 2.1-8.7 2.1-1.8 0-4.5-2-7.4-1.9-3.8.1-7.3 2.2-9.3 5.6-4 6.9-1 17.1 2.8 22.7 1.9 2.8 4.2 5.8 7.1 5.7 2.9-.1 3.9-1.8 7.4-1.8 3.4 0 4.4 1.8 7.4 1.8 3.1-.1 5-2.8 6.9-5.6 2.2-3.2 3-6.3 3.1-6.5-.1 0-5.9-2.3-6-9-.1-5.7 4.6-8.4 4.8-8.5-2.6-3.9-6.7-4.3-8.1-4.6z" fill="currentColor"/><text x="42" y="38" fill="currentColor" fontSize="30" fontFamily="system-ui" fontWeight="600">Apple</text></svg>,
                /* Amazon */
                <span key={`${setIdx}-amazon`} className="text-foreground-faint text-xl font-bold tracking-tight flex-shrink-0 opacity-25">amazon</span>,
                /* Meta */
                <span key={`${setIdx}-meta`} className="text-foreground-faint text-xl font-bold tracking-tight flex-shrink-0 opacity-25">Meta</span>,
                /* Netflix */
                <span key={`${setIdx}-netflix`} className="text-foreground-faint text-xl font-bold tracking-tight flex-shrink-0 opacity-25">NETFLIX</span>,
                /* Tesla */
                <span key={`${setIdx}-tesla`} className="text-foreground-faint text-xl font-bold tracking-widest flex-shrink-0 opacity-25">TESLA</span>,
                /* Spotify */
                <span key={`${setIdx}-spotify`} className="text-foreground-faint text-xl font-bold tracking-tight flex-shrink-0 opacity-25">Spotify</span>,
              ]
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .trusted-logos {
          animation: scrollLogos 25s linear infinite;
        }
        .trusted-logos:hover {
          animation-play-state: paused;
        }
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* What's in every Blueberry course? — Google Grow clean layout */}
      <section className="py-24 md:py-32 px-4 md:px-12 lg:px-16 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side — Heading + CTA buttons */}
          <div className="space-y-10">
            <h3 className="text-2xl md:text-3xl font-bold leading-snug text-foreground">
              {t.landingWhatsIncluded}
            </h3>

            <div className="flex flex-row gap-3">
              <button
                onClick={handleSignIn}
                className="px-10 py-4 bg-brand text-white rounded-full hover:bg-brand-hover transition-all font-bold text-base"
              >
                {t.landingGetStarted}
              </button>
              <button
                onClick={handleSignIn}
                className="px-10 py-4 border border-border text-brand rounded-full hover:border-brand transition-colors font-semibold flex items-center gap-2"
              >
                <Award className="w-5 h-5" strokeWidth={1.5} />
                {t.landingGift}
              </button>
            </div>
          </div>

          {/* Right Side — Blueberry features */}
          <div className="space-y-8 pt-2">
            {[
              { icon: Star, text: t.landingAllClasses },
              { icon: Infinity, text: t.landingDownloadOffline },
              { icon: Award, text: t.landingNewClasses },
              { icon: Smartphone, text: t.landingWatchDevices },
              { icon: Download, text: t.landingAudioLessons },
              { icon: CheckCircle, text: t.landingMoneyBack },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-foreground-secondary flex-shrink-0" strokeWidth={1.2} />
                  <span className="text-[15px] text-foreground-secondary">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Now — 4 visible, auto-slides like carousel */}
      <section className="pt-8 pb-16 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16 mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">{t.landingTrendingNow}</h3>
        </div>

        <div className="relative overflow-hidden mx-4 md:mx-12 lg:mx-16">
          {/* Left/Right edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-3 trending-carousel">
            {[...courses, ...courses].map((course, i) => (
              <div
                key={`${course.id}-${i}`}
                className="flex-shrink-0 w-[170px] md:w-[200px] cursor-pointer group"
              >
                <div className="rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="font-semibold text-xs line-clamp-1 text-foreground">{course.title}</h4>
                  <p className="text-[11px] text-foreground-secondary line-clamp-1">{course.instructor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .trending-carousel {
          animation: carouselSlide 30s linear infinite;
        }
        .trending-carousel:hover {
          animation-play-state: paused;
        }
        @keyframes carouselSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Work changed. It's time learning did too. */}
      <section className="py-24 md:py-32 px-4 md:px-12 lg:px-16 bg-surface">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h4 className="text-4xl md:text-5xl font-bold text-foreground">{t.landingWorkChanged}</h4>
            <h4 className="text-4xl md:text-5xl font-bold text-foreground">{t.landingTimeLearning}</h4>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="text-foreground-secondary text-sm">{t.landingPayPerCourse}</span>
            <button
              onClick={handleSignIn}
              className="px-8 py-3.5 bg-brand text-white rounded-full hover:bg-brand-hover transition-all font-bold hover:scale-105 active:scale-95"
            >
              {t.landingGetStarted}
            </button>
          </div>
        </div>
      </section>

      {/* Why Blueberry — Google Grow light cards */}
      <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-foreground">რატომ Blueberry</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-card border border-border-subtle rounded-xl p-7 flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <Icon className="w-6 h-6 text-brand mb-5" strokeWidth={1.2} />
                    <h4 className="text-base font-bold mb-2 leading-snug text-foreground">{feature.title}</h4>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-border-subtle" />

      {/* FAQ — Minimalist, clean dividers */}
      <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">ხშირად დასმული კითხვები</h3>
        </div>
        <div className="max-w-7xl mx-auto">

          <div className="divide-y divide-border-subtle">
            {[
              { q: 'რა არის Blueberry?', a: 'Blueberry არის ონლაინ სასწავლო პლატფორმა, სადაც შეგიძლია შეიძინო კურსები საუკეთესო ქართველი და საერთაშორისო ინსტრუქტორებისგან. გადაიხადე ერთხელ და კურსი შენია სამუდამოდ.' },
              { q: 'როგორ მუშაობს გადახდა?', a: 'შეარჩიე კურსი, გადაიხადე ერთჯერადი თანხა და მიიღე უვადო წვდომა. არანაირი გამოწერა ან ყოველთვიური გადასახადი.' },
              { q: 'სად შემიძლია ვუყურო?', a: 'ნებისმიერ მოწყობილობაზე — კომპიუტერზე, ტელეფონზე, ტაბლეტზე ან Smart TV-ზე. პროგრესი სინქრონიზდება ყველგან.' },
              { q: 'შემიძლია თანხის დაბრუნება?', a: '30-დღიანი თანხის დაბრუნების გარანტია. თუ კურსი არ მოგეწონა, სრულ თანხას დაგიბრუნებთ.' },
              { q: 'რა მივიღებ კურსის დასრულებისას?', a: 'ვერიფიცირებულ სერტიფიკატს, რომელიც გააზიარე LinkedIn-ზე ან დაამატე რეზიუმეში.' },
              { q: 'ხელმისაწვდომია ქართულად?', a: 'პლატფორმა და კურსების უმრავლესობა ხელმისაწვდომია ქართულ, ინგლისურ და რუსულ ენებზე.' },
            ].map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-base font-medium pr-4 text-foreground group-hover:text-brand transition-colors">{item.q}</span>
                  <Plus className={`w-5 h-5 text-foreground-secondary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-foreground-secondary leading-relaxed pb-6">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-border-subtle" />

      {/* Certificate Section — Google Grow light card style */}
      <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-foreground">სერტიფიკატი</h3>
        </div>
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">

          {/* Left — Certificate card */}
          <div className="w-full lg:w-[560px] flex-shrink-0">
            <div className="bg-card border border-border-subtle rounded-xl shadow-md p-11 relative overflow-hidden">
              {/* Watermark */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-[40px] font-serif font-bold text-foreground/[0.04] tracking-wider pointer-events-none whitespace-nowrap">
                Blueberry
              </div>

              {/* Institution */}
              <p className="text-brand text-[13px] font-black tracking-[0.2em] mb-0.5">
                Blueberry
              </p>
              <p className="font-serif text-foreground-secondary text-[13px] mb-7">
                Academy of Professional Development
              </p>

              {/* Presents to */}
              <p className="text-foreground-secondary text-xs mb-1.5">
                presents to
              </p>

              {/* Name */}
              <p className="font-serif text-foreground text-[28px] font-bold mb-3.5 leading-tight">
                თამარ მელაშვილი
              </p>

              {/* Conferral */}
              <p className="text-foreground-secondary text-xs mb-3.5 leading-relaxed">
                this Professional Certificate conferred on 15 მარტი, 2026
              </p>

              {/* Course */}
              <p className="font-serif text-foreground text-[15px] font-bold mb-8 leading-snug">
                for successful completion of the<br />Business Strategy Masterclass
              </p>

              {/* Signatures */}
              <div className="flex gap-8">
                <div>
                  <svg viewBox="0 0 160 40" className="w-[90px] h-6 block mb-0.5">
                    <path d="M5 30C14 10 24 5 38 18C50 28 58 8 70 12C80 15 88 5 100 8C110 10 120 22 135 14C142 10 150 6 155 10" className="stroke-foreground-secondary" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
                  </svg>
                  <div className="w-[90px] h-px bg-border-subtle" />
                  <p className="text-[9px] text-foreground-secondary font-semibold mt-1">გიორგი ჩხეიძე</p>
                  <p className="text-[8px] text-foreground-faint">CEO, Blueberry Academy</p>
                </div>
                <div>
                  <svg viewBox="0 0 160 40" className="w-[90px] h-6 block mb-0.5">
                    <path d="M10 22C22 6 36 20 48 10C56 3 68 18 80 12C90 7 102 22 116 14C124 9 136 16 148 10" className="stroke-foreground-secondary" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
                  </svg>
                  <div className="w-[90px] h-px bg-border-subtle" />
                  <p className="text-[9px] text-foreground-secondary font-semibold mt-1">სარა ჩენი</p>
                  <p className="text-[8px] text-foreground-faint">Lead Instructor</p>
                </div>
              </div>

              {/* Credential */}
              <p className="text-[7px] text-foreground-faint tracking-wider mt-5 font-mono">
                Credential ID: BM-2026-0847-TM
              </p>
            </div>
          </div>

          {/* Right — Benefits */}
          <div className="flex flex-col gap-6 flex-shrink-0">
            <div className="flex items-center gap-3.5">
              <CheckCircle className="w-[22px] h-[22px] text-brand flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base text-foreground">{t.landingVerifiedCompletion}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <CheckCircle className="w-[22px] h-[22px] text-brand flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base text-foreground">{t.landingShareableCredentials}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <CheckCircle className="w-[22px] h-[22px] text-brand flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base text-foreground">{t.landingLifetimeAccess}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <Award className="w-[22px] h-[22px] text-brand flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base text-foreground">პროფესიონალური აკრედიტაცია</span>
            </div>
            <div className="flex items-center gap-3.5">
              <Infinity className="w-[22px] h-[22px] text-brand flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base text-foreground">უვადო წვდომა სერტიფიკატზე</span>
            </div>
            <div className="flex items-center gap-3.5">
              <Star className="w-[22px] h-[22px] text-brand flex-shrink-0" strokeWidth={1.5} />
              <span className="text-base text-foreground">ავტომატურად კურსის დასრულებისას</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-border-subtle" />

      {/* Testimonials — Google Grow light cards */}
      <section
        role="region"
        aria-label="Student testimonials"
        className="py-24 md:py-20 bg-surface"
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-14">
            რას ამბობენ ჩვენი სტუდენტები
          </h3>
        </div>

        {/* Carousel wrapper */}
        <div
          className="relative max-w-[1100px] mx-auto px-[72px]"
          onMouseEnter={() => setTestimonialPaused(true)}
          onMouseLeave={() => setTestimonialPaused(false)}
        >
          {/* Left arrow */}
          <button
            aria-label="Previous testimonial"
            onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full border border-border-subtle bg-card shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <ChevronLeft className="w-[22px] h-[22px] text-foreground-secondary" />
          </button>

          {/* Right arrow */}
          <button
            aria-label="Next testimonial"
            onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full border border-border-subtle bg-card shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <ChevronRight className="w-[22px] h-[22px] text-foreground-secondary" />
          </button>

          {/* Card + Photo composite */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center">
                {/* Quote card — overlaps photo slightly */}
                <div className="w-[55%] flex-shrink-0 relative z-[2] bg-card border border-border-subtle rounded-xl p-11 -mr-[3%] shadow-md">
                  <blockquote className="text-[21px] text-foreground leading-[1.65] font-serif mb-8">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </blockquote>
                  <div>
                    <span className="text-foreground font-bold text-[15px]">{testimonials[activeTestimonial].name}</span>
                    {'  '}
                    <span className="text-foreground-secondary text-sm">{testimonials[activeTestimonial].role}</span>
                  </div>
                </div>

                {/* Photo */}
                <div className="w-[48%] flex-shrink-0 h-[480px] rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_top]"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                  i === activeTestimonial
                    ? 'w-6 bg-brand'
                    : 'w-2 bg-foreground-faint/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-10 px-4 md:px-12 lg:px-16 bg-background border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          {/* Top — Logo + Social icons */}
          <div className="flex items-center justify-between mb-12">
            <Logo variant="academy" className="h-8 w-auto" />
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a href="#" className="text-foreground-faint hover:text-foreground transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-foreground-faint hover:text-foreground transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* X/Twitter */}
              <a href="#" className="text-foreground-faint hover:text-foreground transition-colors" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-foreground-faint hover:text-foreground transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Links — 3 columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="text-xs text-foreground-faint uppercase tracking-wider mb-4">{t.landingFooterAbout}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterAboutUs}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterCareers}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterPress}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterBlog}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-foreground-faint uppercase tracking-wider mb-4">{t.landingFooterSupport}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterHelpCenter}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterContactUs}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterFAQ}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterAccount}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-foreground-faint uppercase tracking-wider mb-4">{t.landingFooterLegal}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterTermsOfUse}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterPrivacyPolicy}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterCookiePreferences}</a></li>
                <li><a href="#" className="text-foreground-secondary hover:text-foreground transition-colors text-sm">{t.landingFooterCorporateInfo}</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom — Copyright + Language */}
          <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground-faint text-xs">{t.landingFooterRights}</p>
            <div className="flex items-center gap-4">
              <span className="text-foreground-faint text-xs flex items-center gap-1.5"><span className="text-sm font-bold">文A</span>{language}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
