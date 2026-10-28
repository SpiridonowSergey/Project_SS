import type { FeedingStageFormValues } from '@/features/admin/schemas/feedingStageFormSchema';

export type FeedingStageInsertRow = {
  age_months: number;
  product_group: string;
  start_volume: string;
  target_volume: string;
  source_id: string;
  notes: string | null;
};

export function toFeedingStageInsertRow(
  values: FeedingStageFormValues,
): FeedingStageInsertRow {
  return {
    age_months: values.ageMonths,
    product_group: values.productGroup.trim(),
    start_volume: values.startVolume.trim(),
    target_volume: values.targetVolume.trim(),
    source_id: values.sourceId,
    notes: values.notes?.trim() ? values.notes.trim() : null,
  };
}
