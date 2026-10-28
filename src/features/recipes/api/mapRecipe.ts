import type { Ingredient, MealType, Recipe } from '@/types/domain';

type RecipeRow = {
  id: string;
  title: string;
  min_age_months: number;
  calories_per_100g: number;
  ingredients: unknown;
  steps: unknown;
  allergen_ids: unknown;
  is_premium: boolean;
  meal_type: string;
  safe_serving?: string | null;
  image_url?: string | null;
};

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

function mapIngredient(value: unknown): Ingredient | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const row = value as Record<string, unknown>;
  const productId =
    typeof row.productId === 'string'
      ? row.productId
      : typeof row.product_id === 'string'
        ? row.product_id
        : null;
  const amount = typeof row.amount === 'number' ? row.amount : Number(row.amount);
  const unit = row.unit;

  if (!productId || Number.isNaN(amount) || (unit !== 'g' && unit !== 'ml' && unit !== 'piece')) {
    return null;
  }

  return { productId, amount, unit };
}

function mapIngredients(value: unknown): Ingredient[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map(mapIngredient)
    .filter((ingredient): ingredient is Ingredient => ingredient !== null);
}

function mapStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function mapMealType(value: string): MealType {
  if (MEAL_TYPES.includes(value as MealType)) {
    return value as MealType;
  }

  return 'snack';
}

export function mapRecipeRow(row: RecipeRow): Recipe {
  return {
    id: row.id,
    title: row.title,
    minAgeMonths: row.min_age_months,
    caloriesPer100g: row.calories_per_100g,
    ingredients: mapIngredients(row.ingredients),
    steps: mapStringArray(row.steps),
    allergenIds: mapStringArray(row.allergen_ids),
    isPremium: Boolean(row.is_premium),
    mealType: mapMealType(row.meal_type),
    safeServing: row.safe_serving ?? undefined,
    imageUrl: row.image_url?.trim() ? row.image_url.trim() : undefined,
  };
}

export function isRecipeRow(value: unknown): value is RecipeRow {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    typeof row.title === 'string' &&
    typeof row.min_age_months === 'number' &&
    typeof row.calories_per_100g === 'number' &&
    typeof row.is_premium === 'boolean' &&
    typeof row.meal_type === 'string'
  );
}
