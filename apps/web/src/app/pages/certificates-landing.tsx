import { CheckCircle, Award, Globe, Shield, Download, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { Logo } from '../components/logo';
import { useLandingCourses } from '../hooks/use-landing-courses';
import { useDocumentTitle } from '../hooks/use-document-title';
import { useAuth } from '../context/auth-context';
import { getPageT } from '../i18n/pages';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export function CertificatesLanding() {
  useDocumentTitle('სერტიფიკატები');
  const { language } = useAuth();
  const t = getPageT(language);
  const { data: courses = [] } = useLandingCourses();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/certificates" />
      <div className="h-[72px]" />

      {/* ═══ HERO ═══ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-surface to-background">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#004aad]/10 text-[#004aad] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" /> {t.certBadge}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              {t.certHeroTitle1}<br /><span className="text-[#004aad]">{t.certHeroTitle2}</span>
            </h1>
            <p className="text-foreground-secondary text-base md:text-lg max-w-2xl mx-auto">
              {t.certHeroDesc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CERTIFICATE PREVIEW ═══ */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[900px] mx-auto px-5 md:px-12 lg:px-16">
          <Reveal>
            <div className="relative bg-white shadow-2xl rounded-sm overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                borderImage: 'repeating-linear-gradient(45deg, #004aad18, #004aad18 2px, transparent 2px, transparent 8px) 14',
                borderWidth: '14px',
                borderStyle: 'solid',
              }} />
              <div className="relative p-8 md:p-12">
                {/* Ribbon */}
                <div className="absolute -top-[14px] right-7 z-10" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))' }}>
                  <div className="w-[100px] flex flex-col items-center" style={{ height: '280px', background: 'linear-gradient(180deg, #f8f8f8 0%, #efefef 40%, #e0e0e0 80%, #cccccc 100%)', clipPath: 'polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)' }}>
                    <div className="pt-8 mb-8">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gray-600 font-bold leading-relaxed text-center">Course<br />Certificate</p>
                    </div>
                    <div className="flex-1" />
                    <div className="relative w-[80px] h-[80px] mb-8">
                      <div className="absolute inset-0 rounded-full border-[2px] border-[#004aad]" />
                      <div className="absolute inset-[4px] rounded-full border border-[#004aad]/30" />
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                        <defs>
                          <path id="topArc2" d="M 12,40 a 28,28 0 1,1 56,0" />
                          <path id="bottomArc2" d="M 68,40 a 28,28 0 1,1 -56,0" />
                        </defs>
                        <text className="fill-[#004aad]" style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                          <textPath href="#topArc2" startOffset="50%" textAnchor="middle">EDUCATION FOR EVERYONE</textPath>
                        </text>
                        <text className="fill-[#004aad]" style={{ fontSize: '6px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                          <textPath href="#bottomArc2" startOffset="50%" textAnchor="middle">COURSE CERTIFICATE</textPath>
                        </text>
                      </svg>
                      <div className="absolute inset-[10px] rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <Logo variant="academy" className="h-12 w-auto" />
                      </div>
                    </div>
                  </div>
                </div>

                <Logo variant="academy" className="h-14 w-auto mb-6" />
                <p className="text-[11px] text-gray-400 italic mb-3" style={{ fontFamily: 'Georgia, serif' }}>აპრილი 05, 2026</p>
                <p className="text-2xl md:text-3xl text-gray-900 leading-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>{t.certSampleName}</p>
                <p className="text-[11px] text-gray-400 italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>{t.certSampleCompleted}</p>
                <p className="text-base md:text-lg font-bold text-gray-900 italic mb-8" style={{ fontFamily: 'Georgia, serif' }}>{t.certSampleCourse}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <svg viewBox="0 0 200 50" className="w-32 h-8 text-gray-700">
                      <text x="5" y="38" style={{ fontFamily: 'Brush Script MT, Dancing Script, cursive', fontSize: '32px', fill: 'currentColor' }}>T. Shakeladze</text>
                    </svg>
                    <div className="w-32 border-b border-gray-300 mb-1" />
                    <p className="text-[10px] text-gray-500 font-medium">Founder & CEO</p>
                    <p className="text-[9px] text-gray-400">Blueberry Academy</p>
                  </div>
                  <p className="text-[8px] text-gray-300">blueberry.academy/verify/<span className="font-mono">XXXXXX</span></p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHY OUR CERTIFICATE ═══ */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t.certWhyTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: t.certWhyVerified, desc: t.certWhyVerifiedDesc },
              { icon: Globe, title: t.certWhyInternational, desc: t.certWhyInternationalDesc },
              { icon: Award, title: t.certWhyProjects, desc: t.certWhyProjectsDesc },
              { icon: Download, title: t.certWhyForever, desc: t.certWhyForeverDesc },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-card border border-border-subtle rounded-2xl p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-[#004aad]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#004aad]" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ AVAILABLE CERTIFICATES ═══ */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{t.certAvailable}</h2>
            <p className="text-foreground-secondary text-center mb-12 max-w-lg mx-auto">{t.certAvailableDesc}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <Reveal key={course.id} delay={i * 0.05}>
                <div className="bg-card border border-border-subtle rounded-2xl overflow-hidden hover:shadow-md transition-all group">
                  {/* Gradient top */}
                  <div className={`bg-gradient-to-br ${course.gradient} h-3`} />
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-white/80 border border-border-subtle flex items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: course.logo }} />
                      <div>
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <p className="text-[11px] text-foreground-faint">{course.tribe} · {course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-foreground-faint">
                      <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> {t.certVerified}</span>
                      <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {t.certOnline}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VERIFY SECTION ═══ */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-[600px] mx-auto px-5 md:px-12 text-center">
          <Reveal>
            <Shield className="w-10 h-10 text-[#004aad] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">{t.certVerifyTitle}</h2>
            <p className="text-foreground-secondary text-sm mb-6">{t.certVerifyDesc}</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="text"
                placeholder={t.certVerifyPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]/20"
              />
              <button className="px-6 py-3 bg-[#004aad] text-white rounded-xl font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> {t.certVerifyBtn}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
