import { useQuery } from '@tanstack/react-query';

import { fetchRecipes } from '@/features/recipes/api/fetchRecipes';

export function useRecipes() {
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  };
}
