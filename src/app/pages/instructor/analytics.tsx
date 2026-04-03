import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Users, DollarSign, Star, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { useInstructorStats, useInstructorCourses } from '../../hooks/use-instructor';
import { apiCourseToCourse } from '../../../lib/api';
import type { CourseFromApi } from '../../../lib/api';

export function InstructorAnalytics() {
  const navigate = useNavigate();
  const { language } = useAuth();
  const { data: stats, isLoading: statsLoading } = useInstructorStats();
  const { data: courses = [], isLoading: coursesLoading } = useInstructorCourses();

  const isLoading = statsLoading || coursesLoading;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => navigate('/instructor')}
            className="w-9 h-9 rounded flex items-center justify-center bg-white/[0.06] hover:bg-white/10 transition-all">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-2xl font-black text-white">ანალიტიკა</h1>
        </div>

        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-white/[0.03] rounded" />
              ))}
            </div>
            <div className="h-64 bg-white/[0.03] rounded" />
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded p-5">
                <DollarSign className="w-5 h-5 text-emerald-400 mb-2" />
                <p className="text-white text-2xl font-black">{stats?.totalRevenue ?? 0} ₾</p>
                <p className="text-white/40 text-xs mt-1">ჯამური შემოსავალი</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded p-5">
                <Users className="w-5 h-5 text-blue-400 mb-2" />
                <p className="text-white text-2xl font-black">{stats?.totalStudents ?? 0}</p>
                <p className="text-white/40 text-xs mt-1">სულ სტუდენტები</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded p-5">
                <Star className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-white text-2xl font-black">{stats?.avgRating?.toFixed(1) ?? '0.0'}</p>
                <p className="text-white/40 text-xs mt-1">საშუალო რეიტინგი</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded p-5">
                <TrendingUp className="w-5 h-5 text-[#1a4fd8] mb-2" />
                <p className="text-white text-2xl font-black">{stats?.recentEnrollments ?? 0}</p>
                <p className="text-white/40 text-xs mt-1">ბოლო 30 დღე</p>
              </div>
            </div>

            {/* Revenue split info */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded p-5 mb-10">
              <h3 className="text-white font-bold text-sm mb-3">შემოსავლის განაწილება</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/50">ინსტრუქტორი (60%)</span>
                    <span className="text-emerald-400 font-bold">{Math.round((stats?.totalRevenue ?? 0) * 0.6)} ₾</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/50">პლატფორმა (40%)</span>
                    <span className="text-white/40 font-bold">{Math.round((stats?.totalRevenue ?? 0) * 0.4)} ₾</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full bg-white/20 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
              <p className="text-white/30 text-[10px] mt-3">30-დღიანი hold პერიოდი გამოტანამდე</p>
            </div>

            {/* Per-course stats */}
            <h2 className="text-lg font-bold text-white mb-4">კურსების სტატისტიკა</h2>
            <div className="space-y-2">
              {courses.map((course: CourseFromApi) => {
                const c = apiCourseToCourse(course);
                return (
                  <div key={c.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] rounded p-4 hover:bg-white/[0.04] transition-colors">
                    <div className="w-16 h-10 rounded overflow-hidden flex-shrink-0">
                      <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{c.title}</p>
                      <p className="text-white/30 text-xs">{Number(course.price).toFixed(0)} ₾</p>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-white/40">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3" />{c.rating}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{c.lessons}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
