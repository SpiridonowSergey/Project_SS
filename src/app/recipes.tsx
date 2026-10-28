import { Stack } from 'expo-router';
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

  const listData = !isLoading && !isError ? filteredRecipes : [];

  return (
    <>
      <FlatList
        className="flex-1 bg-surface"
        data={listData}
        keyExtractor={(item) => item.id}
        contentContainerClassName={listData.length === 0 ? 'flex-grow pb-6' : 'pb-6'}
        ListHeaderComponent={
          !isLoading && !isError ? (
            <View className="border-b border-border/50 px-4 pb-4 pt-2">
              <Pressable
                onPress={toggleFavoritesOnly}
                accessibilityRole="button"
                accessibilityState={{ selected: favoritesOnly }}
                className={`mb-4 min-h-11 self-start items-center justify-center rounded-full border px-4 active:opacity-80 ${
                  favoritesOnly
                    ? 'border-brand bg-brand'
                    : 'border-border bg-surface-elevated'
                }`}>
                <Text
                  className={`type-caption font-medium ${
                    favoritesOnly ? 'text-onTint' : 'text-label-secondary'
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
            </View>
          ) : undefined
        }
        ListEmptyComponent={
          isLoading ? (
            <View className="flex-1 items-center justify-center gap-3 px-4 py-16">
              <ActivityIndicator size="large" color={colors.brand} />
              <Text className="type-body text-label-secondary">Загрузка...</Text>
            </View>
          ) : isError ? (
            <View className="flex-1 items-center justify-center px-4 py-16">
              <Text className="text-center type-body text-danger">Ошибка загрузки</Text>
            </View>
          ) : (
            <Text className="mt-8 px-4 text-center type-body text-label-secondary">
              {favoritesOnly
                ? 'В избранном пока нет рецептов'
                : 'Нет рецептов по выбранным фильтрам'}
            </Text>
          )
        }
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />

      <Stack.Screen
        options={{
          title: 'Рецепты',
          headerTransparent: false,
          headerBackButtonDisplayMode: 'minimal',
          headerRight: hasActiveFilters
            ? () => (
                <Pressable
                  onPress={resetFilters}
                  accessibilityRole="button"
                  accessibilityLabel="Сбросить фильтры"
                  className="min-h-11 items-center justify-center px-1 active:opacity-70">
                  <Text className="type-caption font-medium text-brand">Сбросить</Text>
                </Pressable>
              )
            : undefined,
        }}
      />
    </>
  );
}
