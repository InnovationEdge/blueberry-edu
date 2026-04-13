import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronDown, ChevronUp, Clock, Globe, Calendar, MapPin, User, ArrowLeft, CheckCircle, Plus } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { useCourseDetail } from '../hooks/use-course-detail';
import { useCourseRegistration } from '../hooks/use-registration';
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

export function CourseLandingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = parseInt(id ?? '1');
  const { data: course, isLoading, error } = useCourseDetail(courseId);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' });
  const registration = useCourseRegistration(courseId);
  const { language } = useAuth();
  const t = getPageT(language);
  useDocumentTitle(course?.title ?? t.loading);

  const sections = [
    { id: 'overview', label: t.detailOverview },
    { id: 'syllabus', label: t.detailSyllabus },
    { id: 'schedule', label: t.detailSchedule },
    { id: 'faq', label: t.detailFaq },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <LandingHeader activePath="/courses" />
        <div className="h-[72px]" />
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center text-foreground-faint">{t.loading}</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <LandingHeader activePath="/courses" />
        <div className="h-[72px]" />
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <p className="text-foreground-faint mb-4">კურსი ვერ მოიძებნა</p>
          <button onClick={() => navigate('/courses')} className="px-6 py-3 bg-[#004aad] text-white rounded-xl text-sm font-semibold">კურსებზე დაბრუნება</button>
        </div>
      </div>
    );
  }

  const syllabus = course.course_syllabus ?? [];
  const faq = course.course_faq ?? [];
  const learningOutcomes = course.learning_outcomes ?? [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registration.submit({ full_name: regForm.name, email: regForm.email, phone: regForm.phone });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/courses" />
      <div className="h-[72px]" />

      {/* ═══ HERO BANNER ═══ */}
      <section className="relative overflow-hidden" style={course.image_url ? { backgroundImage: `linear-gradient(135deg, rgba(232,244,253,0.92), rgba(240,244,255,0.92)), url(${course.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: 'linear-gradient(to right, #e8f4fd, #f0f4ff)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-14">
          <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-sm text-foreground-faint hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> კურსებზე დაბრუნება
          </button>
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <div className="flex items-center gap-5 text-sm text-gray-500 mb-5 flex-wrap">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#004aad]" />{course.tribe}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{course.format ?? 'ონლაინ'}</span>
                {course.level && <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{course.level}</span>}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
            </div>
            {course.logo && (
              <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white shadow-md border border-gray-100 items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: course.logo }} />
            )}
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 md:gap-14">

          {/* ═══ LEFT ═══ */}
          <div>
            {/* Overview / Learning outcomes */}
            {learningOutcomes.length > 0 && (
              <Reveal>
                <section id="overview" className="mb-14">
                  <h2 className="text-xl font-bold mb-5">რა შეიძენ ამ კურსზე</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {learningOutcomes.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-surface rounded-xl p-4">
                        <CheckCircle className="w-5 h-5 text-[#004aad] mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            {/* Mentor */}
            {(course.mentor_name || course.mentor_bio) && (
              <Reveal>
                <section className="mb-14">
                  <h2 className="text-xl font-bold mb-5">მენტორი</h2>
                  <div className="bg-card border border-border-subtle rounded-xl p-6 flex gap-5">
                    {course.mentor_photo && (
                      <img src={course.mentor_photo} alt={course.mentor_name} className="w-24 h-24 rounded-full object-cover shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.mentor_name}</h3>
                      <p className="text-sm text-[#004aad] mb-3">{course.mentor_role}</p>
                      {course.mentor_bio && (
                        <p className="text-sm text-foreground-secondary leading-relaxed whitespace-pre-line">{course.mentor_bio}</p>
                      )}
                    </div>
                  </div>
                </section>
              </Reveal>
            )}

            {/* Syllabus */}
            {syllabus.length > 0 && (
              <Reveal>
                <section id="syllabus" className="mb-14">
                  <h2 className="text-xl font-bold mb-5">სილაბუსი</h2>
                  <div className="space-y-3">
                    {syllabus.map((module, i) => (
                      <div key={module.id ?? i} className="border border-border-subtle rounded-xl overflow-hidden">
                        <button onClick={() => setOpenModule(openModule === i ? null : i)} className="w-full flex items-center justify-between p-5 hover:bg-surface/50 transition-colors">
                          <div className="flex items-center gap-4">
                            {openModule === i ? <ChevronUp className="w-5 h-5 text-foreground-faint" /> : <ChevronDown className="w-5 h-5 text-foreground-faint" />}
                            <span className="font-semibold text-sm text-left">{module.title}</span>
                          </div>
                          <span className="text-xs text-foreground-faint bg-surface px-3 py-1.5 rounded-full font-medium">Module {i + 1}</span>
                        </button>
                        <AnimatePresence>
                          {openModule === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                              <ul className="px-5 pb-5 pt-2 space-y-3 border-t border-border-subtle">
                                {module.topics.map((topic, j) => (
                                  <li key={j} className="flex items-center gap-3 text-sm text-foreground-secondary">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#004aad]/40 shrink-0" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            {/* Schedule */}
            <Reveal>
              <section id="schedule" className="mb-14">
                <h2 className="text-xl font-bold mb-5">განრიგი</h2>
                <div className="bg-card border border-border-subtle rounded-xl divide-y divide-border-subtle">
                  {[
                    { icon: Calendar, label: 'დაწყების თარიღი', value: course.start_date ?? '—' },
                    { icon: Clock, label: t.detailDuration, value: course.duration },
                    { icon: User, label: 'მენტორი', value: course.mentor_name ?? '—', sub: course.mentor_role },
                    { icon: MapPin, label: t.detailFormat, value: course.format ?? 'Google Meet' },
                    { icon: Calendar, label: t.detailScheduleDays, value: course.schedule_days ?? '—' },
                    { icon: Clock, label: 'სალექციო დრო', value: course.schedule_time ?? '—' },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <div key={i} className="flex items-center justify-between py-4 px-5">
                        <span className="flex items-center gap-3 text-sm text-foreground-faint"><Icon className="w-4 h-4 shrink-0" /> {row.label}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium">{row.value}</span>
                          {row.sub && <span className="block text-xs text-foreground-faint">{row.sub}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Reveal>

            {/* FAQ */}
            {faq.length > 0 && (
              <Reveal>
                <section id="faq" className="mb-14">
                  <h2 className="text-xl font-bold mb-5">ხშირად დასმული კითხვები</h2>
                  <div className="space-y-3">
                    {faq.map((item, i) => (
                      <div key={item.id ?? i} className="bg-card border border-border-subtle rounded-xl overflow-hidden">
                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                          <span className="text-sm font-medium pr-4">{item.question}</span>
                          <Plus className={`w-5 h-5 text-foreground-faint shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                              <p className="text-sm text-foreground-secondary leading-relaxed px-5 pb-5">{item.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          {/* ═══ RIGHT SIDEBAR ═══ */}
          <div>
            <div className="sticky top-[88px] space-y-5">
              {/* Price + Register */}
              <div className="bg-card border border-border-subtle rounded-2xl p-6 shadow-sm">
                <p className="text-3xl font-bold mb-1">{course.price}₾</p>
                <p className="text-sm text-foreground-faint mb-5">დაწყება: {course.start_date ?? '—'}</p>

                {!registration.isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3 mb-4">
                    <input type="text" required value={regForm.name} onChange={e => setRegForm({ ...regForm, name: e.target.value })} placeholder="სახელი და გვარი" className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad]" />
                    <input type="email" required value={regForm.email} onChange={e => setRegForm({ ...regForm, email: e.target.value })} placeholder="ელ. ფოსტა" className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad]" />
                    <input type="tel" required value={regForm.phone} onChange={e => setRegForm({ ...regForm, phone: e.target.value })} placeholder="+995 5XX XXX XXX" className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad]" />
                    {registration.error && <p className="text-xs text-red-500">{registration.error}</p>}
                    <button type="submit" disabled={registration.isSubmitting} className="w-full py-3.5 bg-[#004aad] text-white rounded-xl font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] disabled:opacity-50">
                      {registration.isSubmitting ? t.mcSending : t.detailRegisterBtn}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4 mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold">{t.mcSuccessTitle}</p>
                    <p className="text-xs text-foreground-faint mt-1">დაგიკავშირდებით მალე</p>
                  </div>
                )}

                <a href="/masterclass" className="block w-full py-3 border border-border-subtle text-foreground text-center rounded-xl text-sm font-medium hover:bg-surface-hover transition-all">
                  უფასო მასტერკლასი
                </a>
              </div>

              {/* Section nav */}
              <div className="bg-card border border-border-subtle rounded-2xl overflow-hidden">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} onClick={() => setActiveSection(s.id)} className={`block px-5 py-4 text-sm transition-colors border-l-[3px] ${activeSection === s.id ? 'border-[#004aad] text-[#004aad] font-semibold bg-[#004aad]/5' : 'border-transparent text-foreground-faint hover:text-foreground hover:bg-surface-hover'}`}>
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Quick info */}
              <div className="bg-surface rounded-2xl p-5 space-y-3">
                {[
                  { label: t.detailCategory, value: course.tribe },
                  { label: t.detailDuration, value: course.duration },
                  { label: t.detailFormat, value: course.format ?? 'Google Meet' },
                  { label: t.detailLevel, value: course.level ?? '—' },
                  { label: t.detailLanguage, value: course.language ?? 'ქართული' },
                  { label: 'მენტორი', value: course.mentor_name ?? '—' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground-faint">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
