import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCourseReviews, submitReview } from '../../lib/api';

export function useCourseReviews(courseId: string) {
  return useQuery({
    queryKey: ['reviews', courseId],
    queryFn: async () => {
      const res = await fetchCourseReviews(courseId);
      return res.data;
    },
    enabled: !!courseId,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ['courseDetail'] });
    },
  });
}
