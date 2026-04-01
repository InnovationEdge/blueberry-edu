import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { ApiResponse, CourseFromApi } from '../../lib/api';

export function useInstructorCourses() {
  return useQuery({
    queryKey: ['instructor', 'courses'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<CourseFromApi[]>>('/instructor/courses');
      return data.data;
    },
    retry: 1,
  });
}

export function useInstructorStats() {
  return useQuery({
    queryKey: ['instructor', 'stats'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{
        totalStudents: number;
        totalRevenue: number;
        totalCourses: number;
        avgRating: number;
        recentEnrollments: number;
      }>>('/instructor/stats');
      return data.data;
    },
    retry: 1,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      slug: string;
      subtitle?: string;
      shortDescription?: string;
      description?: string;
      thumbnailUrl?: string;
      price: number;
      currency?: string;
      level: string;
      language?: string;
      categoryIds: string[];
    }) => {
      const res = await api.post<ApiResponse<CourseFromApi>>('/courses', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses'] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: unknown }) => {
      const res = await api.put<ApiResponse<CourseFromApi>>(`/courses/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor', 'courses'] });
    },
  });
}
