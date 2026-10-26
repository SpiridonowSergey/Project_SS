import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MOCK_RECIPES } from '@/features/recipes/mockData';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = MOCK_RECIPES.find((item) => item.id === id);

  if (!recipe) {
    return (
      <View className="flex-1 bg-gray-50">
        <SafeAreaView style={{ flex: 1 }}>
          <View className="px-4 pt-4">
            <Pressable onPress={() => router.back()} className="mb-4 self-start active:opacity-70">
              <Text className="text-base font-medium text-rose-500">Назад</Text>
            </Pressable>
            <Text className="text-xl font-semibold text-stone-800">Рецепт не найден</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const hasAllergens = recipe.allergenIds.length > 0;

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerClassName="gap-5 px-4 pb-8 pt-4">
          <Pressable onPress={() => router.back()} className="self-start active:opacity-70">
            <Text className="text-base font-medium text-rose-500">Назад</Text>
          </Pressable>

          <Text className="text-3xl font-bold text-stone-900">{recipe.title}</Text>

          <View className="rounded-2xl bg-white p-4 shadow-sm">
            <Text className="text-sm text-stone-500">С {recipe.minAgeMonths} мес.</Text>
            <Text className="mt-1 text-sm text-stone-500">
              {recipe.caloriesPer100g} ккал / 100 г
            </Text>
            {recipe.isPremium ? (
              <View className="mt-3 self-start rounded-full bg-amber-100 px-2.5 py-1">
                <Text className="text-xs font-semibold text-amber-700">Premium</Text>
              </View>
            ) : null}
          </View>

          {hasAllergens ? (
            <View className="rounded-2xl bg-red-50 p-4">
              <Text className="text-sm font-semibold text-red-700">
                Содержит аллергены. Возможные замены: {recipe.allergenIds.join(', ')}
              </Text>
            </View>
          ) : null}

          <View className="gap-3">
            <Text className="text-xl font-semibold text-stone-900">Ингредиенты</Text>
            <View className="rounded-2xl bg-white p-4 shadow-sm">
              {recipe.ingredients.map((ingredient) => (
                <Text
                  key={`${ingredient.productId}-${ingredient.unit}`}
                  className="mb-2 text-base text-stone-700 last:mb-0">
                  {ingredient.productId}: {ingredient.amount} {ingredient.unit}
                </Text>
              ))}
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-xl font-semibold text-stone-900">Приготовление</Text>
            <View className="rounded-2xl bg-white p-4 shadow-sm">
              {recipe.steps.map((step, index) => (
                <Text key={`${recipe.id}-step-${index}`} className="mb-3 text-base text-stone-700 last:mb-0">
                  {index + 1}. {step}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
