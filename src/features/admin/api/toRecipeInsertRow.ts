import type { RecipeFormValues } from '@/features/admin/schemas/recipeFormSchema';

export type RecipeInsertRow = {
  title: string;
  min_age_months: number;
  calories_per_100g: number;
  meal_type: RecipeFormValues['mealType'];
  safe_serving: string | null;
  is_premium: boolean;
  allergen_ids: string[];
  ingredients: {
    product_id: string;
    amount: number;
    unit: 'g' | 'ml' | 'piece';
  }[];
  steps: string[];
};

export function parseAllergenIdsText(value?: string) {
  if (!value?.trim()) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toRecipeInsertRow(values: RecipeFormValues): RecipeInsertRow {
  return {
    title: values.title.trim(),
    min_age_months: values.minAgeMonths,
    calories_per_100g: values.caloriesPer100g,
    meal_type: values.mealType,
    safe_serving: values.safeServing?.trim() ? values.safeServing.trim() : null,
    is_premium: values.isPremium,
    allergen_ids: parseAllergenIdsText(values.allergenIdsText),
    ingredients: values.ingredients.map((ingredient) => ({
      product_id: ingredient.productId.trim(),
      amount: ingredient.amount,
      unit: ingredient.unit,
    })),
    steps: values.steps.map((step) => step.text.trim()),
  };
}
