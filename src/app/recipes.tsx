import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';

import { RecipeCard } from '@/features/recipes/components/RecipeCard';
import { RecipesActiveFilters } from '@/features/recipes/components/RecipesActiveFilters';
import { RecipesAdvancedFiltersSheet } from '@/features/recipes/components/RecipesAdvancedFiltersSheet';
import { RecipesFilters } from '@/features/recipes/components/RecipesFilters';
import { useRecipes } from '@/features/recipes/hooks/useRecipes';
import { useRecipesFilters } from '@/features/recipes/hooks/useRecipesFilters';
import { colors } from '@/theme';

export default function RecipesScreen() {
  const { data, isLoading, isError, refetch, isRefetching } = useRecipes();
  const {
    mealType,
    favoritesOnly,
    excludedAllergenIds,
    selectedIngredientIds,
    filteredRecipes,
    hasActiveFilters,
    selectMealType,
    clearMealType,
    toggleFavoritesOnly,
    toggleAllergen,
    toggleIngredient,
    resetFilters,
  } = useRecipesFilters(data ?? []);
  const [filtersSheetOpen, setFiltersSheetOpen] = useState(false);

  const listData = !isLoading && !isError ? filteredRecipes : [];
  const showFilters = !isLoading && !isError;
  const advancedFilterCount = excludedAllergenIds.length + selectedIngredientIds.length;

  return (
    <>
      <FlatList
        className="flex-1 bg-surface"
        data={listData}
        keyExtractor={(item) => item.id}
        contentContainerClassName={
          listData.length === 0 ? 'flex-grow px-4 pb-8' : 'gap-3 px-4 pb-8'
        }
        ListHeaderComponent={
          showFilters ? (
            <View className="gap-4 pb-4 pt-2">
              <RecipesFilters
                mealType={mealType}
                favoritesOnly={favoritesOnly}
                advancedFilterCount={advancedFilterCount}
                onSelectMealType={selectMealType}
                onToggleFavoritesOnly={toggleFavoritesOnly}
                onOpenAdvancedFilters={() => setFiltersSheetOpen(true)}
              />
              <RecipesActiveFilters
                mealType={mealType}
                favoritesOnly={favoritesOnly}
                excludedAllergenIds={excludedAllergenIds}
                selectedIngredientIds={selectedIngredientIds}
                onClearMealType={clearMealType}
                onClearFavorites={toggleFavoritesOnly}
                onClearAllergen={toggleAllergen}
                onClearIngredient={toggleIngredient}
                onResetAll={resetFilters}
              />
            </View>
          ) : undefined
        }
        ListEmptyComponent={
          isLoading ? (
            <View className="flex-1 items-center justify-center gap-3 py-16">
              <ActivityIndicator size="large" color={colors.brand} />
              <Text className="type-body text-label-secondary">Загрузка...</Text>
            </View>
          ) : isError ? (
            <View className="flex-1 items-center justify-center gap-4 py-16">
              <Text className="text-center type-body text-danger">Не удалось загрузить рецепты</Text>
              <Pressable
                onPress={() => {
                  void refetch();
                }}
                disabled={isRefetching}
                accessibilityRole="button"
                accessibilityLabel="Повторить загрузку рецептов"
                className="min-h-11 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80 disabled:opacity-60">
                {isRefetching ? (
                  <ActivityIndicator color={colors.onTint} />
                ) : (
                  <Text className="type-headline text-onTint">Повторить</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center gap-5 px-2 py-16">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
                <Ionicons name="search-outline" size={32} color={colors.brand} />
              </View>
              <Text className="text-center type-body text-label-secondary">
                {favoritesOnly && mealType === null && advancedFilterCount === 0
                  ? 'В избранном пока нет рецептов'
                  : 'Ничего не найдено по выбранным фильтрам'}
              </Text>
              {hasActiveFilters ? (
                <Pressable
                  onPress={resetFilters}
                  accessibilityRole="button"
                  accessibilityLabel="Сбросить фильтры"
                  className="min-h-11 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80">
                  <Text className="type-headline text-onTint">Сбросить фильтры</Text>
                </Pressable>
              ) : null}
            </View>
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

      {filtersSheetOpen ? (
        <RecipesAdvancedFiltersSheet
          excludedAllergenIds={excludedAllergenIds}
          selectedIngredientIds={selectedIngredientIds}
          onToggleAllergen={toggleAllergen}
          onToggleIngredient={toggleIngredient}
          onClose={() => setFiltersSheetOpen(false)}
        />
      ) : null}
    </>
  );
}
