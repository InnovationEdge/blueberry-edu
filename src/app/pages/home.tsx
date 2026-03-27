import { HeroSection } from '../components/hero-section';
import { CourseRow } from '../components/course-row';
import { courses, getNewCourses, getTopRatedCourses, getPopularCourses } from '../data/courses';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';

export function Home() {
  const { language } = useAuth();
  const t = getAppT(language);
  const featuredCourse = courses[6];

  return (
    <div className="min-h-screen bg-black">
      <HeroSection course={featuredCourse} />
      <div className="space-y-12 md:space-y-16 pb-20 -mt-32 relative z-10">
        <CourseRow title={t.homeYourNextWatch} courses={getNewCourses()} />
        <CourseRow title={t.homeMyList} courses={courses.slice(0, 8)} />
        <CourseRow title={t.homeTopSearches} courses={getTopRatedCourses()} />
        <CourseRow title={t.homeTopPicks} courses={getPopularCourses()} />
        <CourseRow title={t.homeGames} courses={courses.slice(2, 10)} />
        <CourseRow title={t.homeOnlyOnBM} courses={courses.slice(1, 9)} />
        <CourseRow title={t.homeTVDramas} courses={courses.slice(3, 11)} />
        <CourseRow title={t.homeWeekend} courses={courses.slice(0, 8)} />
        <CourseRow title={t.homeNewOnBM} courses={courses.slice(4, 12)} />
        <CourseRow title={t.homeRomantic} courses={courses.slice(1, 9)} />
        <CourseRow title={t.homeAwardWinning} courses={courses.slice(2, 10)} />
      </div>
    </div>
  );
}
