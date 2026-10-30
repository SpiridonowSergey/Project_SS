import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FilterChip } from '@/features/recipes/components/FilterChip';
import {
  ALLERGEN_FILTERS,
  INGREDIENT_FILTERS,
} from '@/features/recipes/constants/filters';
import { colors } from '@/theme';

const FOOTER_CONTENT_HEIGHT = 68;

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
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const bottomInset = Math.max(insets.bottom, 12);
  const maxDynamicContentSize = Math.round(windowHeight * 0.9);

  const handleDone = useCallback(() => {
    sheetRef.current?.close();
    onClose();
  }, [onClose]);

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

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={bottomInset}>
        <View className="border-t border-border/40 bg-surface-elevated px-4 pb-3 pt-3">
          <Pressable
            onPress={handleDone}
            accessibilityRole="button"
            accessibilityLabel="Готово"
            className="min-h-11 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80">
            <Text className="type-headline text-onTint">Готово</Text>
          </Pressable>
        </View>
      </BottomSheetFooter>
    ),
    [bottomInset, handleDone],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      enableDynamicSizing
      maxDynamicContentSize={maxDynamicContentSize}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
      footerComponent={renderFooter}
      handleIndicatorStyle={{ backgroundColor: colors.border }}
      backgroundStyle={{ backgroundColor: colors.surfaceElevated }}>
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 4,
          paddingBottom: FOOTER_CONTENT_HEIGHT + 8,
        }}>
        <Text className="type-title text-label">Настроить фильтры</Text>
        <Text className="mt-1 type-caption text-label-secondary">
          Исключите аллергены и выберите ингредиенты. Условия применяются вместе.
        </Text>

        <View className="mt-5 gap-5">
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
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
