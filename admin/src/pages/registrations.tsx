import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { Link } from 'react-router';
import { useState } from 'react';
import { LogOut, Download } from 'lucide-react';

export function Registrations() {
  const { user, signOut } = useAdminAuth();
  const [tab, setTab] = useState<'course' | 'masterclass'>('course');

  const { data: courseRegs } = useQuery({ queryKey: ['admin-course-regs'], queryFn: async () => {
    const { data } = await supabase.from('course_registrations').select('*, courses(title)').order('created_at', { ascending: false });
    return data ?? [];
  }});

  const { data: masterRegs } = useQuery({ queryKey: ['admin-master-regs'], queryFn: async () => {
    const { data } = await supabase.from('masterclass_registrations').select('*, masterclasses(date, time, courses(title))').order('created_at', { ascending: false });
    return data ?? [];
  }});

  const exportCSV = () => {
    const regs = tab === 'course' ? courseRegs : masterRegs;
    if (!regs?.length) return;
    const headers = ['სახელი', 'ემეილი', 'ტელეფონი', 'კურსი', 'თარიღი'];
    const rows = regs.map((r: Record<string, unknown>) => [
      String(r.full_name),
      String(r.email),
      String(r.phone),
      tab === 'course' ? (r.courses as Record<string, string>)?.title ?? '' : ((r.masterclasses as Record<string, unknown>)?.courses as Record<string, string>)?.title ?? '',
      new Date(String(r.created_at)).toLocaleDateString('ka-GE'),
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tab}-registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const regs = tab === 'course' ? courseRegs : masterRegs;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-blue-600">Blueberry Admin</h1>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</Link>
              <Link to="/courses" className="text-sm font-medium text-gray-500 hover:text-gray-900">კურსები</Link>
              <Link to="/registrations" className="text-sm font-medium text-blue-600">რეგისტრაციები</Link>
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
          <h2 className="text-2xl font-bold">რეგისტრაციები</h2>
          <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700">
            <Download className="w-4 h-4" /> CSV ექსპორტი
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button onClick={() => setTab('course')} className={`px-5 py-2.5 rounded-xl text-sm font-medium ${tab === 'course' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            კურსზე ({courseRegs?.length ?? 0})
          </button>
          <button onClick={() => setTab('masterclass')} className={`px-5 py-2.5 rounded-xl text-sm font-medium ${tab === 'masterclass' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            მასტერკლასზე ({masterRegs?.length ?? 0})
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3">სახელი</th>
                <th className="px-6 py-3">ემეილი</th>
                <th className="px-6 py-3">ტელეფონი</th>
                <th className="px-6 py-3">კურსი</th>
                <th className="px-6 py-3">თარიღი</th>
              </tr>
            </thead>
            <tbody>
              {(regs ?? []).map((r: Record<string, unknown>, i: number) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{String(r.full_name)}</td>
                  <td className="px-6 py-4 text-gray-500">{String(r.email)}</td>
                  <td className="px-6 py-4 text-gray-500">{String(r.phone)}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {tab === 'course'
                      ? (r.courses as Record<string, string>)?.title ?? '-'
                      : ((r.masterclasses as Record<string, unknown>)?.courses as Record<string, string>)?.title ?? '-'
                    }
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{new Date(String(r.created_at)).toLocaleDateString('ka-GE')}</td>
                </tr>
              ))}
              {(regs ?? []).length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400">რეგისტრაციები არ არის</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
