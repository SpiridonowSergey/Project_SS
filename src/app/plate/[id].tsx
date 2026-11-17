import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlateSlotCard } from '@/features/plates/components/PlateSlotCard';
import { SubstitutePickerModal } from '@/features/plates/components/SubstitutePickerModal';
import { usePlateDetail } from '@/features/plates/hooks/usePlateDetail';
import { colors } from '@/theme';

export default function PlateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    template,
    slots,
    activeSlot,
    substitutes,
    isLoading,
    isUserPlateError,
    isSaving,
    refetchUserPlate,
    openReplace,
    closeReplace,
    selectSubstitute,
  } = usePlateDetail(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-surface">
        <ActivityIndicator size="large" color={colors.brand} />
        <Text className="type-body text-label-secondary">Загрузка...</Text>
      </View>
    );
  }

  if (isUserPlateError) {
    return (
      <View className="flex-1 bg-surface">
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-1 items-center justify-center gap-4 px-4">
            <Pressable
              onPress={() => router.back()}
              className="absolute left-4 top-4 self-start active:opacity-70">
              <Text className="type-body font-medium text-brand">Назад</Text>
            </Pressable>
            <Text className="text-center type-body text-danger">
              Не удалось загрузить вашу тарелку
            </Text>
            <Pressable
              onPress={() => {
                void refetchUserPlate();
              }}
              accessibilityRole="button"
              accessibilityLabel="Повторить загрузку тарелки"
              className="min-h-11 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80">
              <Text className="type-headline text-onTint">Повторить</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!template) {
    return (
      <View className="flex-1 bg-surface">
        <SafeAreaView style={{ flex: 1 }}>
          <View className="px-4 pt-4">
            <Pressable onPress={() => router.back()} className="mb-4 self-start active:opacity-70">
              <Text className="type-body font-medium text-brand">Назад</Text>
            </Pressable>
            <Text className="type-title text-label">Шаблон не найден</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerClassName="gap-4 px-4 pb-8 pt-4">
          <Pressable onPress={() => router.back()} className="self-start active:opacity-70">
            <Text className="type-body font-medium text-brand">Назад</Text>
          </Pressable>

          <View className="gap-2">
            <Text className="type-title text-label">{template.name}</Text>
            <Text className="type-caption text-label-secondary">
              Меняйте продукты только внутри категории — так тарелка останется сбалансированной.
            </Text>
            {isSaving ? (
              <Text className="type-caption text-label-muted">Сохраняем…</Text>
            ) : null}
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
