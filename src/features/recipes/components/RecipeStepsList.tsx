import { Text, View } from 'react-native';

type RecipeStepsListProps = {
  recipeId: string;
  steps: string[];
};

export function RecipeStepsList({ recipeId, steps }: RecipeStepsListProps) {
  return (
    <View className="gap-4 rounded-3xl bg-surface-elevated p-5">
      <Text className="type-headline text-label">Приготовление</Text>

      <View className="gap-5">
        {steps.map((step, index) => (
          <View key={`${recipeId}-step-${index}`} className="flex-row gap-4">
            <Text className="type-title text-brand">{index + 1}</Text>
            <Text className="flex-1 pt-1 type-body text-label-secondary">{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
