import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import type { ApiResponse } from '../../lib/api';

interface LessonProgress {
  lessonId: string;
  courseId: string;
  isCompleted: boolean;
  watchedMin: number;
  lastWatchedAt: string;
}

export function useCourseProgress(courseId: string) {
  return useQuery({
    queryKey: ['progress', courseId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<LessonProgress[]>>(`/progress/${courseId}`);
      return data.data;
    },
    enabled: !!courseId,
    retry: 1,
  });
}

export function useMarkLessonComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, lessonId }: { courseId: string; lessonId: string }) => {
      const { data } = await api.post<ApiResponse<LessonProgress>>('/progress', {
        courseId,
        lessonId,
        isCompleted: true,
      });
      return data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['progress', variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
}

export function useUpdateWatchTime() {
  return useMutation({
    mutationFn: async ({ courseId, lessonId, watchedMin }: { courseId: string; lessonId: string; watchedMin: number }) => {
      const { data } = await api.post<ApiResponse<LessonProgress>>('/progress', {
        courseId,
        lessonId,
        watchedMin,
      });
      return data.data;
    },
  });
}
