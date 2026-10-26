import { useMemo, useState } from 'react';

import { MOCK_RECIPES } from '@/features/recipes/mockData';
import type { Recipe } from '@/types/domain';

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function useRecipesFilters(recipes: Recipe[] = MOCK_RECIPES) {
  const [excludedAllergenIds, setExcludedAllergenIds] = useState<string[]>([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);

  const hasActiveFilters =
    excludedAllergenIds.length > 0 || selectedIngredientIds.length > 0;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const hasExcludedAllergen = excludedAllergenIds.some((allergenId) =>
        recipe.allergenIds.includes(allergenId),
      );

      if (hasExcludedAllergen) {
        return false;
      }

      if (selectedIngredientIds.length === 0) {
        return true;
      }

      const recipeProductIds = recipe.ingredients.map((ingredient) => ingredient.productId);
      return selectedIngredientIds.every((ingredientId) =>
        recipeProductIds.includes(ingredientId),
      );
    });
  }, [excludedAllergenIds, recipes, selectedIngredientIds]);

  function toggleAllergen(id: string) {
    setExcludedAllergenIds((current) => toggleId(current, id));
  }

  function toggleIngredient(id: string) {
    setSelectedIngredientIds((current) => toggleId(current, id));
  }

  function resetFilters() {
    setExcludedAllergenIds([]);
    setSelectedIngredientIds([]);
  }

  return {
    excludedAllergenIds,
    selectedIngredientIds,
    filteredRecipes,
    hasActiveFilters,
    toggleAllergen,
    toggleIngredient,
    resetFilters,
  };
}
