import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { Link } from 'react-router';
import { LogOut, Pencil } from 'lucide-react';

export function CoursesList() {
  const { user, signOut } = useAdminAuth();
  const { data: courses, isLoading } = useQuery({ queryKey: ['admin-courses'], queryFn: async () => {
    const { data } = await supabase.from('courses').select('*').order('id');
    return data ?? [];
  }});

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-blue-600">Blueberry Admin</h1>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link to="/courses" className="text-sm font-medium text-blue-600">კურსები</Link>
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
        <h2 className="text-2xl font-bold mb-8">კურსები</h2>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">იტვირთება...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">სახელი</th>
                  <th className="px-6 py-3">Tribe</th>
                  <th className="px-6 py-3">ფასი</th>
                  <th className="px-6 py-3">ხანგრძლივობა</th>
                  <th className="px-6 py-3">მენტორი</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {(courses ?? []).map((c: Record<string, unknown>) => (
                  <tr key={String(c.id)} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-400">{String(c.id)}</td>
                    <td className="px-6 py-4 font-medium">{String(c.title)}</td>
                    <td className="px-6 py-4 text-gray-500">{String(c.tribe)}</td>
                    <td className="px-6 py-4 font-semibold">{String(c.price)}₾</td>
                    <td className="px-6 py-4 text-gray-500">{String(c.duration)}</td>
                    <td className="px-6 py-4 text-gray-500">{String(c.mentor_name ?? '')}</td>
                    <td className="px-6 py-4">
                      <Link to={`/courses/${c.id}`} className="text-blue-600 hover:text-blue-800"><Pencil className="w-4 h-4" /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
