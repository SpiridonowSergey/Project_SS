import type { MealType } from '@/types/domain';

/**
 * Meal accent dots use existing DESIGN tokens only.
 * Dinner maps to `label` — there is no `success` token in the system.
 */
export const MEAL_TYPE_ACCENT_CLASS: Record<MealType, string> = {
  breakfast: 'bg-warning',
  lunch: 'bg-brand',
  dinner: 'bg-label',
  snack: 'bg-label-secondary',
};
