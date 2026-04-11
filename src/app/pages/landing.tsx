import { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, ArrowRight, Plus } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useAuth } from '../context/auth-context';
import { getAppT } from '../i18n/app';
import { Logo } from '../components/logo';
import { HeroCanvas } from '../components/hero-canvas';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { CourseCardLanding } from '../components/course-card-landing';
import { useLandingCourses } from '../hooks/use-landing-courses';


function HeroVideo() {
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      src="/hero-bg.mp4"
      autoPlay muted loop playsInline preload="auto"
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openLogin, language } = useAuth();
  const t = getAppT(language);
  const heroRef = useRef(null);
  const { data: allCourses = [] } = useLandingCourses();
  const landingCourses = allCourses.slice(0, 8);

  const handleSignIn = () => openLogin();

  const goToCourse = (id?: number) => {
    if (id) window.location.href = `/courses/${id}`;
  };

  const stats = [
    { value: 500, suffix: '+', label: 'კურსდამთავრებული' },
    { value: 98, suffix: '%', label: 'დასაქმდა' },
    { value: 50, suffix: '+', label: 'კურსი' },
    { value: 30, suffix: '+', label: 'ინსტრუქტორი' },
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

      <LandingHeader activePath="/" />

      {/* ═══ HERO — Compact with particle canvas ═══ */}
      <section ref={heroRef} className="relative h-[85vh] flex items-end overflow-hidden bg-transparent">
        {/* Background video — nonstop loop */}
        <HeroVideo />
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        {/* Particle network on top */}
        <div className="absolute inset-0 z-[2]"><HeroCanvas /></div>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-[3]" />

        {/* Content — bottom-left */}
        <div className="relative z-[4] w-full px-5 md:px-12 lg:px-16 self-end pb-20">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white"
            >
              {t.landingHeroTitle1} <span className="bg-gradient-to-r from-[#5b9bd5] via-[#004aad] to-[#5b9bd5] bg-clip-text text-transparent">{t.landingHeroTitle2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm md:text-base text-white/50 leading-relaxed max-w-md mt-5"
            >
              {t.landingHeroSubtitle}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={handleSignIn}
              className="mt-6 px-8 py-3.5 bg-gradient-to-r from-[#004aad] to-[#003d8f] text-white rounded-full font-semibold text-base hover:from-[#003d8f] hover:to-[#002d6b] transition-all shadow-lg shadow-[#004aad]/25 hover:shadow-[#004aad]/40 active:scale-[0.97] inline-flex items-center gap-2"
            >
              {t.landingGetStarted}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </div>
      </section>

      {/* ═══ COMPANIES — Lovable style: centered, faded edges, grayscale ═══ */}
      <section className="relative z-10 py-14 md:py-16 bg-background overflow-hidden">
        <p className="text-center text-foreground-faint text-sm mb-10">
          ჩვენი კურსდამთავრებულები მუშაობენ წამყვან კომპანიებში
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-[18%] bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[18%] bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <div className="company-marquee flex items-center whitespace-nowrap">
            {[0, 1, 2].map((setIdx) => (
              <div key={setIdx} className="company-marquee-set flex items-center shrink-0 gap-16 md:gap-24 px-8 md:px-12" aria-hidden={setIdx > 0}>
                <svg className="h-10 w-auto shrink-0 grayscale opacity-50" viewBox="0 0 272 92"><path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#999"/><path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#999"/><path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#999"/><path d="M225 3v65h-9.5V3h9.5z" fill="#999"/><path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#999"/><path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z" fill="#999"/></svg>
                <svg className="h-9 w-auto shrink-0 grayscale opacity-50" viewBox="0 0 23 23"><rect x="1" y="1" width="10" height="10" fill="#999"/><rect x="12" y="1" width="10" height="10" fill="#999"/><rect x="1" y="12" width="10" height="10" fill="#999"/><rect x="12" y="12" width="10" height="10" fill="#999"/></svg>
                <svg className="h-10 w-auto shrink-0 opacity-50 text-foreground" viewBox="0 0 42 50" fill="currentColor"><path d="M28.2 12.1c-1.6 1.9-4.2 3.3-6.8 3.1-.3-2.6.9-5.3 2.4-7 1.6-1.9 4.4-3.2 6.6-3.3.3 2.7-.8 5.4-2.2 7.2zm2.2 3.6c-3.7-.2-6.9 2.1-8.7 2.1-1.8 0-4.5-2-7.4-1.9-3.8.1-7.3 2.2-9.3 5.6-4 6.9-1 17.1 2.8 22.7 1.9 2.8 4.2 5.8 7.1 5.7 2.9-.1 3.9-1.8 7.4-1.8 3.4 0 4.4 1.8 7.4 1.8 3.1-.1 5-2.8 6.9-5.6 2.2-3.2 3-6.3 3.1-6.5-.1 0-5.9-2.3-6-9-.1-5.7 4.6-8.4 4.8-8.5-2.6-3.9-6.7-4.3-8.1-4.6z"/></svg>
                <span className="text-2xl font-bold shrink-0 opacity-50 text-foreground">Meta</span>
                <span className="text-2xl font-bold shrink-0 opacity-50 text-foreground">amazon</span>
                <span className="text-2xl font-bold shrink-0 opacity-50 text-foreground tracking-wider">NETFLIX</span>
                <span className="text-2xl font-bold shrink-0 opacity-50 text-foreground">Spotify</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .company-marquee {
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* ═══ COURSES — Lovable "Discover templates" style ═══ */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="px-5 md:px-12 lg:px-16">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">ტოპ კურსები</h2>
                <p className="text-foreground-secondary text-base">აღმოაჩინე საუკეთესო კურსები ჩვენი პროფესიონალებისგან</p>
              </div>
              <button onClick={handleSignIn} className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-border-subtle rounded-full text-sm font-medium text-foreground hover:bg-surface-hover transition-all shrink-0">
                View all
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {landingCourses.map((course, i) => (
              <Reveal key={course.id ?? i} delay={i * 0.05}>
                <CourseCardLanding course={course} onClick={() => goToCourse(course.id)} />
              </Reveal>
            ))}
          </div>

          <div className="md:hidden text-center mt-8">
            <button onClick={handleSignIn} className="px-8 py-3 border border-border-subtle rounded-full text-sm font-medium text-foreground hover:bg-surface-hover transition-all">
              ყველას ნახვა
            </button>
          </div>
        </div>
      </section>

      {/* ═══ STATS — ჩვენ რიცხვებში ═══ */}
      <section className="py-14 md:py-20 border-b border-border-subtle">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">ჩვენ რიცხვებში</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="text-4xl md:text-5xl font-bold text-foreground leading-none tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-foreground-faint mt-3">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATE ═══ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — Certificate (Coursera/Penn style) */}
            <Reveal>
              <div className="relative bg-white shadow-2xl rounded-sm overflow-hidden aspect-[1.414/1]">
                {/* Wavy ornament border — CSS pattern */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  borderImage: 'repeating-linear-gradient(45deg, #004aad18, #004aad18 2px, transparent 2px, transparent 8px) 14',
                  borderWidth: '14px',
                  borderStyle: 'solid',
                }} />

                <div className="relative p-6 md:p-8">
                  {/* Right ribbon — Coursera exact style, long hanging */}
                  <div className="absolute -top-[14px] right-5 z-10" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))' }}>
                    <div className="w-[110px] flex flex-col items-center" style={{ height: '65%', minHeight: '260px', background: 'linear-gradient(180deg, #f8f8f8 0%, #efefef 40%, #e0e0e0 80%, #cccccc 100%)', clipPath: 'polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)', borderLeft: '1px solid rgba(0,0,0,0.06)', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                      {/* Top text */}
                      <div className="pt-8 mb-8">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-600 font-bold leading-relaxed text-center">Course<br />Certificate</p>
                      </div>

                      {/* Spacer to push logo to bottom area */}
                      <div className="flex-1" />

                      {/* Seal — outer ring with text + logo center */}
                      <div className="relative w-[80px] h-[80px] mb-8">
                        {/* Outer dashed ring */}
                        <div className="absolute inset-0 rounded-full border-[2px] border-[#5a6d7e]" />
                        <div className="absolute inset-[4px] rounded-full border border-[#5a6d7e]/30" />
                        {/* Ring text — top arc */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                          <defs>
                            <path id="topArc" d="M 12,40 a 28,28 0 1,1 56,0" />
                            <path id="bottomArc" d="M 68,40 a 28,28 0 1,1 -56,0" />
                          </defs>
                          <text className="fill-[#5a6d7e]" style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                            <textPath href="#topArc" startOffset="50%" textAnchor="middle">EDUCATION FOR EVERYONE</textPath>
                          </text>
                          <text className="fill-[#5a6d7e]" style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                            <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">COURSE CERTIFICATE</textPath>
                          </text>
                        </svg>
                        {/* Center — logo */}
                        <div className="absolute inset-[10px] rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <Logo variant="academy" className="h-12 w-auto" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for removed logo */}
                  <div className="mb-5 h-14" />

                  {/* Date */}
                  <p className="text-[11px] text-gray-400 italic mb-3" style={{ fontFamily: 'Georgia, serif' }}>აპრილი 05, 2026</p>

                  {/* Name */}
                  <p className="text-xl md:text-2xl text-gray-900 leading-tight mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>გიორგი ბერიძე</p>

                  {/* Completed text */}
                  <p className="text-[11px] text-gray-400 italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>წარმატებით დაასრულა</p>

                  {/* Course */}
                  <p className="text-sm md:text-base font-bold text-gray-900 italic mb-5" style={{ fontFamily: 'Georgia, serif' }}>React Native Development</p>

                  {/* Bottom — signature left, seal + verify right */}
                  <div className="flex items-end justify-between">
                    <div>
                      <svg viewBox="0 0 200 50" className="w-32 h-8 text-gray-700">
                        <text x="5" y="38" style={{ fontFamily: 'Brush Script MT, Dancing Script, cursive', fontSize: '32px', fill: 'currentColor' }}>T. Shakeladze</text>
                      </svg>
                      <div className="w-32 border-b border-gray-300 mb-1" />
                      <p className="text-[10px] text-gray-500 font-medium">Founder & CEO</p>
                      <p className="text-[9px] text-gray-400">Blueberry Academy</p>
                    </div>

                    <div className="text-right">
                      <p className="text-[8px] text-gray-300">Verify at blueberry.academy/verify/<span className="font-mono">BB04821</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — Description */}
            <Reveal delay={0.15}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-5">მიიღე <span className="text-brand">სერტიფიკატი</span></h2>
                <p className="text-foreground-secondary text-base leading-relaxed mb-8">კურსის დასრულების შემდეგ მიიღებ ვერიფიცირებულ სერტიფიკატს. გააზიარე LinkedIn-ზე, დაამატე CV-ში და დამსაქმებლები ნახავენ შენს უნარებს.</p>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground-secondary"><span className="font-semibold text-foreground">ონლაინ გადამოწმებადი</span> · თითოეულ სერტიფიკატს აქვს უნიკალური ID</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground-secondary"><span className="font-semibold text-foreground">LinkedIn-თან ინტეგრაცია</span> · პირდაპირ პროფილში დამატება</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground-secondary"><span className="font-semibold text-foreground">პრაქტიკაზე დაფუძნებული</span> · რეალური პროექტები, არა მხოლოდ თეორია</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-brand mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground-secondary"><span className="font-semibold text-foreground">უვადო</span> · სერტიფიკატი შენია სამუდამოდ</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
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
      <LandingFooter />
    </div>
  );
}
