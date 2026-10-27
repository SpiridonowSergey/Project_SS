import { MOCK_FEEDING_STAGES } from '@/features/feeding-guide/mockData';
import type { FeedingStage } from '@/types/domain';

export async function fetchFeedingStages(): Promise<FeedingStage[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_FEEDING_STAGES;
}
