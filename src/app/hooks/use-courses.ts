import { useQuery } from '@tanstack/react-query';
import { fetchCourses, fetchCourse, fetchCategories, apiCourseToCourse, apiCourseDetailToDetail } from '../../lib/api';
import type { Course, CourseDetail } from '../../lib/api';

export type { Course, CourseDetail };

export function useCourses(params?: {
  category?: string;
  level?: string;
  featured?: boolean;
  sort?: string;
  q?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      const res = await fetchCourses(params);
      return { ...res, data: res.data.map(apiCourseToCourse) };
    },
  });
}

export function useFeaturedCourses() {
  return useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: async () => {
      const res = await fetchCourses({ featured: true, limit: 5 });
      return res.data.map(apiCourseToCourse);
    },
  });
}

export function useNewCourses() {
  return useQuery({
    queryKey: ['courses', 'new'],
    queryFn: async () => {
      const res = await fetchCourses({ sort: 'newest', limit: 12 });
      return res.data.map(apiCourseToCourse);
    },
  });
}

export function usePopularCourses() {
  return useQuery({
    queryKey: ['courses', 'popular'],
    queryFn: async () => {
      const res = await fetchCourses({ sort: 'popular', limit: 12 });
      return res.data.map(apiCourseToCourse);
    },
  });
}

export function useAllCourses() {
  return useQuery({
    queryKey: ['courses', 'all'],
    queryFn: async () => {
      const res = await fetchCourses({ limit: 50 });
      return res.data.map(apiCourseToCourse);
    },
  });
}

export function useCourse(idOrSlug: string) {
  return useQuery({
    queryKey: ['course', idOrSlug],
    queryFn: async () => {
      const res = await fetchCourse(idOrSlug);
      return apiCourseToCourse(res.data);
    },
    enabled: !!idOrSlug,
  });
}

export function useCourseDetail(slug: string) {
  return useQuery({
    queryKey: ['courseDetail', slug],
    queryFn: async () => {
      const res = await fetchCourse(slug);
      return apiCourseDetailToDetail(res.data);
    },
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetchCategories();
      return res.data;
    },
    staleTime: 30 * 60 * 1000,
  });
}
