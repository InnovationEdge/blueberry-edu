import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { Link } from 'react-router';
import { useState, useMemo } from 'react';
import { LogOut, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 25;

type Registration = Record<string, unknown>;

export function Registrations() {
  const { user, signOut } = useAdminAuth();
  const [tab, setTab] = useState<'course' | 'masterclass'>('course');
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  const { data: courseRegs } = useQuery({
    queryKey: ['admin-course-regs'],
    queryFn: async () => {
      const { data } = await supabase.from('course_registrations').select('*, courses(title)').order('created_at', { ascending: false });
      return (data ?? []) as Registration[];
    },
  });

  const { data: masterRegs } = useQuery({
    queryKey: ['admin-master-regs'],
    queryFn: async () => {
      const { data } = await supabase.from('masterclass_registrations').select('*, masterclasses(date, time, courses(title))').order('created_at', { ascending: false });
      return (data ?? []) as Registration[];
    },
  });

  const { data: coursesList = [] } = useQuery({
    queryKey: ['admin-courses-filter-list'],
    queryFn: async () => {
      const { data } = await supabase.from('courses').select('id, title').order('title');
      return (data ?? []) as { id: number; title: string }[];
    },
  });

  const getCourseTitle = (r: Registration): string => {
    if (tab === 'course') {
      return (r.courses as Record<string, string> | null)?.title ?? '';
    }
    const mc = r.masterclasses as Record<string, unknown> | null;
    return (mc?.courses as Record<string, string> | null)?.title ?? '';
  };

  const allRegs = tab === 'course' ? courseRegs : masterRegs;

  const filtered = useMemo(() => {
    if (!allRegs) return [];
    return allRegs.filter((r) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const name = String(r.full_name ?? '').toLowerCase();
        const email = String(r.email ?? '').toLowerCase();
        const phone = String(r.phone ?? '').toLowerCase();
        if (!name.includes(q) && !email.includes(q) && !phone.includes(q)) return false;
      }
      // Course filter
      if (courseFilter !== 'all') {
        const title = getCourseTitle(r);
        if (title !== courseFilter) return false;
      }
      // Date range
      const createdAt = new Date(String(r.created_at));
      if (dateFrom) {
        const from = new Date(dateFrom);
        if (createdAt < from) return false;
      }
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        if (createdAt > to) return false;
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRegs, search, courseFilter, dateFrom, dateTo, tab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetFilters = () => {
    setSearch('');
    setCourseFilter('all');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const exportCSV = () => {
    if (!filtered.length) return;
    const headers = ['სახელი', 'ემეილი', 'ტელეფონი', 'კურსი', 'თარიღი'];
    const rows = filtered.map((r) => [
      String(r.full_name ?? ''),
      String(r.email ?? ''),
      String(r.phone ?? ''),
      getCourseTitle(r),
      new Date(String(r.created_at)).toLocaleDateString('ka-GE'),
    ]);
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [headers.map(escape), ...rows.map((row) => row.map(escape))].map((r) => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tab}-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
              <Link to="/masterclasses" className="text-sm font-medium text-gray-500 hover:text-gray-900">მასტერკლასები</Link>
              <Link to="/registrations" className="text-sm font-medium text-blue-600">რეგისტრაციები</Link>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">რეგისტრაციები</h2>
          <button
            onClick={exportCSV}
            disabled={!filtered.length}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> CSV ექსპორტი ({filtered.length})
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => { setTab('course'); setPage(1); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium ${tab === 'course' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
          >
            კურსზე ({courseRegs?.length ?? 0})
          </button>
          <button
            onClick={() => { setTab('masterclass'); setPage(1); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium ${tab === 'masterclass' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
          >
            მასტერკლასზე ({masterRegs?.length ?? 0})
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="ძებნა სახელით, ემეილით, ტელეფონით..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
          >
            <option value="all">ყველა კურსი</option>
            {coursesList.map((c) => (
              <option key={c.id} value={c.title}>{c.title}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
            {(search || courseFilter !== 'all' || dateFrom || dateTo) && (
              <button onClick={resetFilters} className="px-3 py-2 text-xs text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg">
                გასუფთავება
              </button>
            )}
          </div>
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
              {paginated.map((r, i) => (
                <tr key={`${currentPage}-${i}`} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{String(r.full_name ?? '')}</td>
                  <td className="px-6 py-4 text-gray-500">{String(r.email ?? '')}</td>
                  <td className="px-6 py-4 text-gray-500">{String(r.phone ?? '')}</td>
                  <td className="px-6 py-4 text-gray-500">{getCourseTitle(r) || '-'}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{new Date(String(r.created_at)).toLocaleDateString('ka-GE')}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400">რეგისტრაციები არ არის</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} / {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 px-2">გვერდი {currentPage} / {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
