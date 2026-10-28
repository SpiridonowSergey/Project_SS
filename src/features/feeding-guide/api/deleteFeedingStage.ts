import { supabase } from '@/shared/lib/supabase';

export async function deleteFeedingStage(id: string) {
  const { error } = await supabase.from('feeding_stages').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
