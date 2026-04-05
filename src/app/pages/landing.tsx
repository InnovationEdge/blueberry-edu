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
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center justify-between px-5 md:px-12 lg:px-16 py-4">
          <Logo variant="academy" className="h-8 md:h-9 w-auto" forceDark />

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
            className="flex items-center gap-10 md:gap-16 mt-16"
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

      {/* No extra style block needed — video handles hero background */}

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
            <Logo variant="academy" className="h-7 w-auto" />
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
