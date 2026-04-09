import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronDown, ChevronUp, Clock, Globe, Calendar, MapPin, User, ArrowLeft, ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { LANDING_COURSES } from '../data/courses-landing';
import { useAuth } from '../context/auth-context';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const COURSE_DETAILS: Record<number, {
  fullDesc: string;
  learningOutcomes: string[];
  mentor: { name: string; role: string };
  schedule: { days: string; time: string };
  startDate: string;
  syllabus: { title: string; topics: string[] }[];
  faq: { q: string; a: string }[];
}> = {
  1: {
    fullDesc: 'React Native კურსი განკუთვნილია იმ ადამიანებისთვის, ვისაც სურთ მობილური აპლიკაციების შექმნა iOS და Android პლატფორმებისთვის ერთი კოდის ბაზით. კურსი მოიცავს ყველაფერს, კომპონენტებიდან App Store-ში გამოქვეყნებამდე.',
    learningOutcomes: [
      'React Native-ის ფუნდამენტური კონცეფციები და კომპონენტები',
      'ნავიგაცია, state management და API ინტეგრაცია',
      'Expo და EAS Build-ის გამოყენება',
      'App Store და Google Play-ში გამოქვეყნება',
      'რეალური პროექტის შექმნა პორტფოლიოსთვის',
    ],
    mentor: { name: 'გიორგი ბერიძე', role: 'Senior Mobile Developer' },
    schedule: { days: 'სამშაბათი, ხუთშაბათი', time: '19:00 - 21:00' },
    startDate: '28 აპრ. 2026',
    syllabus: [
      { title: 'React Native საფუძვლები', topics: ['კომპონენტები და JSX', 'Props და State', 'StyleSheet და Flexbox', 'ScrollView და FlatList'] },
      { title: 'ნავიგაცია', topics: ['React Navigation setup', 'Stack, Tab, Drawer navigators', 'Deep linking'] },
      { title: 'State Management', topics: ['Context API', 'Zustand/Redux', 'AsyncStorage'] },
      { title: 'API ინტეგრაცია', topics: ['Fetch და Axios', 'REST API-თან მუშაობა', 'Loading და Error states'] },
      { title: 'UI/UX პატერნები', topics: ['ანიმაციები Reanimated-ით', 'Gesture Handler', 'Custom components'] },
      { title: 'გამოქვეყნება', topics: ['Expo EAS Build', 'App Store submission', 'Google Play submission'] },
    ],
    faq: [
      { q: 'რა წინაპირობაა საჭირო?', a: 'JavaScript-ის საბაზისო ცოდნა სასურველია, მაგრამ ნულიდანაც შეიძლება.' },
      { q: 'კომპიუტერი რა უნდა მქონდეს?', a: 'ნებისმიერი Mac ან Windows კომპიუტერი. iOS ტესტირებისთვის Mac სასურველია.' },
      { q: 'რა ფორმატშია კურსი?', a: 'ონლაინ, ლაივ ლექციები Zoom-ით + ჩანაწერების წვდომა.' },
    ],
  },
};

const DEFAULT_DETAIL = {
  fullDesc: 'კურსი განკუთვნილია იმ ადამიანებისთვის, ვინც ამ სფეროში კარიერის დაწყებას ან გაღრმავებას გეგმავს. კურსი მოიცავს თეორიულ და პრაქტიკულ მასალას რეალური პროექტებით.',
  learningOutcomes: ['საფუძვლების სრული ათვისება', 'პრაქტიკული პროექტების შექმნა', 'რეალურ ინსტრუმენტებთან მუშაობა', 'პორტფოლიოს მომზადება', 'სერტიფიკატის მიღება'],
  mentor: { name: 'შალვა სილაგაძე', role: 'ინსტრუქტორი' },
  schedule: { days: 'სამშაბათი, პარასკევი', time: '19:30 - 21:30' },
  startDate: '28 აპრ. 2026',
  syllabus: [
    { title: 'შესავალი', topics: ['სფეროს მიმოხილვა', 'ინსტრუმენტები', 'გარემოს მომზადება'] },
    { title: 'საფუძვლები', topics: ['ძირითადი კონცეფციები', 'პრაქტიკული სავარჯიშოები'] },
    { title: 'მოწინავე თემები', topics: ['რეალური სცენარები', 'Best practices'] },
    { title: 'ფინალური პროექტი', topics: ['დაგეგმვა', 'იმპლემენტაცია', 'პრეზენტაცია'] },
  ],
  faq: [
    { q: 'რა წინაპირობაა საჭირო?', a: 'არანაირი წინასწარი ცოდნა არ არის საჭირო.' },
    { q: 'რა ფორმატშია კურსი?', a: 'ონლაინ, ლაივ ლექციები Zoom-ით.' },
    { q: 'სერტიფიკატს მივიღებ?', a: 'დიახ, ვერიფიცირებულ სერტიფიკატს.' },
  ],
};

