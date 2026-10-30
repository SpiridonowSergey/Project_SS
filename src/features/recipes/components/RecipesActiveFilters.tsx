import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import {
  ALLERGEN_FILTERS,
  INGREDIENT_FILTERS,
  MEAL_TYPE_FILTERS,
  type MealTypeFilter,
} from '@/features/recipes/constants/filters';
import { colors } from '@/theme';

type ActiveTone = 'brand' | 'danger' | 'neutral';

type RecipesActiveFiltersProps = {
  mealType: MealTypeFilter;
  favoritesOnly: boolean;
  excludedAllergenIds: string[];
  selectedIngredientIds: string[];
  onClearMealType: () => void;
  onClearFavorites: () => void;
  onClearAllergen: (id: string) => void;
  onClearIngredient: (id: string) => void;
};

function ActiveFilterPill({
  label,
  tone = 'neutral',
  onClear,
  accessibilityLabel,
}: {
  label: string;
  tone?: ActiveTone;
  onClear: () => void;
  accessibilityLabel: string;
}) {
  const shellClassName =
    tone === 'brand'
      ? 'bg-brand-soft'
      : tone === 'danger'
        ? 'bg-danger-soft'
        : 'border border-border/50 bg-surface-elevated';

  const labelClassName =
    tone === 'brand'
      ? 'text-brand'
      : tone === 'danger'
        ? 'text-danger'
        : 'text-label-secondary';

  const iconColor =
    tone === 'brand'
      ? colors.brand
      : tone === 'danger'
        ? colors.danger
        : colors.labelMuted;

  return (
    <Pressable
      onPress={onClear}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`min-h-11 flex-row items-center gap-1 rounded-full py-1.5 pl-3 pr-2 active:opacity-70 ${shellClassName}`}>
      <Text className={`type-caption font-medium ${labelClassName}`}>{label}</Text>
      <View className="h-7 w-7 items-center justify-center">
        <Ionicons name="close-circle" size={18} color={iconColor} />
      </View>
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

  return (
    <View className="flex-row flex-wrap gap-2">
      {favoritesOnly ? (
        <ActiveFilterPill
          label="Избранное"
          tone="brand"
          onClear={onClearFavorites}
          accessibilityLabel="Убрать фильтр избранного"
        />
      ) : null}

      {mealLabel ? (
        <ActiveFilterPill
          label={mealLabel}
          tone="brand"
          onClear={onClearMealType}
          accessibilityLabel={`Убрать фильтр ${mealLabel}`}
        />
      ) : null}

      {allergenLabels.map((allergen) => (
        <ActiveFilterPill
          key={allergen.id}
          label={allergen.label}
          tone="danger"
          onClear={() => onClearAllergen(allergen.id)}
          accessibilityLabel={`Убрать исключение аллергена ${allergen.label}`}
        />
      ))}

      {ingredientLabels.map((ingredient) => (
        <ActiveFilterPill
          key={ingredient.id}
          label={ingredient.label}
          tone="neutral"
          onClear={() => onClearIngredient(ingredient.id)}
          accessibilityLabel={`Убрать ингредиент ${ingredient.label}`}
        />
      ))}
    </View>
  );
}
