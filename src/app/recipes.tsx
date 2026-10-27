import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecipeCard } from '@/features/recipes/components/RecipeCard';
import { RecipesFilters } from '@/features/recipes/components/RecipesFilters';
import { useRecipes } from '@/features/recipes/hooks/useRecipes';
import { useRecipesFilters } from '@/features/recipes/hooks/useRecipesFilters';

export default function RecipesScreen() {
  const { data, isLoading, isError } = useRecipes();
  const {
    mealType,
    favoritesOnly,
    excludedAllergenIds,
    selectedIngredientIds,
    filteredRecipes,
    hasActiveFilters,
    selectMealType,
    toggleFavoritesOnly,
    toggleAllergen,
    toggleIngredient,
    resetFilters,
  } = useRecipesFilters(data ?? []);

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

          {!isLoading && !isError ? (
            <>
              <Pressable
                onPress={toggleFavoritesOnly}
                className={`self-start rounded-full border px-4 py-2 active:opacity-80 ${
                  favoritesOnly
                    ? 'border-red-500 bg-red-500'
                    : 'border-stone-200 bg-white'
                }`}>
                <Text
                  className={`text-sm font-medium ${
                    favoritesOnly ? 'text-white' : 'text-stone-700'
                  }`}>
                  ♥ Избранное
                </Text>
              </Pressable>

              <RecipesFilters
                mealType={mealType}
                excludedAllergenIds={excludedAllergenIds}
                selectedIngredientIds={selectedIngredientIds}
                onSelectMealType={selectMealType}
                onToggleAllergen={toggleAllergen}
                onToggleIngredient={toggleIngredient}
              />
            </>
          ) : null}
        </View>

        {isLoading ? (
          <View className="flex-1 items-center justify-center gap-3">
            <ActivityIndicator size="large" color="#f43f5e" />
            <Text className="text-base text-stone-500">Загрузка...</Text>
          </View>
        ) : null}

        {isError ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-base text-red-600">Ошибка загрузки</Text>
          </View>
        ) : null}

        {!isLoading && !isError ? (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-3 px-4 pb-6"
            ListEmptyComponent={
              <Text className="mt-8 text-center text-base text-stone-500">
                {favoritesOnly
                  ? 'В избранном пока нет рецептов'
                  : 'Нет рецептов по выбранным фильтрам'}
              </Text>
            }
            renderItem={({ item }) => <RecipeCard recipe={item} />}
          />
        ) : null}
      </SafeAreaView>
    </View>
  );
}
