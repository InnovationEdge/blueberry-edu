import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, Play, Star, Clock, Users, Award, CheckCircle, Zap, BookOpen, Globe, ArrowRight, Plus, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react';
import { useAuth } from '../context/auth-context';
import { useTheme } from 'next-themes';
import { getAppT } from '../i18n/app';
import { Logo } from '../components/logo';
import { usePopularCourses, useAllCourses } from '../hooks/use-courses';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const { openLogin, language, setLanguage } = useAuth();
  const { theme, setTheme } = useTheme();
  const t = getAppT(language);
  const { data: apiCourses = [] } = usePopularCourses();
  const { data: allCourses = [] } = useAllCourses();

  const languages = ['ქართული', 'English', 'Русский'];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignIn = () => openLogin();

  const displayCourses = apiCourses.length > 0 ? apiCourses : allCourses;

  const stats = [
    { value: '50+', label: 'კურსი' },
    { value: '10K+', label: 'სტუდენტი' },
    { value: '30+', label: 'ინსტრუქტორი' },
    { value: '95%', label: 'კმაყოფილება' },
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg' : ''
      }`}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5 md:px-8 py-4">
          <Logo variant="academy" className="h-14 md:h-16 w-auto" forceDark />

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
                            language === lang ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-white/60 hover:bg-white/10 hover:text-white'
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

      {/* ═══ HERO — Tech / Neural Network Style ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a1a]">
        {/* Animated tech background — neural network sphere */}
        <div className="absolute inset-0">
          {/* Radial glow */}
          <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(26,115,232,0.15)_0%,rgba(26,115,232,0.05)_40%,transparent_70%)]" />

          {/* Animated particles via CSS */}
          <div className="hero-particles absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                style={{
                  left: `${20 + Math.random() * 70}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Neural network lines SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a73e8" stopOpacity="0" />
                <stop offset="50%" stopColor="#1a73e8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1a73e8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Network connection lines */}
            {[
              'M200,100 Q400,200 600,150', 'M100,300 Q350,250 500,400', 'M600,100 Q750,300 900,200',
              'M300,500 Q500,350 700,500', 'M150,200 Q300,400 500,300', 'M700,300 Q850,150 1000,250',
              'M400,100 Q550,250 700,180', 'M200,450 Q400,500 600,400', 'M500,200 Q650,350 800,280',
              'M100,150 Q250,300 400,250', 'M600,350 Q800,400 950,300', 'M350,350 Q500,200 650,350',
            ].map((d, i) => (
              <path key={i} d={d} stroke="url(#lineGrad1)" strokeWidth="1" fill="none" className="hero-network-line" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
            {/* Glowing nodes */}
            {[
              [200,100],[400,200],[600,150],[500,400],[300,300],[750,250],[850,350],[150,400],[650,300],[450,150],[350,450],[700,180],[550,350],[250,250],[800,150],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#1a73e8" opacity="0.5" className="hero-node" style={{ animationDelay: `${i * 0.2}s` }}>
                <animate attributeName="r" values="2;4;2" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-[#0a0a1a]/50" />
        </div>

        {/* Content */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
                <Zap className="w-4 h-4" />
                ახალი კურსები ყოველ კვირას
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6"
            >
              {t.landingHeroTitle1}
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">{t.landingHeroTitle2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-lg"
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
                className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-base hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.97] flex items-center gap-2"
              >
                {t.landingGetStarted}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleSignIn}
                className="px-6 py-3.5 border border-white/15 text-white/80 rounded-full font-medium text-base hover:bg-white/5 hover:border-white/25 transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                ვიდეო ნახვა
              </button>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-10 md:gap-16 mt-20 pt-10 border-t border-white/10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Hero animations */}
      <style>{`
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-15px) translateX(8px); opacity: 0.6; }
          50% { transform: translateY(-5px) translateX(-5px); opacity: 0.4; }
          75% { transform: translateY(-20px) translateX(3px); opacity: 0.7; }
        }
        .hero-network-line {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawLine 3s ease-in-out infinite alternate;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
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
