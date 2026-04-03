import { Play, Clock, BarChart3, Star, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Course } from '../data/courses';
import { useAuth } from '../context/auth-context';
import { getAppT } from '../i18n/app';
import { useQueryClient } from '@tanstack/react-query';
import { fetchCourse, apiCourseDetailToDetail } from '../../lib/api';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
  completedLessons?: number;
  isCompleted?: boolean;
  onContinue?: () => void;
  onViewCertificate?: () => void;
}

export function CourseCard({
  course,
  showProgress = false,
  progress = 0,
  completedLessons = 0,
  isCompleted = false,
  onContinue,
  onViewCertificate
}: CourseCardProps) {
  const { language } = useAuth();
  const t = getAppT(language);

  const courseProgress = progress || (course as any).progress || 0;
  const queryClient = useQueryClient();

  const prefetchCourse = () => {
    queryClient.prefetchQuery({
      queryKey: ['courseDetail', course.id],
      queryFn: async () => {
        const res = await fetchCourse(course.id);
        return apiCourseDetailToDetail(res.data);
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
    }
  };

  return (
    <Link to={`/course/${course.id}`} onClick={handleCardClick} onMouseEnter={prefetchCourse}>
      <div className="group cursor-pointer relative">
        <div className="relative aspect-video rounded overflow-hidden bg-surface mb-4 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/30 group-hover:scale-105">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            {course.isNew && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold rounded shadow-lg backdrop-blur-sm">
                {t.cardNew}
              </span>
            )}
            {course.isCompleted && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded shadow-lg backdrop-blur-sm">
                ✓ {t.cardDone}
              </span>
            )}
          </div>

          {/* Hover Overlay with Info */}
          <div className="absolute inset-0 bg-overlay/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 p-4">
            <div className="text-center space-y-3 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm font-bold line-clamp-2">{course.title}</p>
              <p className="text-white/40 text-xs">{t.cardBy} {course.instructor}</p>

              {showProgress && !isCompleted && (
                <div className="text-xs text-white/40 mb-2">
                  {completedLessons} {t.cardOf} {course.lessons} {t.cardLessons}
                </div>
              )}

              {showProgress ? (
                isCompleted ? (
                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (onContinue) onContinue();
                      }}
                      className="w-full px-3 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-all font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      {t.cardRewatch}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (onViewCertificate) onViewCertificate();
                      }}
                      className="w-full px-3 py-2 bg-brand text-white rounded hover:bg-brand-hover transition-all font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      {t.cardCertificate}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (onContinue) onContinue();
                    }}
                    className="w-full px-3 py-2 bg-brand text-white rounded hover:bg-brand-hover transition-all font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-4 h-4" />
                    {t.cardContinue}
                  </button>
                )
              ) : (
                <div className="transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-3 border-white/50 shadow-2xl">
                    <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar on thumbnail */}
          {courseProgress > 0 && courseProgress < 100 && (
            <div className="absolute bottom-0 inset-x-0 h-[3px] bg-surface-hover z-20">
              <div className="h-full bg-brand" style={{ width: `${courseProgress}%` }} />
            </div>
          )}
          {courseProgress === 100 && (
            <div className="absolute bottom-0 inset-x-0 h-[3px] bg-emerald-500 z-20" />
          )}

          {/* Progress badge */}
          {courseProgress > 0 && courseProgress < 100 && (
            <div className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-overlay/70 backdrop-blur-sm rounded text-[10px] font-bold text-white">
              {courseProgress}%
            </div>
          )}

          {/* Bottom gradient for readability */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-overlay/80 to-transparent" />
        </div>

        {/* Course Info */}
        <div className="space-y-2.5 px-1">
          <div className="flex items-center gap-2 text-xs text-foreground-subtle">
            <span className="text-red-500 font-semibold uppercase tracking-wide">{t.cardClass}</span>
            <span className="text-foreground-faint">•</span>
            <span className="font-medium">{course.duration}</span>
            <span className="text-foreground-faint">•</span>
            <span className="text-foreground-subtle">{course.category[0]}</span>
          </div>

          <h3 className="text-foreground font-bold text-base leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-foreground-subtle text-sm line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>

          <p className="text-foreground-faint text-sm">
            {t.cardWith} <span className="text-foreground-secondary font-medium">{course.instructor}</span>
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-foreground">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground-subtle">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">{course.lessons} {t.cardLessons}</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground-subtle">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-medium">{course.level}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
