import { Pressable, Text, View } from 'react-native';

import { CATEGORY_LABELS } from '@/features/plates/categoryLabels';
import type { PlateSlot } from '@/features/plates/mockData';

type PlateSlotCardProps = {
  slot: PlateSlot;
  onReplace: () => void;
};

export function PlateSlotCard({ slot, onReplace }: PlateSlotCardProps) {
  return (
    <View className="rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-sm font-medium text-rose-500">
            {CATEGORY_LABELS[slot.category]}
          </Text>
          <Text className="mt-1 text-lg font-semibold text-stone-900">{slot.productName}</Text>
          <Text className="mt-1 text-sm text-stone-500">{slot.amount}</Text>
        </View>

        <Pressable
          onPress={onReplace}
          className="rounded-full bg-rose-50 px-3 py-2 active:opacity-80">
          <Text className="text-sm font-semibold text-rose-600">Заменить</Text>
        </Pressable>
      </View>
    </View>
  );
}
