import { supabase } from '@/shared/lib/supabase';

export async function deleteRecipe(id: string) {
  const { error } = await supabase.from('recipes').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
