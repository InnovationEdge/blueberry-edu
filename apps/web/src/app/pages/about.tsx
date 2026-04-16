import { useRef, useState, useEffect } from 'react';
import { Target, Eye, Users, Award, BookOpen, Building2, GraduationCap, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { useDocumentTitle } from '../hooks/use-document-title';
import { useAuth } from '../context/auth-context';
import { getPageT } from '../i18n/pages';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const steps = 50;
    const inc = value / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= value) { setCount(value); clearInterval(timer); } else setCount(Math.floor(cur));
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function About() {
  useDocumentTitle('ჩვენს შესახებ');
  const { language } = useAuth();
  const t = getPageT(language);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/about" />
      <div className="h-[72px]" />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-[#004aad] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-40%] right-[-15%] w-[700px] h-[700px] bg-white/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-white/3 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4">{t.aboutBadge}</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.1] mb-6">
                {t.aboutHeroTitle}
              </h1>
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
                {t.aboutHeroDesc}
              </p>
              <a href="/courses" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#004aad] rounded-full font-semibold text-sm hover:bg-white/90 transition-all active:scale-[0.97]">
                {t.aboutViewCourses} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative -mt-12 z-10 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-card border border-border-subtle rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 divide-x divide-border-subtle">
            {[
              { value: 500, suffix: '+', label: 'კურსდამთავრებული' },
              { value: 98, suffix: '%', label: 'დასაქმდა' },
              { value: 50, suffix: '+', label: 'კურსი' },
              { value: 30, suffix: '+', label: 'ინსტრუქტორი' },
            ].map((stat, i) => (
              <div key={i} className="py-8 px-6 text-center">
                <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#004aad] leading-none">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-foreground-faint mt-2 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-sm text-[#004aad] font-semibold uppercase tracking-wider mb-3 text-center">{t.aboutWhatWeDo}</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-14">{t.aboutTwoDirections}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="bg-card border border-border-subtle rounded-2xl p-8 md:p-10 h-full hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-[#004aad] flex items-center justify-center mb-6">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{t.aboutWorkshopsTitle}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                  {t.aboutWorkshopsDesc}
                </p>
                <ul className="space-y-2.5">
                  {[t.aboutWorkshopsBullet1, t.aboutWorkshopsBullet2, t.aboutWorkshopsBullet3, t.aboutWorkshopsBullet4].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-foreground-secondary">
                      <CheckCircle className="w-4 h-4 text-[#004aad] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-card border border-border-subtle rounded-2xl p-8 md:p-10 h-full hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-[#004aad] flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{t.aboutPartnerTitle}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                  {t.aboutPartnerDesc}
                </p>
                <ul className="space-y-2.5">
                  {[t.aboutPartnerBullet1, t.aboutPartnerBullet2, t.aboutPartnerBullet3, t.aboutPartnerBullet4].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-foreground-secondary">
                      <CheckCircle className="w-4 h-4 text-[#004aad] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section className="py-16 md:py-24 bg-[#060611] text-white">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-sm text-[#5b9bd5] font-semibold uppercase tracking-wider mb-3 text-center">{t.aboutDirection}</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-14">{t.aboutMissionVision}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/[0.03] h-full">
                <Target className="w-8 h-8 text-[#5b9bd5] mb-6" />
                <h3 className="text-xl font-bold mb-4">{t.aboutMission}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t.aboutMissionDesc}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/[0.03] h-full">
                <Eye className="w-8 h-8 text-[#5b9bd5] mb-6" />
                <h3 className="text-xl font-bold mb-4">{t.aboutVision}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t.aboutVisionDesc}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-sm text-[#004aad] font-semibold uppercase tracking-wider mb-3 text-center">{t.aboutPrinciples}</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-14">{t.aboutWhatDrivesUs}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: BookOpen, title: t.aboutValue1Title, desc: t.aboutValue1Desc },
              { icon: Users, title: t.aboutValue2Title, desc: t.aboutValue2Desc },
              { icon: Award, title: t.aboutValue3Title, desc: t.aboutValue3Desc },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#004aad]/10 flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-7 h-7 text-[#004aad]" />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.aboutCollaboration}</h2>
            <p className="text-sm text-foreground-secondary leading-relaxed mb-8">
              {t.aboutCollabDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:info@blueberry.academy" className="px-8 py-3.5 bg-[#004aad] text-white rounded-full font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] inline-flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" /> info@blueberry.academy
              </a>
              <a href="/career" className="px-8 py-3.5 border border-border-subtle text-foreground rounded-full font-semibold text-sm hover:bg-surface-hover transition-all active:scale-[0.97] inline-flex items-center justify-center gap-2">
                ღია პოზიციები <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
