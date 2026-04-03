import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Check, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/api';

interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options: string[];
  correctIndex: number;
}

export function QuizBuilder() {
  const { id: courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [passThreshold, setPassThreshold] = useState(80);

  const addQuestion = (type: 'multiple_choice' | 'true_false') => {
    const newQ: QuizQuestion = {
      id: crypto.randomUUID(),
      text: '',
      type,
      options: type === 'true_false' ? ['სწორია', 'არასწორია'] : ['', '', '', ''],
      correctIndex: 0,
    };
    setQuestions(prev => [...prev, newQ]);
  };

  const updateQuestion = (id: string, field: string, value: unknown) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId: string, optIndex: number, value: string) => {
    setQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: q.options.map((o, i) => i === optIndex ? value : o) } : q
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const saveQuiz = useMutation({
    mutationFn: async () => {
      await api.post(`/instructor/courses/${courseId}/quizzes`, {
        lessonId,
        passThreshold,
        questions: questions.map(q => ({
          text: q.text,
          type: q.type,
          options: q.options,
          correctIndex: q.correctIndex,
        })),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courseDetail', courseId] });
      navigate(`/instructor/course/${courseId}`);
    },
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)}
            className="w-9 h-9 rounded flex items-center justify-center bg-surface-raised hover:bg-surface-hover transition-all">
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-foreground">ქვიზის შექმნა</h1>
            <p className="text-foreground-subtle text-xs mt-0.5">{questions.length} შეკითხვა</p>
          </div>
        </div>

        {/* Pass threshold */}
        <div className="mb-8 bg-surface border border-border-subtle rounded p-4 flex items-center justify-between">
          <span className="text-foreground text-sm font-medium">ჩაბარების ზღვარი</span>
          <div className="flex items-center gap-2">
            <input type="number" value={passThreshold} onChange={e => setPassThreshold(Number(e.target.value))}
              min={50} max={100} step={5}
              className="w-16 px-2 py-1.5 bg-surface-raised border border-border-muted rounded text-foreground text-sm text-center focus:outline-none focus:border-brand" />
            <span className="text-foreground-subtle text-sm">%</span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q, qi) => (
            <div key={q.id} className="bg-surface border border-border-subtle rounded p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-foreground-faint text-lg font-black mt-1">{qi + 1}</span>
                <div className="flex-1">
                  <input type="text" value={q.text} onChange={e => updateQuestion(q.id, 'text', e.target.value)}
                    placeholder="შეკითხვა..."
                    className="w-full px-3 py-2.5 bg-surface-raised border border-border-muted rounded text-foreground text-sm placeholder-foreground-faint focus:outline-none focus:border-brand" />
                </div>
                <button onClick={() => removeQuestion(q.id)}
                  className="p-2 hover:bg-surface-hover rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-foreground-faint hover:text-brand" />
                </button>
              </div>

              <div className="space-y-2 ml-8">
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <button onClick={() => updateQuestion(q.id, 'correctIndex', oi)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        q.correctIndex === oi ? 'border-emerald-500 bg-emerald-500' : 'border-border hover:border-foreground-subtle'
                      }`}>
                      {q.correctIndex === oi && <Check className="w-3 h-3 text-white" />}
                    </button>
                    {q.type === 'true_false' ? (
                      <span className="text-foreground-secondary text-sm">{opt}</span>
                    ) : (
                      <input type="text" value={opt} onChange={e => updateOption(q.id, oi, e.target.value)}
                        placeholder={`ვარიანტი ${oi + 1}`}
                        className="flex-1 px-3 py-2 bg-surface border border-border-subtle rounded text-foreground text-sm placeholder-foreground-faint focus:outline-none focus:border-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add question buttons */}
        <div className="flex gap-3 mt-6">
          <button onClick={() => addQuestion('multiple_choice')}
            className="flex items-center gap-2 px-5 py-2.5 border border-dashed border-border-muted rounded text-foreground-subtle text-sm hover:border-border hover:text-foreground-secondary transition-colors">
            <Plus className="w-4 h-4" />არჩევითი
          </button>
          <button onClick={() => addQuestion('true_false')}
            className="flex items-center gap-2 px-5 py-2.5 border border-dashed border-border-muted rounded text-foreground-subtle text-sm hover:border-border hover:text-foreground-secondary transition-colors">
            <Plus className="w-4 h-4" />სწორი/არასწორი
          </button>
        </div>

        {/* Save */}
        <div className="flex justify-end mt-8">
          <button onClick={() => saveQuiz.mutate()} disabled={questions.length === 0 || saveQuiz.isPending}
            className="px-8 py-2.5 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-all active:scale-95 disabled:opacity-50">
            {saveQuiz.isPending ? 'ინახება...' : 'ქვიზის შენახვა'}
          </button>
        </div>
      </div>
    </div>
  );
}
