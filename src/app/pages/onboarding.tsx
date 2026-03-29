import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check, Upload } from 'lucide-react';
import { categories } from '../data/courses';
import { AnimatePresence } from 'motion/react';
import { StepTransition } from '../components/page-transition';
import { getAppT } from '../i18n/app';
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

const CAT_LABELS: Record<string, string> = {
  food: 'კულინარია', arts: 'ხელოვნება', music: 'მუსიკა', writing: 'წერა',
  sports: 'სპორტი', design: 'დიზაინი', business: 'ბიზნესი', tech: 'ტექნოლოგია',
  lifestyle: 'ცხოვრების წესი',
};

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedInstructors, setSelectedInstructors] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const instructorRowRef = useRef<HTMLDivElement>(null);
  const { language } = useAuth();
  const t = getAppT(language);
  const totalSteps = 2;

  const catTabs = [
    { id: 'all', label: 'ყველა', count: INSTRUCTORS.length },
    ...categories.filter(c => c.id !== 'all').map(c => ({
      id: c.id, label: CAT_LABELS[c.id] || c.name,
      count: INSTRUCTORS.filter(i => i.categories.includes(c.id)).length,
    })).filter(t => t.count > 0),
  ];

  const filteredInstructors = activeTab === 'all' ? INSTRUCTORS : INSTRUCTORS.filter(i => i.categories.includes(activeTab));
  const goNext = () => setStep(s => s + 1);
  const goBack = () => step > 0 ? setStep(s => s - 1) : undefined;

  useEffect(() => { if (step === 0) setTimeout(() => nameInputRef.current?.focus(), 300); }, [step]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => setProfileImage(reader.result as string); reader.readAsDataURL(file); }
  };

  const toggleInstructor = (id: number) => setSelectedInstructors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const canProceed = () => { if (step === 0) return name.trim().length > 0; if (step === 1) return selectedInstructors.length > 0; return true; };
  const scrollTabs = (dir: 'left' | 'right') => { if (tabsRef.current) tabsRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' }); };
  const initial = name.trim() ? name.trim()[0].toUpperCase() : 'B';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header — BRIGHTMIND + back + step indicator */}
      {step < 2 && (
        <header className="px-4 md:px-12 py-5 flex-shrink-0 flex items-center justify-between">
          <span className="text-2xl md:text-3xl font-black tracking-tight">BRIGHTMIND</span>
          <span className="text-xs text-white/30">{step + 1} / {totalSteps}</span>
        </header>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

        {/* Step 0 — Create Profile */}
        {step === 0 && (
          <StepTransition key="step-0" className="max-w-lg mx-auto px-6 pt-12 pb-20 flex flex-col" style={{ minHeight: 'calc(100vh - 180px)' }}>
            <h1 className="text-2xl font-bold mb-1">შექმენი პროფილი</h1>
            <p className="text-sm text-white/40 mb-10">ეს არის შენი ანგარიშის პროფილი.</p>

            {/* Avatar + Name side by side */}
            <div className="flex items-start gap-6">
              {/* Avatar + Upload below */}
              <div className="flex flex-col items-center flex-shrink-0">
                {profileImage ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2"><img src={profileImage} alt="" className="w-full h-full object-cover" /></div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#E50914] flex items-center justify-center mb-2"><span className="text-white text-2xl font-bold">{initial}</span></div>
                )}
                <label className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors cursor-pointer">
                  <Upload className="w-3 h-3" />ატვირთვა
                  <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {/* Name input */}
              <div className="flex-1 pt-2">
                <label className="block text-sm text-white/60 mb-2">სახელი <span className="text-[#E50914]">*</span></label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="შენი სახელი"
                  className="w-full px-4 py-3 bg-white/[0.04] border-0 border-b border-white/10 rounded-none text-white placeholder-white/20 focus:outline-none focus:border-[#E50914] transition-colors text-sm"
                />
              </div>
            </div>

            {/* Spacer pushes button to bottom */}
            <div className="flex-1 min-h-[60px]" />

            {/* Action — only გაგრძელება */}
            <button onClick={goNext} disabled={!canProceed()} className={`w-full py-3 rounded text-sm font-semibold transition-all ${canProceed() ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-white/[0.04] text-white/20 cursor-not-allowed'}`}>გაგრძელება</button>
          </StepTransition>
        )}

        {/* Step 1 — Select Instructors */}
        {step === 1 && (
          <StepTransition key="step-1" className="px-4 md:px-12 pt-10 pb-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-1">ვისგან გინდა ისწავლო?</h1>
              <p className="text-sm text-white/40 mb-6">შეარჩიე ინსტრუქტორები შენი ინტერესების მიხედვით</p>

              {/* Category tabs */}
              <div className="flex items-center gap-2 mb-8">
                <button onClick={() => scrollTabs('left')} className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-white/40" />
                </button>
                <div ref={tabsRef} className="flex gap-1.5 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {catTabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-shrink-0 px-3.5 py-1.5 rounded text-xs transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-black font-semibold' : 'text-white/40 hover:text-white/60'}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => scrollTabs('right')} className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-white/20 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                </button>
              </div>

              {/* Instructor grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-10">
                {filteredInstructors.map((inst) => {
                  const selected = selectedInstructors.includes(inst.id);
                  return (
                    <button key={inst.id} onClick={() => toggleInstructor(inst.id)} className="group text-center">
                      <div className={`relative rounded-lg overflow-hidden aspect-square mb-2 transition-all ${selected ? 'ring-2 ring-[#E50914]' : 'ring-1 ring-white/[0.06]'}`}>
                        <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                        {selected && (
                          <div className="absolute inset-0 bg-[#E50914]/20 flex items-center justify-center">
                            <div className="w-6 h-6 bg-[#E50914] rounded-full flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-white">{inst.name}</p>
                      <p className="text-[11px] text-white/30">{inst.expertise}</p>
                    </button>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <button onClick={goNext} disabled={!canProceed()} className={`px-8 py-3 rounded text-sm font-semibold transition-all ${canProceed() ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-white/[0.04] text-white/20 cursor-not-allowed'}`}>
                  არჩევის დასრულება ({selectedInstructors.length})
                </button>
              </div>
            </div>
          </StepTransition>
        )}

        {/* Step 2 — Welcome */}
        {step === 2 && (
          <StepTransition key="step-2" className="min-h-screen flex flex-col items-center justify-center px-6">
            <span className="text-2xl md:text-3xl font-black tracking-tight mb-16">BRIGHTMIND</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">მზად ხარ.</h1>
            <p className="text-sm text-white/40 max-w-md text-center mb-10 leading-relaxed">
              კეთილი იყოს შენი მობრძანება. დროა აღმოაჩინო ახალი უნარები და ისწავლო საუკეთესოებისგან.
            </p>
            <button onClick={onComplete} className="px-10 py-3 bg-[#E50914] text-white rounded font-semibold hover:bg-[#c70812] transition-colors text-sm">
              დავიწყოთ
            </button>
          </StepTransition>
        )}

        </AnimatePresence>
      </div>

      {/* Bottom progress bar — minimal, platform style */}
      {step < 2 && (
        <div className="flex-shrink-0 px-4 md:px-12 pb-6 pt-4">
          <div className="flex gap-2 max-w-md mx-auto">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
                <div className={`h-full rounded-full transition-all duration-500 ease-out ${i <= step ? 'bg-[#E50914] w-full' : 'w-0'}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
