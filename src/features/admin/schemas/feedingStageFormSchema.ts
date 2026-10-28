import { z } from 'zod';

export const feedingStageFormSchema = z.object({
  ageMonths: z.number().int().min(0, 'Возраст не может быть отрицательным'),
  productGroup: z.string().min(1, 'Укажите группу продуктов'),
  startVolume: z.string().min(1, 'Укажите стартовый объём'),
  targetVolume: z.string().min(1, 'Укажите целевой объём'),
  sourceId: z.string().min(1, 'Выберите источник'),
  notes: z.string().optional(),
});

export type FeedingStageFormValues = z.infer<typeof feedingStageFormSchema>;

export function createFeedingStageFormDefaults(
  sourceId = '',
): FeedingStageFormValues {
  return {
    ageMonths: 6,
    productGroup: '',
    startVolume: '',
    targetVolume: '',
    sourceId,
    notes: '',
  };
}
