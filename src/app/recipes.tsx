import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';

import { RecipeCard } from '@/features/recipes/components/RecipeCard';
import { RecipesFilters } from '@/features/recipes/components/RecipesFilters';
import { useRecipes } from '@/features/recipes/hooks/useRecipes';
import { useRecipesFilters } from '@/features/recipes/hooks/useRecipesFilters';
import { colors } from '@/theme';

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
    <View className="flex-1 bg-surface pt-12">
      <View className="gap-4 px-4 pb-2 pt-2">
        {/* Заголовок и сброс фильтров (кастомный, вместо нативного) */}
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-label">Рецепты</Text>
          {hasActiveFilters && (
            <Pressable onPress={resetFilters} className="active:opacity-70">
              <Text className="text-sm font-medium text-brand">Сбросить</Text>
            </Pressable>
          )}
        </View>

        {!isLoading && !isError ? (
          <>
            <Pressable
              onPress={toggleFavoritesOnly}
              className={`self-start rounded-full border px-4 py-2 active:opacity-80 ${
                favoritesOnly
                  ? 'border-danger bg-danger'
                  : 'border-border bg-surface-elevated'
              }`}>
              <Text
                className={`text-sm font-medium ${
                  favoritesOnly ? 'text-white' : 'text-label-secondary'
                }`}>
                Избранное
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
          <ActivityIndicator size="large" color={colors.brand} />
          <Text className="text-base text-label-secondary">Загрузка...</Text>
        </View>
      ) : null}

      {isError ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base text-danger">Ошибка загрузки</Text>
        </View>
      ) : null}

      {!isLoading && !isError ? (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 px-4 pb-6"
          ListEmptyComponent={
            <Text className="mt-8 text-center text-base text-label-secondary">
              {favoritesOnly
                ? 'В избранном пока нет рецептов'
                : 'Нет рецептов по выбранным фильтрам'}
            </Text>
          }
          renderItem={({ item }) => <RecipeCard recipe={item} />}
        />
      ) : null}
    </View>
  );
}