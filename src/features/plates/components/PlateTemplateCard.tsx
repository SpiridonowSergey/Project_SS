import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { CATEGORY_LABELS } from '@/features/plates/categoryLabels';
import type { PlateTemplate } from '@/features/plates/mockData';

type PlateTemplateCardProps = {
  template: PlateTemplate;
};

export function PlateTemplateCard({ template }: PlateTemplateCardProps) {
  return (
    <Link href={{ pathname: '/plate/[id]', params: { id: template.id } }} asChild>
      <Pressable className="rounded-2xl bg-white p-4 shadow-sm active:opacity-80">
        <Text className="text-lg font-semibold text-stone-900">{template.name}</Text>
        <View className="mt-3 gap-1">
          {template.slots.map((slot) => (
            <Text key={slot.id} className="text-sm text-stone-500">
              {CATEGORY_LABELS[slot.category]}: {slot.productName} ({slot.amount})
            </Text>
          ))}
        </View>
      </Pressable>
    </Link>
  );
}