export function CourseLandingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openLogin } = useAuth();
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('overview');

  const courseId = parseInt(id ?? '1');
  const course = LANDING_COURSES.find(c => c.id === courseId) ?? LANDING_COURSES[0];
  const detail = COURSE_DETAILS[courseId] ?? DEFAULT_DETAIL;

  const sections = [
    { id: 'overview', label: 'მიმოხილვა' },
    { id: 'syllabus', label: 'სილაბუსი' },
    { id: 'schedule', label: 'განრიგი' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/courses" />
      <div className="h-[72px]" />

      {/* ═══ HERO BANNER — digitaledu.ge style ═══ */}
      <section className="relative bg-gradient-to-r from-[#e8f4fd] to-[#f0f4ff] overflow-hidden">
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
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{detail.fullDesc}</p>
            </div>
            {/* Logo */}
            <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white shadow-md border border-gray-100 items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: course.logo }} />
          </div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 md:gap-14">

          {/* ═══ LEFT ═══ */}
          <div>
            {/* Overview */}
            <Reveal>
              <section id="overview" className="mb-14">
                <h2 className="text-xl font-bold mb-5">რა შეიძენ ამ კურსზე</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {detail.learningOutcomes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-surface rounded-xl p-4">
                      <CheckCircle className="w-5 h-5 text-[#004aad] mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Syllabus */}
            <Reveal>
              <section id="syllabus" className="mb-14">
                <h2 className="text-xl font-bold mb-5">სილაბუსი</h2>
                <div className="space-y-3">
                  {detail.syllabus.map((module, i) => (
                    <div key={i} className="border border-border-subtle rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenModule(openModule === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 hover:bg-surface/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {openModule === i ? <ChevronUp className="w-5 h-5 text-foreground-faint" /> : <ChevronDown className="w-5 h-5 text-foreground-faint" />}
                          <span className="font-semibold text-sm">{module.title}</span>
                        </div>
                        <span className="text-xs text-foreground-faint bg-surface px-3 py-1.5 rounded-full font-medium">Module {i + 1}</span>
                      </button>
                      <AnimatePresence>
                        {openModule === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
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

            {/* Schedule */}
            <Reveal>
              <section id="schedule" className="mb-14">
                <h2 className="text-xl font-bold mb-5">განრიგი</h2>
                <div className="bg-card border border-border-subtle rounded-xl divide-y divide-border-subtle">
                  {[
                    { icon: Calendar, label: 'დაწყების თარიღი', value: detail.startDate },
                    { icon: Clock, label: 'ხანგრძლივობა', value: course.duration },
                    { icon: User, label: 'მენტორი', value: detail.mentor.name, sub: detail.mentor.role },
                    { icon: MapPin, label: 'ადგილმდებარეობა', value: 'ONLINE' },
                    { icon: Calendar, label: 'სალექციო დღეები', value: detail.schedule.days },
                    { icon: Clock, label: 'სალექციო დრო', value: detail.schedule.time },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <div key={i} className="flex items-center justify-between py-4 px-5">
                        <span className="flex items-center gap-3 text-sm text-foreground-faint">
                          <Icon className="w-4 h-4 shrink-0" /> {row.label}
                        </span>
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
            <Reveal>
              <section id="faq" className="mb-14">
                <h2 className="text-xl font-bold mb-5">FAQ</h2>
                <div className="space-y-3">
                  {detail.faq.map((item, i) => (
                    <div key={i} className="bg-card border border-border-subtle rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="text-sm font-medium pr-4">{item.q}</span>
                        <Plus className={`w-5 h-5 text-foreground-faint shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-foreground-secondary leading-relaxed px-5 pb-5">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>

          {/* ═══ RIGHT SIDEBAR ═══ */}
          <div>
            <div className="sticky top-[88px] space-y-5">
              {/* Price card */}
              <div className="bg-card border border-border-subtle rounded-2xl p-6 shadow-sm">
                <p className="text-3xl font-bold mb-1">{course.price}₾</p>
                <p className="text-sm text-foreground-faint mb-6">ყველაზე ადრე დაწყების დრო: {detail.startDate}</p>
                <button
                  onClick={() => openLogin()}
                  className="w-full py-3.5 bg-[#004aad] text-white rounded-xl font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] mb-3"
                >
                  დარეგისტრირდი
                </button>
                <a href="/masterclass" className="block w-full py-3 border border-border-subtle text-foreground text-center rounded-xl text-sm font-medium hover:bg-surface-hover transition-all">
                  უფასო მასტერკლასი
                </a>
              </div>

              {/* Section nav */}
              <div className="bg-card border border-border-subtle rounded-2xl overflow-hidden">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className={`block px-5 py-4 text-sm transition-colors border-l-[3px] ${
                      activeSection === s.id
                        ? 'border-[#004aad] text-[#004aad] font-semibold bg-[#004aad]/5'
                        : 'border-transparent text-foreground-faint hover:text-foreground hover:bg-surface-hover'
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              {/* Quick info */}
              <div className="bg-surface rounded-2xl p-5 space-y-3">
                {[
                  { label: 'Tribe', value: course.tribe },
                  { label: 'ხანგრძლივობა', value: course.duration },
                  { label: 'ფორმატი', value: course.format ?? 'ონლაინ' },
                  { label: 'მენტორი', value: detail.mentor.name },
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
