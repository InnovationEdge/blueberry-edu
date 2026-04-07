import { CheckCircle, Award, Globe, Shield, Download, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { Logo } from '../components/logo';
import { CertificatePreview } from '../components/certificate-preview';
import { LANDING_COURSES } from '../data/courses-landing';

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/certificates" />
      <div className="h-[72px]" />

      {/* ═══ HERO ═══ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-surface to-background">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-[#004aad]/10 text-[#004aad] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" /> სერტიფიკატები
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              დაადასტურე შენი ცოდნა<br /><span className="text-[#004aad]">ოფიციალურად</span>
            </h1>
            <p className="text-foreground-secondary text-base md:text-lg max-w-2xl mx-auto">
              Blueberry Academy-ს სერტიფიკატი ადასტურებს შენს კომპეტენციას და ეხმარება კარიერულ წინსვლაში. ყოველი კურსის დასრულებისას მიიღებ ვერიფიცირებულ სერტიფიკატს.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CERTIFICATE PREVIEW ═══ */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[700px] mx-auto px-5 md:px-12 lg:px-16">
          <Reveal>
            <CertificatePreview />
          </Reveal>
        </div>
      </section>

      {/* ═══ WHY OUR CERTIFICATE ═══ */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12 lg:px-16">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">რატომ ღირს ჩვენი სერტიფიკატი</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'ვერიფიცირებული', desc: 'თითოეულ სერტიფიკატს აქვს უნიკალური ID, რომელიც ონლაინ გადამოწმებადია' },
              { icon: Globe, title: 'საერთაშორისო', desc: 'LinkedIn-ზე გაზიარება და CV-ში დამატება, დამსაქმებლები აღიარებენ' },
              { icon: Award, title: 'პროექტებით', desc: 'სერტიფიკატი მოიცავს შენს რეალურ პროექტებს, არა მხოლოდ თეორიას' },
              { icon: Download, title: 'უვადო', desc: 'სერტიფიკატი შენია სამუდამოდ, ნებისმიერ დროს ჩამოტვირთვა და გაზიარება' },
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
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">ხელმისაწვდომი სერტიფიკატები</h2>
            <p className="text-foreground-secondary text-center mb-12 max-w-lg mx-auto">ყოველი კურსის წარმატებით დასრულებისას მიიღებ შესაბამის სერტიფიკატს</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LANDING_COURSES.map((course, i) => (
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
                      <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> ვერიფიცირებული</span>
                      <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> ონლაინ</span>
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
            <h2 className="text-2xl font-bold mb-3">სერტიფიკატის გადამოწმება</h2>
            <p className="text-foreground-secondary text-sm mb-6">შეიყვანე სერტიფიკატის ID რომ გადაამოწმო ავთენტურობა</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="text"
                placeholder="მაგ. BB-04821"
                className="flex-1 px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]/20"
              />
              <button className="px-6 py-3 bg-[#004aad] text-white rounded-xl font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> შემოწმება
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
