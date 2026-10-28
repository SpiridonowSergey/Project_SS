import { toFeedingStageInsertRow } from '@/features/admin/api/toFeedingStageInsertRow';
import type { FeedingStageFormValues } from '@/features/admin/schemas/feedingStageFormSchema';
import { supabase } from '@/shared/lib/supabase';

export async function insertFeedingStage(values: FeedingStageFormValues) {
  const row = toFeedingStageInsertRow(values);
  const { data, error } = await supabase
    .from('feeding_stages')
    .insert(row)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
