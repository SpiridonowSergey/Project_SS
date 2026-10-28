import type { FeedingStage } from '@/types/domain';

type FeedingStageRow = {
  age_months: number;
  product_group: string;
  start_volume: string;
  target_volume: string;
  source_id: string;
  notes?: string | null;
};

export function mapFeedingStageRow(row: FeedingStageRow): FeedingStage {
  return {
    ageMonths: row.age_months,
    productGroup: row.product_group,
    startVolume: row.start_volume,
    targetVolume: row.target_volume,
    sourceId: row.source_id,
    notes: row.notes ?? undefined,
  };
}

export function isFeedingStageRow(value: unknown): value is FeedingStageRow {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const row = value as Record<string, unknown>;
  return (
    typeof row.age_months === 'number' &&
    typeof row.product_group === 'string' &&
    typeof row.start_volume === 'string' &&
    typeof row.target_volume === 'string' &&
    typeof row.source_id === 'string'
  );
}
