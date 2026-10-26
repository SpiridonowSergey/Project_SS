import { Text, View } from 'react-native';

import type { Recipe } from '@/types/domain';

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const hasAllergens = recipe.allergenIds.length > 0;

  return (
    <View className="rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row flex-wrap gap-2">
        {recipe.isPremium ? (
          <View className="rounded-full bg-amber-100 px-2.5 py-1">
            <Text className="text-xs font-semibold text-amber-700">Premium</Text>
          </View>
        ) : null}
        {hasAllergens ? (
          <View className="rounded-full bg-red-100 px-2.5 py-1">
            <Text className="text-xs font-semibold text-red-700">Содержит аллергены</Text>
          </View>
        ) : null}
      </View>

      <Text className="mt-2 text-lg font-semibold text-stone-900">{recipe.title}</Text>

      <View className="mt-2 flex-row flex-wrap gap-x-3 gap-y-1">
        <Text className="text-sm text-stone-500">С {recipe.minAgeMonths} мес.</Text>
        <Text className="text-sm text-stone-500">
          {recipe.caloriesPer100g} ккал / 100 г
        </Text>
      </View>
    </View>
  );
}
