export type PlateCategory = 'vegetables' | 'protein' | 'carbs';

export type PlateSlot = {
  id: string;
  category: PlateCategory;
  productName: string;
  amount: string;
};

export type PlateTemplate = {
  id: string;
  name: string;
  slots: PlateSlot[];
  substitutes?: Partial<Record<PlateCategory, string[]>>;
};

/** Slot id → product name overrides for a user's customized plate. */
export type PlateCustomSlots = Record<string, string>;

export type UserPlate = {
  id: string;
  userId: string;
  templateId: string;
  customSlots: PlateCustomSlots;
};
