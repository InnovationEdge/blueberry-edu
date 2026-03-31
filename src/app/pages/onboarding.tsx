import { useState, useEffect, useRef, useCallback } from 'react';
import { Check, Upload, GraduationCap, Mic } from 'lucide-react';
import { CategoryIcon } from '../components/category-icon';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/auth-context';

interface OnboardingProps {
  onComplete: () => void;
}

const EXPERTISE_AREAS = [
  { id: 'business', label: 'ბიზნესი' }, { id: 'tech', label: 'ტექნოლოგია' },
  { id: 'design', label: 'დიზაინი' }, { id: 'arts', label: 'ხელოვნება' },
  { id: 'music', label: 'მუსიკა' }, { id: 'food', label: 'კულინარია' },
  { id: 'writing', label: 'წერა' }, { id: 'sports', label: 'სპორტი' },
  { id: 'lifestyle', label: 'ცხოვრების წესი' }, { id: 'photography', label: 'ფოტოგრაფია' },
  { id: 'marketing', label: 'მარკეტინგი' }, { id: 'finance', label: 'ფინანსები' },
];

const INTEREST_CATEGORIES = [
  { id: 'business', label: 'ბიზნესი', icon: 'briefcase', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80' },
  { id: 'tech', label: 'ტექნოლოგია', icon: 'cpu', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&q=80' },
  { id: 'design', label: 'დიზაინი', icon: 'layout', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&q=80' },
  { id: 'arts', label: 'ხელოვნება', icon: 'palette', img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop&q=80' },
  { id: 'music', label: 'მუსიკა', icon: 'music', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop&q=80' },
  { id: 'food', label: 'კულინარია', icon: 'utensils', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop&q=80' },
  { id: 'writing', label: 'წერა', icon: 'pen-tool', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&q=80' },
  { id: 'sports', label: 'სპორტი', icon: 'trophy', img: 'https://images.unsplash.com/photo-1461896836934-bd45ba9b5acb?w=400&h=300&fit=crop&q=80' },
  { id: 'lifestyle', label: 'ცხოვრება', icon: 'home', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop&q=80' },
  { id: 'photography', label: 'ფოტოგრაფია', icon: 'camera', img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop&q=80' },
  { id: 'marketing', label: 'მარკეტინგი', icon: 'trending-up', img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop&q=80' },
  { id: 'finance', label: 'ფინანსები', icon: 'bar-chart', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&q=80' },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { setUserType } = useAuth();
  const totalSteps = 3;
  const goNext = useCallback(() => setStep(s => s + 1), []);
  useEffect(() => { if (step === 1) setTimeout(() => nameInputRef.current?.focus(), 300); }, [step]);

  // Enter key to proceed
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed() && step < 3) goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => setProfileImage(reader.result as string); reader.readAsDataURL(file); }
  };

  const toggleCategory = (id: string) => setSelectedCategories(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleExpertise = (id: string) => setSelectedExpertise(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return role === 'student' ? selectedCategories.length > 0 : selectedExpertise.length > 0;
    return true;
  };
  const initial = name.trim() ? name.trim()[0].toUpperCase() : 'B';
  const handleRoleSelect = (r: 'student' | 'instructor') => { setRole(r); setUserType(r); };

  const buttonLabel = () => {
    if (step === 0) return 'გაგრძელება';
    if (step === 1) return 'გაგრძელება';
    if (step === 2 && role === 'student') return `დასრულება (${selectedCategories.length})`;
    if (step === 2 && role === 'instructor') return `დასრულება (${selectedExpertise.length})`;
    return 'დავიწყოთ';
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 md:px-12 py-5 flex-shrink-0 z-20 relative">
        <span className="text-2xl md:text-3xl font-black tracking-tight">BRIGHTMIND</span>
      </header>

      {/* Content */}
      <div className="flex-1 min-h-0 flex flex-col">
        <AnimatePresence mode="wait">

        {/* ═══ Step 0: Role ═══ */}
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-3xl">
              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-black mb-2 text-center">როგორ გინდა გამოიყენო BrightMind?</motion.h1>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-sm text-white/40 mb-10 text-center">ამის შეცვლა მოგვიანებითაც შეგიძლია.</motion.p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { id: 'student' as const, icon: GraduationCap, title: 'ისწავლე', desc: 'ისწავლე ახალი უნარები საუკეთესოებისგან', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop&q=80' },
                  { id: 'instructor' as const, icon: Mic, title: 'ასწავლე', desc: 'შექმენი კურსები და გაუზიარე ცოდნა', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop&q=80' },
                ].map((item, idx) => {
                  const selected = role === item.id;
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      onClick={() => handleRoleSelect(item.id)}
                      className={`relative rounded overflow-hidden text-left transition-all duration-200 group active:scale-[0.98] ${selected ? 'ring-2 ring-[#E50914] shadow-lg shadow-red-500/10' : 'ring-1 ring-white/10 hover:ring-white/20'}`}
                    >
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <img src={item.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        {selected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}
                            className="absolute top-4 right-4 w-6 h-6 bg-[#E50914] rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                        <div className="absolute bottom-4 left-5 right-5">
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <Icon className={`w-5 h-5 ${selected ? 'text-[#E50914]' : 'text-white/70'}`} strokeWidth={1.5} />
                            <span className="font-bold text-lg">{item.title}</span>
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="mt-8 flex justify-center">
                <button onClick={goNext} className="px-12 py-3 bg-[#E50914] text-white rounded text-sm font-bold hover:bg-[#c70812] transition-all active:scale-95">
                  {buttonLabel()}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ═══ Step 1: Profile ═══ */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-md">
              {/* Role badge */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="flex justify-center mb-6">
                <span className="px-3 py-1 bg-[#E50914]/10 border border-[#E50914]/20 rounded text-[#E50914] text-xs font-medium">
                  {role === 'student' ? 'სტუდენტი' : 'ინსტრუქტორი'}
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-3xl md:text-4xl font-black mb-2 text-center">შექმენი პროფილი</motion.h1>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="text-sm text-white/40 mb-10 text-center">შემოიყვანე შენი სახელი</motion.p>

              {/* Avatar */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="flex flex-col items-center mb-8">
                {profileImage ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/10 mb-3">
                    <img src={profileImage} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#E50914] flex items-center justify-center mb-3 shadow-lg shadow-red-500/20">
                    <span className="text-white text-3xl font-bold">{initial}</span>
                  </div>
                )}
                <label className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />ფოტოს ატვირთვა
                  <input type="file" accept="image/jpeg,image/png" onChange={handleImageUpload} className="hidden" />
                </label>
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="space-y-5">
                <div>
                  <label className="block text-xs text-white/50 mb-2 font-medium">სახელი <span className="text-[#E50914]">*</span></label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="შენი სახელი"
                    className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                {role === 'instructor' && (
                  <div>
                    <label className="block text-xs text-white/50 mb-2 font-medium">მოკლე ბიო</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="რას ასწავლი და რა გამოცდილება გაქვს..."
                      rows={3}
                      className="w-full px-4 py-3.5 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#E50914] transition-colors resize-none"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="mt-8 flex justify-center">
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className={`px-12 py-3 rounded text-sm font-bold transition-all active:scale-95 ${canProceed() ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-white/[0.04] text-white/20 cursor-not-allowed'}`}
                >
                  {buttonLabel()}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ═══ Step 2: Student — Categories (same as Library carousel) ═══ */}
        {step === 2 && role === 'student' && (
          <motion.div key="s2s" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-4xl">
              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-black mb-2 text-center">რა გაინტერესებს?</motion.h1>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-sm text-white/40 mb-10 text-center">აირჩიე კატეგორიები რომლებიც მოგწონს</motion.p>

              {/* Horizontal scroll — exact same style as Library categories */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {INTEREST_CATEGORIES.map((cat) => {
                    const selected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded border transition-all active:scale-[0.97] ${
                          selected
                            ? 'bg-[#E50914] border-[#E50914] text-white'
                            : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <CategoryIcon
                          iconName={cat.icon}
                          className={`w-4 h-4 ${selected ? 'text-white' : 'text-white/40'}`}
                        />
                        <span className="text-sm font-medium whitespace-nowrap">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {selectedCategories.length > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs text-[#E50914] mt-4 text-center font-medium">{selectedCategories.length} არჩეული</motion.p>
              )}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="mt-8 flex justify-center">
                <button
                  onClick={goNext}
                  disabled={selectedCategories.length === 0}
                  className={`px-12 py-3 rounded text-sm font-bold transition-all active:scale-95 ${selectedCategories.length > 0 ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-white/[0.04] text-white/20 cursor-not-allowed'}`}
                >
                  დასრულება ({selectedCategories.length})
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ═══ Step 2: Instructor — Expertise ═══ */}
        {step === 2 && role === 'instructor' && (
          <motion.div key="s2i" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-3xl">
              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-black mb-2 text-center">რას ასწავლი?</motion.h1>
              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-sm text-white/40 mb-10 text-center">შეარჩიე შენი ექსპერტიზის სფეროები</motion.p>

              <div className="flex flex-wrap gap-3 justify-center">
                {EXPERTISE_AREAS.map((area, idx) => {
                  const selected = selectedExpertise.includes(area.id);
                  return (
                    <motion.button key={area.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 + idx * 0.04 }}
                      onClick={() => toggleExpertise(area.id)}
                      className={`px-5 py-3 rounded border text-sm font-medium transition-all active:scale-[0.97] ${
                        selected
                          ? 'bg-[#E50914] border-[#E50914] text-white'
                          : 'bg-transparent border-white/15 text-white/60 hover:border-white/30 hover:text-white'
                      }`}>
                      {area.label}
                    </motion.button>
                  );
                })}
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-10 flex justify-center">
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className={`px-12 py-3 rounded text-sm font-bold transition-all active:scale-95 ${canProceed() ? 'bg-[#E50914] text-white hover:bg-[#c70812]' : 'bg-white/[0.04] text-white/20 cursor-not-allowed'}`}
                >
                  {buttonLabel()}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ═══ Step 3: Welcome ═══ */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center px-6 relative">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
              className="w-16 h-16 rounded-full bg-[#E50914] flex items-center justify-center mb-6 shadow-xl shadow-red-500/20">
              <Check className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black mb-2 text-center">
              {name.trim() ? `${name.trim()}, მზად ხარ.` : (role === 'student' ? 'მზად ხარ.' : 'მოგესალმებით.')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-base text-white/40 max-w-md text-center mb-10 leading-relaxed">
              {role === 'student' ? 'დროა აღმოაჩინო ახალი უნარები და ისწავლო საუკეთესოებისგან.' : 'დროა გაუზიარო შენი ცოდნა და გამოცდილება ათასობით სტუდენტს.'}
            </motion.p>
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              onClick={onComplete}
              className="px-12 py-3.5 bg-[#E50914] text-white rounded font-bold text-sm hover:bg-[#c70812] transition-all active:scale-95 shadow-lg shadow-red-500/20">
              დავიწყოთ
            </motion.button>
          </motion.div>
        )}

        </AnimatePresence>
      </div>

      {/* Progress bar — bottom */}
      {step < 3 && (
        <div className="flex-shrink-0 px-6 md:px-12 pb-6 pt-4">
          <div className="max-w-md mx-auto flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-[#E50914]"
                  initial={{ width: '0%' }}
                  animate={{ width: i <= step ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
