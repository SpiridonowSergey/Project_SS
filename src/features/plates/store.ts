import { create } from 'zustand';

import type { PlateSlot, PlateTemplate } from '@/features/plates/mockData';

type PlateOverrides = Record<string, string>;

type PlatesState = {
  overridesByPlateId: Record<string, PlateOverrides>;
  replaceSlotProduct: (plateId: string, slotId: string, productName: string) => void;
  resetPlate: (plateId: string) => void;
  getResolvedSlots: (template: PlateTemplate) => PlateSlot[];
};

export const usePlatesStore = create<PlatesState>((set, get) => ({
  overridesByPlateId: {},
  replaceSlotProduct: (plateId, slotId, productName) =>
    set((state) => ({
      overridesByPlateId: {
        ...state.overridesByPlateId,
        [plateId]: {
          ...state.overridesByPlateId[plateId],
          [slotId]: productName,
        },
      },
    })),
  resetPlate: (plateId) =>
    set((state) => {
      const next = { ...state.overridesByPlateId };
      delete next[plateId];
      return { overridesByPlateId: next };
    }),
  getResolvedSlots: (template) => {
    const overrides = get().overridesByPlateId[template.id] ?? {};

    return template.slots.map((slot) => ({
      ...slot,
      productName: overrides[slot.id] ?? slot.productName,
    }));
  },
}));
