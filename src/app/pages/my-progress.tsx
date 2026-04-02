import { CourseRow } from '../components/course-row';
import { CourseRowSkeleton } from '../components/skeletons';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';
import { useMyEnrollments } from '../hooks/use-enrollment';
import { apiCourseToCourse } from '../../lib/api';

export function MyProgress() {
  const { language, isAuthenticated } = useAuth();
  const t = getAppT(language);
  const { data: enrollments = [], isLoading } = useMyEnrollments();

  const enrolledCourses = enrollments.map((e: any) => ({
    ...apiCourseToCourse(e.course),
    progress: e.progressPercent ?? 0,
    completedLessons: e.completedLessons ?? 0,
    isCompleted: e.status === 'COMPLETED' || e.completedAt != null,
  }));

  const inProgressCourses = enrolledCourses.filter((c: any) => !c.isCompleted);
  const completedCourses = enrolledCourses.filter((c: any) => c.isCompleted);

  const totalHours = enrolledCourses.reduce((sum: number, c: any) => {
    const match = c.duration?.match(/(\d+)h/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex items-center justify-center">
        <p className="text-white/40 text-sm">შესვლა საჭიროა პროგრესის სანახავად</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20">
        <div className="px-4 md:px-12 mb-12">
          <div className="flex items-center gap-10 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-white/[0.06]" />
            <div className="space-y-2"><div className="h-4 bg-white/[0.06] rounded w-24" /><div className="h-3 bg-white/[0.04] rounded w-16" /></div>
            <div className="space-y-2"><div className="h-4 bg-white/[0.06] rounded w-24" /><div className="h-3 bg-white/[0.04] rounded w-16" /></div>
          </div>
        </div>
        <div className="space-y-10">
          <CourseRowSkeleton />
          <CourseRowSkeleton />
        </div>
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex flex-col items-center justify-center">
        <p className="text-white/40 text-sm mb-4">ჯერ კურსებზე არ ხარ ჩარიცხული</p>
        <a href="/library" className="px-6 py-2.5 bg-[#E50914] text-white rounded text-sm font-bold hover:bg-[#c70812] transition-all active:scale-95">
          კურსების ნახვა
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Overview */}
      {(() => {
        const totalLessons = enrolledCourses.reduce((s: number, c: any) => s + c.lessons, 0);
        const doneLessons = enrolledCourses.reduce((s: number, c: any) => s + c.completedLessons, 0);
        const lessonPct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;
        const totalMinutes = totalHours * 60;
        return (
          <div className="px-4 md:px-12 mb-12">
            <div className="flex items-center gap-10 md:gap-14">
              {/* Completion Rate */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E50914" strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${(completedCourses.length / Math.max(enrolledCourses.length, 1)) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-black">{Math.round((completedCourses.length / Math.max(enrolledCourses.length, 1)) * 100)}<span className="text-white/70 text-sm">%</span></span>
                  </div>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Completion Rate</p>
                  <p className="text-white/70 text-xs">{completedCourses.length}/{enrolledCourses.length} {t.progressCourses.toLowerCase()}</p>
                </div>
              </div>

              {/* Total Lessons */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E50914" strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${(lessonPct / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-black">{lessonPct}<span className="text-white/70 text-sm">%</span></span>
                  </div>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Total Lessons</p>
                  <p className="text-white/70 text-xs">{doneLessons}/{totalLessons}</p>
                </div>
              </div>

              {/* Total Learning Minutes */}
              <div>
                <p className="text-white text-sm font-bold">Total Learning Minutes</p>
                <p className="text-white text-lg font-black mt-1">{totalMinutes}<span className="text-white/70"> წთ</span></p>
              </div>

              {/* Avg Learning Minutes / Day */}
              <div className="hidden md:block">
                <p className="text-white text-sm font-bold">Average Minutes / Day</p>
                <p className="text-white text-lg font-black mt-1">{totalMinutes > 0 ? Math.round(totalMinutes / 7) : 0}<span className="text-white/70"> წთ</span></p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Course Rows */}
      <div className="space-y-10 md:space-y-14">
        {inProgressCourses.length > 0 && (
          <div>
            <div className="px-4 md:px-12 mb-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E50914]" />
                <h2 className="text-base md:text-lg font-bold text-white">{t.progressInProgress}</h2>
                <span className="text-white/20 text-sm">{inProgressCourses.length}</span>
              </div>
            </div>
            <CourseRow title="" courses={inProgressCourses} />
          </div>
        )}

        {completedCourses.length > 0 && (
          <div>
            <div className="px-4 md:px-12 mb-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 className="text-base md:text-lg font-bold text-white">{t.progressCompleted}</h2>
                <span className="text-white/20 text-sm">{completedCourses.length}</span>
              </div>
            </div>
            <CourseRow title="" courses={completedCourses} />
          </div>
        )}

        <div className="px-4 md:px-12">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h2 className="text-base md:text-lg font-bold text-white">{t.progressWishlist}</h2>
            <span className="text-white/20 text-sm">0</span>
          </div>
          <p className="text-white/30 text-sm">სანიშნეში კურსები არ გაქვს</p>
        </div>
      </div>
    </div>
  );
}
