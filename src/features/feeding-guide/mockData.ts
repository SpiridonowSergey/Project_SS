// src/features/feeding-guide/mockData.ts
import { FeedingStage, MedicalSource } from '../../types/domain';

export const SOURCES: Record<string, MedicalSource> = {
  'nat_program_2009': {
    id: 'nat_program_2009',
    title: 'Национальная программа оптимизации вскармливания детей первого года жизни',
    organization: 'Союз педиатров России',
    url: 'https://pediatr-russia.ru/',
  },
  'who_2023': {
    id: 'who_2023',
    title: 'Рекомендации ВОЗ по прикорму',
    organization: 'Всемирная организация здравоохранения',
    url: 'https://www.who.int/',
  }
};

export const MOCK_FEEDING_STAGES: FeedingStage[] = [
  {
    ageMonths: 4,
    productGroup: 'Овощное пюре',
    startVolume: '10-150 г',
    targetVolume: '150 г',
    sourceId: 'nat_program_2009',
    notes: 'Начинать с монокомпонентных пюре (кабачок, брокколи).',
  },
  {
    ageMonths: 5,
    productGroup: 'Каши (безглютеновые)',
    startVolume: '10-150 г',
    targetVolume: '150 г',
    sourceId: 'nat_program_2009',
    notes: 'Гречневая, рисовая, кукурузная. Начинать с 5%.',
  },
  {
    ageMonths: 6,
    productGroup: 'Мясное пюре',
    startVolume: '5-30 г',
    targetVolume: '60-70 г',
    sourceId: 'who_2023',
    notes: 'Индейка, кролик, телятина. Добавлять в овощное пюре.',
  },
  {
    ageMonths: 7,
    productGroup: 'Фруктовые пюре',
    startVolume: '20-50 г',
    targetVolume: '70 г',
    sourceId: 'nat_program_2009',
    notes: 'Яблоко, груша, банан (монокомпонентные).',
  }
];