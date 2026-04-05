import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, Play, Star, Clock, Users, Award, CheckCircle, Zap, BookOpen, Globe, ArrowRight, Plus, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useAuth } from '../context/auth-context';
import { useTheme } from 'next-themes';
import { getAppT } from '../i18n/app';
import { Logo } from '../components/logo';
import { usePopularCourses, useAllCourses } from '../hooks/use-courses';

/* ─── Hero background video — rotating tech clips ─── */
const HERO_VIDEOS = [
  'https://assets.mixkit.co/videos/1728/1728-720.mp4',     // Developer coding on screen close-up
  'https://assets.mixkit.co/videos/50600/50600-720.mp4',   // Graphic designer — color picker on screen
  'https://assets.mixkit.co/videos/46635/46635-720.mp4',   // Programming & new technologies
  'https://assets.mixkit.co/videos/50598/50598-720.mp4',   // Designer picking colors for typography
  'https://assets.mixkit.co/videos/3257/3257-720.mp4',     // Two designers working with design software
  'https://assets.mixkit.co/videos/31510/31510-720.mp4',   // Programmer hands on desk with code
  'https://assets.mixkit.co/videos/51214/51214-720.mp4',   // Woman with futuristic VR/AI glasses
  'https://assets.mixkit.co/videos/9757/9757-720.mp4',     // Code scrolling on computer screen
];

function HeroVideo() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setCurrentVideo(prev => (prev + 1) % HERO_VIDEOS.length);
    };

    // Also auto-switch every 6s even if video hasn't ended
    const timer = setInterval(() => {
      setCurrentVideo(prev => (prev + 1) % HERO_VIDEOS.length);
    }, 6000);

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      clearInterval(timer);
    };
  }, [currentVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
  }, [currentVideo]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      src={HERO_VIDEOS[currentVideo]}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}

