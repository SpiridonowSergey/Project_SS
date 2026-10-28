import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import {
  ALLERGEN_FILTERS,
  INGREDIENT_FILTERS,
  MEAL_TYPE_FILTERS,
  type MealTypeFilter,
} from '@/features/recipes/constants/filters';
import { colors } from '@/theme';

type RecipesActiveFiltersProps = {
  mealType: MealTypeFilter;
  favoritesOnly: boolean;
  excludedAllergenIds: string[];
  selectedIngredientIds: string[];
  onClearMealType: () => void;
  onClearFavorites: () => void;
  onClearAllergen: (id: string) => void;
  onClearIngredient: (id: string) => void;
  onResetAll: () => void;
};

function ActiveFilterChip({
  label,
  onClear,
  accessibilityLabel,
}: {
  label: string;
  onClear: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      onPress={onClear}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className="min-h-9 flex-row items-center gap-1.5 rounded-full bg-surface px-2.5 active:opacity-70">
      <Text className="type-caption text-label-secondary">{label}</Text>
      <Ionicons name="close-circle" size={16} color={colors.labelMuted} />
    </Pressable>
  );
}

export function RecipesActiveFilters({
  mealType,
  favoritesOnly,
  excludedAllergenIds,
  selectedIngredientIds,
  onClearMealType,
  onClearFavorites,
  onClearAllergen,
  onClearIngredient,
  onResetAll,
}: RecipesActiveFiltersProps) {
  const mealLabel = MEAL_TYPE_FILTERS.find((filter) => filter.id === mealType)?.label;
  const allergenLabels = excludedAllergenIds
    .map((id) => ({
      id,
      label: ALLERGEN_FILTERS.find((filter) => filter.id === id)?.label ?? id,
    }))
    .filter((item) => item.label);
  const ingredientLabels = selectedIngredientIds
    .map((id) => ({
      id,
      label: INGREDIENT_FILTERS.find((filter) => filter.id === id)?.label ?? id,
    }))
    .filter((item) => item.label);

  const hasAny =
    favoritesOnly || mealType !== null || allergenLabels.length > 0 || ingredientLabels.length > 0;

  if (!hasAny) {
    return null;
  }

  const activeGroupCount =
    (favoritesOnly ? 1 : 0) +
    (mealType !== null ? 1 : 0) +
    allergenLabels.length +
    ingredientLabels.length;

  return (
    <View className="gap-3 rounded-2xl bg-surface-elevated p-3">
      {favoritesOnly ? (
        <View className="gap-1.5">
          <Text className="type-caption text-label-muted">Избранное</Text>
          <View className="flex-row flex-wrap gap-2">
            <ActiveFilterChip
              label="Только избранное"
              onClear={onClearFavorites}
              accessibilityLabel="Убрать фильтр избранного"
            />
          </View>
        </View>
      ) : null}

      {mealLabel ? (
        <View className="gap-1.5">
          <Text className="type-caption text-label-muted">Выбрано</Text>
          <View className="flex-row flex-wrap gap-2">
            <ActiveFilterChip
              label={mealLabel}
              onClear={onClearMealType}
              accessibilityLabel={`Убрать фильтр ${mealLabel}`}
            />
          </View>
        </View>
      ) : null}

      {allergenLabels.length > 0 ? (
        <View className="gap-1.5">
          <Text className="type-caption text-label-muted">Исключено</Text>
          <View className="flex-row flex-wrap gap-2">
            {allergenLabels.map((allergen) => (
              <ActiveFilterChip
                key={allergen.id}
                label={allergen.label}
                onClear={() => onClearAllergen(allergen.id)}
                accessibilityLabel={`Убрать исключение аллергена ${allergen.label}`}
              />
            ))}
          </View>
        </View>
      ) : null}

      {ingredientLabels.length > 0 ? (
        <View className="gap-1.5">
          <Text className="type-caption text-label-muted">Ингредиенты</Text>
          <View className="flex-row flex-wrap gap-2">
            {ingredientLabels.map((ingredient) => (
              <ActiveFilterChip
                key={ingredient.id}
                label={ingredient.label}
                onClear={() => onClearIngredient(ingredient.id)}
                accessibilityLabel={`Убрать ингредиент ${ingredient.label}`}
              />
            ))}
          </View>
        </View>
      ) : null}

      {activeGroupCount > 1 ? (
        <Pressable
          onPress={onResetAll}
          accessibilityRole="button"
          accessibilityLabel="Сбросить все фильтры"
          className="self-start active:opacity-70">
          <Text className="type-caption font-medium text-brand">Сбросить всё</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
