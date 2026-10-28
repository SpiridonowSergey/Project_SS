import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { FilterChip } from '@/features/recipes/components/FilterChip';
import { MEAL_TYPE_FILTERS, type MealTypeFilter } from '@/features/recipes/constants/filters';
import { colors } from '@/theme';
import type { MealType } from '@/types/domain';

type RecipesFiltersProps = {
  mealType: MealTypeFilter;
  favoritesOnly: boolean;
  advancedFilterCount: number;
  onSelectMealType: (mealType: MealType) => void;
  onToggleFavoritesOnly: () => void;
  onOpenAdvancedFilters: () => void;
};

export function RecipesFilters({
  mealType,
  favoritesOnly,
  advancedFilterCount,
  onSelectMealType,
  onToggleFavoritesOnly,
  onOpenAdvancedFilters,
}: RecipesFiltersProps) {
  return (
    <View className="gap-3">
      <FilterChip
        label="Избранное"
        selected={favoritesOnly}
        onPress={onToggleFavoritesOnly}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow-0">
        <View className="flex-row items-center gap-2 pr-2">
          {MEAL_TYPE_FILTERS.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              variant="meal"
              selected={mealType === filter.id}
              onPress={() => onSelectMealType(filter.id)}
            />
          ))}
        </View>
      </ScrollView>

      <Pressable
        onPress={onOpenAdvancedFilters}
        accessibilityRole="button"
        accessibilityLabel={
          advancedFilterCount > 0
            ? `Настроить фильтры, активно ${advancedFilterCount}`
            : 'Настроить фильтры'
        }
        className="min-h-11 flex-row items-center justify-center gap-2 self-start rounded-full border border-border bg-surface-elevated px-3.5 active:opacity-80">
        <Ionicons name="options-outline" size={18} color={colors.labelSecondary} />
        <Text className="type-caption font-medium text-label-secondary">Настроить фильтры</Text>
        {advancedFilterCount > 0 ? (
          <View className="min-h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5">
            <Text className="type-caption font-semibold text-onTint">{advancedFilterCount}</Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}
