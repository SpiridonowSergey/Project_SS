import type { Recipe } from '@/types/domain';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 'recipe-zucchini-puree',
    title: 'Пюре из кабачка',
    minAgeMonths: 4,
    caloriesPer100g: 18,
    ingredients: [
      { productId: 'zucchini', amount: 100, unit: 'g' },
      { productId: 'water', amount: 30, unit: 'ml' },
    ],
    steps: ['Промыть кабачок', 'Отварить до мягкости', 'Пробить блендером'],
    allergenIds: [],
    isPremium: false,
  },
  {
    id: 'recipe-broccoli-puree',
    title: 'Пюре из брокколи',
    minAgeMonths: 5,
    caloriesPer100g: 24,
    ingredients: [
      { productId: 'broccoli', amount: 100, unit: 'g' },
      { productId: 'water', amount: 40, unit: 'ml' },
    ],
    steps: ['Разобрать на соцветия', 'Приготовить на пару', 'Измельчить'],
    allergenIds: [],
    isPremium: false,
  },
  {
    id: 'recipe-apple-oat',
    title: 'Яблочно-овсяная каша',
    minAgeMonths: 6,
    caloriesPer100g: 72,
    ingredients: [
      { productId: 'oats', amount: 30, unit: 'g' },
      { productId: 'apple', amount: 80, unit: 'g' },
      { productId: 'milk', amount: 120, unit: 'ml' },
    ],
    steps: ['Залить овсянку молоком', 'Добавить яблоко', 'Варить до готовности'],
    allergenIds: ['milk', 'gluten'],
    isPremium: false,
  },
  {
    id: 'recipe-salmon-veg',
    title: 'Лосось с овощами',
    minAgeMonths: 8,
    caloriesPer100g: 95,
    ingredients: [
      { productId: 'salmon', amount: 60, unit: 'g' },
      { productId: 'carrot', amount: 40, unit: 'g' },
      { productId: 'potato', amount: 50, unit: 'g' },
    ],
    steps: ['Отварить овощи', 'Приготовить лосось на пару', 'Смешать и размять'],
    allergenIds: ['fish'],
    isPremium: true,
  },
  {
    id: 'recipe-banana-pancake',
    title: 'Банановые оладьи',
    minAgeMonths: 9,
    caloriesPer100g: 140,
    ingredients: [
      { productId: 'banana', amount: 1, unit: 'piece' },
      { productId: 'egg', amount: 1, unit: 'piece' },
      { productId: 'flour', amount: 40, unit: 'g' },
    ],
    steps: ['Размять банан', 'Смешать с яйцом и мукой', 'Жарить на антипригарной сковороде'],
    allergenIds: ['egg', 'gluten'],
    isPremium: true,
  },
];
