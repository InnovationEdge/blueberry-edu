import { HeroSection } from '../components/hero-section';
import { CourseRow } from '../components/course-row';
import { HeroSkeleton } from '../components/skeletons';
import { CourseRowSkeleton } from '../components/skeletons';
import { getAppT } from '../i18n/app';
import { useAuth } from '../context/auth-context';
import { useFeaturedCourses, useNewCourses, usePopularCourses, useAllCourses } from '../hooks/use-courses';

export function Home() {
  const { language } = useAuth();
  const t = getAppT(language);

  const { data: featuredCourses = [], isLoading: heroLoading } = useFeaturedCourses();
  const { data: newCourses = [], isLoading: newLoading } = useNewCourses();
  const { data: popularCourses = [], isLoading: popLoading } = usePopularCourses();
  const { data: allCourses = [], isLoading: allLoading } = useAllCourses();

  const isLoading = heroLoading || newLoading || popLoading || allLoading;

  return (
    <div className="min-h-screen bg-background">
      {heroLoading ? <HeroSkeleton /> : featuredCourses.length > 0 && <HeroSection courses={featuredCourses} />}
      <div className="space-y-10 md:space-y-14 pb-20 mt-6 relative z-10">
        {isLoading ? (
          <>
            <CourseRowSkeleton />
            <CourseRowSkeleton />
            <CourseRowSkeleton />
          </>
        ) : (
          <>
            {newCourses.length > 0 && <CourseRow title={t.homeYourNextWatch} courses={newCourses} />}
            {allCourses.length > 0 && <CourseRow title={t.homeMyList} courses={allCourses.slice(0, 8)} />}
            {popularCourses.length > 0 && <CourseRow title={t.homeTopPicks} courses={popularCourses} />}
            {newCourses.length > 0 && <CourseRow title={t.homeTopSearches} courses={newCourses.slice().reverse()} />}
            {allCourses.length > 4 && <CourseRow title={t.homeNewOnBM} courses={allCourses.slice(4)} />}
            {allCourses.length > 1 && <CourseRow title={t.homeOnlyOnBM} courses={allCourses.slice(1)} />}
          </>
        )}
      </div>
    </div>
  );
}
