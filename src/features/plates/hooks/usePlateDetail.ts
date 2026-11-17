import { useState } from 'react';
import { Alert } from 'react-native';

import { resolvePlateSlots } from '@/features/plates/api/mapPlate';
import { usePlateTemplates } from '@/features/plates/hooks/usePlateTemplates';
import { useSaveUserPlate } from '@/features/plates/hooks/useSaveUserPlate';
import { useUserPlate } from '@/features/plates/hooks/useUserPlate';
import { SUBSTITUTES } from '@/features/plates/mockData';
import type { PlateCustomSlots, PlateSlot } from '@/features/plates/types';

type ActiveReplaceSlot = Pick<PlateSlot, 'id' | 'category' | 'productName'>;

export function usePlateDetail(templateId: string | undefined) {
  const { templates, isLoading: isTemplatesLoading, isError: isTemplatesError } =
    usePlateTemplates();
  const {
    customSlots: savedSlots,
    isLoading: isUserPlateLoading,
    isError: isUserPlateError,
    refetch: refetchUserPlate,
  } = useUserPlate(templateId);
  const saveUserPlate = useSaveUserPlate();

  const [draftSlots, setDraftSlots] = useState<PlateCustomSlots | null>(null);
  const [activeSlot, setActiveSlot] = useState<ActiveReplaceSlot | null>(null);

  const template = templates.find((item) => item.id === templateId);
  const customSlots = draftSlots ?? savedSlots;
  const slots = template ? resolvePlateSlots(template, customSlots) : [];

  const substitutes =
    activeSlot == null
      ? []
      : (template?.substitutes?.[activeSlot.category] ?? SUBSTITUTES[activeSlot.category] ?? []);

  function openReplace(slot: PlateSlot) {
    setActiveSlot({
      id: slot.id,
      category: slot.category,
      productName: slot.productName,
    });
  }

  function closeReplace() {
    setActiveSlot(null);
  }

  function selectSubstitute(productName: string) {
    if (!templateId || !activeSlot) {
      return;
    }

    const nextSlots: PlateCustomSlots = {
      ...customSlots,
      [activeSlot.id]: productName,
    };

    setDraftSlots(nextSlots);
    setActiveSlot(null);

    saveUserPlate.mutate(
      { templateId, customSlots: nextSlots },
      {
        onSuccess: () => {
          setDraftSlots(null);
          Alert.alert('Сохранено');
        },
        onError: (error) => {
          setDraftSlots(null);
          Alert.alert(
            'Ошибка',
            error instanceof Error ? error.message : 'Не удалось сохранить тарелку',
          );
        },
      },
    );
  }

  return {
    template,
    slots,
    activeSlot,
    substitutes,
    isLoading: isTemplatesLoading || isUserPlateLoading,
    isError: isTemplatesError,
    isUserPlateError,
    isSaving: saveUserPlate.isPending,
    refetchUserPlate,
    openReplace,
    closeReplace,
    selectSubstitute,
  };
}
