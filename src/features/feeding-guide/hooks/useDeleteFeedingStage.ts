import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { deleteFeedingStage } from '@/features/feeding-guide/api/deleteFeedingStage';

export function useDeleteFeedingStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeedingStage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeding-stages'] });
    },
    onError: (error: Error) => {
      Alert.alert('Ошибка', error.message || 'Не удалось удалить этап');
    },
  });
}

export function confirmDeleteFeedingStage(label: string, onConfirm: () => void) {
  Alert.alert(
    'Удаление этапа',
    `Вы уверены, что хотите удалить этот этап прикорма?\n\n«${label}»`,
    [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Удалить', style: 'destructive', onPress: onConfirm },
    ],
  );
}
