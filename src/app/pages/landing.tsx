import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown, Tv, Download, Smartphone, Users, Award, CheckCircle, Infinity, Plus, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/auth-context';
import { getAppT } from '../i18n/app';
import { usePopularCourses } from '../hooks/use-courses';

export function Landing() {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const { openLogin, language, setLanguage } = useAuth();
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
    <div className="min-h-screen bg-black text-white">
      {/* Header — Netflix exact style */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-5 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Logo */}
          <img src="/images/logo-simple.png" alt="Blueberry Academy" className="h-7 md:h-8 w-auto" />

          <div className="flex items-center gap-3">
            {/* Language Selector — Netflix pill style */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 border border-white/50 text-white rounded hover:border-white transition-colors text-sm bg-black/40"
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
                      className="absolute right-0 mt-2 w-44 bg-black/95 backdrop-blur-xl border border-white/20 rounded shadow-2xl overflow-hidden z-50"
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
                              ? 'bg-white/15 text-white font-medium'
                              : 'text-white/60 hover:bg-white/10 hover:text-white'
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

            {/* Sign In — Netflix exact red button */}
            <button
              onClick={handleSignIn}
              className="px-4 py-1.5 bg-[#1a4fd8] text-white rounded font-semibold text-sm hover:bg-[#1540b0] transition-colors"
            >
              {t.landingSignIn}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section — Netflix-style full-screen mosaic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Mosaic — "looking through a bottle" tunnel effect */}
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
              <div key={i} className="aspect-[16/10] rounded overflow-hidden">
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

        {/* Overlays — Netflix-style: center readable, edges dark */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.55)_100%)]" />

        {/* Content — left aligned */}
        <div className="relative z-10 px-4 md:px-12 lg:px-16 max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5">
            {t.landingHeroTitle1}<br />
            {t.landingHeroTitle2}
          </h2>

          <div className="flex items-center gap-4">
            <p className="text-sm md:text-base text-white/60">{t.landingHeroSubtitle}</p>
            <button
              onClick={handleSignIn}
              className="px-7 py-3 bg-[#1a4fd8] text-white rounded hover:bg-[#1540b0] transition-all font-bold text-sm flex items-center gap-2 group flex-shrink-0"
            >
              {t.landingGetStarted}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom convex oval — bulges UP from bottom, edges low */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcGrad" x1="720" y1="50" x2="720" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0c1e3d" />
                <stop offset="50%" stopColor="#071428" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff2d55" stopOpacity="0.3" />
                <stop offset="20%" stopColor="#ff2d55" />
                <stop offset="50%" stopColor="#ff6090" />
                <stop offset="80%" stopColor="#ff2d55" />
                <stop offset="100%" stopColor="#ff2d55" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="6" /></filter>
            </defs>
            {/* Convex fill — center bulges UP, edges at bottom */}
            <path d="M0 200V160Q720 40 1440 160V200H0Z" fill="url(#arcGrad)" />
            {/* Glow */}
            <path d="M0 160Q720 40 1440 160" stroke="url(#lineGrad)" strokeWidth="10" fill="none" opacity="0.5" filter="url(#glow)" />
            {/* Sharp pink line */}
            <path d="M0 160Q720 40 1440 160" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </section>

      {/* Trusted by employees from top companies */}
      <section style={{ padding: '40px 16px 32px', background: '#000' }}>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
          ჩვენს სტუდენტებს ენდობიან
        </p>
        <div style={{ overflow: 'hidden', position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Edge fades */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to right, #000, transparent)', zIndex: 1, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to left, #000, transparent)', zIndex: 1, pointerEvents: 'none' }} />
          <div className="trusted-logos" style={{ display: 'flex', alignItems: 'center', gap: '48px', whiteSpace: 'nowrap' }}>
            {[...Array(2)].map((_, setIdx) => (
              [
                /* Google */
                <svg key={`${setIdx}-google`} viewBox="0 0 272 92" style={{ height: '24px', flexShrink: 0, opacity: 0.25 }}><path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="white"/><path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="white"/><path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="white"/><path d="M225 3v65h-9.5V3h9.5z" fill="white"/><path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="white"/><path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z" fill="white"/></svg>,
                /* Microsoft */
                <svg key={`${setIdx}-ms`} viewBox="0 0 234 50" style={{ height: '20px', flexShrink: 0, opacity: 0.25 }}><rect x="1" y="1" width="22" height="22" fill="white"/><rect x="25" y="1" width="22" height="22" fill="white"/><rect x="1" y="25" width="22" height="22" fill="white"/><rect x="25" y="25" width="22" height="22" fill="white"/><text x="58" y="36" fill="white" fontSize="28" fontFamily="system-ui" fontWeight="600">Microsoft</text></svg>,
                /* Apple */
                <svg key={`${setIdx}-apple`} viewBox="0 0 170 55" style={{ height: '22px', flexShrink: 0, opacity: 0.25 }}><path d="M28.2 12.1c-1.6 1.9-4.2 3.3-6.8 3.1-.3-2.6.9-5.3 2.4-7 1.6-1.9 4.4-3.2 6.6-3.3.3 2.7-.8 5.4-2.2 7.2zm2.2 3.6c-3.7-.2-6.9 2.1-8.7 2.1-1.8 0-4.5-2-7.4-1.9-3.8.1-7.3 2.2-9.3 5.6-4 6.9-1 17.1 2.8 22.7 1.9 2.8 4.2 5.8 7.1 5.7 2.9-.1 3.9-1.8 7.4-1.8 3.4 0 4.4 1.8 7.4 1.8 3.1-.1 5-2.8 6.9-5.6 2.2-3.2 3-6.3 3.1-6.5-.1 0-5.9-2.3-6-9-.1-5.7 4.6-8.4 4.8-8.5-2.6-3.9-6.7-4.3-8.1-4.6z" fill="white"/><text x="42" y="38" fill="white" fontSize="30" fontFamily="system-ui" fontWeight="600">Apple</text></svg>,
                /* Amazon */
                <span key={`${setIdx}-amazon`} style={{ color: 'white', fontSize: '20px', fontWeight: 700, letterSpacing: '0.02em', flexShrink: 0, opacity: 0.25 }}>amazon</span>,
                /* Meta */
                <span key={`${setIdx}-meta`} style={{ color: 'white', fontSize: '20px', fontWeight: 700, letterSpacing: '0.02em', flexShrink: 0, opacity: 0.25 }}>Meta</span>,
                /* Netflix */
                <span key={`${setIdx}-netflix`} style={{ color: 'white', fontSize: '20px', fontWeight: 700, letterSpacing: '0.02em', flexShrink: 0, opacity: 0.25 }}>NETFLIX</span>,
                /* Tesla */
                <span key={`${setIdx}-tesla`} style={{ color: 'white', fontSize: '20px', fontWeight: 700, letterSpacing: '0.15em', flexShrink: 0, opacity: 0.25 }}>TESLA</span>,
                /* Spotify */
                <span key={`${setIdx}-spotify`} style={{ color: 'white', fontSize: '20px', fontWeight: 700, letterSpacing: '0.02em', flexShrink: 0, opacity: 0.25 }}>Spotify</span>,
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

      {/* What's in every Blueberry course? — MasterClass exact layout */}
      <section className="py-24 md:py-32 px-4 md:px-12 lg:px-16 bg-black">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Side — Heading + CTA buttons */}
          <div className="space-y-10">
            <h3 className="text-2xl md:text-3xl font-bold leading-snug">
              {t.landingWhatsIncluded}
            </h3>

            <div className="flex flex-row gap-3">
              <button
                onClick={handleSignIn}
                className="px-10 py-4 bg-[#1a4fd8] text-white rounded hover:bg-[#1540b0] transition-all font-bold text-base"
              >
                {t.landingGetStarted}
              </button>
              <button
                onClick={handleSignIn}
                className="px-10 py-4 border border-white/30 text-white rounded hover:border-white transition-colors font-semibold flex items-center gap-2"
              >
                <Award className="w-5 h-5" strokeWidth={1.5} />
                {t.landingGift}
              </button>
            </div>
          </div>

          {/* Right Side — Blueberry features (MasterClass icon style) */}
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
                  <Icon className="w-5 h-5 text-white/40 flex-shrink-0" strokeWidth={1.2} />
                  <span className="text-[15px] text-white/80">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Now — 4 visible, auto-slides like carousel */}
      <section className="pt-8 pb-16 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16 mb-6">
          <h3 className="text-2xl md:text-3xl font-bold">{t.landingTrendingNow}</h3>
        </div>

        <div className="relative overflow-hidden mx-4 md:mx-12 lg:mx-16">
          {/* Left/Right edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="flex gap-3 trending-carousel">
            {[...courses, ...courses].map((course, i) => (
              <div
                key={`${course.id}-${i}`}
                className="flex-shrink-0 w-[170px] md:w-[200px] cursor-pointer group"
              >
                <div className="rounded overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="font-semibold text-xs line-clamp-1">{course.title}</h4>
                  <p className="text-[11px] text-white/40 line-clamp-1">{course.instructor}</p>
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
      <section className="py-24 md:py-32 px-4 md:px-12 lg:px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h4 className="text-4xl md:text-5xl font-bold">{t.landingWorkChanged}</h4>
            <h4 className="text-4xl md:text-5xl font-bold">{t.landingTimeLearning}</h4>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="text-white/40 text-sm">{t.landingPayPerCourse}</span>
            <button
              onClick={handleSignIn}
              className="px-8 py-3.5 bg-[#1a4fd8] text-white rounded hover:bg-[#1540b0] transition-all font-bold hover:scale-105 active:scale-95"
            >
              {t.landingGetStarted}
            </button>
          </div>
        </div>
      </section>

      {/* Why Blueberry — Premium minimalist cards */}
      <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-10">რატომ Blueberry</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-[#111111] border border-white/[0.06] rounded p-7 flex flex-col justify-between min-h-[220px] hover:border-white/10 transition-colors"
                >
                  <div>
                    <Icon className="w-6 h-6 text-white/60 mb-5" strokeWidth={1.2} />
                    <h4 className="text-base font-bold mb-2 leading-snug">{feature.title}</h4>
                    <p className="text-sm text-white/30 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* FAQ — Minimalist */}
      <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto mb-10">
          <h3 className="text-2xl md:text-3xl font-bold">ხშირად დასმული კითხვები</h3>
        </div>
        <div className="max-w-7xl mx-auto">

          <div className="divide-y divide-white/[0.06]">
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
                  <span className="text-base font-medium pr-4 group-hover:text-white transition-colors">{item.q}</span>
                  <Plus className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`} />
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
                      <p className="text-sm text-white/40 leading-relaxed pb-6">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#1a4fd8]/30 to-transparent" />

      {/* Certificate Section */}
      <section className="py-16 md:py-24 px-4 md:px-12 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-10">სერტიფიკატი</h3>
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>

          {/* Left — Certificate */}
          <div style={{ width: '560px', flexShrink: 0 }}>
            <div style={{
              background: '#0c0c0c',
              borderRadius: '6px',
              boxShadow: '0 0 40px rgba(229,9,20,0.04), 0 20px 60px rgba(0,0,0,0.5)',
              padding: '44px 48px 36px',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              {/* Watermark */}
              <div style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%) rotate(90deg)',
                fontSize: '40px', fontFamily: 'Georgia, serif', fontWeight: 700,
                color: 'rgba(255,255,255,0.02)', letterSpacing: '0.08em', pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}>Blueberry</div>

              {/* Institution */}
              <p style={{ color: '#1a4fd8', fontSize: '13px', fontWeight: 900, letterSpacing: '0.2em', marginBottom: '2px' }}>
                Blueberry
              </p>
              <p style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '28px' }}>
                Academy of Professional Development
              </p>

              {/* Presents to */}
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '6px' }}>
                presents to
              </p>

              {/* Name */}
              <p style={{ fontFamily: 'Georgia, serif', color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '14px', lineHeight: 1.2 }}>
                თამარ მელაშვილი
              </p>

              {/* Conferral */}
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', marginBottom: '14px', lineHeight: 1.5 }}>
                this Professional Certificate conferred on 15 მარტი, 2026
              </p>

              {/* Course */}
              <p style={{ fontFamily: 'Georgia, serif', color: 'white', fontSize: '15px', fontWeight: 700, marginBottom: '32px', lineHeight: 1.4 }}>
                for successful completion of the<br />Business Strategy Masterclass
              </p>

              {/* Signatures */}
              <div style={{ display: 'flex', gap: '32px' }}>
                <div>
                  <svg viewBox="0 0 160 40" style={{ width: '90px', height: '24px', display: 'block', marginBottom: '2px' }}>
                    <path d="M5 30C14 10 24 5 38 18C50 28 58 8 70 12C80 15 88 5 100 8C110 10 120 22 135 14C142 10 150 6 155 10" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
                  </svg>
                  <div style={{ width: '90px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginTop: '4px' }}>გიორგი ჩხეიძე</p>
                  <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)' }}>CEO, Blueberry Academy</p>
                </div>
                <div>
                  <svg viewBox="0 0 160 40" style={{ width: '90px', height: '24px', display: 'block', marginBottom: '2px' }}>
                    <path d="M10 22C22 6 36 20 48 10C56 3 68 18 80 12C90 7 102 22 116 14C124 9 136 16 148 10" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
                  </svg>
                  <div style={{ width: '90px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginTop: '4px' }}>სარა ჩენი</p>
                  <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)' }}>Lead Instructor</p>
                </div>
              </div>

              {/* Credential */}
              <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', marginTop: '20px', fontFamily: 'monospace' }}>
                Credential ID: BM-2026-0847-TM
              </p>
            </div>
          </div>

          {/* Right — Benefits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle style={{ width: '22px', height: '22px', color: '#1a4fd8', flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: '16px', color: 'white' }}>{t.landingVerifiedCompletion}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle style={{ width: '22px', height: '22px', color: '#1a4fd8', flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: '16px', color: 'white' }}>{t.landingShareableCredentials}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CheckCircle style={{ width: '22px', height: '22px', color: '#1a4fd8', flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: '16px', color: 'white' }}>{t.landingLifetimeAccess}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Award style={{ width: '22px', height: '22px', color: '#1a4fd8', flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: '16px', color: 'white' }}>პროფესიონალური აკრედიტაცია</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Infinity style={{ width: '22px', height: '22px', color: '#1a4fd8', flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: '16px', color: 'white' }}>უვადო წვდომა სერტიფიკატზე</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Star style={{ width: '22px', height: '22px', color: '#1a4fd8', flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: '16px', color: 'white' }}>ავტომატურად კურსის დასრულებისას</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#1a4fd8]/30 to-transparent" />

      {/* Testimonials — Cinematic MasterClass style */}
      <section
        role="region"
        aria-label="Student testimonials"
        style={{ padding: '96px 0 80px', background: '#000' }}
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-14">
            რას ამბობენ ჩვენი სტუდენტები
          </h3>
        </div>

        {/* Carousel wrapper */}
        <div
          style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '0 72px' }}
          onMouseEnter={() => setTestimonialPaused(true)}
          onMouseLeave={() => setTestimonialPaused(false)}
        >
          {/* Left arrow */}
          <button
            aria-label="Previous testimonial"
            onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
            style={{
              position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 20,
              width: '52px', height: '52px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            <ChevronLeft style={{ width: '22px', height: '22px', color: 'rgba(255,255,255,0.7)' }} />
          </button>

          {/* Right arrow */}
          <button
            aria-label="Next testimonial"
            onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
            style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 20,
              width: '52px', height: '52px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            <ChevronRight style={{ width: '22px', height: '22px', color: 'rgba(255,255,255,0.7)' }} />
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Quote card — centered against photo, overlaps slightly */}
                <div style={{
                  width: '55%', flexShrink: 0, position: 'relative', zIndex: 2,
                  background: 'rgba(26,26,26,0.95)', borderRadius: '14px',
                  padding: '44px',
                  marginRight: '-3%',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                }}>
                  <blockquote style={{
                    fontSize: '21px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65,
                    fontFamily: 'Georgia, serif', marginBottom: '32px',
                  }}>
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </blockquote>
                  <div>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>{testimonials[activeTestimonial].name}</span>
                    {'  '}
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>{testimonials[activeTestimonial].role}</span>
                  </div>
                </div>

                {/* Photo — taller, card centered against it */}
                <div style={{
                  width: '48%', flexShrink: 0,
                  height: '480px',
                  borderRadius: '14px', overflow: 'hidden',
                }}>
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  background: i === activeTestimonial ? 'white' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-10 px-4 md:px-12 lg:px-16 bg-black border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          {/* Top — Logo + Social icons */}
          <div className="flex items-center justify-between mb-12">
            <img src="/images/logo-academy.png" alt="Blueberry Academy" className="h-8 w-auto" />
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a href="#" className="text-white/30 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-white/30 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* X/Twitter */}
              <a href="#" className="text-white/30 hover:text-white transition-colors" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-white/30 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Links — 3 columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="text-xs text-white/30 uppercase tracking-wider mb-4">{t.landingFooterAbout}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterAboutUs}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterCareers}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterPress}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterBlog}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-white/30 uppercase tracking-wider mb-4">{t.landingFooterSupport}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterHelpCenter}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterContactUs}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterFAQ}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterAccount}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-white/30 uppercase tracking-wider mb-4">{t.landingFooterLegal}</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterTermsOfUse}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterPrivacyPolicy}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterCookiePreferences}</a></li>
                <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{t.landingFooterCorporateInfo}</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom — Copyright + Language */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">{t.landingFooterRights}</p>
            <div className="flex items-center gap-4">
              <span className="text-white/30 text-xs flex items-center gap-1.5"><span className="text-sm font-bold">文A</span>{language}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}