import { useCallback, useState } from 'react';

import { useRecipe } from '@/features/recipes/hooks/useRecipe';
import type { Allergen } from '@/types/domain';

export function useRecipeDetailScreen(id: string | undefined) {
  const { data: recipe, isLoading, isError } = useRecipe(id);
  const [selectedAllergen, setSelectedAllergen] = useState<Allergen | null>(null);
  const [checkedIngredientKeys, setCheckedIngredientKeys] = useState<Set<string>>(
    () => new Set(),
  );

  const toggleIngredient = useCallback((key: string) => {
    setCheckedIngredientKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const closeAllergen = useCallback(() => {
    setSelectedAllergen(null);
  }, []);

  return {
    recipe,
    isLoading,
    isError,
    selectedAllergen,
    setSelectedAllergen,
    closeAllergen,
    checkedIngredientKeys,
    toggleIngredient,
  };
}

export function ingredientKey(productId: string, unit: string, index: number) {
  return `${productId}-${unit}-${index}`;
}
