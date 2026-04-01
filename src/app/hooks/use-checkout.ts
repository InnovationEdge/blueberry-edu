import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../../lib/api';

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const returnUrl = `${window.location.origin}/course/${courseId}/success`;
      const cancelUrl = `${window.location.origin}/course/${courseId}`;

      const res = await createOrder({
        courseId,
        returnUrl,
        cancelUrl,
      });

      return res.data;
    },
    onSuccess: (data) => {
      if (data?.enrolled) {
        // Free course — already enrolled, invalidate cache
        queryClient.invalidateQueries({ queryKey: ['enrollments'] });
        queryClient.invalidateQueries({ queryKey: ['enrollment', 'check'] });
      } else if (data?.checkoutUrl) {
        // Paid course — redirect to Flitt
        window.location.href = data.checkoutUrl;
      }
    },
  });
}
