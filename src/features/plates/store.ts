import { create } from 'zustand';

import type { PlateCustomSlots, PlateSlot, PlateTemplate } from '@/features/plates/types';

type PlatesState = {
  overridesByPlateId: Record<string, PlateCustomSlots>;
  replaceSlotProduct: (plateId: string, slotId: string, productName: string) => void;
  resetPlate: (plateId: string) => void;
  clearAllOverrides: () => void;
  getResolvedSlots: (template: PlateTemplate) => PlateSlot[];
};

/** @deprecated Prefer Supabase user_plates via useUserPlate / useSaveUserPlate. */
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
  clearAllOverrides: () => set({ overridesByPlateId: {} }),
  getResolvedSlots: (template) => {
    const overrides = get().overridesByPlateId[template.id] ?? {};

    return template.slots.map((slot) => ({
      ...slot,
      productName: overrides[slot.id] ?? slot.productName,
    }));
  },
}));
