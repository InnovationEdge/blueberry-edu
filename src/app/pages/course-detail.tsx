import { useParams, Link, useNavigate } from 'react-router';
import { getCourseById, courses } from '../data/courses';
import { Play, Plus, ChevronDown, ChevronUp, Star, PlayCircle, ArrowLeft } from 'lucide-react';
import { CourseRow } from '../components/course-row';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

export function CourseDetail() {
  const { language } = useAuth();
  const t = getAppT(language);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : null;
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl text-white">{t.detailNotFound}</h1>
          <Link to="/" className="text-[#E50914] hover:underline">{t.detailReturnHome}</Link>
        </div>
      </div>
    );
  }

  const relatedCourses = courses.filter(
    (c) => c.id !== course.id && c.category.some((cat) => course.category.includes(cat))
  ).slice(0, 8);

  const courseSections = [
    { title: 'Getting Started', lessons: [
      { title: 'Welcome to the Course', duration: '5min', thumb: course.thumbnail },
      { title: 'Course Overview and Structure', duration: '8min', thumb: course.thumbnail },
      { title: 'Required Tools and Setup', duration: '12min', thumb: course.thumbnail },
      { title: 'Understanding the Basics', duration: '10min', thumb: course.thumbnail },
      { title: 'Your First Project', duration: '10min', thumb: course.thumbnail },
    ]},
    { title: 'Core Concepts', lessons: [
      { title: 'Foundation Principles', duration: '18min', thumb: course.thumbnail },
      { title: 'Advanced Techniques Part 1', duration: '22min', thumb: course.thumbnail },
      { title: 'Advanced Techniques Part 2', duration: '20min', thumb: course.thumbnail },
      { title: 'Practical Applications', duration: '25min', thumb: course.thumbnail },
    ]},
    { title: 'Hands-On Projects', lessons: [
      { title: 'Project 1: Beginner Level', duration: '35min', thumb: course.thumbnail },
      { title: 'Project 2: Intermediate Level', duration: '45min', thumb: course.thumbnail },
      { title: 'Project 3: Advanced Level', duration: '55min', thumb: course.thumbnail },
    ]},
    { title: 'Advanced Topics', lessons: [
      { title: 'Expert-Level Strategies', duration: '28min', thumb: course.thumbnail },
      { title: 'Industry Secrets', duration: '32min', thumb: course.thumbnail },
      { title: 'Professional Workflow', duration: '25min', thumb: course.thumbnail },
    ]},
    { title: 'Final Project', lessons: [
      { title: 'Capstone Project Brief', duration: '10min', thumb: course.thumbnail },
      { title: 'Building Your Portfolio', duration: '25min', thumb: course.thumbnail },
      { title: 'Course Summary', duration: '15min', thumb: course.thumbnail },
    ]},
  ];

  const totalLessons = courseSections.reduce((sum, s) => sum + s.lessons.length, 0);
  const totalReviews = Math.floor(course.students / 10);

  const toggleSection = (index: number) => {
    setExpandedSections(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  let episodeNum = 0;

  return (
    <div className="min-h-screen bg-black">
      {/* ═══ Hero — Netflix style, full viewport ═══ */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        </div>

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="absolute top-8 left-4 md:left-12 z-20 w-9 h-9 rounded flex items-center justify-center bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all">
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>

        {/* Hero content */}
        <div className="relative h-full flex items-end pb-16 px-4 md:px-12">
          <div className="max-w-2xl space-y-5">
            {/* Category tag */}
            <span className="text-[#E50914] text-xs font-bold uppercase tracking-[0.2em]">{course.category[0]}</span>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">
              {course.title}
            </h1>

            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-lg">
              {course.subtitle}
            </p>

            {/* Meta — Netflix style */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-bold">{course.rating}</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-white/50">{course.duration}</span>
              <span className="text-white/20">|</span>
              <span className="text-white/50">{course.level}</span>
              <span className="text-white/20">|</span>
              <span className="text-white/50">{totalLessons} {t.cardLessons}</span>
            </div>

            {/* Buttons — Netflix style */}
            <div className="flex items-center gap-3 pt-1">
              <button onClick={() => navigate(`/course/${course.id}/session`)}
                className="h-10 px-8 bg-white text-black rounded text-sm font-bold hover:bg-white/90 transition-all active:scale-95 flex items-center gap-2">
                <Play className="w-4 h-4 fill-black" />დაწყება
              </button>
              <button className="h-10 w-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:border-white/60 transition-all active:scale-95">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Instructor */}
            <p className="text-sm text-white/40">{t.cardWith} <span className="text-white/70">{course.instructor}</span></p>
          </div>
        </div>
      </div>

      {/* ═══ Episodes — Netflix style with thumbnails ═══ */}
      <div className="px-4 md:px-12 py-10">
        <h2 className="text-xl font-bold text-white mb-6">{t.detailCourseContent}</h2>

        <div className="space-y-1">
          {courseSections.map((section, si) => (
            <div key={si}>
              {/* Section header */}
              <button onClick={() => toggleSection(si)}
                className="w-full flex items-center justify-between py-3 text-left group">
                <span className="text-white font-semibold text-sm group-hover:text-white/80">{section.title}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/30">{section.lessons.length} ეპიზოდი</span>
                  {expandedSections.includes(si) ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                </div>
              </button>

              {/* Episode list */}
              <AnimatePresence>
              {expandedSections.includes(si) && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <div className="space-y-px pb-4">
                    {section.lessons.map((lesson, li) => {
                      episodeNum++;
                      return (
                        <div key={li} className="flex items-center gap-5 py-4 px-4 rounded hover:bg-white/[0.04] transition-colors cursor-pointer group border-b border-white/[0.04] last:border-0">
                          {/* Episode number */}
                          <span className="text-2xl font-black text-white/10 w-8 text-center flex-shrink-0">{episodeNum}</span>

                          {/* Thumbnail */}
                          <div className="relative w-28 md:w-36 aspect-video rounded overflow-hidden flex-shrink-0">
                            <img src={lesson.thumb} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <PlayCircle className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[10px] text-white/70">{lesson.duration}</div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white group-hover:text-white/90 mb-1">{lesson.title}</p>
                            <p className="text-xs text-white/30 line-clamp-2">მოისმინე ეს ეპიზოდი და გაიღრმავე ცოდნა</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ About — minimal ═══ */}
      <div className="px-4 md:px-12 pb-12">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-white mb-4">კურსის შესახებ</h2>
          <p className="text-sm text-white/50 leading-relaxed mb-6">{course.subtitle}</p>

          {/* Instructor — inline */}
          <div className="flex items-center gap-4 py-5 border-t border-white/[0.06]">
            <div className="w-14 h-14 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-black text-white/70">{course.instructor.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">{course.instructor}</p>
              <p className="text-xs text-white/40">{course.rating} {t.detailRating} • {course.students.toLocaleString()} {t.detailStudents}</p>
            </div>
          </div>

          {/* Reviews inline */}
          <div className="py-5 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-white font-bold">{course.rating}</span>
              <span className="text-white/30 text-sm">• {totalReviews} შეფასება</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {[
                { author: 'Sarah J.', text: 'საუკეთესო კურსია! ინსტრუქტორი რთულ კონცეფციებს მარტივად ხსნის.' },
                { author: 'Michael C.', text: 'პრაქტიკული პროექტები ძალიან დამეხმარა. კონტენტი კარგად სტრუქტურირებულია.' },
                { author: 'Emma W.', text: 'შესანიშნავი კურსი. ინსტრუქტორი პროფესიონალია და ტემპი იდეალურია.' },
              ].map((r, i) => (
                <div key={i} className="flex-shrink-0 w-72 bg-white/[0.03] border border-white/[0.06] rounded p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mb-2">{r.text}</p>
                  <p className="text-[10px] text-white/30 font-medium">{r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ More Like This ═══ */}
      {relatedCourses.length > 0 && (
        <div className="pb-16">
          <CourseRow title={t.detailMoreLikeThis} courses={relatedCourses} />
        </div>
      )}
    </div>
  );
}
