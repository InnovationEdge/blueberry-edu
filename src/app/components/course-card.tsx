import { Play, Clock, BarChart3, Star, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Course } from '../data/courses';

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
  const handleCardClick = (e: React.MouseEvent) => {
    // If clicked on action buttons, prevent default link behavior
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
    }
  };

  return (
    <Link to={`/course/${course.id}`} onClick={handleCardClick}>
      <div className="group cursor-pointer relative">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 mb-4 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-500/30 group-hover:scale-105">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            {course.isNew && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-md shadow-lg backdrop-blur-sm">
                NEW
              </span>
            )}
            {course.isCompleted && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-md shadow-lg backdrop-blur-sm">
                ✓ DONE
              </span>
            )}
          </div>

          {/* Hover Overlay with Info */}
          <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 p-4">
            <div className="text-center space-y-3 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm font-bold line-clamp-2">{course.title}</p>
              <p className="text-gray-400 text-xs">by {course.instructor}</p>
              
              {showProgress && !isCompleted && (
                <div className="text-xs text-gray-400 mb-2">
                  {completedLessons} of {course.lessons} lessons
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
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-all font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Rewatch
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (onViewCertificate) onViewCertificate();
                      }}
                      className="w-full px-3 py-2 bg-[#E50914] text-white rounded-md hover:bg-[#c40812] transition-all font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      View Certificate
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (onContinue) onContinue();
                    }}
                    className="w-full px-4 py-2.5 bg-[#E50914] text-white rounded-md hover:bg-[#c40812] transition-all font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Continue
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

          {/* Bottom gradient for readability */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Course Info */}
        <div className="space-y-2.5 px-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-red-500 font-semibold uppercase tracking-wide">Class</span>
            <span className="text-gray-600">•</span>
            <span className="font-medium">{course.duration}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">{course.category[0]}</span>
          </div>

          <h3 className="text-white font-bold text-base leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>

          <p className="text-gray-500 text-sm">
            with <span className="text-gray-300 font-medium">{course.instructor}</span>
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-white">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-medium">{course.level}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}