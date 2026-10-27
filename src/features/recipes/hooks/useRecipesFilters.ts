import { useMemo, useState } from 'react';

import type { MealTypeFilter } from '@/features/recipes/constants/filters';
import { MOCK_RECIPES } from '@/features/recipes/mockData';
import { useFavoritesStore } from '@/features/recipes/store/favorites';
import type { Recipe } from '@/types/domain';

function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function useRecipesFilters(recipes: Recipe[] = MOCK_RECIPES) {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const [mealType, setMealType] = useState<MealTypeFilter>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [excludedAllergenIds, setExcludedAllergenIds] = useState<string[]>([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);

  const hasActiveFilters =
    mealType !== 'all' ||
    favoritesOnly ||
    excludedAllergenIds.length > 0 ||
    selectedIngredientIds.length > 0;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      if (favoritesOnly && !favoriteIds.includes(recipe.id)) {
        return false;
      }

      if (mealType !== 'all' && recipe.mealType !== mealType) {
        return false;
      }

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
  }, [
    excludedAllergenIds,
    favoriteIds,
    favoritesOnly,
    mealType,
    recipes,
    selectedIngredientIds,
  ]);

  function selectMealType(nextMealType: MealTypeFilter) {
    setMealType(nextMealType);
  }

  function toggleFavoritesOnly() {
    setFavoritesOnly((current) => !current);
  }

  function toggleAllergen(id: string) {
    setExcludedAllergenIds((current) => toggleId(current, id));
  }

  function toggleIngredient(id: string) {
    setSelectedIngredientIds((current) => toggleId(current, id));
  }

  function resetFilters() {
    setMealType('all');
    setFavoritesOnly(false);
    setExcludedAllergenIds([]);
    setSelectedIngredientIds([]);
  }

  return {
    mealType,
    favoritesOnly,
    excludedAllergenIds,
    selectedIngredientIds,
    filteredRecipes,
    hasActiveFilters,
    selectMealType,
    toggleFavoritesOnly,
    toggleAllergen,
    toggleIngredient,
    resetFilters,
  };
}
