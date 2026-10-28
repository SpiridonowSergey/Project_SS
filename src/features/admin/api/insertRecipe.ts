import { toRecipeInsertRow } from '@/features/admin/api/toRecipeInsertRow';
import type { RecipeFormValues } from '@/features/admin/schemas/recipeFormSchema';
import { supabase } from '@/shared/lib/supabase';

export async function insertRecipe(values: RecipeFormValues) {
  const row = toRecipeInsertRow(values);
  const { data, error } = await supabase.from('recipes').insert(row).select('id').single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
