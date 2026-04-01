import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '../../lib/api';

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetchWishlist();
      return res.data;
    },
    retry: 1,
  });
}

export function useToggleWishlist() {
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: (courseId: string) => addToWishlist(courseId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  const remove = useMutation({
    mutationFn: (courseId: string) => removeFromWishlist(courseId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  return { add, remove };
}
