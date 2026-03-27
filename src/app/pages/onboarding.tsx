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
    { id: 'all', label: 'Top Picks', count: INSTRUCTORS.length },
    ...categories.filter(c => c.id !== 'all').map(c => ({
      id: c.id, label: CAT_LABELS[c.id] || c.name,
      count: INSTRUCTORS.filter(i => i.categories.includes(c.id)).length,
    })).filter(t => t.count > 0),
  ];

  const filteredInstructors = activeTab === 'all' ? INSTRUCTORS : INSTRUCTORS.filter(i => i.categories.includes(activeTab));
  const goTo = (next: number) => setStep(next);
  const goNext = () => goTo(step + 1);
  const goBack = () => step > 0 ? goTo(step - 1) : undefined;

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
      {step < 2 && (
        <div className="flex gap-1 px-6 md:px-12 pt-4 flex-shrink-0">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 h-[5px] rounded-full overflow-hidden bg-gray-800">
              <div className={`h-full rounded-full transition-all duration-700 ease-out ${i <= step ? 'bg-[#E50914] w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>
      )}
      {step < 2 && (
        <div className="px-6 md:px-12 pt-4">
          <button onClick={step === 0 ? onComplete : goBack} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
            <ChevronLeft className="w-4 h-4" /><span>უკან</span>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

        {step === 0 && (
          <StepTransition key="step-0" className="max-w-3xl mx-auto px-6 md:px-12 pt-12 pb-12 flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-black text-center mb-2">შექმენი პროფილი</h1>
            <p className="text-gray-500 text-center mb-14">ეს არის შენი ანგარიშის პროფილი.</p>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 w-full max-w-xl mb-16">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative mb-4">
                  {profileImage ? (
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden"><img src={profileImage} alt="" className="w-full h-full object-cover" /></div>
                  ) : (
                    <div className="w-[100px] h-[100px] rounded-full bg-[#E5A04E] flex items-center justify-center"><span className="text-black text-4xl font-bold select-none">{initial}</span></div>
                  )}
                </div>
                <label className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-md text-sm text-gray-300 hover:border-gray-500 hover:text-white transition-colors cursor-pointer mb-2">
                  <Upload className="w-4 h-4" />ატვირთვა<input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
                </label>
                <p className="text-xs text-gray-600 text-center">.jpg ან .png, მაქს. 1MB</p>
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold text-gray-300 mb-2">სახელი (სავალდებულო)<span className="text-[#E50914]">*</span></label>
                <input ref={nameInputRef} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="შენი სახელი" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-[#E50914] transition-colors" />
              </div>
            </div>
            <div className="flex items-center gap-4 w-full max-w-xl">
              <button onClick={onComplete} className="flex-1 py-3 border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-colors font-semibold text-sm">გაუქმება</button>
              <button onClick={goNext} disabled={!canProceed()} className={`flex-1 py-3 rounded-md font-semibold text-sm transition-all ${canProceed() ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-gray-900 text-gray-700 cursor-not-allowed'}`}>გაგრძელება</button>
            </div>
          </StepTransition>
        )}

        {step === 1 && (
          <StepTransition key="step-1" className="px-6 md:px-12 pt-12 pb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black mb-2">ვისგან გინდა ისწავლო?</h1>
              <p className="text-gray-500 text-sm mb-6">კატეგორიების მიხედვით შეარჩიე ინსტრუქტორები</p>
              <button onClick={goNext} disabled={!canProceed()} className={`px-8 py-3 rounded-full font-semibold text-sm transition-all ${canProceed() ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-gray-900 text-gray-700 cursor-not-allowed'}`}>არჩევის დასრულება ({selectedInstructors.length})</button>
            </div>
            <div className="flex items-center gap-3 mb-8 max-w-4xl">
              <span className="text-lg font-bold flex-shrink-0">Browse</span>
              <button onClick={() => scrollTabs('left')} className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-700 hover:border-gray-500 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4 text-gray-400" /></button>
              <div ref={tabsRef} className="flex gap-1 overflow-x-auto scroll-smooth flex-1 min-w-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {catTabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-gray-800 text-white font-medium' : 'text-gray-500 hover:text-gray-300'}`}>{tab.label} ({tab.count})</button>))}
              </div>
              <button onClick={() => scrollTabs('right')} className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-700 hover:border-gray-500 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="relative group/row">
              <button onClick={() => { if (instructorRowRef.current) instructorRowRef.current.scrollBy({ left: -400, behavior: 'smooth' }); }} className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-black to-transparent flex items-center justify-start pl-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors bg-black/80"><ChevronLeft className="w-4 h-4 text-gray-400" /></div>
              </button>
              <div ref={instructorRowRef} className="flex flex-wrap gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', maxHeight: '420px' }}>
                {filteredInstructors.map((inst) => {
                  const selected = selectedInstructors.includes(inst.id);
                  return (
                    <button key={inst.id} onClick={() => toggleInstructor(inst.id)} className="group text-center flex-shrink-0" style={{ width: 'calc(20% - 13px)', minWidth: '140px' }}>
                      <div className="relative rounded-lg overflow-hidden aspect-square mb-2">
                        <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                        {selected && (<div className="absolute top-2 right-2 w-7 h-7 bg-[#E50914] rounded-full flex items-center justify-center shadow-lg"><Check className="w-4 h-4 text-white" /></div>)}
                      </div>
                      <p className="font-bold text-white text-xs">{inst.name}</p>
                      <p className="text-gray-500 text-[11px] mt-0.5 leading-snug">{inst.expertise}</p>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { if (instructorRowRef.current) instructorRowRef.current.scrollBy({ left: 400, behavior: 'smooth' }); }} className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-black to-transparent flex items-center justify-end pr-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors bg-black/80"><ChevronRight className="w-4 h-4 text-gray-400" /></div>
              </button>
            </div>
          </StepTransition>
        )}

        {step === 2 && (
          <StepTransition key="step-2" className="min-h-[90vh] px-6 md:px-12 flex flex-col">
            <div className="pt-6 pb-8"><span className="text-xl font-black text-white">BrightMind</span></div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-black text-center mb-6">მზად ხარ.</h1>
              <p className="text-gray-400 text-center max-w-lg mb-12 leading-relaxed">კეთილი იყოს შენი მობრძანება. დროა აღმოაჩინო ახალი უნარები, ისწავლო საუკეთესოებისგან და გახდე საუკეთესო ვერსია საკუთარი თავის.</p>
              <button onClick={onComplete} className="px-10 py-3.5 bg-[#E50914] text-white rounded-md font-semibold hover:bg-[#c70812] transition-colors">დავიწყოთ</button>
            </div>
          </StepTransition>
        )}

        </AnimatePresence>
      </div>
    </div>
  );
}
