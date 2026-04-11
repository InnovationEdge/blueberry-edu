import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, Save } from 'lucide-react';

interface Masterclass {
  id: number;
  course_id: number;
  date: string;
  time: string;
  courses?: { title: string } | null;
}

export function Masterclasses() {
  const { user, signOut } = useAdminAuth();
  const queryClient = useQueryClient();
  const [localList, setLocalList] = useState<Masterclass[]>([]);

  const { data: masterclasses, isLoading } = useQuery({
    queryKey: ['admin-masterclasses'],
    queryFn: async () => {
      const { data } = await supabase.from('masterclasses').select('*, courses(title)').order('course_id');
      return (data ?? []) as Masterclass[];
    },
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['admin-courses-list'],
    queryFn: async () => {
      const { data } = await supabase.from('courses').select('id, title').order('id');
      return data ?? [];
    },
  });

  useEffect(() => {
    if (masterclasses) setLocalList(masterclasses);
  }, [masterclasses]);

  const addRow = () => {
    if (courses.length === 0) return;
    setLocalList(prev => [...prev, { id: 0, course_id: courses[0].id as number, date: '', time: '' }]);
  };

  const updateRow = (idx: number, patch: Partial<Masterclass>) => {
    setLocalList(prev => prev.map((m, i) => i === idx ? { ...m, ...patch } : m));
  };

  const removeRow = async (idx: number, id: number) => {
    if (id > 0) {
      if (!confirm('წავშალოთ მასტერკლასი?')) return;
      await supabase.from('masterclasses').delete().eq('id', id);
    }
    setLocalList(prev => prev.filter((_, i) => i !== idx));
    queryClient.invalidateQueries({ queryKey: ['admin-masterclasses'] });
  };

  const saveRow = async (idx: number) => {
    const row = localList[idx];
    if (!row.date || !row.time) { alert('შეავსე თარიღი და დრო'); return; }
    if (row.id === 0) {
      await supabase.from('masterclasses').insert({ course_id: row.course_id, date: row.date, time: row.time });
    } else {
      await supabase.from('masterclasses').update({ course_id: row.course_id, date: row.date, time: row.time }).eq('id', row.id);
    }
    queryClient.invalidateQueries({ queryKey: ['admin-masterclasses'] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-blue-600">Blueberry Admin</h1>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link to="/courses" className="text-sm font-medium text-gray-500 hover:text-gray-900">კურსები</Link>
              <Link to="/masterclasses" className="text-sm font-medium text-blue-600">მასტერკლასები</Link>
              <Link to="/registrations" className="text-sm font-medium text-gray-500 hover:text-gray-900">რეგისტრაციები</Link>
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
          <h2 className="text-2xl font-bold">მასტერკლასები</h2>
          <button onClick={addRow} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700">
            <Plus className="w-4 h-4" /> დაამატე
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">იტვირთება...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3">კურსი</th>
                  <th className="px-6 py-3">თარიღი</th>
                  <th className="px-6 py-3">დრო</th>
                  <th className="px-6 py-3 text-right">ქმედებები</th>
                </tr>
              </thead>
              <tbody>
                {localList.map((m, idx) => (
                  <tr key={`${m.id}-${idx}`} className="border-b border-gray-50">
                    <td className="px-6 py-3">
                      <select
                        value={m.course_id}
                        onChange={e => updateRow(idx, { course_id: Number(e.target.value) })}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm min-w-[200px]"
                      >
                        {courses.map((c: Record<string, unknown>) => (
                          <option key={String(c.id)} value={Number(c.id)}>{String(c.title)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-3">
                      <input
                        value={m.date}
                        onChange={e => updateRow(idx, { date: e.target.value })}
                        placeholder="12 აპრილი, შაბათი"
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm w-full"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        value={m.time}
                        onChange={e => updateRow(idx, { time: e.target.value })}
                        placeholder="15:00"
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm w-28"
                      />
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => saveRow(idx)} className="text-green-600 hover:text-green-800"><Save className="w-4 h-4" /></button>
                        <button onClick={() => removeRow(idx, m.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {localList.length === 0 && (
                  <tr><td colSpan={4} className="py-12 text-center text-gray-400">მასტერკლასები არ არის</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
