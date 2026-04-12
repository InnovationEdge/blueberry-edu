import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { Link } from 'react-router';
import { BookOpen, Users, Calendar, LogOut, BarChart3 } from 'lucide-react';

export function Dashboard() {
  const { user, signOut } = useAdminAuth();

  const { data: coursesCount } = useQuery({ queryKey: ['courses-count'], queryFn: async () => {
    const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true });
    return count ?? 0;
  }});

  const { data: courseRegs } = useQuery({ queryKey: ['course-regs-count'], queryFn: async () => {
    const { count } = await supabase.from('course_registrations').select('*', { count: 'exact', head: true });
    return count ?? 0;
  }});

  const { data: masterRegs } = useQuery({ queryKey: ['master-regs-count'], queryFn: async () => {
    const { count } = await supabase.from('masterclass_registrations').select('*', { count: 'exact', head: true });
    return count ?? 0;
  }});

  const { data: recentRegs } = useQuery({ queryKey: ['recent-regs'], queryFn: async () => {
    const { data } = await supabase.from('course_registrations').select('*, courses(title)').order('created_at', { ascending: false }).limit(5);
    return data ?? [];
  }});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-blue-600">Blueberry Admin</h1>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-blue-600">Dashboard</Link>
              <Link to="/courses" className="text-sm font-medium text-gray-500 hover:text-gray-900">კურსები</Link>
              <Link to="/registrations" className="text-sm font-medium text-gray-500 hover:text-gray-900">რეგისტრაციები</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">{user?.email}</span>
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
          {[
            { icon: BookOpen, label: 'კურსები', value: coursesCount, color: 'bg-blue-50 text-blue-600' },
            { icon: Users, label: 'კურსზე რეგისტრაცია', value: courseRegs, color: 'bg-green-50 text-green-600' },
            { icon: Calendar, label: 'მასტერკლასზე რეგისტრაცია', value: masterRegs, color: 'bg-purple-50 text-purple-600' },
            { icon: BarChart3, label: 'სულ რეგისტრაცია', value: (courseRegs ?? 0) + (masterRegs ?? 0), color: 'bg-orange-50 text-orange-600' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold">{s.value ?? '...'}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Recent registrations */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold mb-4">ბოლო რეგისტრაციები</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-3">სახელი</th>
                <th className="pb-3">ემეილი</th>
                <th className="pb-3">ტელეფონი</th>
                <th className="pb-3">კურსი</th>
                <th className="pb-3">თარიღი</th>
              </tr>
            </thead>
            <tbody>
              {(recentRegs ?? []).map((r: Record<string, unknown>, i: number) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 font-medium">{String(r.full_name)}</td>
                  <td className="py-3 text-gray-500">{String(r.email)}</td>
                  <td className="py-3 text-gray-500">{String(r.phone)}</td>
                  <td className="py-3 text-gray-500">{(r.courses as Record<string, string>)?.title ?? '-'}</td>
                  <td className="py-3 text-gray-400 text-xs">{new Date(String(r.created_at)).toLocaleDateString('ka-GE')}</td>
                </tr>
              ))}
              {(recentRegs ?? []).length === 0 && <tr><td colSpan={5} className="py-8 text-center text-gray-400">ჯერ რეგისტრაციები არ არის</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
