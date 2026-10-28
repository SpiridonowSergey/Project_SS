import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useFavoritesStore } from '@/features/recipes/store/favorites';
import { colors } from '@/theme';
import type { Recipe } from '@/types/domain';

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const hasAllergens = recipe.allergenIds.length > 0;
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(recipe.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <View className="overflow-hidden rounded-2xl bg-surface-elevated shadow-sm">
      <View className="absolute right-3 top-3 z-10">
        <Pressable
          onPress={() => toggleFavorite(recipe.id)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          className="rounded-full bg-surface-elevated/90 p-2 active:opacity-70">
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? colors.danger : colors.labelMuted}
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
              <View className="rounded-full bg-danger-soft px-2.5 py-1">
                <Text className="text-xs font-semibold text-danger">Содержит аллергены</Text>
              </View>
            ) : null}
          </View>

          <Text className="mt-2 text-lg font-semibold text-label">{recipe.title}</Text>

          <View className="mt-2 flex-row flex-wrap gap-x-3 gap-y-1">
            <Text className="text-sm text-label-secondary">С {recipe.minAgeMonths} мес.</Text>
            <Text className="text-sm text-label-secondary">
              {recipe.caloriesPer100g} ккал / 100 г
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
