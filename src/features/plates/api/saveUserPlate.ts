import { mapUserPlate } from '@/features/plates/api/mapPlate';
import type { PlateCustomSlots, UserPlate } from '@/features/plates/types';
import { supabase } from '@/shared/lib/supabase';

type SaveUserPlateInput = {
  userId: string;
  templateId: string;
  customSlots: PlateCustomSlots;
};

export async function saveUserPlate({
  userId,
  templateId,
  customSlots,
}: SaveUserPlateInput): Promise<UserPlate> {
  const { data, error } = await supabase
    .from('user_plates')
    .upsert(
      {
        user_id: userId,
        template_id: templateId,
        custom_slots: customSlots,
      },
      { onConflict: 'user_id,template_id' },
    )
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  const mapped = mapUserPlate(data as Record<string, unknown>);
  if (!mapped) {
    throw new Error('Не удалось сохранить тарелку');
  }

  return mapped;
}
