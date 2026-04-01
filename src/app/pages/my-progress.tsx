import { CourseRow } from '../components/course-row';
import { CourseRowSkeleton } from '../components/skeletons';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';
import { useAllCourses } from '../hooks/use-courses';

export function MyProgress() {
  const { language } = useAuth();
  const t = getAppT(language);

  // TODO: Replace with useEnrollments() when enrollment API is wired (Step 9)
  const { data: courses = [], isLoading } = useAllCourses();

  const enrolledCourses = courses.map((course, index) => ({
    ...course,
    progress: index === 0 ? 100 : index === 1 ? 100 : index === 2 ? 75 : index === 3 ? 45 : index === 4 ? 60 : index === 5 ? 30 : index === 6 ? 15 : 20,
    completedLessons: index === 0 ? course.lessons : index === 1 ? course.lessons : Math.floor(course.lessons * (index === 2 ? 0.75 : index === 3 ? 0.45 : 0.3)),
    isCompleted: index === 0 || index === 1,
  }));

  const inProgressCourses = enrolledCourses.filter(c => !c.isCompleted);
  const completedCourses = enrolledCourses.filter(c => c.isCompleted);

  const totalHours = enrolledCourses.reduce((sum, c) => {
    const match = c.duration?.match(/(\d+)h/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

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

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Overview */}
      {(() => {
        const totalLessons = enrolledCourses.reduce((s, c) => s + c.lessons, 0);
        const doneLessons = enrolledCourses.reduce((s, c) => s + c.completedLessons, 0);
        const lessonPct = Math.round((doneLessons / totalLessons) * 100);
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
                      strokeDasharray={`${(completedCourses.length / enrolledCourses.length) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-black">{Math.round((completedCourses.length / enrolledCourses.length) * 100)}<span className="text-white/70 text-sm">%</span></span>
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
                      strokeDasharray={`${(doneLessons / totalLessons) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
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
                <p className="text-white text-lg font-black mt-1">{Math.round(totalMinutes / 7)}<span className="text-white/70"> წთ</span></p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Course Rows */}
      <div className="space-y-10 md:space-y-14">
        {/* In Progress */}
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

        {/* Completed */}
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

        {/* Wishlist */}
        <div className="px-4 md:px-12">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h2 className="text-base md:text-lg font-bold text-white">{t.progressWishlist}</h2>
            <span className="text-white/20 text-sm">0</span>
          </div>
          <p className="text-gray-600 text-sm">სანიშნეში კურსები არ გაქვს</p>
        </div>
      </div>
    </div>
  );
}
