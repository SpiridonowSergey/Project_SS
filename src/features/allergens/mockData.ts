import type { Allergen } from '@/types/domain';

export const MOCK_ALLERGENS: Record<string, Allergen> = {
  milk: {
    id: 'milk',
    label: 'Коровье молоко',
    substitutes: [
      { productId: 'goat-milk', note: 'Козье молоко — только после консультации с педиатром' },
      { productId: 'oat-drink', note: 'Овсяный напиток без сахара и добавок' },
    ],
  },
  gluten: {
    id: 'gluten',
    label: 'Глютен',
    substitutes: [
      { productId: 'buckwheat', note: 'Гречневая крупа или мука' },
      { productId: 'rice', note: 'Рисовая крупа или мука' },
      { productId: 'corn', note: 'Кукурузная крупа или мука' },
    ],
  },
  egg: {
    id: 'egg',
    label: 'Яйцо',
    substitutes: [
      { productId: 'banana', note: 'Размятый банан как связующий компонент в выпечке' },
      { productId: 'applesauce', note: 'Яблочное пюре без сахара' },
    ],
  },
  fish: {
    id: 'fish',
    label: 'Рыба',
    substitutes: [
      { productId: 'turkey', note: 'Индейка как источник белка' },
      { productId: 'rabbit', note: 'Кролик — мягкий вариант мясного пюре' },
    ],
  },
};

export function getAllergenById(id: string) {
  return MOCK_ALLERGENS[id];
}

export function getAllergensByIds(ids: string[]) {
  return ids
    .map((id) => getAllergenById(id))
    .filter((allergen): allergen is Allergen => Boolean(allergen));
}