/* ─── Animated counter — counts up from 0 ─── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Fade-in on scroll component ─── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Landing() {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openLogin, language, setLanguage } = useAuth();
  const { theme, setTheme } = useTheme();
  const t = getAppT(language);
  const { data: apiCourses = [] } = usePopularCourses();
  const { data: allCourses = [] } = useAllCourses();

  const languages = ['ქართული', 'English', 'Русский'];

  const heroRef = useRef(null);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignIn = () => openLogin();

  const displayCourses = apiCourses.length > 0 ? apiCourses : allCourses;

  const stats = [
    { value: 500, suffix: '+', label: 'კურსდამთავრებული' },
    { value: 98, suffix: '%', label: 'დასაქმებული' },
    { value: 50, suffix: '+', label: 'კურსი' },
    { value: 30, suffix: '+', label: 'ინსტრუქტორი' },
  ];

  const benefits = [
    { icon: Zap, title: 'სწრაფი სწავლა', desc: 'მოკლე, ფოკუსირებული გაკვეთილები რეალური შედეგებისთვის' },
    { icon: BookOpen, title: 'პრაქტიკული პროექტები', desc: 'ყველა კურსი მოიცავს რეალურ პროექტებს პორტფოლიოსთვის' },
    { icon: Award, title: 'სერტიფიკატი', desc: 'ვერიფიცირებული სერტიფიკატი LinkedIn-ისა და CV-სთვის' },
    { icon: Globe, title: '3 ენაზე', desc: 'კურსები ქართულ, ინგლისურ და რუსულ ენებზე' },
    { icon: Users, title: 'ექსპერტ ინსტრუქტორები', desc: 'ისწავლე ინდუსტრიის წამყვანი პროფესიონალებისგან' },
    { icon: CheckCircle, title: '30-დღიანი გარანტია', desc: 'სრული თანხის დაბრუნება თუ კურსი არ მოგეწონა' },
  ];

  const testimonials = [
    { quote: "Blueberry-ზე ბიზნეს კურსის შემდეგ საკუთარი სტარტაპი წამოვიწყე.", name: "ნინო კვარაცხელია", role: "სტარტაპის დამფუძნებელი", avatar: "ნ" },
    { quote: "პროგრამირების კურსი ნულიდან დავიწყე და 4 თვეში პირველი სამსახური ვიშოვე.", name: "გიორგი ბერიძე", role: "Junior Developer", avatar: "გ" },
    { quote: "დიზაინის კურსმა კარიერა შემიცვალა. ფრილანსერად ვმუშაობ საერთაშორისო კლიენტებთან.", name: "მარიამ ჯავახიშვილი", role: "UX/UI დიზაინერი", avatar: "მ" },
    { quote: "მარკეტინგის კურსმა კომპანიის გაყიდვები 3-ჯერ გაზარდა.", name: "ანა გოგიჩაიშვილი", role: "მარკეტინგის მენეჯერი", avatar: "ა" },
  ];

  const faqs = [
    { q: 'რა არის Blueberry?', a: 'Blueberry არის ონლაინ სასწავლო პლატფორმა, სადაც შეგიძლია შეიძინო კურსები საუკეთესო ქართველი და საერთაშორისო ინსტრუქტორებისგან.' },
    { q: 'როგორ მუშაობს გადახდა?', a: 'შეარჩიე კურსი, გადაიხადე ერთჯერადი თანხა და მიიღე უვადო წვდომა. არანაირი გამოწერა.' },
    { q: 'სად შემიძლია ვუყურო?', a: 'ნებისმიერ მოწყობილობაზე — კომპიუტერზე, ტელეფონზე, ტაბლეტზე ან Smart TV-ზე.' },
    { q: 'შემიძლია თანხის დაბრუნება?', a: '30-დღიანი თანხის დაბრუნების გარანტია. თუ კურსი არ მოგეწონა, სრულ თანხას დაგიბრუნებთ.' },
    { q: 'რა მივიღებ კურსის დასრულებისას?', a: 'ვერიფიცირებულ სერტიფიკატს, რომელიც გააზიარე LinkedIn-ზე ან დაამატე რეზიუმეში.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ═══ HEADER ═══ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolledPast ? 'bg-[#0a0a1a]' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-5 md:px-12 lg:px-16 h-[72px]">
          <Logo variant="academy" className="h-[80px] md:h-[90px] w-auto -my-4" forceDark />

          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-1.5 px-3 py-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showLanguageDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLanguageDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-40 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setShowLanguageDropdown(false); }}
                          className={`block w-full px-4 py-2.5 text-sm text-left transition-colors ${
                            language === lang ? 'bg-blue-500/10 text-[#5b9bd5] font-medium' : 'text-white/60 hover:bg-white/10 hover:text-white'
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

            {/* Theme */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Sign In */}
            <button
              onClick={handleSignIn}
              className="ml-1 px-5 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-all shadow-sm hover:shadow-md active:scale-[0.97]"
            >
              {t.landingSignIn}
            </button>
          </div>
        </div>
      </header>

      {/* ═══ HERO — Full-screen background video ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a1a]">
        {/* Background video — auto-switching tech clips */}
        <HeroVideo />

        {/* Overlays — lighter so video is visible */}
        <div className="absolute inset-0 bg-[#0a0a1a]/40 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/80 via-[#0a0a1a]/30 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/90 via-transparent to-transparent z-[1]" />

        {/* Content — bottom-left */}
        <div className="relative z-[2] w-full px-5 md:px-12 lg:px-16 self-end pb-20">
          <div className="max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white mb-5"
            >
              {t.landingHeroTitle1}
              <br />
              <span className="bg-gradient-to-r from-[#5b9bd5] via-[#004aad] to-[#5b9bd5] bg-clip-text text-transparent">{t.landingHeroTitle2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm md:text-base text-white/50 leading-relaxed mb-8 max-w-md"
            >
              {t.landingHeroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-4"
            >
              <button
                onClick={handleSignIn}
                className="px-8 py-3.5 bg-gradient-to-r from-[#004aad] to-[#003d8f] text-white rounded-full font-semibold text-base hover:from-[#003d8f] hover:to-[#002d6b] transition-all shadow-lg shadow-[#004aad]/25 hover:shadow-[#004aad]/40 active:scale-[0.97] flex items-center gap-2"
              >
                {t.landingGetStarted}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleSignIn}
                className="px-6 py-3.5 border border-white/15 text-white/80 rounded-full font-medium text-base hover:bg-white/5 hover:border-white/25 transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                გაიგე მეტი
              </button>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-6 md:gap-8 mt-16"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPANIES — Our graduates work at ═══ */}
      <section className="relative z-10 py-10 bg-background border-b border-border-subtle overflow-hidden">
        <p className="text-center text-foreground-faint text-xs uppercase tracking-[0.2em] mb-8">
          ჩვენი კურსდამთავრებულები დღეს მუშაობენ
        </p>
        <div className="relative max-w-[1100px] mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-background via-background/60 to-transparent z-10 pointer-events-none" />
          <div className="flex items-center gap-16 company-scroll">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-16 flex-shrink-0">
                {/* Blueberry */}
                <Logo className="h-14 w-auto flex-shrink-0" />
                {/* Google */}
                <svg className="h-7 w-auto flex-shrink-0 hover:scale-110 transition-opacity" viewBox="0 0 272 92">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/><path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC04"/><path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/><path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/><path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/><path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z" fill="#4285F4"/>
                </svg>
                {/* Microsoft */}
                <svg className="h-6 w-auto flex-shrink-0 hover:scale-110 transition-opacity" viewBox="0 0 23 23">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="12" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="12" width="10" height="10" fill="#00A4EF"/><rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
                </svg>
                {/* Apple */}
                <svg className="h-7 w-auto flex-shrink-0 hover:scale-110 transition-opacity text-foreground" viewBox="0 0 42 50" fill="currentColor">
                  <path d="M28.2 12.1c-1.6 1.9-4.2 3.3-6.8 3.1-.3-2.6.9-5.3 2.4-7 1.6-1.9 4.4-3.2 6.6-3.3.3 2.7-.8 5.4-2.2 7.2zm2.2 3.6c-3.7-.2-6.9 2.1-8.7 2.1-1.8 0-4.5-2-7.4-1.9-3.8.1-7.3 2.2-9.3 5.6-4 6.9-1 17.1 2.8 22.7 1.9 2.8 4.2 5.8 7.1 5.7 2.9-.1 3.9-1.8 7.4-1.8 3.4 0 4.4 1.8 7.4 1.8 3.1-.1 5-2.8 6.9-5.6 2.2-3.2 3-6.3 3.1-6.5-.1 0-5.9-2.3-6-9-.1-5.7 4.6-8.4 4.8-8.5-2.6-3.9-6.7-4.3-8.1-4.6z"/>
                </svg>
                {/* Meta */}
                <span className="text-xl font-bold flex-shrink-0 hover:scale-110 transition-opacity text-[#0082FB]">Meta</span>
                {/* Amazon */}
                <span className="text-xl font-bold flex-shrink-0 hover:scale-110 transition-opacity text-[#FF9900]">amazon</span>
                {/* Netflix */}
                <span className="text-xl font-bold flex-shrink-0 hover:scale-110 transition-opacity text-[#E50914] tracking-wider">NETFLIX</span>
                {/* Spotify */}
                <span className="text-xl font-bold flex-shrink-0 hover:scale-110 transition-opacity text-[#1DB954]">Spotify</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .company-scroll {
          animation: scrollCompanies 25s linear infinite;
        }
        .company-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes scrollCompanies {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ═══ COURSES GRID — Animated on scroll ═══ */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.landingTrendingNow}</h2>
                <p className="text-foreground-secondary text-base">პოპულარული კურსები ამ კვირას</p>
              </div>
              <button onClick={handleSignIn} className="hidden md:flex items-center gap-2 text-brand font-medium hover:underline text-sm">
                ყველას ნახვა <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayCourses.slice(0, 8).map((course, i) => (
              <Reveal key={course.id} delay={i * 0.05}>
                <div
                  onClick={handleSignIn}
                  className="group cursor-pointer bg-card rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-overlay/0 group-hover:bg-overlay/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <Play className="w-5 h-5 text-brand fill-brand ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1.5 group-hover:text-brand transition-colors">{course.title}</h3>
                    <p className="text-xs text-foreground-subtle mb-3">{course.instructor}</p>
                    <div className="flex items-center gap-3 text-xs text-foreground-faint">
                      {course.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </span>
                      )}
                      {course.lessons > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.lessons} გაკვ.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="md:hidden mt-6 text-center">
            <button onClick={handleSignIn} className="text-brand font-medium text-sm flex items-center gap-1 mx-auto">
              ყველას ნახვა <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ WHY BLUEBERRY — Benefits grid ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">რატომ Blueberry?</h2>
              <p className="text-foreground-secondary text-base max-w-xl mx-auto">პლატფორმა, რომელიც შენს კარიერულ ზრდას ემსახურება</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-card border border-border-subtle rounded-2xl p-7 hover:shadow-md transition-all duration-300 hover:border-brand/20 group">
                    <div className="w-11 h-11 rounded-xl bg-brand-subtle flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-20 md:py-28 bg-brand relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-50%] left-[-20%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-[800px] mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {t.landingWorkChanged}<br />{t.landingTimeLearning}
            </h2>
            <p className="text-white/70 text-base mb-10 max-w-md mx-auto">{t.landingPayPerCourse}</p>
            <button
              onClick={handleSignIn}
              className="px-10 py-4 bg-white text-brand rounded-full font-bold text-base hover:bg-white/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.97]"
            >
              {t.landingGetStarted}
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">რას ამბობენ ჩვენი სტუდენტები</h2>
              <p className="text-foreground-secondary text-base">ათასობით სტუდენტმა უკვე შეცვალა კარიერა</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-card border border-border-subtle rounded-2xl p-6 hover:shadow-md transition-all h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground-secondary text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-subtle flex items-center justify-center text-brand font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-foreground-faint">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-[720px] mx-auto px-5 md:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">ხშირად დასმული კითხვები</h2>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card border border-border-subtle rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left group"
                  >
                    <span className="text-sm font-medium text-foreground pr-4">{item.q}</span>
                    <Plus className={`w-5 h-5 text-foreground-faint flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`} />
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
                        <p className="text-sm text-foreground-secondary leading-relaxed px-5 pb-5">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">მზად ხარ დასაწყებად?</h2>
            <p className="text-foreground-secondary text-base mb-10 max-w-md mx-auto">
              შემოგვიერთდი ათასობით სტუდენტს, რომლებმაც უკვე შეცვალეს კარიერა Blueberry-ით.
            </p>
            <button
              onClick={handleSignIn}
              className="px-10 py-4 bg-brand text-white rounded-full font-bold text-base hover:bg-brand-hover transition-all shadow-md hover:shadow-lg active:scale-[0.97]"
            >
              უფასოდ დაწყება
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border-subtle py-10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="academy" className="h-6 w-auto" />
            <div className="flex items-center gap-6 text-sm text-foreground-faint">
              <span>© 2026 Blueberry Academy</span>
              <a href="#" className="hover:text-foreground transition-colors">პირობები</a>
              <a href="#" className="hover:text-foreground transition-colors">კონფიდენციალურობა</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
