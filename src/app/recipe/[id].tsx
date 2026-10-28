import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

import { AllergenModal } from '@/features/allergens/components/AllergenModal';
import { getAllergensByIds } from '@/features/allergens/mockData';
import { RecipeHero } from '@/features/recipes/components/RecipeHero';
import { RecipeIngredientList } from '@/features/recipes/components/RecipeIngredientList';
import { RecipeStepsList } from '@/features/recipes/components/RecipeStepsList';
import { useRecipeDetailScreen } from '@/features/recipes/hooks/useRecipeDetailScreen';
import { colors } from '@/theme';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    recipe,
    isLoading,
    isError,
    selectedAllergen,
    setSelectedAllergen,
    closeAllergen,
    checkedIngredientKeys,
    toggleIngredient,
  } = useRecipeDetailScreen(id);

  if (isLoading) {
    return (
      <>
        <View className="flex-1 items-center justify-center gap-3 bg-surface">
          <ActivityIndicator size="large" color={colors.brand} />
          <Text className="type-body text-label-secondary">Загрузка...</Text>
        </View>
        <Stack.Screen options={{ title: 'Рецепт', headerTransparent: false }} />
      </>
    );
  }

  if (isError || !recipe) {
    return (
      <>
        <View className="flex-1 bg-surface px-4 pt-6">
          <Text className="type-title text-label">Рецепт не найден</Text>
        </View>
        <Stack.Screen options={{ title: 'Рецепт', headerTransparent: false }} />
      </>
    );
  }

  const allergens = getAllergensByIds(recipe.allergenIds);
  const hasAllergens = allergens.length > 0;

  return (
    <>
      <ScrollView
        className="flex-1 bg-surface"
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="gap-8 px-4 pb-12 pt-2">
        <RecipeHero
          title={recipe.title}
          imageUrl={recipe.imageUrl}
          minAgeMonths={recipe.minAgeMonths}
          caloriesPer100g={recipe.caloriesPer100g}
          isPremium={recipe.isPremium}
        />

        {hasAllergens ? (
          <View className="gap-3 rounded-3xl bg-danger-soft p-5">
            <View className="gap-1">
              <Text className="type-headline text-danger">Содержит аллергены</Text>
              <Text className="type-caption text-danger">
                Нажмите на аллерген, чтобы увидеть возможные замены.
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {allergens.map((allergen) => (
                <Pressable
                  key={allergen.id}
                  onPress={() => setSelectedAllergen(allergen)}
                  accessibilityRole="button"
                  accessibilityLabel={`Замены для аллергена ${allergen.label}`}
                  className="min-h-11 items-center justify-center rounded-full bg-surface-elevated px-3.5 active:opacity-80">
                  <Text className="type-caption font-medium text-danger">{allergen.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        <RecipeIngredientList
          ingredients={recipe.ingredients}
          checkedKeys={checkedIngredientKeys}
          onToggle={toggleIngredient}
        />

        {recipe.safeServing ? (
          <View className="gap-2 rounded-3xl bg-warning-soft p-5">
            <Text className="type-headline text-warning">Безопасная подача</Text>
            <Text className="type-body text-warning">{recipe.safeServing}</Text>
          </View>
        ) : null}

        <RecipeStepsList recipeId={recipe.id} steps={recipe.steps} />
      </ScrollView>

      <Stack.Screen options={{ title: 'Рецепт', headerTransparent: false }} />

      {selectedAllergen ? (
        <AllergenModal allergen={selectedAllergen} onClose={closeAllergen} />
      ) : null}
    </>
  );
}
