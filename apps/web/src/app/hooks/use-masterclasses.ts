import { useQuery } from '@tanstack/react-query';
import { fetchMasterclasses } from '../../lib/supabase-api';

export function useMasterclasses() {
  return useQuery({
    queryKey: ['masterclasses'],
    queryFn: fetchMasterclasses,
    staleTime: 5 * 60 * 1000,
  });
}
