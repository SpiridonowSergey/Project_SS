import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

import { AllergenModal } from '@/features/allergens/components/AllergenModal';
import { getAllergensByIds } from '@/features/allergens/mockData';
import { useRecipe } from '@/features/recipes/hooks/useRecipe';
import { colors } from '@/theme';
import type { Allergen } from '@/types/domain';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: recipe, isLoading, isError } = useRecipe(id);
  const [selectedAllergen, setSelectedAllergen] = useState<Allergen | null>(null);

  if (isLoading) {
    return (
      <>
        <View className="flex-1 items-center justify-center gap-3 bg-surface">
          <ActivityIndicator size="large" color={colors.brand} />
          <Text className="type-body text-label-secondary">Загрузка...</Text>
        </View>
        <Stack.Screen options={{ title: 'Рецепт', headerTransparent: false }} />
      </>
    );
  }

  if (isError || !recipe) {
    return (
      <>
        <View className="flex-1 bg-surface px-4 pt-2">
          <Text className="type-title text-label">Рецепт не найден</Text>
        </View>
        <Stack.Screen options={{ title: 'Рецепт', headerTransparent: false }} />
      </>
    );
  }

  const allergens = getAllergensByIds(recipe.allergenIds);
  const hasAllergens = allergens.length > 0;

  return (
    <>
      <ScrollView
        className="flex-1 bg-surface"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="px-4 pb-10 pt-1">
        <View className="border-b border-border/50 pb-5 pt-2">
          <Text className="type-caption text-label-secondary">
            С {recipe.minAgeMonths} мес. · {recipe.caloriesPer100g} ккал / 100 г
          </Text>
          {recipe.isPremium ? (
            <View className="mt-3 self-start rounded-full bg-warning-soft px-2.5 py-0.5">
              <Text className="type-caption font-semibold text-warning">Premium</Text>
            </View>
          ) : null}
        </View>

        {hasAllergens ? (
          <View className="gap-2 border-b border-border/50 pb-5 pt-6">
            <Text className="type-headline text-danger">Содержит аллергены</Text>
            <Text className="type-caption text-danger">
              Нажмите на аллерген, чтобы увидеть возможные замены.
            </Text>
            <View className="mt-1 flex-row flex-wrap gap-2">
              {allergens.map((allergen) => (
                <Pressable
                  key={allergen.id}
                  onPress={() => setSelectedAllergen(allergen)}
                  accessibilityRole="button"
                  accessibilityLabel={`Замены для аллергена ${allergen.label}`}
                  className="min-h-11 items-center justify-center rounded-full bg-danger-soft px-3.5 active:opacity-80">
                  <Text className="type-caption font-medium text-danger">{allergen.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        <View className="border-b border-border/50 pb-5 pt-6">
          <Text className="mb-2 type-headline text-label">Ингредиенты</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View
              key={`${ingredient.productId}-${ingredient.unit}`}
              className={`flex-row items-baseline justify-between gap-3 py-3 ${
                index < recipe.ingredients.length - 1 ? 'border-b border-border/50' : ''
              }`}>
              <Text className="flex-1 type-body text-label">{ingredient.productId}</Text>
              <Text className="type-caption text-label-secondary">
                {ingredient.amount} {ingredient.unit}
              </Text>
            </View>
          ))}
        </View>

        {recipe.safeServing ? (
          <View className="gap-1.5 border-b border-border/50 pb-5 pt-6">
            <Text className="type-headline text-warning">Безопасная подача</Text>
            <Text className="type-body text-warning">{recipe.safeServing}</Text>
          </View>
        ) : null}

        <View className="pb-2 pt-6">
          <Text className="mb-2 type-headline text-label">Приготовление</Text>
          {recipe.steps.map((step, index) => (
            <View
              key={`${recipe.id}-step-${index}`}
              className={`flex-row gap-3 py-3 ${
                index < recipe.steps.length - 1 ? 'border-b border-border/50' : ''
              }`}>
              <Text className="w-6 type-caption text-label-muted">{index + 1}.</Text>
              <Text className="flex-1 type-body text-label-secondary">{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Stack.Screen options={{ title: recipe.title, headerTransparent: false }} />

      {selectedAllergen ? (
        <AllergenModal allergen={selectedAllergen} onClose={() => setSelectedAllergen(null)} />
      ) : null}
    </>
  );
}
