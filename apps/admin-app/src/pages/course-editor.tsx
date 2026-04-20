import { useParams, useNavigate, Link } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { useState, useEffect, useRef } from 'react';
import { LogOut, ArrowLeft, Save, Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface SyllabusModule { id?: number; title: string; topics: string[]; sort_order: number }
interface FaqItem { id?: number; question: string; answer: string; sort_order: number }

interface CourseForm {
  title: string;
  description: string;
  tribe: string;
  duration: string;
  price: number;
  format: string;
  gradient: string;
  image_url: string;
  mentor_name: string;
  mentor_role: string;
  mentor_photo: string;
  mentor_bio: string;
  schedule_days: string;
  schedule_time: string;
  start_date: string;
  level: string;
  language: string;
  learning_outcomes: string[];
}

const GRADIENT_OPTIONS = [
  'from-[#1a1a2e] to-[#16213e]', 'from-[#0f3460] to-[#16213e]', 'from-[#533483] to-[#0b0e2e]',
  'from-[#1a472a] to-[#0d2818]', 'from-[#4a1942] to-[#1a1a2e]', 'from-[#2d1b69] to-[#11001c]',
  'from-[#1b4332] to-[#081c15]', 'from-[#3d1c02] to-[#1a0a00]', 'from-[#1c1c3d] to-[#0a0a1a]',
];

const emptyForm: CourseForm = {
  title: '', description: '', tribe: 'ინჟინერია', duration: '', price: 0, format: 'ონლაინ',
  gradient: 'from-[#1a1a2e] to-[#16213e]',
  image_url: '', mentor_name: '', mentor_role: '', mentor_photo: '', mentor_bio: '',
  schedule_days: '', schedule_time: '', start_date: '', level: 'დამწყები', language: 'ქართული',
  learning_outcomes: [],
};

type Tab = 'general' | 'mentor' | 'schedule' | 'outcomes' | 'syllabus' | 'faq';

export function CourseEditor() {
  const { id: rawId } = useParams<{ id: string }>();
  const courseId = Number(rawId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, signOut } = useAdminAuth();
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<Tab>('general');
  const [form, setForm] = useState<CourseForm>(emptyForm);
  const [syllabus, setSyllabus] = useState<SyllabusModule[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mentorPhotoRef = useRef<HTMLInputElement>(null);

  const { data: course, isLoading } = useQuery({
    queryKey: ['admin-course', courseId],
    queryFn: async () => {
      if (!courseId || isNaN(courseId)) return null;
      const { data, error } = await supabase.from('courses').select('*').eq('id', courseId).single();
      if (error) throw error;
      return data;
    },
    enabled: !!courseId && !isNaN(courseId),
  });

  const { data: syllabusData } = useQuery({
    queryKey: ['admin-syllabus', courseId],
    queryFn: async () => {
      const { data } = await supabase.from('course_syllabus').select('*').eq('course_id', courseId).order('sort_order');
      return data ?? [];
    },
    enabled: !!courseId && !isNaN(courseId),
  });

  const { data: faqData } = useQuery({
    queryKey: ['admin-faq', courseId],
    queryFn: async () => {
      const { data } = await supabase.from('course_faq').select('*').eq('course_id', courseId).order('sort_order');
      return data ?? [];
    },
    enabled: !!courseId && !isNaN(courseId),
  });

  useEffect(() => {
    if (course) setForm({
      title: course.title ?? '',
      description: course.description ?? '',
      tribe: course.tribe ?? 'ინჟინერია',
      duration: course.duration ?? '',
      price: course.price ?? 0,
      format: course.format ?? 'ონლაინ',
      gradient: course.gradient ?? 'from-[#1a1a2e] to-[#16213e]',
      image_url: course.image_url ?? '',
      mentor_name: course.mentor_name ?? '',
      mentor_role: course.mentor_role ?? '',
      mentor_photo: course.mentor_photo ?? '',
      mentor_bio: course.mentor_bio ?? '',
      schedule_days: course.schedule_days ?? '',
      schedule_time: course.schedule_time ?? '',
      start_date: course.start_date ?? '',
      level: course.level ?? 'დამწყები',
      language: course.language ?? 'ქართული',
      learning_outcomes: course.learning_outcomes ?? [],
    });
  }, [course]);

  useEffect(() => {
    if (syllabusData) setSyllabus(syllabusData.map((m: Record<string, unknown>) => ({
      id: m.id as number,
      title: m.title as string,
      topics: (m.topics as string[]) ?? [],
      sort_order: (m.sort_order as number) ?? 0,
    })));
  }, [syllabusData]);

  useEffect(() => {
    if (faqData) setFaq(faqData.map((f: Record<string, unknown>) => ({
      id: f.id as number,
      question: f.question as string,
      answer: f.answer as string,
      sort_order: (f.sort_order as number) ?? 0,
    })));
  }, [faqData]);

  const uploadImage = async (file: File, field: 'image_url' | 'mentor_photo') => {
    if (!courseId) { alert('ჯერ კურსი შეინახეთ'); return; }
    const ext = file.name.split('.').pop();
    const path = `${courseId}/${field}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('course-assets').upload(path, file, { upsert: true });
    if (error) { alert('სურათის ატვირთვა ვერ მოხერხდა: ' + error.message); return; }
    const { data: { publicUrl } } = supabase.storage.from('course-assets').getPublicUrl(path);
    setForm(prev => ({ ...prev, [field]: publicUrl }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) { alert('კურსის სახელი სავალდებულოა'); return; }
    if (!form.tribe) { alert('Tribe სავალდებულოა'); return; }
    if (!form.duration.trim()) { alert('ხანგრძლივობა სავალდებულოა'); return; }
    setSaving(true);
    try {
      // Save course fields (exclude learning_outcomes if column doesn't exist in DB)
      const { learning_outcomes, ...courseFields } = form;
      const { error: courseErr } = await supabase.from('courses').update(courseFields).eq('id', courseId);
      if (courseErr) throw courseErr;

      // Replace syllabus — delete all then re-insert
      await supabase.from('course_syllabus').delete().eq('course_id', courseId);
      if (syllabus.length > 0) {
        const rows = syllabus.map((m, i) => ({
          course_id: courseId,
          title: m.title,
          topics: m.topics,
          sort_order: i,
        }));
        const { error: syllErr } = await supabase.from('course_syllabus').insert(rows);
        if (syllErr) throw syllErr;
      }

      // Replace FAQ
      await supabase.from('course_faq').delete().eq('course_id', courseId);
      if (faq.length > 0) {
        const rows = faq.map((f, i) => ({
          course_id: courseId,
          question: f.question,
          answer: f.answer,
          sort_order: i,
        }));
        const { error: faqErr } = await supabase.from('course_faq').insert(rows);
        if (faqErr) throw faqErr;
      }

      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      queryClient.invalidateQueries({ queryKey: ['admin-course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['admin-syllabus', courseId] });
      queryClient.invalidateQueries({ queryKey: ['admin-faq', courseId] });
      navigate('/courses');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : (e && typeof e === 'object' && 'message' in e) ? String((e as Record<string, unknown>).message) : JSON.stringify(e);
      alert('შენახვისას შეცდომა: ' + msg);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-400">იტვირთება...</div>;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'general', label: 'ზოგადი' },
    { id: 'mentor', label: 'მენტორი' },
    { id: 'schedule', label: 'განრიგი' },
    { id: 'outcomes', label: 'რას ისწავლი' },
    { id: 'syllabus', label: 'სილაბუსი' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-bold text-blue-600">Blueberry Admin</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">{user?.email}</span>
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4" /> კურსებზე დაბრუნება
        </button>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{form.title || 'კურსის რედაქტირება'}</h2>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2">
            <Save className="w-4 h-4" /> {saving ? 'ინახება...' : 'შენახვა'}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">
            {tab === 'general' && (
              <>
                <Field label="კურსის სურათი">
                  {form.image_url && <img src={form.image_url} alt="" className="w-full max-w-md rounded-xl mb-3 border border-gray-200" />}
                  <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'image_url')} />
                  <button onClick={() => imageInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                    <Upload className="w-4 h-4" /> ატვირთე სურათი
                  </button>
                  {form.image_url && (
                    <button onClick={() => setForm({ ...form, image_url: '' })} className="ml-2 text-sm text-red-500">წაშლა</button>
                  )}
                </Field>

                <div className="grid grid-cols-2 gap-5">
                  <Field label="სახელი">
                    <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  </Field>
                  <Field label="Tribe">
                    <Select value={form.tribe} onChange={e => setForm({ ...form, tribe: e.target.value })}>
                      <option>ინჟინერია</option><option>დიზაინი</option><option>მარკეტინგი</option><option>AI</option><option>მენეჯმენტი</option>
                    </Select>
                  </Field>
                </div>

                <Field label="აღწერა">
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500" />
                </Field>

                <div className="grid grid-cols-3 gap-5">
                  <Field label="ფასი (₾)">
                    <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
                  </Field>
                  <Field label="ხანგრძლივობა">
                    <Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="3 თვე" />
                  </Field>
                  <Field label="ფორმატი">
                    <Input value={form.format} onChange={e => setForm({ ...form, format: e.target.value })} />
                  </Field>
                </div>

                <Field label="ფერი (Gradient)">
                  <div className="flex gap-2 flex-wrap">
                    {GRADIENT_OPTIONS.map(g => (
                      <button key={g} type="button" onClick={() => setForm({ ...form, gradient: g })} className={`w-12 h-8 rounded-lg bg-gradient-to-br ${g} border-2 transition-all ${form.gradient === g ? 'border-blue-500 scale-110' : 'border-gray-200 hover:border-gray-400'}`} />
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-5">
                  <Field label="დონე">
                    <Select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                      <option>დამწყები</option><option>საშუალო</option><option>მოწინავე</option>
                    </Select>
                  </Field>
                  <Field label="ენა">
                    <Select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
                      <option>ქართული</option><option>English</option>
                    </Select>
                  </Field>
                </div>
              </>
            )}

            {tab === 'mentor' && (
              <>
                <Field label="მენტორის ფოტო">
                  {form.mentor_photo && <img src={form.mentor_photo} alt="" className="w-32 h-32 rounded-full mb-3 border border-gray-200 object-cover" />}
                  <input ref={mentorPhotoRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'mentor_photo')} />
                  <button onClick={() => mentorPhotoRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                    <ImageIcon className="w-4 h-4" /> ატვირთე ფოტო
                  </button>
                  {form.mentor_photo && (
                    <button onClick={() => setForm({ ...form, mentor_photo: '' })} className="ml-2 text-sm text-red-500">წაშლა</button>
                  )}
                </Field>

                <div className="grid grid-cols-2 gap-5">
                  <Field label="სახელი">
                    <Input value={form.mentor_name} onChange={e => setForm({ ...form, mentor_name: e.target.value })} />
                  </Field>
                  <Field label="პოზიცია">
                    <Input value={form.mentor_role} onChange={e => setForm({ ...form, mentor_role: e.target.value })} placeholder="Senior Mobile Developer" />
                  </Field>
                </div>

                <Field label="ბიოგრაფია">
                  <textarea value={form.mentor_bio} onChange={e => setForm({ ...form, mentor_bio: e.target.value })} rows={5} placeholder="მოკლე ბიოგრაფია, გამოცდილება, კომპანიები..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500" />
                </Field>
              </>
            )}

            {tab === 'schedule' && (
              <div className="grid grid-cols-3 gap-5">
                <Field label="სალექციო დღეები">
                  <Input value={form.schedule_days} onChange={e => setForm({ ...form, schedule_days: e.target.value })} placeholder="სამშაბათი, ხუთშაბათი" />
                </Field>
                <Field label="სალექციო დრო">
                  <Input value={form.schedule_time} onChange={e => setForm({ ...form, schedule_time: e.target.value })} placeholder="19:00 - 21:00" />
                </Field>
                <Field label="დაწყების თარიღი">
                  <Input value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} placeholder="28 აპრ. 2026" />
                </Field>
              </div>
            )}

            {tab === 'outcomes' && (
              <ArrayEditor
                items={form.learning_outcomes}
                onChange={v => setForm({ ...form, learning_outcomes: v })}
                placeholder="მაგ. React Native-ის ფუნდამენტური კონცეფციები"
                addLabel="დაამატე შედეგი"
              />
            )}

            {tab === 'syllabus' && (
              <SyllabusEditor syllabus={syllabus} onChange={setSyllabus} />
            )}

            {tab === 'faq' && (
              <FaqEditor faq={faq} onChange={setFaq} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500" />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500" />;
}

function ArrayEditor({ items, onChange, placeholder, addLabel }: { items: string[]; onChange: (v: string[]) => void; placeholder: string; addLabel: string }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={e => onChange(items.map((x, j) => j === i ? e.target.value : x))}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
          />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="px-3 text-red-500 hover:bg-red-50 rounded-lg">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
        <Plus className="w-4 h-4" /> {addLabel}
      </button>
    </div>
  );
}

function SyllabusEditor({ syllabus, onChange }: { syllabus: SyllabusModule[]; onChange: (v: SyllabusModule[]) => void }) {
  const addModule = () => onChange([...syllabus, { title: '', topics: [''], sort_order: syllabus.length }]);
  const removeModule = (i: number) => onChange(syllabus.filter((_, j) => j !== i));
  const updateModule = (i: number, patch: Partial<SyllabusModule>) => onChange(syllabus.map((m, j) => j === i ? { ...m, ...patch } : m));

  return (
    <div className="space-y-4">
      {syllabus.map((mod, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex gap-2">
            <input
              value={mod.title}
              onChange={e => updateModule(i, { title: e.target.value })}
              placeholder={`მოდული ${i + 1} — სახელი`}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:outline-none focus:border-blue-500"
            />
            <button onClick={() => removeModule(i)} className="px-3 text-red-500 hover:bg-red-50 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <ArrayEditor
            items={mod.topics}
            onChange={v => updateModule(i, { topics: v })}
            placeholder="თემა"
            addLabel="დაამატე თემა"
          />
        </div>
      ))}
      <button onClick={addModule} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
        <Plus className="w-4 h-4" /> დაამატე მოდული
      </button>
    </div>
  );
}

function FaqEditor({ faq, onChange }: { faq: FaqItem[]; onChange: (v: FaqItem[]) => void }) {
  const addItem = () => onChange([...faq, { question: '', answer: '', sort_order: faq.length }]);
  const removeItem = (i: number) => onChange(faq.filter((_, j) => j !== i));
  const updateItem = (i: number, patch: Partial<FaqItem>) => onChange(faq.map((f, j) => j === i ? { ...f, ...patch } : f));

  return (
    <div className="space-y-4">
      {faq.map((f, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex gap-2">
            <input
              value={f.question}
              onChange={e => updateItem(i, { question: e.target.value })}
              placeholder="კითხვა"
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold focus:outline-none focus:border-blue-500"
            />
            <button onClick={() => removeItem(i)} className="px-3 text-red-500 hover:bg-red-50 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={f.answer}
            onChange={e => updateItem(i, { answer: e.target.value })}
            placeholder="პასუხი"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      ))}
      <button onClick={addItem} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
        <Plus className="w-4 h-4" /> დაამატე კითხვა
      </button>
    </div>
  );
}
