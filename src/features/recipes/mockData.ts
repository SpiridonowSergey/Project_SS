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
    caloriesPer100g: 180,
    mealType: 'snack',
    ingredients: [
      { productId: 'banana', amount: 100, unit: 'g' }, // 1 шт
      { productId: 'oats', amount: 30, unit: 'g' }, // 4 ч.л.
      { productId: 'vegetable_oil', amount: 2, unit: 'g' } // капля
    ],
    steps: [
      'Банан размять вилкой.',
      'Смешать с овсянкой.',
      'Слепить шарики и расплющить в лепешки.',
      'Запекать при 180 °C 10–12 минут.'
    ],
    allergenIds: ['gluten'], // Овсянка может содержать следы глютена
    safeServing: 'Давать мягкое печенье целиком или разломить на кусочки, следить, чтобы ребенок не давился.',
    isPremium: false,
  },
  {
    id: '7',
    title: 'Морковные кексы',
    minAgeMonths: 8,
    caloriesPer100g: 160,
    mealType: 'snack',
    ingredients: [
      { productId: 'carrot', amount: 70, unit: 'g' }, // 1 шт
      { productId: 'egg', amount: 50, unit: 'g' }, // 1 шт
      { productId: 'flour', amount: 30, unit: 'g' }, // 3 ст.л.
      { productId: 'baking_powder', amount: 3, unit: 'g' } // 1/2 ч.л.
    ],
    steps: [
      'Морковь натереть на мелкой терке.',
      'Добавить яйцо, муку и разрыхлитель, перемешать.',
      'Разложить по формочкам.',
      'Выпекать в духовке при 180 °C 20 минут.'
    ],
    allergenIds: ['egg', 'gluten'],
    safeServing: 'Проверить, что кекс остыл. Давать мягкими кусочками.',
    isPremium: false,
  },
  {
    id: '8',
    title: 'Яблочные мягкие брусочки',
    minAgeMonths: 8,
    caloriesPer100g: 140,
    mealType: 'snack',
    ingredients: [
      { productId: 'apple', amount: 100, unit: 'g' }, // 1 шт
      { productId: 'oat_flour', amount: 25, unit: 'g' }, // 3 ст.л.
      { productId: 'egg', amount: 50, unit: 'g' } // 1 шт
    ],
    steps: [
      'Яблоко натереть на терке.',
      'Добавить яйцо и овсяную муку, перемешать.',
      'Выложить полосками на пергамент.',
      'Выпекать при 180 °C около 20 минут.'
    ],
    allergenIds: ['egg', 'gluten'],
    safeServing: 'Брусочки должны быть мягкими, размером с палец взрослого.',
    isPremium: false,
  },
  {
    id: '9',
    title: 'Тыквенные палочки',
    minAgeMonths: 8,
    caloriesPer100g: 90,
    mealType: 'snack',
    ingredients: [
      { productId: 'pumpkin', amount: 150, unit: 'g' },
      { productId: 'egg', amount: 50, unit: 'g' },
      { productId: 'flour', amount: 25, unit: 'g' } // 2-3 ст.л.
    ],
    steps: [
      'Тыкву натереть или измельчить в блендере.',
      'Смешать с яйцом и мукой.',
      'Выложить палочками на пергамент.',
      'Выпекать при 180 °C около 20 минут.'
    ],
    allergenIds: ['egg', 'gluten'],
    safeServing: 'Проверить мягкость палочек. Подавать теплыми, но не горячими.',
    isPremium: false,
  },
  {
    id: '10',
    title: 'Яблочно-морковные палочки',
    minAgeMonths: 8,
    caloriesPer100g: 110,
    mealType: 'snack',
    ingredients: [
      { productId: 'apple', amount: 100, unit: 'g' },
      { productId: 'carrot', amount: 60, unit: 'g' },
      { productId: 'egg', amount: 50, unit: 'g' },
      { productId: 'flour', amount: 10, unit: 'g' }, // 1 ст.л.
      { productId: 'cinnamon', amount: 1, unit: 'g' } // щепотка
    ],
    steps: [
      'Натереть яблоко и морковь.',
      'Добавить яйцо и муку, перемешать до однородности.',
      'Сформировать палочки и выложить на пергамент.',
      'Запечь при 180 °C около 20 минут.'
    ],
    allergenIds: ['egg', 'gluten'],
    safeServing: 'Палочки должны легко разминаться пальцами. Следить за размером.',
    isPremium: false,
  },
  {
    id: '11',
    title: 'Овощные палочки',
    minAgeMonths: 8,
    caloriesPer100g: 80,
    mealType: 'snack',
    ingredients: [
      { productId: 'carrot', amount: 70, unit: 'g' },
      { productId: 'zucchini', amount: 100, unit: 'g' },
      { productId: 'oat_flour', amount: 20, unit: 'g' }, // 2 ст.л.
      { productId: 'salt', amount: 1, unit: 'g' } // щепотка
    ],
    steps: [
      'Натереть овощи и отжать лишний сок.',
      'Смешать с мукой и солью.',
      'Сформировать палочки.',
      'Выпекать при 180 °C около 20 минут.'
    ],
    allergenIds: ['gluten'],
    safeServing: 'Давать мягкие палочки, следить, чтобы ребенок не откусывал большие куски.',
    isPremium: false,
  },
  {
    id: '12',
    title: 'Домашние батончики с курагой',
    minAgeMonths: 10,
    caloriesPer100g: 150,
    mealType: 'snack',
    ingredients: [
      { productId: 'carrot_boiled', amount: 70, unit: 'g' },
      { productId: 'apple_green', amount: 100, unit: 'g' },
      { productId: 'dried_apricots', amount: 30, unit: 'g' }, // 5-6 шт
      { productId: 'oats', amount: 50, unit: 'g' }, // 4-5 ст.л.
      { productId: 'water', amount: 30, unit: 'ml' } // 2-3 ст.л.
    ],
    steps: [
      'Курагу залить кипятком на 10 минут.',
      'В блендер сложить морковь, яблоко, курагу и овсянку.',
      'Выложить массу на пергамент плотным прямоугольником (~1 см).',
      'Выпекать при 180 °C ровно 20 минут.'
    ],
    allergenIds: ['gluten'],
    safeServing: 'Нарезать на маленькие мягкие кусочки. Курага может быть жесткой, следить, чтобы не подавился.',
    isPremium: false,
  },
  {
    id: '13',
    title: 'Тыквенно-рисовые биточки',
    minAgeMonths: 8,
    caloriesPer100g: 100,
    mealType: 'snack',
    ingredients: [
      { productId: 'pumpkin_puree', amount: 100, unit: 'g' },
      { productId: 'rice_cooked', amount: 50, unit: 'g' },
      { productId: 'oat_flour', amount: 10, unit: 'g' }, // 1 ст.л.
      { productId: 'vegetable_oil', amount: 5, unit: 'g' } // для смазывания рук
    ],
    steps: [
      'Смешать тыквенное пюре и рис.',
      'Добавить муку, перемешать.',
      'Сформировать биточки, смочив руки маслом.',
      'Выложить на противень с пергаментом.',
      'Запекать при 180 °C 10–15 минут.'
    ],
    allergenIds: ['gluten'],
    safeServing: 'Подавать теплыми, мягкими. Размять вилкой перед подачей.',
    isPremium: false,
  },
  {
    id: '14',
    title: 'Яблочно-абрикосовые батончики',
    minAgeMonths: 10,
    caloriesPer100g: 130,
    mealType: 'snack',
    ingredients: [
      { productId: 'apple', amount: 200, unit: 'g' }, // 2 шт
      { productId: 'carrot_boiled', amount: 70, unit: 'g' },
      { productId: 'apricot', amount: 100, unit: 'g' }, // 3-4 шт
      { productId: 'oats', amount: 50, unit: 'g' } // 5 ст.л.
    ],
    steps: [
      'Морковь отварить до мягкости.',
      'Яблоки очистить, у абрикосов удалить косточки.',
      'Измельчить всё блендером до пюре.',
      'Вмешать овсянку.',
      'Выложить на пергамент слоем ~1 см, разровнять.',
      'Выпекать при 180 °C ~20 минут.',
      'Остудить, нарезать батончики.'
    ],
    allergenIds: ['gluten'],
    safeServing: 'Нарезать на небольшие кусочки, чтобы ребенок мог легко взять их рукой.',
    isPremium: false,
  },
  {
    id: '15',
    title: 'Ленивые курино-овощные биточки',
    minAgeMonths: 10,
    caloriesPer100g: 160,
    mealType: 'lunch',
    ingredients: [
      { productId: 'chicken_mince', amount: 450, unit: 'g' },
      { productId: 'potato', amount: 140, unit: 'g' },
      { productId: 'carrot', amount: 65, unit: 'g' },
      { productId: 'onion', amount: 70, unit: 'g' },
      { productId: 'breadcrumbs', amount: 25, unit: 'g' }
    ],
    steps: [
      'Все ингредиенты соединить в миске.',
      'Сформировать биточки.',
      'Готовить на пару 25 минут.'
    ],
    allergenIds: ['gluten'], // Панировочные сухари
    safeServing: 'Размять биточки вилкой перед подачей, чтобы ребенок не подавился крупным куском.',
    isPremium: false,
  },
  {
    id: '16',
    title: 'Паста орзо с томатами и брокколи',
    minAgeMonths: 12, // Паста и томаты требуют хороших жевательных навыков
    caloriesPer100g: 130,
    mealType: 'lunch',
    ingredients: [
      { productId: 'mince', amount: 30, unit: 'g' }, // 2 ст.л.
      { productId: 'orzo_pasta', amount: 30, unit: 'g' }, // 2 ст.л.
      { productId: 'tomato', amount: 100, unit: 'g' },
      { productId: 'broccoli', amount: 50, unit: 'g' }
    ],
    steps: [
      'Фарш обжарить на капле масла 1–2 мин, влить 2 ст. л. воды и тушить ещё ~5 мин.',
      'Брокколи и помидор залить кипятком на 10 мин. Помидор очистить, нарезать мелким кубиком; брокколи мелко порубить.',
      'Добавить овощи к фаршу и тушить ~10 мин.',
      'Когда томаты станут мягкими, всыпать орзо и 4–5 ст. л. воды. Перемешать и готовить до готовности пасты.'
    ],
    allergenIds: ['gluten'],
    safeServing: 'Проверить, что паста и овощи стали очень мягкими. Подавать теплым.',
    isPremium: false,
  },
  {
    id: '17',
    title: 'Овощное рагу с говядиной',
    minAgeMonths: 10,
    caloriesPer100g: 110,
    mealType: 'lunch',
    ingredients: [
      { productId: 'beef_mince', amount: 100, unit: 'g' },
      { productId: 'onion', amount: 40, unit: 'g' }, // 1/2 шт
      { productId: 'ghee', amount: 5, unit: 'g' },
      { productId: 'water', amount: 500, unit: 'ml' }, // 2 стакана
      { productId: 'potato', amount: 150, unit: 'g' },
      { productId: 'carrot', amount: 60, unit: 'g' },
      { productId: 'zucchini', amount: 100, unit: 'g' },
      { productId: 'bell_pepper', amount: 50, unit: 'g' },
      { productId: 'tomato', amount: 50, unit: 'g' }
    ],
    steps: [
      'Обжарить лук и фарш 3 мин на масле ГХИ.',
      'Добавить 2 стакана воды, морковь и картофель; варить 15 мин.',
      'Добавить перец, помидор и кабачок (снять кожицу); тушить ещё 15 мин.',
      'В конце добавить специи (петрушка, паприка). Остудить до тёплого.'
    ],
    allergenIds: [], // Основные аллергены отсутствуют
    safeServing: 'Размять овощи и мясо вилкой до состояния мягких кусочков.',
    isPremium: false,
  },
  {
    id: '18',
    title: 'Булгур с овощами',
    minAgeMonths: 12,
    caloriesPer100g: 140,
    mealType: 'lunch',
    ingredients: [
      { productId: 'bulgur', amount: 100, unit: 'g' }, // 1/2 бокала
      { productId: 'corn', amount: 100, unit: 'g' },
      { productId: 'carrot', amount: 60, unit: 'g' },
      { productId: 'bell_pepper', amount: 100, unit: 'g' },
      { productId: 'green_peas', amount: 100, unit: 'g' },
      { productId: 'ghee', amount: 5, unit: 'g' }
    ],
    steps: [
      'Нарезать морковь и перец кубиками, обжарить на масле ГХИ.',
      'Добавить булгур, залить водой, убавить огонь, накрыть крышкой.',
      'Через ~10 мин добавить горошек и кукурузу, готовить ещё ~5–7 мин.',
      'Добавить специи и зелень, выключить.'
    ],
    allergenIds: ['gluten'], // Булгур содержит глютен
    safeServing: 'Проверить, что булгур хорошо разварился. Давать небольшими порциями.',
    isPremium: false,
  },
  {
    id: '19',
    title: 'Рыба в томатном соусе',
    minAgeMonths: 10,
    caloriesPer100g: 90,
    mealType: 'lunch',
    ingredients: [
      { productId: 'white_fish_fillet', amount: 150, unit: 'g' }, // Треска/минтай
      { productId: 'onion', amount: 70, unit: 'g' },
      { productId: 'water', amount: 100, unit: 'ml' }, // 1/2 бокала
      { productId: 'carrot', amount: 50, unit: 'g' },
      { productId: 'tomato_paste', amount: 20, unit: 'g' }, // 2 ч.л.
      { productId: 'ghee', amount: 5, unit: 'g' }
    ],
    steps: [
      'Филе проверить на кости, нарезать кусочками.',
      'Лук нарезать мелкими кубиками, морковь натереть, обжарить на масле ГХИ.',
      'Добавить томатную пасту, влить воду, выложить рыбу.',
      'Добавить специи и зелень, тушить под крышкой на маленьком огне ~25 мин.'
    ],
    allergenIds: ['fish'], // Рыба — сильный аллерген
    safeServing: 'ВНИМАНИЕ: Тщательно проверить рыбу на наличие костей перед подачей! Размять вилкой.',
    isPremium: false,
  },
  {
    id: '20',
    title: 'Быстрый обед с макаронами и фрикадельками',
    minAgeMonths: 12,
    caloriesPer100g: 150,
    mealType: 'lunch',
    ingredients: [
      { productId: 'carrot', amount: 40, unit: 'g' },
      { productId: 'onion', amount: 30, unit: 'g' },
      { productId: 'mince', amount: 200, unit: 'g' },
      { productId: 'pasta', amount: 200, unit: 'g' }
    ],
    steps: [
      'Морковь натереть, лук нарезать кубиками, положить в кастрюлю, залить 150 мл воды, довести до кипения.',
      'Выложить фрикадельки, налить ещё 150 мл воды, накрыть крышкой и тушить 15 мин.',
      'Параллельно отварить макароны.',
      'Добавить макароны к фрикаделькам, сверху зелень и специи.'
    ],
    allergenIds: ['gluten'],
    safeServing: 'Макароны должны быть мягкими (не аль денте). Разрезать фрикадельки на 4 части.',
    isPremium: false,
  },
  {
    id: '21',
    title: 'Паста с брокколи и индейкой',
    minAgeMonths: 12,
    caloriesPer100g: 120,
    mealType: 'lunch',
    ingredients: [
      { productId: 'turkey_meat', amount: 50, unit: 'g' },
      { productId: 'broccoli', amount: 50, unit: 'g' },
      { productId: 'orzo_pasta', amount: 30, unit: 'g' },
      { productId: 'carrot', amount: 30, unit: 'g' },
      { productId: 'cheese', amount: 20, unit: 'g' },
      { productId: 'ghee', amount: 10, unit: 'g' }, // Исправлено с 12 ч.л. на 10 г
      { productId: 'water', amount: 500, unit: 'ml' }
    ],
    steps: [
      'Варить все ингредиенты до готовности в течение 20 минут.',
      'Засыпать сыр и перемешать.'
    ],
    allergenIds: ['gluten', 'cow_milk'], // Паста и сыр
    safeServing: 'Проверить температуру, так как сыр может сделать блюдо горячим. Подавать мягкими кусочками.',
    isPremium: false,
  },
];
