import { useParams, useNavigate, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { useState, useEffect } from 'react';
import { LogOut, ArrowLeft, Save } from 'lucide-react';

export function CourseEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, signOut } = useAdminAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', tribe: '', duration: '', price: 0, format: 'ონლაინ',
    mentor_name: '', mentor_role: '', schedule_days: '', schedule_time: '', start_date: '', level: 'დამწყები', language: 'ქართული',
  });

  const { data: course, isLoading } = useQuery({ queryKey: ['admin-course', id], queryFn: async () => {
    const { data } = await supabase.from('courses').select('*').eq('id', id).single();
    return data;
  }});

  useEffect(() => {
    if (course) setForm({
      title: course.title ?? '', description: course.description ?? '', tribe: course.tribe ?? '',
      duration: course.duration ?? '', price: course.price ?? 0, format: course.format ?? 'ონლაინ',
      mentor_name: course.mentor_name ?? '', mentor_role: course.mentor_role ?? '',
      schedule_days: course.schedule_days ?? '', schedule_time: course.schedule_time ?? '',
      start_date: course.start_date ?? '', level: course.level ?? 'დამწყები', language: course.language ?? 'ქართული',
    });
  }, [course]);

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('courses').update(form).eq('id', id);
    queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    setSaving(false);
    navigate('/courses');
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-400">იტვირთება...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-blue-600">Blueberry Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">{user?.email}</span>
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4" /> კურსებზე დაბრუნება
        </button>
        <h2 className="text-2xl font-bold mb-8">კურსის რედაქტირება</h2>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">სახელი</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Tribe</label>
              <select value={form.tribe} onChange={e => setForm({ ...form, tribe: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm">
                <option>ინჟინერია</option><option>დიზაინი</option><option>მარკეტინგი</option><option>AI</option><option>მენეჯმენტი</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">აღწერა</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">ფასი (₾)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">ხანგრძლივობა</label>
              <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">დონე</label>
              <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm">
                <option>დამწყები</option><option>საშუალო</option><option>მოწინავე</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">მენტორის სახელი</label>
              <input value={form.mentor_name} onChange={e => setForm({ ...form, mentor_name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">მენტორის როლი</label>
              <input value={form.mentor_role} onChange={e => setForm({ ...form, mentor_role: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">სალექციო დღეები</label>
              <input value={form.schedule_days} onChange={e => setForm({ ...form, schedule_days: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">სალექციო დრო</label>
              <input value={form.schedule_time} onChange={e => setForm({ ...form, schedule_time: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">დაწყების თარიღი</label>
              <input value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button onClick={handleSave} disabled={saving} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2">
              <Save className="w-4 h-4" /> {saving ? 'ინახება...' : 'შენახვა'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
