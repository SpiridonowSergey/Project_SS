import type {
  PlateCategory,
  PlateCustomSlots,
  PlateSlot,
  PlateTemplate,
  UserPlate,
} from '@/features/plates/types';

const PLATE_CATEGORIES: PlateCategory[] = ['vegetables', 'protein', 'carbs'];

function isPlateCategory(value: unknown): value is PlateCategory {
  return typeof value === 'string' && PLATE_CATEGORIES.includes(value as PlateCategory);
}

function mapSlot(value: unknown): PlateSlot | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const row = value as Record<string, unknown>;
  const id = typeof row.id === 'string' ? row.id : null;
  const category = isPlateCategory(row.category) ? row.category : null;
  const productName =
    typeof row.productName === 'string'
      ? row.productName
      : typeof row.product_name === 'string'
        ? row.product_name
        : null;
  const amount = typeof row.amount === 'string' ? row.amount : null;

  if (!id || !category || !productName || !amount) {
    return null;
  }

  return { id, category, productName, amount };
}

function mapSlots(value: unknown): PlateSlot[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(mapSlot).filter((slot): slot is PlateSlot => slot !== null);
}

function mapSubstitutes(value: unknown): PlateTemplate['substitutes'] | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  const row = value as Record<string, unknown>;
  const result: Partial<Record<PlateCategory, string[]>> = {};

  for (const category of PLATE_CATEGORIES) {
    const list = row[category];
    if (!Array.isArray(list)) {
      continue;
    }
    const names = list.filter((item): item is string => typeof item === 'string');
    if (names.length > 0) {
      result[category] = names;
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

export function mapPlateTemplate(row: Record<string, unknown>): PlateTemplate | null {
  const id = typeof row.id === 'string' ? row.id : null;
  const name = typeof row.name === 'string' ? row.name : null;
  const slots = mapSlots(row.slots);

  if (!id || !name || slots.length === 0) {
    return null;
  }

  return {
    id,
    name,
    slots,
    substitutes: mapSubstitutes(row.substitutes),
  };
}

function mapCustomSlots(value: unknown): PlateCustomSlots {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const result: PlateCustomSlots = {};
  for (const [slotId, productName] of Object.entries(value as Record<string, unknown>)) {
    if (typeof productName === 'string' && productName.trim()) {
      result[slotId] = productName;
    }
  }
  return result;
}

export function mapUserPlate(row: Record<string, unknown>): UserPlate | null {
  const id = typeof row.id === 'string' ? row.id : null;
  const userId =
    typeof row.user_id === 'string'
      ? row.user_id
      : typeof row.userId === 'string'
        ? row.userId
        : null;
  const templateId =
    typeof row.template_id === 'string'
      ? row.template_id
      : typeof row.templateId === 'string'
        ? row.templateId
        : null;

  if (!id || !userId || !templateId) {
    return null;
  }

  return {
    id,
    userId,
    templateId,
    customSlots: mapCustomSlots(row.custom_slots ?? row.customSlots),
  };
}

export function resolvePlateSlots(
  template: PlateTemplate,
  customSlots: PlateCustomSlots | undefined,
): PlateSlot[] {
  return template.slots.map((slot) => ({
    ...slot,
    productName: customSlots?.[slot.id] ?? slot.productName,
  }));
}
