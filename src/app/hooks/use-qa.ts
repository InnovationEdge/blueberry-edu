import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLessonQA, postQuestion, postAnswer } from '../../lib/api';

export function useLessonQA(lessonId: string) {
  return useQuery({
    queryKey: ['qa', lessonId],
    queryFn: async () => {
      const res = await fetchLessonQA(lessonId);
      return res.data;
    },
    enabled: !!lessonId,
  });
}

export function usePostQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postQuestion,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['qa', variables.lessonId] });
    },
  });
}

export function usePostAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qa'] });
    },
  });
}
