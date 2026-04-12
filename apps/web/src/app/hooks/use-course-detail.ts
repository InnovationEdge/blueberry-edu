import { useQuery } from '@tanstack/react-query';
import { fetchCourse } from '../../lib/supabase-api';

export function useCourseDetail(id: number) {
  return useQuery({
    queryKey: ['course-detail', id],
    queryFn: () => fetchCourse(id),
    staleTime: 5 * 60 * 1000,
    enabled: id > 0,
  });
}
