import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { Link, useNavigate } from 'react-router';
import { LogOut, Pencil, Plus, Trash2 } from 'lucide-react';

export function CoursesList() {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: async () => {
      const { data } = await supabase.from('courses').select('*').order('id');
      return data ?? [];
    },
  });

  const handleCreate = async () => {
    const { data, error } = await supabase.from('courses').insert({
      title: 'ახალი კურსი',
      description: '',
      tribe: 'ინჟინერია',
      duration: '1 თვე',
      price: 0,
      format: 'ონლაინ',
      level: 'დამწყები',
      language: 'ქართული',
      gradient: 'from-[#1a1a2e] to-[#16213e]',
      logo: '',
    }).select().single();

    if (error || !data) { alert('შექმნა ვერ მოხერხდა: ' + (error?.message ?? 'უცნობი შეცდომა')); return; }
    queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    navigate(`/courses/${data.id}`);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`წავშალოთ "${title}"?`)) return;
    // Cascade: delete related data first
    await supabase.from('course_syllabus').delete().eq('course_id', id);
    await supabase.from('course_faq').delete().eq('course_id', id);
    await supabase.from('course_registrations').delete().eq('course_id', id);
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) { alert('წაშლა ვერ მოხერხდა: ' + error.message); return; }
    queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-blue-600">Blueberry Admin</h1>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link to="/courses" className="text-sm font-medium text-blue-600">კურსები</Link>
              <Link to="/masterclasses" className="text-sm font-medium text-gray-500 hover:text-gray-900">მასტერკლასები</Link>
              <Link to="/registrations" className="text-sm font-medium text-gray-500 hover:text-gray-900">რეგისტრაციები</Link>
              <Link to="/content" className="text-sm font-medium text-gray-500 hover:text-gray-900">კონტენტი</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">{user?.email}</span>
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">კურსები</h2>
          <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700">
            <Plus className="w-4 h-4" /> ახალი კურსი
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">იტვირთება...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 w-20">სურათი</th>
                  <th className="px-6 py-3">სახელი</th>
                  <th className="px-6 py-3">Tribe</th>
                  <th className="px-6 py-3">ფასი</th>
                  <th className="px-6 py-3">ხანგრძლივობა</th>
                  <th className="px-6 py-3">მენტორი</th>
                  <th className="px-6 py-3 text-right">ქმედებები</th>
                </tr>
              </thead>
              <tbody>
                {(courses ?? []).map((c: Record<string, unknown>) => {
                  const imageUrl = c.image_url ? String(c.image_url) : '';
                  const title = String(c.title);
                  return (
                  <tr key={String(c.id)} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-3">
                      {imageUrl ? (
                        <img src={imageUrl} alt={title} className="w-14 h-10 object-cover rounded-md border border-gray-100" />
                      ) : (
                        <div className="w-14 h-10 rounded-md bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <div className="flex flex-col">
                        <span>{title}</span>
                        <span className="text-xs text-gray-400">#{String(c.id)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{String(c.tribe)}</td>
                    <td className="px-6 py-4 font-semibold">{String(c.price)}₾</td>
                    <td className="px-6 py-4 text-gray-500">{String(c.duration)}</td>
                    <td className="px-6 py-4 text-gray-500">{String(c.mentor_name ?? '')}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link to={`/courses/${c.id}`} className="text-blue-600 hover:text-blue-800"><Pencil className="w-4 h-4" /></Link>
                        <button onClick={() => handleDelete(Number(c.id), title)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
