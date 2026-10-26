import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecipeCard } from '@/features/recipes/components/RecipeCard';
import { RecipesFilters } from '@/features/recipes/components/RecipesFilters';
import { useRecipesFilters } from '@/features/recipes/hooks/useRecipesFilters';

export default function RecipesScreen() {
  const {
    excludedAllergenIds,
    selectedIngredientIds,
    filteredRecipes,
    hasActiveFilters,
    toggleAllergen,
    toggleIngredient,
    resetFilters,
  } = useRecipesFilters();

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-4 px-4 pb-2 pt-4">
          <View className="flex-row items-center justify-between gap-3">
            <Text className="flex-1 text-3xl font-bold text-stone-900">Рецепты</Text>
            {hasActiveFilters ? (
              <Pressable onPress={resetFilters} className="active:opacity-70">
                <Text className="text-sm font-medium text-rose-500">Сбросить фильтры</Text>
              </Pressable>
            ) : null}
          </View>

          <RecipesFilters
            excludedAllergenIds={excludedAllergenIds}
            selectedIngredientIds={selectedIngredientIds}
            onToggleAllergen={toggleAllergen}
            onToggleIngredient={toggleIngredient}
          />
        </View>

        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 px-4 pb-6"
          ListEmptyComponent={
            <Text className="mt-8 text-center text-base text-stone-500">
              Нет рецептов по выбранным фильтрам
            </Text>
          }
          renderItem={({ item }) => <RecipeCard recipe={item} />}
        />
      </SafeAreaView>
    </View>
  );
}
