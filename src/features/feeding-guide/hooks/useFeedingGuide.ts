import { useQuery } from '@tanstack/react-query';

import { fetchFeedingStages } from '@/features/feeding-guide/api/fetchFeedingStages';
import { MOCK_FEEDING_STAGES } from '@/features/feeding-guide/mockData';
import { getFeedingStageId } from '@/features/feeding-guide/stageId';
import { useFeedingGuideStore } from '@/features/feeding-guide/store';

export function useFeedingGuide() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['feeding-stages'],
    queryFn: fetchFeedingStages,
  });

  const introducedStageIds = useFeedingGuideStore((state) => state.introducedStageIds);
  const toggleIntroduced = useFeedingGuideStore((state) => state.toggleIntroduced);

  // Empty Supabase table still succeeds — fall back to local stages so the guide is usable.
  const stages =
    !isLoading && !isError && (data?.length ?? 0) === 0
      ? MOCK_FEEDING_STAGES
      : (data ?? []);
  const totalCount = stages.length;
  const introducedCount = stages.filter((stage) =>
    introducedStageIds.includes(getFeedingStageId(stage)),
  ).length;

  function isStageIntroduced(stageId: string) {
    return introducedStageIds.includes(stageId);
  }

  return {
    data,
    isLoading,
    isError,
    stages,
    introducedCount,
    totalCount,
    isStageIntroduced,
    toggleIntroduced,
  };
}
