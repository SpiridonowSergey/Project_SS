import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { ingredientKey } from '@/features/recipes/hooks/useRecipeDetailScreen';
import { colors } from '@/theme';
import type { Ingredient } from '@/types/domain';

type RecipeIngredientListProps = {
  ingredients: Ingredient[];
  checkedKeys: Set<string>;
  onToggle: (key: string) => void;
};

export function RecipeIngredientList({
  ingredients,
  checkedKeys,
  onToggle,
}: RecipeIngredientListProps) {
  return (
    <View className="gap-4 rounded-3xl bg-surface-elevated p-5">
      <Text className="type-headline text-label">Ингредиенты</Text>

      <View className="gap-1">
        {ingredients.map((ingredient, index) => {
          const key = ingredientKey(ingredient.productId, ingredient.unit, index);
          const checked = checkedKeys.has(key);

          return (
            <Pressable
              key={key}
              onPress={() => onToggle(key)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked }}
              accessibilityLabel={`${ingredient.productId}, ${ingredient.amount} ${ingredient.unit}`}
              className="min-h-11 flex-row items-center gap-3 py-2.5 active:opacity-80">
              <Ionicons
                name={checked ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={checked ? colors.brand : colors.labelMuted}
              />
              <Text
                className={`flex-1 type-body ${checked ? 'text-label-muted' : 'text-label'}`}
                style={checked ? { textDecorationLine: 'line-through' } : undefined}>
                {ingredient.productId}
              </Text>
              <Text className={`type-caption ${checked ? 'text-label-muted' : 'text-label-secondary'}`}>
                {ingredient.amount} {ingredient.unit}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
