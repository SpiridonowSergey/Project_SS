import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveUserPlate } from '@/features/plates/api/saveUserPlate';
import { userPlateQueryKey } from '@/features/plates/queryKeys';
import type { PlateCustomSlots } from '@/features/plates/types';
import { supabase } from '@/shared/lib/supabase';

type SaveUserPlateVariables = {
  templateId: string;
  customSlots: PlateCustomSlots;
};

export function useSaveUserPlate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ templateId, customSlots }: SaveUserPlateVariables) => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }
      if (!user) {
        throw new Error('Войдите в аккаунт, чтобы сохранить тарелку');
      }

      return saveUserPlate({
        userId: user.id,
        templateId,
        customSlots,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(userPlateQueryKey(variables.templateId), data);
      void queryClient.invalidateQueries({
        queryKey: userPlateQueryKey(variables.templateId),
      });
    },
  });
}
