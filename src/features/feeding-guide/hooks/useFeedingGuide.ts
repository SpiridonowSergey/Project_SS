import { MOCK_FEEDING_STAGES } from '@/features/feeding-guide/mockData';
import { getFeedingStageId } from '@/features/feeding-guide/stageId';
import { useFeedingGuideStore } from '@/features/feeding-guide/store';

export function useFeedingGuide() {
  const introducedStageIds = useFeedingGuideStore((state) => state.introducedStageIds);
  const toggleIntroduced = useFeedingGuideStore((state) => state.toggleIntroduced);

  const totalCount = MOCK_FEEDING_STAGES.length;
  const introducedCount = MOCK_FEEDING_STAGES.filter((stage) =>
    introducedStageIds.includes(getFeedingStageId(stage)),
  ).length;

  function isStageIntroduced(stageId: string) {
    return introducedStageIds.includes(stageId);
  }

  return {
    stages: MOCK_FEEDING_STAGES,
    introducedCount,
    totalCount,
    isStageIntroduced,
    toggleIntroduced,
  };
}
