import type { Ingredient } from '@/types/domain';

const PRODUCT_NAMES: Record<string, string> = {
  apple: 'Яблоко',
  apple_green: 'Зелёное яблоко',
  applesauce: 'Яблочное пюре',
  apricot: 'Абрикос',
  baby_cottage_cheese: 'Детский творог',
  baking_powder: 'Разрыхлитель',
  banana: 'Банан',
  beef_mince: 'Говяжий фарш',
  bell_pepper: 'Болгарский перец',
  breadcrumbs: 'Панировочные сухари',
  broccoli: 'Брокколи',
  buckwheat: 'Гречка',
  bulgur: 'Булгур',
  carrot: 'Морковь',
  carrot_boiled: 'Варёная морковь',
  cheese: 'Сыр',
  chicken_mince: 'Куриный фарш',
  cinnamon: 'Корица',
  corn: 'Кукуруза',
  dried_apricots: 'Курага',
  egg: 'Яйцо',
  flour: 'Мука',
  ghee: 'Топлёное масло',
  'goat-milk': 'Козье молоко',
  green_peas: 'Зелёный горошек',
  milk: 'Молоко',
  mince: 'Фарш',
  oat_flour: 'Овсяная мука',
  'oat-drink': 'Овсяный напиток',
  oats: 'Овсянка',
  onion: 'Лук',
  orzo_pasta: 'Паста орзо',
  pasta: 'Макароны',
  potato: 'Картофель',
  pumpkin: 'Тыква',
  pumpkin_puree: 'Тыквенное пюре',
  rabbit: 'Кролик',
  rice: 'Рис',
  rice_cooked: 'Варёный рис',
  salmon: 'Лосось',
  salt: 'Соль',
  semolina: 'Манка',
  tomato: 'Помидор',
  tomato_paste: 'Томатная паста',
  turkey: 'Индейка',
  turkey_meat: 'Индейка',
  vegetable_oil: 'Растительное масло',
  vegetable_puree: 'Овощное пюре',
  water: 'Вода',
  white_fish_fillet: 'Филе белой рыбы',
  zucchini: 'Кабачок',
};

const UNIT_LABELS: Record<Ingredient['unit'], string> = {
  g: 'г',
  ml: 'мл',
  piece: 'шт.',
};

/** Returns a Russian display name for a productId; falls back to the raw id. */
export function getProductName(productId: string): string {
  return PRODUCT_NAMES[productId] ?? productId;
}

export function getUnitLabel(unit: Ingredient['unit'] | string): string {
  if (unit === 'g' || unit === 'ml' || unit === 'piece') {
    return UNIT_LABELS[unit];
  }
  return unit;
}
