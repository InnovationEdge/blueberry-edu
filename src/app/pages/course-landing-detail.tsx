import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronDown, ChevronUp, Clock, Globe, Calendar, MapPin, User, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { LandingHeader } from '../components/landing-header';
import { Logo } from '../components/logo';
import { LANDING_COURSES } from '../data/courses-landing';
import { useAuth } from '../context/auth-context';
import { useTheme } from 'next-themes';

/* ─── Extended course data (syllabus, mentor, etc.) ─── */
const COURSE_DETAILS: Record<number, {
  fullDesc: string;
  learningOutcomes: string[];
  mentor: { name: string; role: string };
  schedule: { days: string; time: string };
  startDate: string;
  syllabus: { title: string; topics: string[] }[];
}> = {
  1: {
    fullDesc: 'React Native კურსი განკუთვნილია იმ ადამიანებისთვის, ვისაც სურთ მობილური აპლიკაციების შექმნა iOS და Android პლატფორმებისთვის ერთი კოდის ბაზით.',
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
      { title: 'ნავიგაცია', topics: ['React Navigation setup', 'Stack, Tab, Drawer navigators', 'Deep linking', 'Navigation state management'] },
      { title: 'State Management', topics: ['Context API', 'Zustand/Redux', 'AsyncStorage', 'Global state patterns'] },
      { title: 'API ინტეგრაცია', topics: ['Fetch და Axios', 'REST API-თან მუშაობა', 'Loading და Error states', 'Caching strategies'] },
      { title: 'UI/UX პატერნები', topics: ['ანიმაციები Reanimated-ით', 'Gesture Handler', 'Custom components', 'Platform-specific design'] },
      { title: 'გამოქვეყნება', topics: ['Expo EAS Build', 'App Store submission', 'Google Play submission', 'CI/CD pipeline'] },
    ],
  },
  2: {
    fullDesc: 'UI/UX Design კურსი მოიცავს Figma-ში მუშაობას, მომხმარებლის კვლევას, wireframing-ს, პროტოტიპირებას და დიზაინ სისტემების შექმნას.',
    learningOutcomes: ['Figma-ს სრული ფუნქციონალი', 'User Research მეთოდოლოგიები', 'Wireframing და პროტოტიპირება', 'Design System შექმნა', 'პორტფოლიოს მომზადება'],
    mentor: { name: 'მარიამ ჯავახიშვილი', role: 'Lead UX Designer' },
    schedule: { days: 'ორშაბათი, ოთხშაბათი', time: '18:30 - 20:30' },
    startDate: '5 მაი. 2026',
    syllabus: [
      { title: 'Figma საფუძვლები', topics: ['Interface და Tools', 'Frames და Components', 'Auto Layout', 'Variants'] },
      { title: 'User Research', topics: ['Interview techniques', 'User Personas', 'Journey Mapping', 'Competitive Analysis'] },
      { title: 'Wireframing', topics: ['Low-fidelity wireframes', 'Information Architecture', 'User Flows', 'Rapid prototyping'] },
      { title: 'Visual Design', topics: ['Typography', 'Color Theory', 'Grid Systems', 'Iconography'] },
      { title: 'Design Systems', topics: ['Component Library', 'Design Tokens', 'Documentation', 'Handoff to developers'] },
    ],
  },
};

// Default detail for courses without specific data
const DEFAULT_DETAIL = {
  fullDesc: 'კურსი განკუთვნილია იმ ადამიანებისთვის, ვინც ამ სფეროში კარიერის დაწყებას ან გაღრმავებას გეგმავს. კურსი მოიცავს თეორიულ და პრაქტიკულ მასალას.',
  learningOutcomes: ['საფუძვლების სრული ათვისება', 'პრაქტიკული პროექტების შექმნა', 'რეალურ ინსტრუმენტებთან მუშაობა', 'პორტფოლიოს მომზადება', 'სერტიფიკატის მიღება'],
  mentor: { name: 'შალვა სილაგაძე', role: 'ინსტრუქტორი' },
  schedule: { days: 'სამშაბათი, პარასკევი', time: '19:30 - 21:30' },
  startDate: '28 აპრ. 2026',
  syllabus: [
    { title: 'შესავალი', topics: ['სფეროს მიმოხილვა', 'ინსტრუმენტები', 'გარემოს მომზადება'] },
    { title: 'საფუძვლები', topics: ['ძირითადი კონცეფციები', 'პრაქტიკული სავარჯიშოები', 'პირველი პროექტი'] },
    { title: 'მოწინავე თემები', topics: ['რეალური სცენარები', 'Best practices', 'ოპტიმიზაცია'] },
    { title: 'ფინალური პროექტი', topics: ['დაგეგმვა', 'იმპლემენტაცია', 'პრეზენტაცია'] },
  ],
};

