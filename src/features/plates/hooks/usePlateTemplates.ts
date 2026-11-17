import { useQuery } from '@tanstack/react-query';

import { fetchPlateTemplates } from '@/features/plates/api/fetchPlateTemplates';
import { PLATE_TEMPLATES } from '@/features/plates/mockData';
import { plateTemplatesQueryKey } from '@/features/plates/queryKeys';

export function usePlateTemplates() {
  const query = useQuery({
    queryKey: plateTemplatesQueryKey(),
    queryFn: fetchPlateTemplates,
  });

  // Empty Supabase table still succeeds — fall back to local templates.
  const templates =
    !query.isLoading && !query.isError && (query.data?.length ?? 0) === 0
      ? PLATE_TEMPLATES
      : (query.data ?? []);

  return {
    templates,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
  };
}
