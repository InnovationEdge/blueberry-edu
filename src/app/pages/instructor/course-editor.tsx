import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, GripVertical, Play, Trash2, Edit3, ChevronDown, ChevronUp, Upload, Eye } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { useCourseDetail } from '../../hooks/use-courses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';

export function CourseEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useAuth();
  const queryClient = useQueryClient();
  const { data: course, isLoading } = useCourseDetail(id || '');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [showAddLesson, setShowAddLesson] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');

  const addSection = useMutation({
    mutationFn: async (title: string) => {
      await api.post(`/instructor/courses/${id}/sections`, { title, sortOrder: course?.sections.length ?? 0 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseDetail', id] });
      setNewSectionTitle('');
      setShowAddSection(false);
    },
  });

  const addLesson = useMutation({
    mutationFn: async ({ sectionId, title }: { sectionId: string; title: string }) => {
      const section = course?.sections.find(s => s.id === sectionId);
      await api.post(`/instructor/courses/${id}/sections/${sectionId}/lessons`, {
        title,
        type: 'VIDEO',
        sortOrder: section?.lessons.length ?? 0,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseDetail', id] });
      setNewLessonTitle('');
      setShowAddLesson(null);
    },
  });

  const deleteSection = useMutation({
    mutationFn: async (sectionId: string) => {
      await api.delete(`/instructor/courses/${id}/sections/${sectionId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courseDetail', id] }),
  });

  const deleteLesson = useMutation({
    mutationFn: async ({ sectionId, lessonId }: { sectionId: string; lessonId: string }) => {
      await api.delete(`/instructor/courses/${id}/sections/${sectionId}/lessons/${lessonId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courseDetail', id] }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto animate-pulse space-y-4">
          <div className="h-8 bg-white/[0.06] rounded w-64" />
          <div className="h-4 bg-white/[0.04] rounded w-40" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/[0.03] rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/40">კურსი ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/instructor')}
            className="w-9 h-9 rounded flex items-center justify-center bg-white/[0.06] hover:bg-white/10 transition-all">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white">{course.title}</h1>
            <p className="text-white/40 text-xs mt-0.5">{course.sections.length} სექცია • {course.lessons} გაკვეთილი</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-2">
          {course.sections.map((section, si) => (
            <div key={section.id} className="border border-white/[0.06] rounded overflow-hidden">
              {/* Section header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02]">
                <GripVertical className="w-4 h-4 text-white/20 cursor-grab" />
                <button onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="flex-1 flex items-center gap-3 text-left">
                  <span className="text-white font-semibold text-sm">{section.title}</span>
                  <span className="text-white/30 text-xs">{section.lessons.length} გაკვეთილი</span>
                </button>
                <button onClick={() => deleteSection.mutate(section.id)}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-white/30 hover:text-[#1a4fd8]" />
                </button>
                {expandedSection === section.id
                  ? <ChevronUp className="w-4 h-4 text-white/30" />
                  : <ChevronDown className="w-4 h-4 text-white/30" />}
              </div>

              {/* Lessons */}
              {expandedSection === section.id && (
                <div className="border-t border-white/[0.04]">
                  {section.lessons.map((lesson, li) => (
                    <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 pl-10 hover:bg-white/[0.02] transition-colors group">
                      <GripVertical className="w-3.5 h-3.5 text-white/10 cursor-grab" />
                      <Play className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-white/70 text-sm flex-1">{lesson.title}</span>
                      <span className="text-white/20 text-xs">{lesson.duration}</span>
                      {lesson.preview && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                          <Eye className="w-3 h-3" />Free
                        </span>
                      )}
                      <button onClick={() => deleteLesson.mutate({ sectionId: section.id, lessonId: lesson.id })}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded transition-all">
                        <Trash2 className="w-3 h-3 text-white/30 hover:text-[#1a4fd8]" />
                      </button>
                    </div>
                  ))}

                  {/* Add lesson */}
                  {showAddLesson === section.id ? (
                    <div className="flex items-center gap-2 px-4 py-3 pl-10 border-t border-white/[0.04]">
                      <input type="text" value={newLessonTitle} onChange={e => setNewLessonTitle(e.target.value)}
                        placeholder="გაკვეთილის სახელი..."
                        className="flex-1 px-3 py-2 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]"
                        onKeyDown={e => e.key === 'Enter' && newLessonTitle && addLesson.mutate({ sectionId: section.id, title: newLessonTitle })} />
                      <button onClick={() => newLessonTitle && addLesson.mutate({ sectionId: section.id, title: newLessonTitle })}
                        disabled={!newLessonTitle || addLesson.isPending}
                        className="px-4 py-2 bg-[#1a4fd8] text-white rounded-full text-xs font-bold hover:bg-[#1540b0] disabled:opacity-50 active:scale-95">
                        {addLesson.isPending ? '...' : 'დამატება'}
                      </button>
                      <button onClick={() => { setShowAddLesson(null); setNewLessonTitle(''); }}
                        className="px-3 py-2 text-white/40 text-xs hover:text-white">გაუქმება</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowAddLesson(section.id)}
                      className="flex items-center gap-2 px-4 py-2.5 pl-10 text-white/30 text-xs hover:text-white/60 hover:bg-white/[0.02] w-full transition-colors border-t border-white/[0.04]">
                      <Plus className="w-3.5 h-3.5" />გაკვეთილის დამატება
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add section */}
        {showAddSection ? (
          <div className="flex items-center gap-2 mt-4">
            <input type="text" value={newSectionTitle} onChange={e => setNewSectionTitle(e.target.value)}
              placeholder="სექციის სახელი..."
              className="flex-1 px-4 py-3 bg-white/[0.05] border border-white/10 rounded text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#1a4fd8]"
              onKeyDown={e => e.key === 'Enter' && newSectionTitle && addSection.mutate(newSectionTitle)} />
            <button onClick={() => newSectionTitle && addSection.mutate(newSectionTitle)}
              disabled={!newSectionTitle || addSection.isPending}
              className="px-6 py-3 bg-[#1a4fd8] text-white rounded-full text-sm font-bold hover:bg-[#1540b0] disabled:opacity-50 active:scale-95">
              {addSection.isPending ? '...' : 'დამატება'}
            </button>
            <button onClick={() => { setShowAddSection(false); setNewSectionTitle(''); }}
              className="px-4 py-3 text-white/40 text-sm hover:text-white">გაუქმება</button>
          </div>
        ) : (
          <button onClick={() => setShowAddSection(true)}
            className="flex items-center gap-2 mt-4 px-5 py-3 border border-dashed border-white/10 rounded text-white/40 text-sm hover:border-white/25 hover:text-white/60 w-full justify-center transition-colors">
            <Plus className="w-4 h-4" />ახალი სექციის დამატება
          </button>
        )}
      </div>
    </div>
  );
}
