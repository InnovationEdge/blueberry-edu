import { useQuery } from '@tanstack/react-query';
import { fetchCourses, courseToCardData } from '../../lib/supabase-api';
import { LANDING_COURSES } from '../data/courses-landing';

export function useLandingCourses() {
  return useQuery({
    queryKey: ['landing-courses'],
    queryFn: async () => {
      const courses = await fetchCourses();
      return courses.map(courseToCardData);
    },
    staleTime: 5 * 60 * 1000,
    placeholderData: LANDING_COURSES,
  });
}
