import type { PlateCategory, PlateTemplate } from '@/features/plates/types';

export type { PlateCategory, PlateSlot, PlateTemplate } from '@/features/plates/types';

/** Local fallback when `plate_templates` is empty. */
export const PLATE_TEMPLATES: PlateTemplate[] = [
  {
    id: 'lunch-1',
    name: 'Обед: Овощи + Индейка + Гречка',
    slots: [
      { id: 's1', category: 'vegetables', productName: 'Брокколи', amount: '100 г' },
      { id: 's2', category: 'protein', productName: 'Индейка', amount: '50 г' },
      { id: 's3', category: 'carbs', productName: 'Гречка', amount: '80 г' },
    ],
  },
];

export const SUBSTITUTES: Record<PlateCategory, string[]> = {
  vegetables: ['Кабачок', 'Цветная капуста', 'Морковь'],
  protein: ['Кролик', 'Курица', 'Творог'],
  carbs: ['Рис', 'Кукурузная каша', 'Картофель'],
};
