import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import { insertFeedingStage } from '@/features/admin/api/insertFeedingStage';
import {
  createFeedingStageFormDefaults,
  feedingStageFormSchema,
  type FeedingStageFormValues,
} from '@/features/admin/schemas/feedingStageFormSchema';

export function useAddFeedingStageForm(defaultSourceId: string) {
  const queryClient = useQueryClient();
  const defaults = createFeedingStageFormDefaults(defaultSourceId);

  const form = useForm<FeedingStageFormValues>({
    resolver: zodResolver(feedingStageFormSchema),
    defaultValues: defaults,
  });

  const mutation = useMutation({
    mutationFn: insertFeedingStage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeding-stages'] });
      form.reset(createFeedingStageFormDefaults(defaultSourceId));
      Alert.alert('Готово', 'Этап прикорма сохранён в Supabase');
    },
    onError: (error: Error) => {
      Alert.alert('Ошибка', error.message || 'Не удалось сохранить этап');
    },
  });

  function submit(values: FeedingStageFormValues) {
    if (mutation.isPending) {
      return;
    }

    mutation.mutate(values);
  }

  return {
    form,
    isSubmitting: mutation.isPending,
    submitForm: () => {
      void form.handleSubmit(submit)();
    },
  };
}
