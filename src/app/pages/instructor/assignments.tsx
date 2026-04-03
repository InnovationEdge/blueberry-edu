import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, FileText, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import type { ApiResponse } from '../../../lib/api';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  submissions: number;
  graded: number;
}

export function Assignments() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ['assignments', courseId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Assignment[]>>(`/instructor/courses/${courseId}/assignments`);
      return data.data ?? [];
    },
  });

  const createAssignment = useMutation({
    mutationFn: async () => {
      await api.post(`/instructor/courses/${courseId}/assignments`, {
        title: newTitle,
        description: newDescription,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments', courseId] });
      setNewTitle('');
      setNewDescription('');
      setShowCreate(false);
    },
  });

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(`/instructor/course/${courseId}`)}
              className="w-9 h-9 rounded flex items-center justify-center bg-white/[0.06] hover:bg-white/10 transition-all">
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <h1 className="text-2xl font-black text-white">დავალებები</h1>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1a4fd8] text-white rounded-full text-sm font-bold hover:bg-[#1540b0] transition-all active:scale-95">
            <Plus className="w-4 h-4" />დავალების შექმნა
          </button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded p-5 mb-6 space-y-4">
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)}
              placeholder="დავალების სახელი"
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]" />
            <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)}
              placeholder="აღწერა და ინსტრუქციები..."
              rows={4}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8] resize-none" />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowCreate(false)}
                className="px-4 py-2 text-white/50 text-sm hover:text-white transition-colors">გაუქმება</button>
              <button onClick={() => createAssignment.mutate()}
                disabled={!newTitle || createAssignment.isPending}
                className="px-6 py-2 bg-[#1a4fd8] text-white rounded-full text-sm font-bold hover:bg-[#1540b0] disabled:opacity-50 active:scale-95">
                {createAssignment.isPending ? '...' : 'შექმნა'}
              </button>
            </div>
          </div>
        )}

        {/* Assignment list */}
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-white/[0.03] rounded" />
            ))}
          </div>
        ) : assignments.length > 0 ? (
          <div className="space-y-3">
            {assignments.map((a) => (
              <div key={a.id} className="bg-white/[0.03] border border-white/[0.06] rounded p-5 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-white/30 mt-0.5" />
                    <div>
                      <h3 className="text-white font-bold text-sm">{a.title}</h3>
                      <p className="text-white/40 text-xs mt-1 line-clamp-2">{a.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/30 flex-shrink-0">
                    {a.dueDate && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(a.dueDate).toLocaleDateString('ka')}</span>
                    )}
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{a.submissions} წარდგენილი</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" />{a.graded} შეფასებული</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] border border-white/[0.06] rounded">
            <FileText className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-sm">ჯერ დავალება არ შეგიქმნია</p>
          </div>
        )}
      </div>
    </div>
  );
}
