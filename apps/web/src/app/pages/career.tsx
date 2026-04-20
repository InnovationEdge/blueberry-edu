import { useState, useRef } from 'react';
import { MapPin, Briefcase, ArrowRight, Search, ChevronDown, Heart, Zap, X, Upload, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
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

const JOBS = [
  { id: 1, title: 'Sales Manager GEO', type: 'Hybrid', location: 'თბილისი', department: 'Sales', posted: '2 დღის წინ' },
  { id: 2, title: 'General Manager GEO', type: 'Hybrid', location: 'თბილისი', department: 'Management', posted: '3 დღის წინ' },
  { id: 3, title: 'Content Creator GEO', type: 'Remote', location: 'თბილისი', department: 'Marketing', posted: '1 კვირის წინ' },
  { id: 4, title: 'Sales Development Representative', type: 'Hybrid', location: 'თბილისი', department: 'Sales', posted: '4 დღის წინ' },
  { id: 5, title: 'UI/UX Designer', type: 'Remote', location: 'Remote', department: 'Design', posted: '5 დღის წინ' },
  { id: 6, title: 'Full Stack Developer', type: 'Remote', location: 'Remote', department: 'Engineering', posted: '1 დღის წინ' },
  { id: 7, title: 'Marketing Manager', type: 'Hybrid', location: 'თბილისი', department: 'Marketing', posted: '2 კვირის წინ' },
  { id: 8, title: 'Course Instructor (React Native)', type: 'Remote', location: 'Remote', department: 'Education', posted: '3 დღის წინ' },
];

const DEPARTMENTS = ['_all', 'Sales', 'Management', 'Marketing', 'Design', 'Engineering', 'Education'];

export function Career() {
  useDocumentTitle('კარიერა');
  const { language } = useAuth();
  const t = getPageT(language);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('_all');
  const [applyJob, setApplyJob] = useState<string | null>(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', message: '', resume: null as File | null });
  const [applySending, setApplySending] = useState(false);
  const [applySent, setApplySent] = useState(false);

  const filtered = JOBS.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = department === '_all' || job.department === department;
    return matchSearch && matchDept;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/career" />
      <div className="h-[72px]" />

      {/* ═══ HERO ═══ */}
      <section className="bg-gradient-to-br from-[#004aad] to-[#001d4a] text-white relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-[-30%] right-[-15%] w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[120px]" /></div>
        <div className="relative max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <Reveal>
            <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">{t.careerBadge}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-[-0.03em] mb-6 max-w-lg">
              {t.careerHeroTitle}
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-md mb-10">
              {t.careerHeroDesc}
            </p>
            <a href="#positions" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#004aad] rounded-full font-semibold text-sm hover:bg-white/90 transition-all active:scale-[0.97]">
              {t.careerViewPositions}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>


      {/* ═══ POSITIONS ═══ */}
      <section id="positions" className="py-14 md:py-20">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">

          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-faint" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.careerSearchPlaceholder}
                className="w-full h-12 pl-11 pr-4 rounded-lg border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad] transition-colors"
              />
            </div>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="appearance-none h-12 bg-background border border-border-subtle rounded-lg pl-4 pr-10 text-sm cursor-pointer min-w-[200px]"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d === '_all' ? t.careerAllDepartments : d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-faint pointer-events-none" />
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-foreground-faint">{filtered.length} {t.jobsCount}</p>
          </div>

          {/* Job list */}
          <div className="space-y-4">
            {filtered.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.03}>
                <button onClick={() => { setApplyJob(job.title); setApplySent(false); setApplyForm({ name: '', email: '', phone: '', message: '', resume: null }); }} className="w-full text-left block bg-card border border-border-subtle rounded-2xl p-6 md:p-8 hover:border-[#004aad]/30 hover:shadow-xl transition-all duration-300 group glow-card">
                  <div className="flex items-center justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-[#004aad] group-hover:underline mb-3">{job.title}</h3>
                      <div className="flex items-center gap-6 text-sm text-foreground-faint">
                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 shrink-0" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 shrink-0" />
                          {job.location}
                        </span>
                        <span className="hidden sm:inline text-foreground-faint/60">{job.department}</span>
                      </div>
                    </div>
                    <span className="shrink-0 px-7 py-3 bg-gradient-to-r from-[#004aad] to-[#003d8f] text-white rounded-xl text-sm font-bold group-hover:from-[#003d8f] group-hover:to-[#002d6b] transition-all shadow-sm">
                      {t.careerViewJob}
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-foreground-faint">
              <p className="text-base mb-1">{t.careerNoResults}</p>
              <p className="text-sm">{t.careerTryOther}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ APPLY MODAL ═══ */}
      <AnimatePresence>
        {applyJob && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setApplyJob(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-card border border-border-subtle rounded-2xl z-50 p-8 overflow-y-auto max-h-[90vh] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">{t.careerViewJob}</h3>
                  <p className="text-sm text-[#004aad] mt-1">{applyJob}</p>
                </div>
                <button onClick={() => setApplyJob(null)} className="p-2 text-foreground-faint hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
              </div>

              {applySent ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">განაცხადი გაგზავნილია!</h3>
                  <p className="text-sm text-foreground-secondary">ჩვენ განვიხილავთ თქვენს რეზიუმეს და 48 საათში დაგიკავშირდებით.</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setApplySending(true);
                  try {
                    const formData = new FormData();
                    formData.append('name', applyForm.name);
                    formData.append('email', applyForm.email);
                    formData.append('phone', applyForm.phone);
                    formData.append('_subject', `ვაკანსია: ${applyJob}`);
                    formData.append('message', applyForm.message);
                    if (applyForm.resume) formData.append('attachment', applyForm.resume);
                    await fetch('https://formsubmit.co/ajax/ikerdikoshv@gmail.com', { method: 'POST', body: formData });
                    setApplySent(true);
                  } catch { /* fallback */ }
                  setApplySending(false);
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground-faint mb-1.5">სახელი და გვარი</label>
                    <input type="text" required value={applyForm.name} onChange={e => setApplyForm({...applyForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-faint mb-1.5">ელ. ფოსტა</label>
                    <input type="email" required value={applyForm.email} onChange={e => setApplyForm({...applyForm, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-faint mb-1.5">ტელეფონი</label>
                    <input type="tel" required value={applyForm.phone} onChange={e => setApplyForm({...applyForm, phone: e.target.value})} placeholder="+995 5XX XXX XXX" className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-faint mb-1.5">რეზიუმე (PDF)</label>
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border-subtle rounded-xl cursor-pointer hover:border-[#004aad]/30 transition-colors bg-surface">
                      <Upload className="w-5 h-5 text-foreground-faint mb-2" />
                      <span className="text-xs text-foreground-faint">{applyForm.resume ? applyForm.resume.name : 'ჩააგდეთ ან დააჭირეთ ასატვირთად'}</span>
                      <span className="text-[10px] text-foreground-faint/60 mt-1">PDF, DOC, DOCX (მაქს 5MB)</span>
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => { if (e.target.files?.[0]) setApplyForm({...applyForm, resume: e.target.files[0]}); }} />
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-faint mb-1.5">დამატებითი ინფორმაცია</label>
                    <textarea value={applyForm.message} onChange={e => setApplyForm({...applyForm, message: e.target.value})} rows={3} placeholder="მოტივაცია, გამოცდილება..." className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad]" />
                  </div>
                  <button type="submit" disabled={applySending} className="w-full py-3.5 bg-gradient-to-r from-[#004aad] to-[#003d8f] text-white rounded-xl font-bold text-sm hover:from-[#003d8f] hover:to-[#002d6b] transition-all disabled:opacity-50 shadow-md">
                    {applySending ? 'იგზავნება...' : 'გაგზავნა'}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ WHY JOIN ═══ */}
      <section className="py-20 md:py-32 bg-surface">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-14">{t.careerWhyJoin}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: t.careerFlexTitle, desc: t.careerFlexDesc },
              { icon: ArrowRight, title: t.careerGrowthTitle, desc: t.careerGrowthDesc },
              { icon: Heart, title: t.careerMissionTitle, desc: t.careerMissionDesc },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <Icon className="w-6 h-6 text-[#004aad] mb-4" />
                    <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
