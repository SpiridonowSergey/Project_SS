import { isRecipeRow, mapRecipeRow } from '@/features/recipes/api/mapRecipe';
import { supabase } from '@/shared/lib/supabase';
import type { Recipe } from '@/types/domain';

export async function fetchRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase.from('recipes').select('*');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  return data.filter(isRecipeRow).map(mapRecipeRow);
}
