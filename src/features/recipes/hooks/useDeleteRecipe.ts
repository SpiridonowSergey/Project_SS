import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { deleteRecipe } from '@/features/recipes/api/deleteRecipe';

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (error: Error) => {
      Alert.alert('Ошибка', error.message || 'Не удалось удалить рецепт');
    },
  });
}

export function confirmDeleteRecipe(recipeTitle: string, onConfirm: () => void) {
  Alert.alert(
    'Удаление рецепта',
    `Вы уверены, что хотите удалить этот рецепт?\n\n«${recipeTitle}»`,
    [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Удалить', style: 'destructive', onPress: onConfirm },
    ],
  );
}
