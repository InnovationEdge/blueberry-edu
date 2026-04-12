import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAdminAuth } from '../main';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, Save } from 'lucide-react';

interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
  sort_order: number;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  sort_order: number;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

type Tab = 'stats' | 'testimonials' | 'faq';

export function Content() {
  const { user, signOut } = useAdminAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>('stats');

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
              <Link to="/registrations" className="text-sm font-medium text-gray-500 hover:text-gray-900">რეგისტრაციები</Link>
              <Link to="/content" className="text-sm font-medium text-blue-600">კონტენტი</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">{user?.email}</span>
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Landing კონტენტი</h2>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
          {(['stats', 'testimonials', 'faq'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                tab === t
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {t === 'stats' ? 'სტატისტიკა' : t === 'testimonials' ? 'გამოხმაურებები' : 'FAQ'}
            </button>
          ))}
        </div>

        {tab === 'stats' && <StatsEditor queryClient={queryClient} />}
        {tab === 'testimonials' && <TestimonialsEditor queryClient={queryClient} />}
        {tab === 'faq' && <FaqEditor queryClient={queryClient} />}
      </div>
    </div>
  );
}

// ═══ STATS ═══
function StatsEditor({ queryClient }: { queryClient: ReturnType<typeof useQueryClient> }) {
  const [list, setList] = useState<Stat[]>([]);
  const { data } = useQuery({
    queryKey: ['admin-landing-stats'],
    queryFn: async () => {
      const { data } = await supabase.from('landing_stats').select('*').order('sort_order');
      return (data ?? []) as Stat[];
    },
  });

  useEffect(() => { if (data) setList(data); }, [data]);

  const update = (idx: number, patch: Partial<Stat>) =>
    setList(prev => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));

  const add = () =>
    setList(prev => [...prev, { id: 0, value: 0, suffix: '', label: '', sort_order: prev.length + 1 }]);

  const save = async (idx: number) => {
    const row = list[idx];
    if (!row.label) { alert('შეავსე სახელი'); return; }
    if (row.id === 0) {
      await supabase.from('landing_stats').insert({
        value: row.value, suffix: row.suffix, label: row.label, sort_order: row.sort_order,
      });
    } else {
      await supabase.from('landing_stats').update({
        value: row.value, suffix: row.suffix, label: row.label, sort_order: row.sort_order,
      }).eq('id', row.id);
    }
    queryClient.invalidateQueries({ queryKey: ['admin-landing-stats'] });
    queryClient.invalidateQueries({ queryKey: ['landing-stats'] });
  };

  const remove = async (idx: number, id: number) => {
    if (id > 0) {
      if (!confirm('წავშალოთ?')) return;
      await supabase.from('landing_stats').delete().eq('id', id);
    }
    setList(prev => prev.filter((_, i) => i !== idx));
    queryClient.invalidateQueries({ queryKey: ['admin-landing-stats'] });
    queryClient.invalidateQueries({ queryKey: ['landing-stats'] });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="font-semibold">სტატისტიკის ველები</h3>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          <Plus className="w-4 h-4" /> დამატება
        </button>
      </div>
      <div className="p-5 space-y-3">
        {list.map((s, i) => (
          <div key={`${s.id}-${i}`} className="grid grid-cols-12 gap-3 items-center">
            <input
              type="number"
              value={s.value}
              onChange={e => update(i, { value: Number(e.target.value) })}
              placeholder="500"
              className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
            <input
              value={s.suffix}
              onChange={e => update(i, { suffix: e.target.value })}
              placeholder="+"
              className="col-span-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
            <input
              value={s.label}
              onChange={e => update(i, { label: e.target.value })}
              placeholder="კურსდამთავრებული"
              className="col-span-6 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
            <input
              type="number"
              value={s.sort_order}
              onChange={e => update(i, { sort_order: Number(e.target.value) })}
              placeholder="1"
              className="col-span-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button onClick={() => save(i)} className="text-green-600 hover:text-green-800"><Save className="w-4 h-4" /></button>
              <button onClick={() => remove(i, s.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-center text-gray-400 py-8">ჯერ არ არის სტატისტიკა</p>}
      </div>
    </div>
  );
}

// ═══ TESTIMONIALS ═══
function TestimonialsEditor({ queryClient }: { queryClient: ReturnType<typeof useQueryClient> }) {
  const [list, setList] = useState<Testimonial[]>([]);
  const { data } = useQuery({
    queryKey: ['admin-landing-testimonials'],
    queryFn: async () => {
      const { data } = await supabase.from('landing_testimonials').select('*').order('sort_order');
      return (data ?? []) as Testimonial[];
    },
  });

  useEffect(() => { if (data) setList(data); }, [data]);

  const update = (idx: number, patch: Partial<Testimonial>) =>
    setList(prev => prev.map((t, i) => (i === idx ? { ...t, ...patch } : t)));

  const add = () =>
    setList(prev => [...prev, { id: 0, quote: '', name: '', role: '', avatar: '', sort_order: prev.length + 1 }]);

  const save = async (idx: number) => {
    const row = list[idx];
    if (!row.name || !row.quote) { alert('შეავსე სახელი და ტექსტი'); return; }
    if (row.id === 0) {
      await supabase.from('landing_testimonials').insert({
        quote: row.quote, name: row.name, role: row.role, avatar: row.avatar, sort_order: row.sort_order,
      });
    } else {
      await supabase.from('landing_testimonials').update({
        quote: row.quote, name: row.name, role: row.role, avatar: row.avatar, sort_order: row.sort_order,
      }).eq('id', row.id);
    }
    queryClient.invalidateQueries({ queryKey: ['admin-landing-testimonials'] });
    queryClient.invalidateQueries({ queryKey: ['landing-testimonials'] });
  };

  const remove = async (idx: number, id: number) => {
    if (id > 0) {
      if (!confirm('წავშალოთ?')) return;
      await supabase.from('landing_testimonials').delete().eq('id', id);
    }
    setList(prev => prev.filter((_, i) => i !== idx));
    queryClient.invalidateQueries({ queryKey: ['admin-landing-testimonials'] });
    queryClient.invalidateQueries({ queryKey: ['landing-testimonials'] });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="font-semibold">გამოხმაურებები</h3>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          <Plus className="w-4 h-4" /> დამატება
        </button>
      </div>
      <div className="p-5 space-y-5">
        {list.map((t, i) => (
          <div key={`${t.id}-${i}`} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <textarea
              value={t.quote}
              onChange={e => update(i, { quote: e.target.value })}
              placeholder="გამოხმაურების ტექსტი..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none"
            />
            <div className="grid grid-cols-12 gap-3 items-center">
              <input
                value={t.name}
                onChange={e => update(i, { name: e.target.value })}
                placeholder="სახელი"
                className="col-span-4 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
              <input
                value={t.role}
                onChange={e => update(i, { role: e.target.value })}
                placeholder="პოზიცია"
                className="col-span-4 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
              <input
                value={t.avatar}
                onChange={e => update(i, { avatar: e.target.value })}
                placeholder="ა"
                maxLength={2}
                className="col-span-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-center"
              />
              <input
                type="number"
                value={t.sort_order}
                onChange={e => update(i, { sort_order: Number(e.target.value) })}
                placeholder="1"
                className="col-span-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button onClick={() => save(i)} className="text-green-600 hover:text-green-800"><Save className="w-4 h-4" /></button>
                <button onClick={() => remove(i, t.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-center text-gray-400 py-8">ჯერ არ არის გამოხმაურება</p>}
      </div>
    </div>
  );
}

// ═══ FAQ ═══
function FaqEditor({ queryClient }: { queryClient: ReturnType<typeof useQueryClient> }) {
  const [list, setList] = useState<FaqItem[]>([]);
  const { data } = useQuery({
    queryKey: ['admin-landing-faq'],
    queryFn: async () => {
      const { data } = await supabase.from('landing_faq').select('*').order('sort_order');
      return (data ?? []) as FaqItem[];
    },
  });

  useEffect(() => { if (data) setList(data); }, [data]);

  const update = (idx: number, patch: Partial<FaqItem>) =>
    setList(prev => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)));

  const add = () =>
    setList(prev => [...prev, { id: 0, question: '', answer: '', sort_order: prev.length + 1 }]);

  const save = async (idx: number) => {
    const row = list[idx];
    if (!row.question || !row.answer) { alert('შეავსე კითხვა და პასუხი'); return; }
    if (row.id === 0) {
      await supabase.from('landing_faq').insert({
        question: row.question, answer: row.answer, sort_order: row.sort_order,
      });
    } else {
      await supabase.from('landing_faq').update({
        question: row.question, answer: row.answer, sort_order: row.sort_order,
      }).eq('id', row.id);
    }
    queryClient.invalidateQueries({ queryKey: ['admin-landing-faq'] });
    queryClient.invalidateQueries({ queryKey: ['landing-faq'] });
  };

  const remove = async (idx: number, id: number) => {
    if (id > 0) {
      if (!confirm('წავშალოთ?')) return;
      await supabase.from('landing_faq').delete().eq('id', id);
    }
    setList(prev => prev.filter((_, i) => i !== idx));
    queryClient.invalidateQueries({ queryKey: ['admin-landing-faq'] });
    queryClient.invalidateQueries({ queryKey: ['landing-faq'] });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="font-semibold">FAQ</h3>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          <Plus className="w-4 h-4" /> დამატება
        </button>
      </div>
      <div className="p-5 space-y-5">
        {list.map((f, i) => (
          <div key={`${f.id}-${i}`} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <input
              value={f.question}
              onChange={e => update(i, { question: e.target.value })}
              placeholder="კითხვა"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium"
            />
            <textarea
              value={f.answer}
              onChange={e => update(i, { answer: e.target.value })}
              placeholder="პასუხი..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none"
            />
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={f.sort_order}
                onChange={e => update(i, { sort_order: Number(e.target.value) })}
                placeholder="1"
                className="w-20 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
              <div className="flex items-center gap-2">
                <button onClick={() => save(i)} className="text-green-600 hover:text-green-800"><Save className="w-4 h-4" /></button>
                <button onClick={() => remove(i, f.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-center text-gray-400 py-8">ჯერ არ არის კითხვა</p>}
      </div>
    </div>
  );
}
