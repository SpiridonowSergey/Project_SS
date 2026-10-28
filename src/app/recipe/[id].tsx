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
        <Stack.Screen options={{ title: 'Рецепт' }} />
        <View className="flex-1 items-center justify-center gap-3 bg-surface">
          <ActivityIndicator size="large" color={colors.brand} />
          <Text className="text-base text-label-secondary">Загрузка...</Text>
        </View>
      </>
    );
  }

  if (isError || !recipe) {
    return (
      <>
        <Stack.Screen options={{ title: 'Рецепт' }} />
        <View className="flex-1 bg-surface px-4 pt-4">
          <Text className="text-xl font-semibold text-label">Рецепт не найден</Text>
        </View>
      </>
    );
  }

  const allergens = getAllergensByIds(recipe.allergenIds);
  const hasAllergens = allergens.length > 0;

  return (
    <>
      <Stack.Screen options={{ title: recipe.title }} />

      <View className="flex-1 bg-surface">
        <ScrollView contentContainerClassName="gap-5 px-4 pb-8 pt-3">
          <View className="rounded-2xl bg-surface-elevated p-4 shadow-sm">
            <Text className="text-sm text-label-secondary">С {recipe.minAgeMonths} мес.</Text>
            <Text className="mt-1 text-sm text-label-secondary">
              {recipe.caloriesPer100g} ккал / 100 г
            </Text>
            {recipe.isPremium ? (
              <View className="mt-3 self-start rounded-full bg-amber-100 px-2.5 py-1">
                <Text className="text-xs font-semibold text-amber-700">Premium</Text>
              </View>
            ) : null}
          </View>

          {hasAllergens ? (
            <View className="gap-3 rounded-2xl bg-danger-soft p-4">
              <Text className="text-sm font-semibold text-danger">Содержит аллергены</Text>
              <Text className="text-sm text-danger">
                Нажмите на аллерген, чтобы увидеть возможные замены.
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {allergens.map((allergen) => (
                  <Pressable
                    key={allergen.id}
                    onPress={() => setSelectedAllergen(allergen)}
                    className="rounded-full bg-danger-soft px-3 py-2 active:opacity-80">
                    <Text className="text-sm font-medium text-danger">{allergen.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}

          <View className="gap-3">
            <Text className="text-xl font-semibold text-label">Ингредиенты</Text>
            <View className="rounded-2xl bg-surface-elevated p-4 shadow-sm">
              {recipe.ingredients.map((ingredient) => (
                <Text
                  key={`${ingredient.productId}-${ingredient.unit}`}
                  className="mb-2 text-base text-label-secondary last:mb-0">
                  {ingredient.productId}: {ingredient.amount} {ingredient.unit}
                </Text>
              ))}
            </View>
          </View>

          {recipe.safeServing ? (
            <View className="gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <Text className="text-base font-semibold text-amber-800">
                Безопасная подача
              </Text>
              <Text className="text-sm leading-5 text-amber-900">{recipe.safeServing}</Text>
            </View>
          ) : null}

          <View className="gap-3">
            <Text className="text-xl font-semibold text-label">Приготовление</Text>
            <View className="rounded-2xl bg-surface-elevated p-4 shadow-sm">
              {recipe.steps.map((step, index) => (
                <Text
                  key={`${recipe.id}-step-${index}`}
                  className="mb-3 text-base text-label-secondary last:mb-0">
                  {index + 1}. {step}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {selectedAllergen ? (
        <AllergenModal allergen={selectedAllergen} onClose={() => setSelectedAllergen(null)} />
      ) : null}
    </>
  );
}
