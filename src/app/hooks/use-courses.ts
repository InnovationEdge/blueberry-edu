import { useQuery } from '@tanstack/react-query';
import { fetchCourses, fetchCourse, fetchCategories } from '../../lib/api';

export function useCourses(params?: {
  category?: string;
  level?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => fetchCourses(params),
  });
}

export function useFeaturedCourses() {
  return useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: () => fetchCourses({ featured: true }),
  });
}

export function useNewCourses() {
  return useQuery({
    queryKey: ['courses', 'new'],
    queryFn: () => fetchCourses({ sort: 'newest', limit: 12 }),
  });
}

export function usePopularCourses() {
  return useQuery({
    queryKey: ['courses', 'popular'],
    queryFn: () => fetchCourses({ sort: 'popular', limit: 12 }),
  });
}

export function useCourse(idOrSlug: string) {
  return useQuery({
    queryKey: ['course', idOrSlug],
    queryFn: () => fetchCourse(idOrSlug),
    enabled: !!idOrSlug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000, // categories rarely change
  });
}
