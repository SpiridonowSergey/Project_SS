import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import { insertRecipe } from '@/features/admin/api/insertRecipe';
import {
  RECIPE_FORM_DEFAULTS,
  recipeFormSchema,
  type RecipeFormValues,
} from '@/features/admin/schemas/recipeFormSchema';

export function useAddRecipeForm() {
  const queryClient = useQueryClient();
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: RECIPE_FORM_DEFAULTS,
  });

  const mutation = useMutation({
    mutationFn: insertRecipe,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recipes'] });
      form.reset(RECIPE_FORM_DEFAULTS);
      Alert.alert('Готово', 'Рецепт сохранён в Supabase');
    },
    onError: (error: Error) => {
      Alert.alert('Ошибка', error.message || 'Не удалось сохранить рецепт');
    },
  });

  function submit(values: RecipeFormValues) {
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
