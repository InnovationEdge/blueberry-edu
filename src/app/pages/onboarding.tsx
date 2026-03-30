import { useState, useEffect, useRef } from 'react';
import { Check, Upload, GraduationCap, Mic } from 'lucide-react';
import { categories } from '../data/courses';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/auth-context';

interface OnboardingProps {
  onComplete: () => void;
}

const INSTRUCTORS = [
  { id: 1, name: 'Sarah Chen', expertise: 'ბიზნეს სტრატეგია', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face&q=80', categories: ['business'] },
  { id: 2, name: 'Chef Marcus', expertise: 'კულინარია', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=face&q=80', categories: ['food'] },
  { id: 3, name: 'Elena Rodriguez', expertise: 'ხელოვნება', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face&q=80', categories: ['arts'] },
  { id: 4, name: 'DJ Alex Turner', expertise: 'მუსიკა', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&q=80', categories: ['music'] },
  { id: 5, name: 'Maya Patel', expertise: 'UX/UI დიზაინი', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face&q=80', categories: ['design'] },
  { id: 6, name: 'Alex Thompson', expertise: 'ტექნოლოგია', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face&q=80', categories: ['tech'] },
  { id: 7, name: 'Nina Williams', expertise: 'წერა', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=800&fit=crop&crop=face&q=80', categories: ['writing'] },
  { id: 8, name: 'David Kim', expertise: 'სპორტი', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face&q=80', categories: ['sports'] },
  { id: 9, name: 'Angela Brooks', expertise: 'პრეზენტაცია', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&crop=face&q=80', categories: ['business'] },
  { id: 10, name: 'Chris Anderson', expertise: 'პროგრამირება', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face&q=80', categories: ['tech'] },
  { id: 11, name: 'Maya Thompson', expertise: 'ცხოვრების წესი', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face&q=80', categories: ['lifestyle'] },
  { id: 12, name: 'David Martinez', expertise: 'ფოტოგრაფია', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face&q=80', categories: ['arts'] },
];

const EXPERTISE_AREAS = [
  { id: 'business', label: 'ბიზნესი' }, { id: 'tech', label: 'ტექნოლოგია' },
  { id: 'design', label: 'დიზაინი' }, { id: 'arts', label: 'ხელოვნება' },
  { id: 'music', label: 'მუსიკა' }, { id: 'food', label: 'კულინარია' },
  { id: 'writing', label: 'წერა' }, { id: 'sports', label: 'სპორტი' },
  { id: 'lifestyle', label: 'ცხოვრების წესი' }, { id: 'photography', label: 'ფოტოგრაფია' },
  { id: 'marketing', label: 'მარკეტინგი' }, { id: 'finance', label: 'ფინანსები' },
];

const CAT_LABELS: Record<string, string> = {
  food: 'კულინარია', arts: 'ხელოვნება', music: 'მუსიკა', writing: 'წერა',
  sports: 'სპორტი', design: 'დიზაინი', business: 'ბიზნესი', tech: 'ტექნოლოგია',
  lifestyle: 'ცხოვრების წესი',
};

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedInstructors, setSelectedInstructors] = useState<number[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { setUserType } = useAuth();
  const totalSteps = 3;

  const catTabs = [
    { id: 'all', label: 'ყველა', count: INSTRUCTORS.length },
    ...categories.filter(c => c.id !== 'all').map(c => ({
      id: c.id, label: CAT_LABELS[c.id] || c.name,
      count: INSTRUCTORS.filter(i => i.categories.includes(c.id)).length,
    })).filter(t => t.count > 0),
  ];

  const filteredInstructors = activeTab === 'all' ? INSTRUCTORS : INSTRUCTORS.filter(i => i.categories.includes(activeTab));
  const goNext = () => setStep(s => s + 1);
  useEffect(() => { if (step === 1) setTimeout(() => nameInputRef.current?.focus(), 300); }, [step]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => setProfileImage(reader.result as string); reader.readAsDataURL(file); }
  };

  const toggleInstructor = (id: number) => setSelectedInstructors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleExpertise = (id: string) => setSelectedExpertise(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return role === 'student' ? selectedInstructors.length > 0 : selectedExpertise.length > 0;
    return true;
  };
  const initial = name.trim() ? name.trim()[0].toUpperCase() : 'B';
  const handleRoleSelect = (r: 'student' | 'instructor') => { setRole(r); setUserType(r); };

  const buttonLabel = () => {
    if (step === 0) return 'გაგრძელება';
    if (step === 1) return 'გაგრძელება';
    if (step === 2 && role === 'student') return `დასრულება (${selectedInstructors.length})`;
    if (step === 2 && role === 'instructor') return `დასრულება (${selectedExpertise.length})`;
    return 'დავიწყოთ';
  };

  // Step 2 (instructors) needs scroll, others need vertical centering
  const needsCenter = step === 0 || step === 1 || (step === 2 && role === 'instructor');

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 md:px-12 py-5 flex-shrink-0 flex items-center justify-between z-20 relative">
        <span className="text-2xl md:text-3xl font-black tracking-tight">BRIGHTMIND</span>
        <div className="flex items-center gap-4">
          {step < 3 && <span className="text-xs text-white/25">{step + 1}/{totalSteps}</span>}
          {step === 0 && (
            <button onClick={onComplete} className="text-sm text-white/40 hover:text-white transition-colors">გაუქმება</button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={`flex-1 min-h-0 ${needsCenter ? 'flex items-center justify-center' : 'overflow-y-auto'}`}>
        <AnimatePresence mode="wait">

        {/* Step 0: Role */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full max-w-4xl mx-auto px-6">
            <h1 className="text-2xl font-bold mb-1">როგორ გინდა გამოიყენო BrightMind?</h1>
            <p className="text-sm text-white/40 mb-8">ამის შეცვლა მოგვიანებითაც შეგიძლია.</p>

            <div className="grid grid-cols-2 gap-5">
              {[
                { id: 'student' as const, icon: GraduationCap, title: 'ისწავლე', desc: 'ისწავლე ახალი უნარები საუკეთესოებისგან', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80' },
                { id: 'instructor' as const, icon: Mic, title: 'ასწავლე', desc: 'შექმენი კურსები და გაუზიარე ცოდნა', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop&q=80' },
              ].map((item) => {
                const selected = role === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleRoleSelect(item.id)}
                    className={`relative rounded overflow-hidden text-left transition-all group ${selected ? 'ring-2 ring-[#E50914]' : 'ring-1 ring-white/[0.08] hover:ring-white/15'}`}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img src={item.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      {selected && <div className="absolute top-3 right-3 w-5 h-5 bg-[#E50914] rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                        <span className="font-bold text-[15px]">{item.title}</span>
                      </div>
                      <p className="text-xs text-white/35 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 1: Profile */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full max-w-4xl mx-auto px-6">
            <h1 className="text-2xl font-bold mb-1">შექმენი პროფილი</h1>
            <p className="text-sm text-white/40 mb-8">შემოიყვანე შენი სახელი</p>

            <div className="flex items-start gap-5 mb-6">
              <div className="flex flex-col items-center flex-shrink-0">
                {profileImage ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10 mb-2"><img src={profileImage} alt="" className="w-full h-full object-cover" /></div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#E50914] flex items-center justify-center mb-2"><span className="text-white text-2xl font-bold">{initial}</span></div>
                )}
                <label className="text-[11px] text-white/30 hover:text-white/60 transition-colors cursor-pointer flex items-center gap-1">
                  <Upload className="w-3 h-3" />ატვირთვა
                  <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <div className="flex-1 space-y-4 pt-1">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">სახელი <span className="text-[#E50914]">*</span></label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="შენი სახელი"
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                {role === 'instructor' && (
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">მოკლე ბიო</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="რას ასწავლი და რა გამოცდილება გაქვს..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E50914] transition-colors resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Student — Instructors */}
        {step === 2 && role === 'student' && (
          <motion.div key="s2s" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full px-4 md:px-12 pt-4">
              <h1 className="text-2xl font-bold mb-1">ვისგან გინდა ისწავლო?</h1>
              <p className="text-sm text-white/40 mb-6">შეარჩიე ინსტრუქტორები</p>

              {/* Categories — Library style, red active */}
              <div className="flex gap-2.5 overflow-x-auto mb-6 pb-1" style={{ scrollbarWidth: 'none' }}>
                {catTabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-shrink-0 px-4 py-2 rounded border text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#E50914] border-[#E50914] text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Instructors — single horizontal scroll row */}
              <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {filteredInstructors.map((inst) => {
                  const selected = selectedInstructors.includes(inst.id);
                  return (
                    <button key={inst.id} onClick={() => toggleInstructor(inst.id)} className="group text-center flex-shrink-0 w-[140px] md:w-[160px]">
                      <div className={`relative rounded overflow-hidden aspect-[3/4] mb-1.5 transition-all duration-300 group-hover:scale-[1.03] ${selected ? 'ring-2 ring-[#E50914]' : 'ring-1 ring-white/[0.06] group-hover:ring-white/15'}`}>
                        <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-[11px] font-semibold text-white truncate">{inst.name}</p>
                          <p className="text-[9px] text-white/50 truncate">{inst.expertise}</p>
                        </div>
                        {selected && <div className="absolute top-2 right-2 w-5 h-5 bg-[#E50914] rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
          </motion.div>
        )}

        {/* Step 2: Instructor — Expertise */}
        {step === 2 && role === 'instructor' && (
          <motion.div key="s2i" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full max-w-lg mx-auto px-6">
            <h1 className="text-2xl font-bold mb-1">რას ასწავლი?</h1>
            <p className="text-sm text-white/40 mb-8">შეარჩიე შენი ექსპერტიზის სფეროები</p>

            <div className="grid grid-cols-3 gap-2.5">
              {EXPERTISE_AREAS.map((area) => {
                const selected = selectedExpertise.includes(area.id);
                return (
                  <button key={area.id} onClick={() => toggleExpertise(area.id)} className={`py-3 px-4 rounded text-sm transition-all ${selected ? 'bg-[#E50914] text-white font-semibold' : 'bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white/70'}`}>
                    {area.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Welcome */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center px-6" style={{ minHeight: 'calc(100vh - 72px)' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-black mb-3 text-center">
              {role === 'student' ? 'მზად ხარ.' : 'მოგესალმებით.'}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-base text-white/40 max-w-md text-center mb-10 leading-relaxed">
              {role === 'student' ? 'დროა აღმოაჩინო ახალი უნარები და ისწავლო საუკეთესოებისგან.' : 'დროა გაუზიარო შენი ცოდნა და გამოცდილება ათასობით სტუდენტს.'}
            </motion.p>
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} onClick={onComplete} className="px-10 py-3.5 bg-[#E50914] text-white rounded font-bold text-sm hover:bg-[#c70812] transition-all hover:scale-105 active:scale-95">
              დავიწყოთ
            </motion.button>
          </motion.div>
        )}

        </AnimatePresence>
      </div>

      {/* Bottom Bar (steps 0-2) */}
      {step < 3 && (
        <div className="flex-shrink-0 px-6 pb-6 pt-4">
          <div className="max-w-lg mx-auto space-y-3">
            <button onClick={goNext} disabled={!canProceed()} className={`px-10 py-2.5 rounded text-sm font-bold transition-all mx-auto block ${canProceed() ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-white/[0.04] text-white/20 cursor-not-allowed'}`}>
              {buttonLabel()}
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
                  <div className={`h-full rounded-full transition-all duration-500 ${i <= step ? 'bg-[#E50914] w-full' : 'w-0'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
