import { HeroSection } from '../components/hero-section';
import { CourseRow } from '../components/course-row';
import { courses, getNewCourses, getTopRatedCourses, getPopularCourses } from '../data/courses';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

export function Home() {
  const { language } = useAuth();
  const t = getAppT(language);
  const featuredCourses = [courses[6], courses[0], courses[3], courses[8], courses[5]];

  return (
    <div className="min-h-screen bg-black">
      <HeroSection courses={featuredCourses} />
      <div className="space-y-10 md:space-y-14 pb-20 mt-6 relative z-10">
        <CourseRow title={t.homeYourNextWatch} courses={getNewCourses()} />
        <CourseRow title={t.homeMyList} courses={courses.slice(0, 8)} />
        <CourseRow title={t.homeTopPicks} courses={getPopularCourses()} />
        <CourseRow title={t.homeTopSearches} courses={getTopRatedCourses()} />
        <CourseRow title={t.homeNewOnBM} courses={courses.slice(4, 12)} />
        <CourseRow title={t.homeOnlyOnBM} courses={courses.slice(1, 9)} />
      </div>
    </div>
  );
}
