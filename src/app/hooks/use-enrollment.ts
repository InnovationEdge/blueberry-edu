import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMyEnrollments, enrollInCourse, checkEnrollment } from '../../lib/api';

export function useMyEnrollments() {
  return useQuery({
    queryKey: ['enrollments', 'my'],
    queryFn: async () => {
      const res = await fetchMyEnrollments();
      return res.data;
    },
    retry: 1,
  });
}

export function useCheckEnrollment(courseId: string) {
  return useQuery({
    queryKey: ['enrollment', 'check', courseId],
    queryFn: async () => {
      const res = await checkEnrollment(courseId);
      return res.data?.enrolled ?? false;
    },
    enabled: !!courseId,
    retry: 1,
  });
}

export function useEnroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => enrollInCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollment', 'check'] });
    },
  });
}
