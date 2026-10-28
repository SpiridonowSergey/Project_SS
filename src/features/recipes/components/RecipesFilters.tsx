import { ScrollView, Text, View } from 'react-native';

import { FilterChip } from '@/features/recipes/components/FilterChip';
import {
  ALLERGEN_FILTERS,
  INGREDIENT_FILTERS,
  MEAL_TYPE_FILTERS,
  type MealTypeFilter,
} from '@/features/recipes/constants/filters';

type RecipesFiltersProps = {
  mealType: MealTypeFilter;
  excludedAllergenIds: string[];
  selectedIngredientIds: string[];
  onSelectMealType: (mealType: MealTypeFilter) => void;
  onToggleAllergen: (id: string) => void;
  onToggleIngredient: (id: string) => void;
};

export function RecipesFilters({
  mealType,
  excludedAllergenIds,
  selectedIngredientIds,
  onSelectMealType,
  onToggleAllergen,
  onToggleIngredient,
}: RecipesFiltersProps) {
  return (
    <View className="gap-4">
      <View className="gap-1.5">
        <Text className="type-caption text-label-muted">Приём пищи</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow-0">
          <View className="flex-row gap-2 pr-4">
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
      </View>

      <View className="gap-1.5">
        <Text className="type-caption text-label-muted">Аллергены</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow-0">
          <View className="flex-row gap-2 pr-4">
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
        </ScrollView>
      </View>

      <View className="gap-1.5">
        <Text className="type-caption text-label-muted">Ингредиенты</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow-0">
          <View className="flex-row gap-2 pr-4">
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
        </ScrollView>
      </View>
    </View>
  );
}
