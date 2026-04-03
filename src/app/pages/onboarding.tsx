import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Check, GraduationCap, Mic } from 'lucide-react';
import { CategoryIcon } from '../components/category-icon';
import { Logo } from '../components/logo';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../context/auth-context';

interface OnboardingProps {
  onComplete: () => void;
}

const INTEREST_CATEGORIES = [
  { id: 'business', label: 'ბიზნესი', icon: 'briefcase' },
  { id: 'tech', label: 'ტექნოლოგია', icon: 'cpu' },
  { id: 'design', label: 'დიზაინი', icon: 'layout' },
  { id: 'arts', label: 'ხელოვნება', icon: 'palette' },
  { id: 'music', label: 'მუსიკა', icon: 'music' },
  { id: 'food', label: 'კულინარია', icon: 'utensils' },
  { id: 'writing', label: 'წერა', icon: 'pen-tool' },
  { id: 'sports', label: 'სპორტი', icon: 'trophy' },
  { id: 'lifestyle', label: 'ცხოვრება', icon: 'home' },
  { id: 'photography', label: 'ფოტოგრაფია', icon: 'camera' },
  { id: 'marketing', label: 'მარკეტინგი', icon: 'trending-up' },
  { id: 'finance', label: 'ფინანსები', icon: 'bar-chart' },
];

const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.3 } };

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<'student' | 'instructor' | null>(null);
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { setUserType } = useAuth();
  const navigate = useNavigate();
  const totalSteps = 3;
  const goNext = useCallback(() => setStep(s => s + 1), []);

  useEffect(() => { if (step === 1) setTimeout(() => nameInputRef.current?.focus(), 300); }, [step]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && step === 1 && name.trim().length > 0) goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const handleRoleSelect = (r: 'student' | 'instructor') => {
    setRole(r);
    setUserType(r);
    setTimeout(goNext, 500);
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      if (next.length >= 3 && !prev.includes(id)) {
        setTimeout(goNext, 700);
      }
      return next;
    });
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-6 md:px-12 py-6 flex-shrink-0 flex items-center justify-between">
        <Logo className="h-7 w-auto" />
        {step < 3 && (
          <span className="text-foreground-ghost text-xs tracking-wide">{step + 1}/{totalSteps}</span>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden px-6">
        <AnimatePresence mode="wait">

        {/* Step 0: Role */}
        {step === 0 && (
          <motion.div key="s0" {...fade} className="w-full max-w-lg text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              როგორ გინდა გამოიყენო Blueberry Academy?
            </h1>
            <p className="text-foreground-subtle text-sm mb-12">აირჩიე ერთი</p>

            <div className="grid grid-cols-2 gap-5">
              {[
                { id: 'student' as const, icon: GraduationCap, title: 'ისწავლე', desc: 'ახალი უნარები საუკეთესოებისგან' },
                { id: 'instructor' as const, icon: Mic, title: 'ასწავლე', desc: 'შექმენი კურსები და გაუზიარე ცოდნა' },
              ].map((item) => {
                const selected = role === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleRoleSelect(item.id)}
                    className={`bg-card border rounded-xl p-7 text-center transition-all duration-200 ${
                      selected
                        ? 'border-brand bg-brand-subtle shadow-md'
                        : 'border-border-subtle shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center transition-colors ${
                      selected ? 'bg-brand' : 'bg-surface'
                    }`}>
                      <Icon className={`w-6 h-6 ${selected ? 'text-white' : 'text-foreground-subtle'}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-foreground font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-foreground-subtle text-xs leading-relaxed">{item.desc}</p>
                    {selected && (
                      <div className="mt-4 flex justify-center">
                        <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 1: Name */}
        {step === 1 && (
          <motion.div key="s1" {...fade} className="w-full max-w-sm text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">როგორ გქვია?</h1>
            <p className="text-foreground-subtle text-sm mb-12">შემოიყვანე შენი სახელი</p>

            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="სახელი"
              className="w-full px-5 py-4 bg-background border border-border rounded-lg text-foreground text-center text-lg placeholder-foreground-faint focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all"
            />

            <div className="mt-10">
              <button
                onClick={goNext}
                disabled={!name.trim()}
                className={`px-12 py-3.5 rounded-full text-sm font-semibold transition-all ${
                  name.trim()
                    ? 'bg-brand text-white hover:bg-brand-hover shadow-sm hover:shadow-md'
                    : 'bg-surface text-foreground-faint cursor-not-allowed'
                }`}
              >
                გაგრძელება
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <motion.div key="s2" {...fade} className="w-full max-w-xl text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              {role === 'instructor' ? 'რას ასწავლი?' : 'რა გაინტერესებს?'}
            </h1>
            <p className="text-foreground-subtle text-sm mb-12">აირჩიე 3 ან მეტი</p>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {INTEREST_CATEGORIES.map((cat) => {
                const selected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`bg-card flex flex-col items-center gap-2.5 py-5 px-3 rounded-xl border transition-all duration-200 ${
                      selected
                        ? 'border-brand bg-brand-subtle shadow-md'
                        : 'border-border-subtle shadow-sm hover:shadow-md'
                    }`}
                  >
                    <CategoryIcon iconName={cat.icon} className={`w-5 h-5 ${selected ? 'text-brand' : 'text-foreground-faint'}`} />
                    <span className={`text-xs font-medium ${selected ? 'text-foreground' : 'text-foreground-subtle'}`}>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedCategories.length > 0 && selectedCategories.length < 3 && (
              <p className="text-foreground-ghost text-xs mt-8">კიდევ {3 - selectedCategories.length} აირჩიე</p>
            )}
          </motion.div>
        )}

        {/* Step 3: Welcome */}
        {step === 3 && (
          <motion.div key="s3" {...fade} className="w-full max-w-md text-center">
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {name.trim() ? `${name.trim()}, მზად ხარ.` : 'მზად ხარ.'}
            </h1>
            <p className="text-foreground-subtle text-sm mb-12 leading-relaxed">
              {role === 'instructor'
                ? 'დროა გაუზიარო შენი ცოდნა ათასობით სტუდენტს.'
                : 'დროა აღმოაჩინო ახალი უნარები საუკეთესოებისგან.'}
            </p>
            <button
              onClick={() => { onComplete(); navigate(role === 'instructor' ? '/instructor' : '/'); }}
              className="px-12 py-3.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover shadow-sm hover:shadow-md transition-all"
            >
              {role === 'instructor' ? 'პანელზე გადასვლა' : 'კურსების ნახვა'}
            </button>
          </motion.div>
        )}

        </AnimatePresence>
      </div>

      {/* Progress dots */}
      {step < 3 && (
        <div className="pb-10 flex justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
              i === step ? 'w-6 bg-brand' : i < step ? 'w-1.5 bg-foreground-faint' : 'w-1.5 bg-foreground-ghost'
            }`} />
          ))}
        </div>
      )}
    </div>
  );
}
