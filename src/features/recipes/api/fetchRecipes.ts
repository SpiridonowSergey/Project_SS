import { MOCK_RECIPES } from '@/features/recipes/mockData';
import type { Recipe } from '@/types/domain';

export async function fetchRecipes(): Promise<Recipe[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_RECIPES;
}
