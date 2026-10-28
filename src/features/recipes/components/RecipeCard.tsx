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
    <View className="border-b border-border/50 bg-surface-elevated">
      <View className="absolute right-1 top-1 z-10">
        <Pressable
          onPress={() => toggleFavorite(recipe.id)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          className="h-11 w-11 items-center justify-center active:opacity-70">
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? colors.brand : colors.labelMuted}
          />
        </Pressable>
      </View>

      <Link href={{ pathname: '/recipe/[id]', params: { id: recipe.id } }} asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Рецепт ${recipe.title}`}
          className="px-4 py-3.5 pr-12 active:bg-surface">
          {recipe.isPremium || hasAllergens ? (
            <View className="mb-1.5 flex-row flex-wrap gap-2">
              {recipe.isPremium ? (
                <View className="rounded-full bg-warning-soft px-2.5 py-0.5">
                  <Text className="type-caption font-semibold text-warning">Премиум</Text>
                </View>
              ) : null}
              {hasAllergens ? (
                <View className="rounded-full bg-danger-soft px-2.5 py-0.5">
                  <Text className="type-caption font-semibold text-danger">Аллергены</Text>
                </View>
              ) : null}
            </View>
          ) : null}

          <Text className="type-headline text-label" numberOfLines={2}>
            {recipe.title}
          </Text>

          <Text className="mt-1 type-caption text-label-secondary">
            С {recipe.minAgeMonths} мес. · {recipe.caloriesPer100g} ккал / 100 г
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