export function CourseLandingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openLogin } = useAuth();
  const { theme, setTheme } = useTheme();
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('overview');

  const courseId = parseInt(id ?? '1');
  const course = LANDING_COURSES.find(c => c.id === courseId) ?? LANDING_COURSES[0];
  const detail = COURSE_DETAILS[courseId] ?? DEFAULT_DETAIL;

  const sections = [
    { id: 'overview', label: 'მიმოხილვა' },
    { id: 'syllabus', label: 'სილაბუსი' },
    { id: 'schedule', label: 'განრიგი' },
    { id: 'register', label: 'რეგისტრაცია' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/courses" />
      <div className="h-[72px]" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-12 lg:px-16 py-8">
        {/* Back */}
        <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-sm text-foreground-faint hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> კურსებზე დაბრუნება
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
          {/* ═══ LEFT — Main content ═══ */}
          <div>
            {/* Hero image / gradient */}
            <div className={`bg-gradient-to-br ${course.gradient} rounded-2xl h-[280px] md:h-[360px] flex items-end p-8 mb-8 relative overflow-hidden`}>
              <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center" dangerouslySetInnerHTML={{ __html: course.logo }} />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/50" />{course.tribe}</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{course.format ?? 'ონლაინ'}</span>
                </div>
              </div>
            </div>

            {/* Course title + meta */}
            <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
            <div className="flex items-center gap-5 text-sm text-foreground-faint mb-8 flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#004aad]" />{course.tribe}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{course.format ?? 'ონლაინ'}</span>
            </div>

            {/* ── Overview ── */}
            <section id="overview" className="mb-12">
              <h3 className="text-lg font-bold mb-4">კურსის მიმოხილვა</h3>
              <p className="text-foreground-secondary leading-relaxed mb-6">{detail.fullDesc}</p>

              <h4 className="font-semibold mb-3">კურსის დასრულების შემდეგ შეძლებ:</h4>
              <ul className="space-y-2.5">
                {detail.learningOutcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#004aad] mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Syllabus ── */}
            <section id="syllabus" className="mb-12">
              <h3 className="text-lg font-bold mb-4">სილაბუსი</h3>
              <div className="space-y-2">
                {detail.syllabus.map((module, i) => (
                  <div key={i} className="border border-border-subtle rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenModule(openModule === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-surface-hover transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {openModule === i ? <ChevronUp className="w-4 h-4 text-foreground-faint" /> : <ChevronDown className="w-4 h-4 text-foreground-faint" />}
                        <span className="font-medium text-sm">{module.title}</span>
                      </div>
                      <span className="text-xs text-foreground-faint bg-surface px-3 py-1 rounded-full">Module {i + 1}</span>
                    </button>
                    {openModule === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border-subtle"
                      >
                        <ul className="p-4 space-y-2.5">
                          {module.topics.map((topic, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-foreground-secondary">
                              <span className="w-1 h-1 rounded-full bg-foreground-faint mt-2 shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ── Schedule / Mentor ── */}
            <section id="schedule" className="mb-12">
              <h3 className="text-lg font-bold mb-4">განრიგი</h3>
              <div className="border border-border-subtle rounded-xl divide-y divide-border-subtle">
                <div className="flex items-center justify-between p-4">
                  <span className="flex items-center gap-2.5 text-sm text-foreground-faint"><Calendar className="w-4 h-4" /> დაწყების თარიღი</span>
                  <span className="text-sm font-medium">{detail.startDate}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="flex items-center gap-2.5 text-sm text-foreground-faint"><Clock className="w-4 h-4" /> ხანგრძლივობა</span>
                  <span className="text-sm font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="flex items-center gap-2.5 text-sm text-foreground-faint"><User className="w-4 h-4" /> მენტორი</span>
                  <div className="text-right">
                    <span className="text-sm font-medium block">{detail.mentor.name}</span>
                    <span className="text-xs text-foreground-faint">{detail.mentor.role}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="flex items-center gap-2.5 text-sm text-foreground-faint"><MapPin className="w-4 h-4" /> ადგილმდებარეობა</span>
                  <span className="text-sm font-medium">ONLINE</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="flex items-center gap-2.5 text-sm text-foreground-faint"><Calendar className="w-4 h-4" /> სალექციო დღეები</span>
                  <span className="text-sm font-medium">{detail.schedule.days}</span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="flex items-center gap-2.5 text-sm text-foreground-faint"><Clock className="w-4 h-4" /> სალექციო დრო</span>
                  <span className="text-sm font-medium">{detail.schedule.time}</span>
                </div>
              </div>
            </section>
          </div>

          {/* ═══ RIGHT — Sticky sidebar ═══ */}
          <div>
            <div className="sticky top-[88px] space-y-6">
              {/* Price card */}
              <div className="bg-card border border-border-subtle rounded-2xl p-6">
                <p className="text-3xl font-bold mb-1">{course.price}₾</p>
                <p className="text-sm text-foreground-faint mb-5">ყველაზე ადრე დაწყების დრო: {detail.startDate}</p>
                <button
                  onClick={() => openLogin()}
                  className="w-full py-3.5 bg-[#004aad] text-white rounded-xl font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97]"
                >
                  დარეგისტრირდი
                </button>
              </div>

              {/* Section nav */}
              <div className="bg-card border border-border-subtle rounded-2xl overflow-hidden">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className={`block px-5 py-3.5 text-sm transition-colors border-l-2 ${
                      activeSection === s.id
                        ? 'border-[#004aad] text-[#004aad] font-medium bg-[#004aad]/5'
                        : 'border-transparent text-foreground-faint hover:text-foreground hover:bg-surface-hover'
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-10 mt-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="academy" className="h-6 w-auto" />
            <div className="flex items-center gap-6 text-sm text-foreground-faint">
              <span>&copy; 2026 Blueberry Academy</span>
              <a href="#" className="hover:text-foreground transition-colors">პირობები</a>
              <a href="#" className="hover:text-foreground transition-colors">კონფიდენციალურობა</a>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:text-foreground transition-colors">
                {theme === 'dark' ? 'ღია თემა' : 'მუქი თემა'}
              </button>
              <button onClick={() => openLogin()} className="hover:text-foreground transition-colors">შესვლა</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
