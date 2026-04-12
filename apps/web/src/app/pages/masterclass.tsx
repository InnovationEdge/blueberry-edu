import { useState } from 'react';
import { Clock, Globe, Calendar, Users, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';
import { useMasterclasses } from '../hooks/use-masterclasses';
import { useMasterclassRegistration } from '../hooks/use-registration';
import { useDocumentTitle } from '../hooks/use-document-title';

export function Masterclass() {
  useDocumentTitle('მასტერკლასები');
  const { data: masterclasses = [], isLoading } = useMasterclasses();
  const [selectedMcId, setSelectedMcId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const selectedMc = masterclasses.find(m => m.id === selectedMcId) ?? masterclasses[0];
  const registration = useMasterclassRegistration(selectedMc?.id ?? 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMc) return;
    await registration.submit({
      full_name: form.name,
      email: form.email,
      phone: form.phone,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <LandingHeader activePath="/masterclass" />
        <div className="h-[72px]" />
        <div className="py-20 text-center text-foreground-faint">იტვირთება...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader activePath="/masterclass" />
      <div className="h-[72px]" />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-[#004aad] to-[#002d6b] text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
              უფასო მასტერკლასი
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-2xl">
              გაიარე უფასო მასტერკლასი და აღმოაჩინე შენი პროფესია
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-xl mb-8">
              1 საათიანი ინტენსიური სესია, სადაც გაიგებ რას ისწავლი კურსზე, ვინ ასწავლის და რა შედეგს მიიღებ.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50 flex-wrap">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 1 საათი</span>
              <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> ონლაინ (Google Meet)</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> ყოველ კვირას</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4" /> შეზღუდული ადგილები</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN — form + info ═══ */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1300px] mx-auto px-5 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 md:gap-16">

            {/* Left — რა მოიცავს + course select */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">რას მოიცავს მასტერკლასი?</h2>

              <div className="space-y-5 mb-12">
                {[
                  'გაეცნობი არჩეული სფეროს რეალურ სამუშაო პროცესს',
                  'ნახავ პრაქტიკულ მაგალითებს და live დემოს',
                  'შეხვდები ინსტრუქტორს და დაუსვამ კითხვებს',
                  'მიიღებ კურსის დეტალურ სილაბუსს და სასწავლო გეგმას',
                  'გაიგებ რა შედეგებს მიაღწიეს წინა კურსდამთავრებულებმა',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#004aad]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#004aad]" />
                    </div>
                    <p className="text-foreground-secondary text-sm leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>

              {/* აირჩიე კურსი */}
              <h3 className="text-lg font-bold mb-4">აირჩიე მიმართულება</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {masterclasses.map((mc) => (
                  <button
                    key={mc.id}
                    onClick={() => setSelectedMcId(mc.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      (selectedMcId ?? masterclasses[0]?.id) === mc.id
                        ? 'border-[#004aad] bg-[#004aad]/5 shadow-sm'
                        : 'border-border-subtle hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground mb-1">{mc.courses?.title ?? 'კურსი'}</p>
                    <p className="text-[11px] text-foreground-faint">{mc.date} · {mc.time}</p>
                  </button>
                ))}
              </div>

              {masterclasses.length === 0 && (
                <p className="text-center text-foreground-faint py-8">მასტერკლასები ჯერ არ არის დაგეგმილი</p>
              )}
            </div>

            {/* Right — Registration form */}
            <div>
              <div className="sticky top-[88px]">
                <div className="bg-card border border-border-subtle rounded-2xl p-7 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider mb-3">
                      უფასო
                    </div>
                    <h3 className="text-xl font-bold mb-1">დარეგისტრირდი მასტერკლასზე</h3>
                    {selectedMc && (
                      <>
                        <p className="text-sm font-semibold text-foreground mb-0.5">{selectedMc.courses?.title}</p>
                        <p className="text-sm text-foreground-faint">{selectedMc.date} · {selectedMc.time}</p>
                      </>
                    )}
                  </div>

                  {registration.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                      {registration.error}
                    </div>
                  )}

                  {!registration.isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground-faint mb-1.5">სახელი და გვარი</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="მაგ. გიორგი ბერიძე"
                          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground-faint mb-1.5">ელ. ფოსტა</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="example@mail.com"
                          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground-faint mb-1.5">ტელეფონის ნომერი</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+995 5XX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-sm focus:outline-none focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad]/20 transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={registration.isSubmitting}
                        className="w-full py-3.5 bg-[#004aad] text-white rounded-xl font-semibold text-sm hover:bg-[#003d8f] transition-all active:scale-[0.97] flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                      >
                        {registration.isSubmitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> იგზავნება...</>
                        ) : (
                          <>რეგისტრაცია <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>

                      <p className="text-[10px] text-foreground-faint text-center mt-3">
                        რეგისტრაციით ეთანხმებით ჩვენს პირობებს
                      </p>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">წარმატებით დარეგისტრირდი!</h4>
                      <p className="text-sm text-foreground-secondary mb-1">{form.name}, მადლობა რეგისტრაციისთვის.</p>
                      <p className="text-sm text-foreground-faint">მასტერკლასის ლინკს მიიღებ ელ. ფოსტაზე: {form.email}</p>
                    </motion.div>
                  )}
                </div>

                {/* Next masterclass info */}
                {selectedMc && (
                  <div className="mt-4 bg-surface border border-border-subtle rounded-xl p-5">
                    <p className="text-xs text-foreground-faint uppercase tracking-wider mb-2">არჩეული მასტერკლასი</p>
                    <p className="text-sm font-semibold">{selectedMc.date} · {selectedMc.time}</p>
                    <p className="text-xs text-foreground-faint mt-1">ონლაინ · Google Meet · 1 საათი · {selectedMc.courses?.tribe}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
