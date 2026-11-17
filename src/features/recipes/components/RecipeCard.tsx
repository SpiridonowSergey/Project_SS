import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { MEAL_TYPE_ACCENT_CLASS } from '@/features/recipes/constants/mealTypeAccent';
import { useFavoritesStore } from '@/features/recipes/store/favorites';
import { colors } from '@/theme';
import type { Recipe } from '@/types/domain';

type RecipeCardProps = {
  recipe: Recipe;
  /** True when recipe is premium and the current user has no active subscription. */
  isLocked?: boolean;
};

export function RecipeCard({ recipe, isLocked = false }: RecipeCardProps) {
  const hasAllergens = recipe.allergenIds.length > 0;
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(recipe.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const accentClass = MEAL_TYPE_ACCENT_CLASS[recipe.mealType];

  return (
    <View className="rounded-2xl bg-surface-elevated p-4 shadow-sm">
      <View className="flex-row gap-3">
        <View className={`mt-1.5 h-2.5 w-2.5 rounded-full ${accentClass}`} />

        <View className="min-w-0 flex-1">
          <Link href={{ pathname: '/recipe/[id]', params: { id: recipe.id } }} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                isLocked ? `Рецепт ${recipe.title}, Premium` : `Рецепт ${recipe.title}`
              }
              className="active:opacity-80">
              {recipe.isPremium || hasAllergens ? (
                <View className="mb-2 flex-row flex-wrap gap-2">
                  {recipe.isPremium ? (
                    <View className="flex-row items-center gap-1 rounded-full bg-warning-soft px-2.5 py-0.5">
                      {isLocked ? (
                        <Ionicons name="lock-closed" size={12} color={colors.warning} />
                      ) : null}
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

              <View className="mt-2 flex-row flex-wrap gap-x-3 gap-y-1">
                <Text className="type-caption text-label-secondary">
                  С {recipe.minAgeMonths} мес.
                </Text>
                <Text className="type-caption text-label-secondary">
                  {recipe.caloriesPer100g} ккал / 100 г
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>

        {isLocked ? (
          <View className="h-11 w-11 items-center justify-center rounded-full bg-warning-soft">
            <Ionicons name="lock-closed" size={20} color={colors.warning} />
          </View>
        ) : (
          <Pressable
            onPress={() => toggleFavorite(recipe.id)}
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            className="h-11 w-11 items-center justify-center rounded-full bg-brand-soft active:opacity-70">
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? colors.brand : colors.labelSecondary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
