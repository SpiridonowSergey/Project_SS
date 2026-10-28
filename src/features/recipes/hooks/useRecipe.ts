import { useQuery } from '@tanstack/react-query';

import { fetchRecipe } from '@/features/recipes/api/fetchRecipe';

export function useRecipe(id: string | undefined) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipe(id!),
    enabled: Boolean(id),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
