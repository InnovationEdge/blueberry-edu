import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronDown, ChevronUp, Play, Lock, CheckCircle, Bell, X } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { getAppT } from '../i18n/app';
import { useCourseDetail } from '../hooks/use-courses';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed?: boolean;
  locked?: boolean;
  videoUrl?: string;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export function CourseSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, error } = useCourseDetail(id || '');
  const { language } = useAuth();
  const t = getAppT(language);
  const [expandedChapter, setExpandedChapter] = useState<string>('0');
  const [activeTab, setActiveTab] = useState<'activities' | 'community'>('activities');
  const [showCompleted, setShowCompleted] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground-subtle text-sm">კურსი ვერ მოიძებნა</p>
      </div>
    );
  }

  // Build chapters from API sections
  const chapters: Chapter[] = (course.sections || []).map((section, i) => ({
    id: String(i),
    number: i + 1,
    title: section.title,
    description: `${section.lessons.length} გაკვეთილი`,
    lessons: section.lessons.map((lesson, li) => ({
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      description: '',
      completed: false,
      locked: i > 0 && li > 0,
    })),
  }));

  const totalLessons = chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  const completedLessons = chapters.reduce(
    (acc, chapter) => acc + chapter.lessons.filter((l) => l.completed).length,
    0
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? '' : chapterId);
  };

  const handleStartLesson = (chapterId: string, lessonId: string, isLocked: boolean) => {
    if (!isLocked) {
      navigate(`/course/${id}/video/${chapterId}/${lessonId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Red Scrollbar */}
      <style>{`
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a4fd8;
          border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #1540b0;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #1a4fd8 #000000;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border-subtle">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Exit Session */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-foreground hover:text-foreground-secondary transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="text-brand font-black text-xl">BM</div>
              <span className="text-sm font-semibold">{t.sessionExit}</span>
            </div>
          </button>

          {/* Center: Tab Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'activities'
                  ? 'bg-white text-black'
                  : 'text-foreground-faint hover:text-foreground'
              }`}
            >
              {t.sessionActivities}
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'community'
                  ? 'bg-white text-black'
                  : 'text-foreground-faint hover:text-foreground'
              }`}
            >
              {t.sessionCommunity}
            </button>
          </div>

          {/* Right: Notifications & User */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-foreground hover:text-foreground-secondary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-[#b8070f] flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Instructor */}
      <div className="bg-background pt-20 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border-muted flex-shrink-0">
            <img
              src={course.thumbnail}
              alt={course.instructor}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {course.instructor}
            </h1>
            <p className="text-foreground-faint text-lg">{course.title}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'activities' ? (
        <div className="bg-background min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            {/* Activities Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">{t.sessionActivities}</h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showCompleted}
                      onChange={(e) => setShowCompleted(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-active peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                  </div>
                  <span className="text-sm text-foreground-subtle">{t.sessionCompleted}</span>
                </label>
              </div>

              {/* Chapter Progress Dots */}
              <div className="flex items-center gap-2">
                {chapters.map((chapter) => {
                  const isCompleted = chapter.lessons.every((l) => l.completed);
                  const hasProgress = chapter.lessons.some((l) => l.completed);
                  return (
                    <div
                      key={chapter.id}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : hasProgress
                          ? 'bg-brand text-white'
                          : 'bg-surface-active text-foreground-subtle'
                      }`}
                    >
                      {chapter.number}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chapters */}
            <div className="space-y-6">
              {chapters.map((chapter) => {
                const isExpanded = expandedChapter === chapter.id;
                const chapterCompleted = chapter.lessons.every((l) => l.completed);

                return (
                  <div
                    key={chapter.id}
                    className="border border-border-subtle rounded-2xl overflow-hidden bg-surface border border-border-subtle hover:shadow-md transition-all"
                  >
                    {/* Chapter Header */}
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="w-full px-8 py-6 flex items-start justify-between hover:bg-surface-raised transition-colors text-left"
                    >
                      <div className="flex items-start gap-5 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                            chapterCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-surface-hover text-foreground-secondary'
                          }`}
                        >
                          {chapterCompleted ? <CheckCircle className="w-5 h-5" /> : chapter.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">{chapter.title}</h3>
                          <p className="text-foreground-subtle text-sm">{chapter.description}</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-foreground-faint flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-foreground-faint flex-shrink-0 ml-4" />
                      )}
                    </button>

                    {/* Lessons */}
                    {isExpanded && (
                      <div className="border-t border-border-subtle bg-surface">
                        {chapter.lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className="px-8 py-6 border-b border-border-subtle last:border-b-0"
                          >
                            <div className="bg-surface rounded p-6 hover:bg-surface-raised transition-all">
                              <div className="flex items-start gap-6">
                                {/* Lesson Thumbnail */}
                                <div className="relative flex-shrink-0 group">
                                  <div className="w-64 h-36 bg-background rounded overflow-hidden">
                                    <img
                                      src={course.thumbnail}
                                      alt={lesson.title}
                                      className={`w-full h-full object-cover ${
                                        lesson.locked
                                          ? 'opacity-50'
                                          : 'group-hover:scale-105 transition-transform duration-300'
                                      }`}
                                    />
                                    {/* Play/Lock Overlay */}
                                    <div
                                      className={`absolute inset-0 flex items-center justify-center ${
                                        lesson.locked
                                          ? 'bg-overlay/70'
                                          : 'bg-overlay/30 group-hover:bg-overlay/50'
                                      } transition-all`}
                                    >
                                      {lesson.locked ? (
                                        <Lock className="w-10 h-10 text-foreground-faint" />
                                      ) : lesson.completed ? (
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                      ) : (
                                        <div className="w-16 h-16 rounded-full bg-surface-active backdrop-blur-sm flex items-center justify-center group-hover:bg-surface-active group-hover:scale-110 transition-all">
                                          <Play className="w-7 h-7 text-white ml-1" fill="white" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {/* Lesson Number Badge */}
                                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-background rounded-full flex items-center justify-center border-2 border-white">
                                    <span className="text-xs font-bold text-white">{index + 1}</span>
                                  </div>
                                  {/* Duration Badge */}
                                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-overlay/90 backdrop-blur-sm rounded text-xs font-semibold text-white">
                                    {lesson.duration}
                                  </div>
                                </div>

                                {/* Lesson Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                  <div>
                                    <h4
                                      className={`text-lg font-bold mb-3 ${
                                        lesson.locked ? 'text-foreground-faint' : 'text-white'
                                      }`}
                                    >
                                      {lesson.title}
                                    </h4>
                                    <p
                                      className={`text-sm leading-relaxed mb-4 ${
                                        lesson.locked ? 'text-foreground-faint' : 'text-foreground-subtle'
                                      }`}
                                    >
                                      {lesson.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    {lesson.completed ? (
                                      <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>{t.sessionCompleted}</span>
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                    <button
                                      onClick={() =>
                                        handleStartLesson(chapter.id, lesson.id, lesson.locked || false)
                                      }
                                      disabled={lesson.locked}
                                      className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                                        lesson.locked
                                          ? 'bg-surface-hover text-foreground-faint cursor-not-allowed'
                                          : 'bg-brand text-white hover:bg-brand-hover transform hover:scale-105 shadow-lg hover:shadow-xl'
                                      }`}
                                    >
                                      {lesson.completed ? t.sessionReplay : t.sessionStart}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        // Community Tab
        <div className="bg-background min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar - Sections */}
              <div className="lg:col-span-1">
                <div className="bg-surface rounded border border-border-subtle p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-foreground mb-6">{t.sessionSections}</h3>
                  <div className="space-y-3">
                    {chapters.map((chapter) => {
                      const isCompleted = chapter.lessons.every((l) => l.completed);
                      return (
                        <button
                          key={chapter.id}
                          onClick={() => setActiveTab('activities')}
                          className="w-full flex items-center gap-3 text-left hover:bg-surface-raised p-2 rounded transition-colors group"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted ? 'bg-green-500' : 'bg-surface-active'
                            }`}
                          >
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm text-foreground-secondary group-hover:text-foreground font-medium line-clamp-2">
                            {chapter.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button className="mt-6 text-sm text-foreground-subtle hover:text-foreground underline font-medium">
                    {t.sessionGuidelines}
                  </button>
                </div>
              </div>

              {/* Main Content - Community Feed */}
              <div className="lg:col-span-3">
                {/* Create Post Box */}
                <div className="bg-surface rounded border border-border-subtle p-6 mb-6 ">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-[#b8070f] flex items-center justify-center text-white font-bold flex-shrink-0">
                      U
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-foreground mb-3">{t.sessionCreatePost}</h4>
                      <textarea
                        placeholder={t.sessionPostPlaceholder}
                        className="w-full px-4 py-3 border border-border-muted rounded text-sm text-foreground-secondary placeholder-foreground-faint focus:outline-none focus:border-black resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <button className="px-4 py-2 border border-border-muted rounded-full text-sm font-semibold text-foreground-secondary hover:bg-surface-raised transition-colors">
                          {t.sessionAddPhoto}
                        </button>
                        <button className="px-6 py-2 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-colors">
                          {t.sessionPost}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Feed */}
                <div className="space-y-4">
                  {/* Comment 1 */}
                  <div className="bg-surface rounded border border-border-subtle p-6 hover:bg-surface-raised transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-active flex items-center justify-center text-foreground-subtle font-bold flex-shrink-0">
                        LF
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-foreground">Lesley Fogle</h4>
                          <button className="text-foreground-faint hover:text-foreground-subtle">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                          This reminds me of Crucial Conversations but had a warmer approach that resounded
                          better with me Or at least my situation as a self-employed independent contractor who
                          works with companies, a non-profit, and teaches adjunct as highly field experienced but
                          not academia in an industry that was historically trade-based.
                        </p>
                        <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                          I hope there are more Masterclasses with Kim. And I struggle to respond to ingroup
                          tribalism or elitism within layers such as ageism, self-identifying groups, and the
                          anxieties over feelings Such as loss of power, relevance, and sudden inexperience folks
                          face within the current disruption of AI.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-foreground-subtle">
                          <button className="flex items-center gap-2 hover:text-brand transition-colors group">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            <span className="font-semibold">1</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-brand transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span className="font-semibold">1</span>
                          </button>
                          <span className="ml-auto">5 months ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment 2 */}
                  <div className="bg-surface rounded border border-border-subtle p-6 hover:bg-surface-raised transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-active flex items-center justify-center text-foreground-subtle font-bold flex-shrink-0">
                        LF
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-foreground">Lesley Fogle</h4>
                          <button className="text-foreground-faint hover:text-foreground-subtle">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                          I'm trying to comment on the Radical Candor course. But maybe This is general comment
                          section. Can't seem to bookmark a place. And I fear there is no way to comment alongside
                          each section. And, if there isn't, I see that as a major UX fail. I went to the forum
                          button and added a photo but nothing happens. I end up looking at a static page of
                          community guidelines. Again, super frustrating.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-foreground-subtle">
                          <button className="flex items-center gap-2 hover:text-brand transition-colors group">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            <span className="font-semibold">0</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-brand transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span className="font-semibold">0</span>
                          </button>
                          <span className="ml-auto">5 months ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment 3 */}
                  <div className="bg-surface rounded border border-border-subtle p-6 hover:bg-surface-raised transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-active flex items-center justify-center text-white font-bold flex-shrink-0">
                        JD
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-foreground">ლუკა ჩხეიძე</h4>
                          <button className="text-foreground-faint hover:text-foreground-subtle">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                          This course has been incredibly valuable! The practical examples and Kim's teaching style
                          make complex topics easy to understand. I've already started applying these techniques in
                          my workplace and seeing positive results.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-foreground-subtle">
                          <button className="flex items-center gap-2 hover:text-brand transition-colors group">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            <span className="font-semibold">3</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-brand transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span className="font-semibold">2</span>
                          </button>
                          <span className="ml-auto">3 months ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment 4 */}
                  <div className="bg-surface rounded border border-border-subtle p-6 hover:bg-surface-raised transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        MK
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-foreground">Maria Kim</h4>
                          <button className="text-foreground-faint hover:text-foreground-subtle">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed mb-4">
                          The section on giving feedback was particularly helpful. I used to struggle with finding
                          the right words, but now I feel much more confident. Thank you for creating such a
                          comprehensive course!
                        </p>
                        <div className="flex items-center gap-6 text-sm text-foreground-subtle">
                          <button className="flex items-center gap-2 hover:text-brand transition-colors group">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            <span className="font-semibold">5</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-brand transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span className="font-semibold">1</span>
                          </button>
                          <span className="ml-auto">2 months ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-background border-t border-border-subtle py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-brand font-black text-2xl">BM</div>
            <img src="/images/logo-simple.png" alt="Blueberry" className="h-5 w-auto" />
          </div>
          <div className="flex items-center gap-3 text-foreground-subtle text-sm">
            <span>curated by</span>
            <span className="text-foreground-faint font-semibold">Education Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}