import { useQuery } from '@tanstack/react-query';

import { fetchUserPlate } from '@/features/plates/api/fetchUserPlate';
import { userPlateQueryKey } from '@/features/plates/queryKeys';
import { supabase } from '@/shared/lib/supabase';

export function useUserPlate(templateId: string | undefined) {
  const query = useQuery({
    queryKey: userPlateQueryKey(templateId),
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }
      if (!user || !templateId) {
        return null;
      }

      return fetchUserPlate(user.id, templateId);
    },
    enabled: Boolean(templateId),
  });

  return {
    userPlate: query.data ?? null,
    customSlots: query.data?.customSlots ?? {},
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
