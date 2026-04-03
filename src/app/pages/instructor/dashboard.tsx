import { Link } from 'react-router';
import { Plus, BookOpen, Users, DollarSign, Star, BarChart3, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { getAppT } from '../../i18n/app';
import { useInstructorCourses, useInstructorStats } from '../../hooks/use-instructor';
import { apiCourseToCourse } from '../../../lib/api';
import type { CourseFromApi } from '../../../lib/api';

export function InstructorDashboard() {
  const { language, user } = useAuth();
  const t = getAppT(language);
  const { data: courses = [], isLoading: coursesLoading } = useInstructorCourses();
  const { data: stats, isLoading: statsLoading } = useInstructorStats();

  const statCards = [
    { label: 'სულ სტუდენტები', value: stats?.totalStudents ?? 0, icon: Users, color: 'text-blue-400' },
    { label: 'შემოსავალი', value: `${stats?.totalRevenue ?? 0} ₾`, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'კურსები', value: stats?.totalCourses ?? 0, icon: BookOpen, color: 'text-brand' },
    { label: 'საშუალო რეიტინგი', value: stats?.avgRating?.toFixed(1) ?? '0.0', icon: Star, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground">ინსტრუქტორის პანელი</h1>
          <p className="text-foreground-subtle text-sm mt-1">{user?.name || 'ინსტრუქტორი'}</p>
        </div>
        <Link to="/instructor/create"
          className="flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-all active:scale-95">
          <Plus className="w-4 h-4" />კურსის შექმნა
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-surface border border-border-subtle rounded p-5">
            <div className="flex items-center gap-3 mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-foreground-subtle text-xs">{stat.label}</span>
            </div>
            <p className="text-foreground text-2xl font-black">
              {statsLoading ? <span className="animate-pulse bg-surface-hover rounded w-16 h-7 inline-block" /> : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">ჩემი კურსები</h2>
        <div className="flex items-center gap-2 text-xs text-foreground-faint">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>{courses.length} კურსი</span>
        </div>
      </div>

      {coursesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-surface border border-border-subtle rounded p-4">
              <div className="aspect-video bg-surface-raised rounded mb-4" />
              <div className="h-4 bg-surface-raised rounded w-3/4 mb-2" />
              <div className="h-3 bg-surface rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course: CourseFromApi) => {
            const c = apiCourseToCourse(course);
            return (
              <Link key={c.id} to={`/instructor/course/${c.id}`}
                className="bg-surface border border-border-subtle rounded overflow-hidden hover:border-border-muted transition-all group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      course.status === 'PUBLISHED' ? 'bg-emerald-500 text-white' :
                      course.status === 'DRAFT' ? 'bg-surface-active text-white' :
                      'bg-yellow-500 text-black'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-foreground font-bold text-sm line-clamp-1">{c.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-foreground-subtle">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{c.rating}</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{c.lessons} გაკვეთილი</span>
                  </div>
                  <p className="text-foreground-secondary text-lg font-black">{c.duration} • {Number(course.price).toFixed(0)} ₾</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface border border-border-subtle rounded">
          <BookOpen className="w-10 h-10 text-foreground-faint mx-auto mb-4" />
          <p className="text-foreground-subtle text-sm mb-4">ჯერ კურსი არ შეგიქმნია</p>
          <Link to="/instructor/create"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-full text-sm font-bold hover:bg-brand-hover transition-all active:scale-95">
            <Plus className="w-4 h-4" />პირველი კურსის შექმნა
          </Link>
        </div>
      )}
    </div>
  );
}
