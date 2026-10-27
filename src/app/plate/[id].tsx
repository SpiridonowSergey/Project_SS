import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlateSlotCard } from '@/features/plates/components/PlateSlotCard';
import { SubstitutePickerModal } from '@/features/plates/components/SubstitutePickerModal';
import { usePlateDetail } from '@/features/plates/hooks/usePlateDetail';

export default function PlateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    template,
    slots,
    activeSlot,
    substitutes,
    openReplace,
    closeReplace,
    selectSubstitute,
  } = usePlateDetail(id);

  if (!template) {
    return (
      <View className="flex-1 bg-gray-50">
        <SafeAreaView style={{ flex: 1 }}>
          <View className="px-4 pt-4">
            <Pressable onPress={() => router.back()} className="mb-4 self-start active:opacity-70">
              <Text className="text-base font-medium text-rose-500">Назад</Text>
            </Pressable>
            <Text className="text-xl font-semibold text-stone-800">Шаблон не найден</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerClassName="gap-4 px-4 pb-8 pt-4">
          <Pressable onPress={() => router.back()} className="self-start active:opacity-70">
            <Text className="text-base font-medium text-rose-500">Назад</Text>
          </Pressable>

          <View className="gap-2">
            <Text className="text-3xl font-bold text-stone-900">{template.name}</Text>
            <Text className="text-sm text-stone-500">
              Меняйте продукты только внутри категории — так тарелка останется сбалансированной.
            </Text>
          </View>

          {slots.map((slot) => (
            <PlateSlotCard key={slot.id} slot={slot} onReplace={() => openReplace(slot)} />
          ))}
        </ScrollView>
      </SafeAreaView>

      {activeSlot ? (
        <SubstitutePickerModal
          category={activeSlot.category}
          currentProductName={activeSlot.productName}
          substitutes={substitutes}
          onSelect={selectSubstitute}
          onClose={closeReplace}
        />
      ) : null}
    </View>
  );
}
