import type { FeedingStage } from '@/types/domain';

export function getFeedingStageId(stage: FeedingStage) {
  return `${stage.ageMonths}:${stage.productGroup}`;
}
