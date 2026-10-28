import { isRecipeRow, mapRecipeRow } from '@/features/recipes/api/mapRecipe';
import { supabase } from '@/shared/lib/supabase';
import type { Recipe } from '@/types/domain';

export async function fetchRecipe(id: string): Promise<Recipe> {
  const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  if (!isRecipeRow(data)) {
    throw new Error('Recipe response has unexpected shape');
  }

  return mapRecipeRow(data);
}
