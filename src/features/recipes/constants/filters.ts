import type { MealType } from '@/types/domain';

export const ALLERGEN_FILTERS = [
  { id: 'milk', label: 'Молоко' },
  { id: 'gluten', label: 'Глютен' },
  { id: 'egg', label: 'Яйцо' },
  { id: 'fish', label: 'Рыба' },
] as const;

export const INGREDIENT_FILTERS = [
  { id: 'zucchini', label: 'Кабачок' },
  { id: 'broccoli', label: 'Брокколи' },
  { id: 'apple', label: 'Яблоко' },
  { id: 'oats', label: 'Овсянка' },
  { id: 'banana', label: 'Банан' },
  { id: 'carrot', label: 'Морковь' },
] as const;

/** Selected meal filter, or `null` when showing all meals. */
export type MealTypeFilter = MealType | null;

export const MEAL_TYPE_FILTERS: { id: MealType; label: string }[] = [
  { id: 'breakfast', label: 'Завтрак' },
  { id: 'lunch', label: 'Обед' },
  { id: 'dinner', label: 'Ужин' },
  { id: 'snack', label: 'Перекус' },
];
