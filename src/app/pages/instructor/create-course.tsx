import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, Image } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { useCreateCourse } from '../../hooks/use-instructor';
import { useCategories } from '../../hooks/use-courses';

export function CreateCourse() {
  const navigate = useNavigate();
  const { language } = useAuth();
  const createCourse = useCreateCourse();
  const { data: categories = [] } = useCategories();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    price: 0,
    level: 'BEGINNER',
    language: 'ka',
    thumbnailUrl: '',
    categoryIds: [] as string[],
  });

  const updateForm = (field: string, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'title') {
      const slug = (value as string).toLowerCase().replace(/[^a-z0-9\u10D0-\u10FF]+/g, '-').replace(/^-|-$/g, '');
      setForm(prev => ({ ...prev, slug }));
    }
  };

  const toggleCategory = (id: string) => {
    setForm(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter(c => c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const handleSubmit = async () => {
    try {
      await createCourse.mutateAsync({
        ...form,
        price: Number(form.price),
      });
      navigate('/instructor');
    } catch {
      // Error handled by mutation
    }
  };

  const steps = [
    // Step 0: Basic info
    <div key="0" className="space-y-6">
      <div>
        <label className="block text-xs text-white/50 mb-2 font-medium">კურსის სახელი *</label>
        <input type="text" value={form.title} onChange={e => updateForm('title', e.target.value)}
          placeholder="მაგ: ბიზნესის საფუძვლები ნულიდან"
          className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]" />
      </div>
      <div>
        <label className="block text-xs text-white/50 mb-2 font-medium">ქვესათაური</label>
        <input type="text" value={form.subtitle} onChange={e => updateForm('subtitle', e.target.value)}
          placeholder="მოკლე აღწერა"
          className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]" />
      </div>
      <div>
        <label className="block text-xs text-white/50 mb-2 font-medium">აღწერა</label>
        <textarea value={form.description} onChange={e => updateForm('description', e.target.value)}
          rows={4} placeholder="დეტალური აღწერა..."
          className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8] resize-none" />
      </div>
    </div>,

    // Step 1: Category, Level, Price
    <div key="1" className="space-y-6">
      <div>
        <label className="block text-xs text-white/50 mb-3 font-medium">კატეგორია *</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => toggleCategory(cat.id)}
              className={`px-4 py-2 rounded border text-sm transition-all active:scale-[0.97] ${
                form.categoryIds.includes(cat.id)
                  ? 'bg-[#1a4fd8] border-[#1a4fd8] text-white'
                  : 'bg-transparent border-white/10 text-white/50 hover:border-white/20'
              }`}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/50 mb-2 font-medium">დონე</label>
          <select value={form.level} onChange={e => updateForm('level', e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm focus:outline-none focus:border-[#1a4fd8]">
            <option value="BEGINNER">დამწყები</option>
            <option value="INTERMEDIATE">საშუალო</option>
            <option value="ADVANCED">მოწინავე</option>
            <option value="ALL_LEVELS">ყველა დონე</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-2 font-medium">ფასი (₾) *</label>
          <input type="number" value={form.price} onChange={e => updateForm('price', e.target.value)}
            min={0} step={0.01} placeholder="0.00"
            className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm focus:outline-none focus:border-[#1a4fd8]" />
        </div>
      </div>
    </div>,

    // Step 2: Thumbnail + Preview
    <div key="2" className="space-y-6">
      <div>
        <label className="block text-xs text-white/50 mb-2 font-medium">თამბნეილი (URL)</label>
        <input type="url" value={form.thumbnailUrl} onChange={e => updateForm('thumbnailUrl', e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]" />
        {form.thumbnailUrl && (
          <div className="mt-4 aspect-video rounded overflow-hidden">
            <img src={form.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        {!form.thumbnailUrl && (
          <div className="mt-4 aspect-video rounded border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
            <Image className="w-8 h-8 text-white/20 mb-2" />
            <p className="text-white/30 text-xs">თამბნეილის URL შეიყვანეთ</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded p-5 space-y-3">
        <h3 className="text-white font-bold text-sm">შეჯამება</h3>
        <div className="text-xs text-white/50 space-y-1">
          <p><span className="text-white/70">სახელი:</span> {form.title || '—'}</p>
          <p><span className="text-white/70">ფასი:</span> {form.price} ₾</p>
          <p><span className="text-white/70">დონე:</span> {form.level}</p>
          <p><span className="text-white/70">კატეგორიები:</span> {form.categoryIds.length || '—'}</p>
        </div>
      </div>
    </div>,
  ];

  const canProceed = step === 0 ? form.title.length > 3 : step === 1 ? form.categoryIds.length > 0 : true;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => step > 0 ? setStep(step - 1) : navigate('/instructor')}
            className="w-9 h-9 rounded flex items-center justify-center bg-white/[0.06] hover:bg-white/10 transition-all">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white">კურსის შექმნა</h1>
            <p className="text-white/40 text-xs mt-0.5">ნაბიჯი {step + 1}/3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
              <div className={`h-full rounded-full transition-all duration-500 ${i <= step ? 'bg-[#1a4fd8] w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>

        {/* Step content */}
        {steps[step]}

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button onClick={() => step > 0 ? setStep(step - 1) : navigate('/instructor')}
            className="px-6 py-2.5 text-white/60 text-sm font-medium hover:text-white transition-colors">
            {step > 0 ? 'უკან' : 'გაუქმება'}
          </button>
          {step < 2 ? (
            <button onClick={() => setStep(step + 1)} disabled={!canProceed}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${
                canProceed ? 'bg-[#1a4fd8] text-white hover:bg-[#1540b0]' : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
              }`}>
              შემდეგი
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={createCourse.isPending || !form.title}
              className="px-8 py-2.5 bg-[#1a4fd8] text-white rounded-full text-sm font-bold hover:bg-[#1540b0] transition-all active:scale-95 disabled:opacity-50">
              {createCourse.isPending ? 'იქმნება...' : 'კურსის შექმნა'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
