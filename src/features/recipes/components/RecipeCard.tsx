import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useFavoritesStore } from '@/features/recipes/store/favorites';
import type { Recipe } from '@/types/domain';

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const hasAllergens = recipe.allergenIds.length > 0;
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(recipe.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <View className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <View className="absolute right-3 top-3 z-10">
        <Pressable
          onPress={() => toggleFavorite(recipe.id)}
          hitSlop={8}
          className="rounded-full bg-white/90 p-2 active:opacity-70">
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? '#ef4444' : '#a8a29e'}
          />
        </Pressable>
      </View>

      <Link href={{ pathname: '/recipe/[id]', params: { id: recipe.id } }} asChild>
        <Pressable className="p-4 pr-12 active:opacity-80">
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
        </Pressable>
      </Link>
    </View>
  );
}
