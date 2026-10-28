import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import { FilterChip } from '@/features/recipes/components/FilterChip';
import {
  ALLERGEN_FILTERS,
  INGREDIENT_FILTERS,
} from '@/features/recipes/constants/filters';
import { colors } from '@/theme';

type RecipesAdvancedFiltersSheetProps = {
  excludedAllergenIds: string[];
  selectedIngredientIds: string[];
  onToggleAllergen: (id: string) => void;
  onToggleIngredient: (id: string) => void;
  onClose: () => void;
};

export function RecipesAdvancedFiltersSheet({
  excludedAllergenIds,
  selectedIngredientIds,
  onToggleAllergen,
  onToggleIngredient,
  onClose,
}: RecipesAdvancedFiltersSheetProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['55%', '78%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: colors.border }}
      backgroundStyle={{ backgroundColor: colors.surfaceElevated }}>
      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        <Text className="type-title text-label">Настроить фильтры</Text>
        <Text className="mt-1 type-caption text-label-secondary">
          Исключите аллергены и выберите ингредиенты. Условия применяются вместе.
        </Text>

        <View className="mt-6 gap-6">
          <View className="gap-2.5">
            <Text className="type-headline text-label">Аллергены</Text>
            <Text className="type-caption text-label-muted">Исключить из результатов</Text>
            <View className="flex-row flex-wrap gap-2">
              {ALLERGEN_FILTERS.map((allergen) => (
                <FilterChip
                  key={allergen.id}
                  label={allergen.label}
                  variant="allergen"
                  selected={excludedAllergenIds.includes(allergen.id)}
                  onPress={() => onToggleAllergen(allergen.id)}
                />
              ))}
            </View>
          </View>

          <View className="gap-2.5">
            <Text className="type-headline text-label">Ингредиенты</Text>
            <Text className="type-caption text-label-muted">Должны быть в рецепте</Text>
            <View className="flex-row flex-wrap gap-2">
              {INGREDIENT_FILTERS.map((ingredient) => (
                <FilterChip
                  key={ingredient.id}
                  label={ingredient.label}
                  variant="ingredient"
                  selected={selectedIngredientIds.includes(ingredient.id)}
                  onPress={() => onToggleIngredient(ingredient.id)}
                />
              ))}
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {
            sheetRef.current?.close();
            onClose();
          }}
          accessibilityRole="button"
          accessibilityLabel="Готово"
          className="mt-8 min-h-11 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80">
          <Text className="type-headline text-onTint">Готово</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
