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
      <Pressable className="rounded-2xl bg-surface-elevated p-4 shadow-sm active:opacity-80">
        <Text className="type-headline text-label">{template.name}</Text>
        <View className="mt-3 gap-1.5">
          {template.slots.map((slot) => (
            <Text key={slot.id} className="type-caption text-label-secondary">
              {CATEGORY_LABELS[slot.category]}: {slot.productName} ({slot.amount})
            </Text>
          ))}
        </View>
      </Pressable>
    </Link>
  );
}
