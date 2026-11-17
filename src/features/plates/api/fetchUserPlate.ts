import { mapUserPlate } from '@/features/plates/api/mapPlate';
import type { UserPlate } from '@/features/plates/types';
import { supabase } from '@/shared/lib/supabase';

export async function fetchUserPlate(
  userId: string,
  templateId: string,
): Promise<UserPlate | null> {
  const { data, error } = await supabase
    .from('user_plates')
    .select('*')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapUserPlate(data as Record<string, unknown>);
}
