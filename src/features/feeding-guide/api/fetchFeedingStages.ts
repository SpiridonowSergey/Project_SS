import {
  isFeedingStageRow,
  mapFeedingStageRow,
} from '@/features/feeding-guide/api/mapFeedingStage';
import { supabase } from '@/shared/lib/supabase';
import type { FeedingStage } from '@/types/domain';

export async function fetchFeedingStages(): Promise<FeedingStage[]> {
  const { data, error } = await supabase.from('feeding_stages').select('*');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  return data.filter(isFeedingStageRow).map(mapFeedingStageRow);
}
