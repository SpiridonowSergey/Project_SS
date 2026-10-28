import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { colors } from '@/theme';

type RecipeHeroProps = {
  title: string;
  imageUrl?: string;
  minAgeMonths: number;
  caloriesPer100g: number;
  isPremium: boolean;
};

export function RecipeHero({
  title,
  imageUrl,
  minAgeMonths,
  caloriesPer100g,
  isPremium,
}: RecipeHeroProps) {
  return (
    <View className="gap-5">
      <View className="overflow-hidden rounded-3xl bg-brand-soft">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', aspectRatio: 4 / 3 }}
            contentFit="cover"
            accessibilityLabel={`Фото: ${title}`}
          />
        ) : (
          <View
            className="aspect-[4/3] items-center justify-center bg-brand-soft"
            accessibilityRole="image"
            accessibilityLabel="Нет фото рецепта">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-surface-elevated/80">
              <Ionicons name="restaurant-outline" size={36} color={colors.brand} />
            </View>
          </View>
        )}
      </View>

      <View className="gap-3">
        <Text className="type-title text-label">{title}</Text>

        <View className="flex-row flex-wrap gap-2">
          <View className="min-h-9 items-center justify-center rounded-full bg-surface-elevated px-3.5">
            <Text className="type-caption font-medium text-label-secondary">
              С {minAgeMonths} мес.
            </Text>
          </View>
          <View className="min-h-9 items-center justify-center rounded-full bg-surface-elevated px-3.5">
            <Text className="type-caption font-medium text-label-secondary">
              {caloriesPer100g} ккал / 100 г
            </Text>
          </View>
          {isPremium ? (
            <View className="min-h-9 items-center justify-center rounded-full bg-warning-soft px-3.5">
              <Text className="type-caption font-semibold text-warning">Премиум</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
