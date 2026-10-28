import { z } from 'zod';

export const ingredientFormSchema = z.object({
  productId: z.string().min(1, 'Укажите продукт'),
  amount: z.number().positive('Количество должно быть больше 0'),
  unit: z.enum(['g', 'ml', 'piece']),
});

export const recipeFormSchema = z.object({
  title: z.string().min(1, 'Укажите название'),
  minAgeMonths: z.number().int().min(0, 'Возраст не может быть отрицательным'),
  caloriesPer100g: z.number().positive('Укажите калорийность'),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  safeServing: z.string().optional(),
  imageUrl: z.string().optional(),
  isPremium: z.boolean(),
  allergenIdsText: z.string().optional(),
  ingredients: z.array(ingredientFormSchema).min(1, 'Добавьте хотя бы один ингредиент'),
  steps: z
    .array(z.object({ text: z.string().min(1, 'Шаг не может быть пустым') }))
    .min(1, 'Добавьте хотя бы один шаг'),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;

export const RECIPE_FORM_DEFAULTS: RecipeFormValues = {
  title: '',
  minAgeMonths: 6,
  caloriesPer100g: 50,
  mealType: 'lunch',
  safeServing: '',
  imageUrl: '',
  isPremium: false,
  allergenIdsText: '',
  ingredients: [{ productId: '', amount: 10, unit: 'g' }],
  steps: [{ text: '' }],
};

export const MEAL_TYPE_OPTIONS: { id: RecipeFormValues['mealType']; label: string }[] = [
  { id: 'breakfast', label: 'Завтрак' },
  { id: 'lunch', label: 'Обед' },
  { id: 'dinner', label: 'Ужин' },
  { id: 'snack', label: 'Перекус' },
];

export const UNIT_OPTIONS: RecipeFormValues['ingredients'][number]['unit'][] = [
  'g',
  'ml',
  'piece',
];

export function parseOptionalNumber(value: string) {
  if (value.trim() === '') {
    return Number.NaN;
  }

  return Number(value.replace(',', '.'));
}
