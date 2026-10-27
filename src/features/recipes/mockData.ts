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
    mealType: 'lunch',
    safeServing: 'Подавайте гладким пюре без комочков. Начинайте с 1–2 чайных ложек.',
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
    mealType: 'dinner',
    safeServing: 'Убедитесь, что пюре однородное. Не добавляйте соль.',
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
    mealType: 'breakfast',
    safeServing: 'Остудите до тёплого. Консистенция должна легко стекать с ложки.',
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
    mealType: 'lunch',
    safeServing: 'Тщательно проверьте отсутствие костей. Разминайте вилкой до мягких кусочков.',
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
    mealType: 'snack',
    safeServing: 'Нарежьте на мягкие полоски «пальчики». Не давайте целые крупные куски.',
  },

  {
    id: '4',
    title: 'Творожная запеканка с яблоком и бананом',
    minAgeMonths: 8, // Яйцо и манка — обычно с 8 мес.
    caloriesPer100g: 150,
    mealType: 'snack', // Перекус, как вы указали
    ingredients: [
      { productId: 'baby_cottage_cheese', amount: 50, unit: 'g' }, // 1 баночка ~50г
      { productId: 'egg', amount: 50, unit: 'g' }, // 1 шт ~50г
      { productId: 'semolina', amount: 20, unit: 'g' }, // 2 ст.л. ~20г
      { productId: 'banana', amount: 50, unit: 'g' }, // 1/2 шт
      { productId: 'apple', amount: 30, unit: 'g' } // 1/4 шт
    ],
    steps: [
      'Смешать все ингредиенты в миске.',
      'Выложить в форму для запекания.',
      'Запекать в духовке при 180 °C в течение 20–30 минут.'
    ],
    allergenIds: ['cow_milk', 'egg', 'gluten'], // Творог, яйцо и манка — аллергены
    safeServing: 'Нарезать на небольшие мягкие кусочки, проверить температуру перед подачей.',
    isPremium: false,
  },
  {
    id: '5',
    title: 'Вафли из овощного пюре',
    minAgeMonths: 8,
    caloriesPer100g: 120,
    mealType: 'snack',
    ingredients: [
      { productId: 'vegetable_puree', amount: 100, unit: 'g' }, // 1 баночка
      { productId: 'flour', amount: 30, unit: 'g' }, // 2-4 ст.л. муки
      { productId: 'egg', amount: 50, unit: 'g' } // 1 шт
    ],
    steps: [
      'Смешать овощное пюре, муку и яйцо до однородной массы.',
      'Разогреть вафельницу.',
      'Выпекать до золотистого цвета.'
    ],
    allergenIds: ['egg', 'gluten'], // Яйцо и мука
    safeServing: 'Разломать на кусочки по размеру детской ладошки, следить, чтобы ребенок не откусывал крупные куски.',
    isPremium: false,
  },
  {
    id: '6',
    title: 'Печенье из банана и овсянки',
    minAgeMonths: 8,
    caloriesPer100g: 120,
    mealType: 'snack',
    ingredients: [
      { productId: 'banana', amount: 100, unit: 'g' }, // 1 баночка
      { productId: 'flour', amount: 30, unit: 'g' }, // 2-4 ст.л. муки
      { productId: 'egg', amount: 50, unit: 'g' } // 1 шт
    ],
    steps: [
      'Банан размять, смешать с овсянкой,', 
      'Cлепить шарики, расплющить и запечь 10–12 мин при 180 °C.'
    ],
    allergenIds: ['egg', 'gluten'], // Яйцо и мука
    isPremium: false,
  },
];
