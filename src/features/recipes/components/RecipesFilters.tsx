import { ScrollView, Text, View } from 'react-native';

import { FilterChip } from '@/features/recipes/components/FilterChip';
import {
  ALLERGEN_FILTERS,
  INGREDIENT_FILTERS,
} from '@/features/recipes/constants/filters';

type RecipesFiltersProps = {
  excludedAllergenIds: string[];
  selectedIngredientIds: string[];
  onToggleAllergen: (id: string) => void;
  onToggleIngredient: (id: string) => void;
};

export function RecipesFilters({
  excludedAllergenIds,
  selectedIngredientIds,
  onToggleAllergen,
  onToggleIngredient,
}: RecipesFiltersProps) {
  return (
    <View className="gap-3">
      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-500">Исключить аллергены</Text>
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

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-500">
          Ингредиенты (все выбранные)
        </Text>
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
