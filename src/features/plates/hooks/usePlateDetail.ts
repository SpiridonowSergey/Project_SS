import { useState } from 'react';

import { PLATE_TEMPLATES, SUBSTITUTES, type PlateSlot } from '@/features/plates/mockData';
import { usePlatesStore } from '@/features/plates/store';

type ActiveReplaceSlot = Pick<PlateSlot, 'id' | 'category' | 'productName'>;

export function usePlateDetail(plateId: string | undefined) {
  const template = PLATE_TEMPLATES.find((item) => item.id === plateId);
  const overrides = usePlatesStore((state) =>
    plateId ? state.overridesByPlateId[plateId] : undefined,
  );
  const replaceSlotProduct = usePlatesStore((state) => state.replaceSlotProduct);
  const [activeSlot, setActiveSlot] = useState<ActiveReplaceSlot | null>(null);

  const slots: PlateSlot[] =
    template?.slots.map((slot) => ({
      ...slot,
      productName: overrides?.[slot.id] ?? slot.productName,
    })) ?? [];

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
    if (!plateId || !activeSlot) {
      return;
    }

    replaceSlotProduct(plateId, activeSlot.id, productName);
    setActiveSlot(null);
  }

  return {
    template,
    slots,
    activeSlot,
    substitutes: activeSlot ? SUBSTITUTES[activeSlot.category] : [],
    openReplace,
    closeReplace,
    selectSubstitute,
  };
}
