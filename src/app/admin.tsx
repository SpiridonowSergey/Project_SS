import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddFeedingStageForm } from '@/features/admin/components/AddFeedingStageForm';
import { AddRecipeForm } from '@/features/admin/components/AddRecipeForm';
import { ManageFeedingStagesList } from '@/features/admin/components/ManageFeedingStagesList';
import { ManageRecipesList } from '@/features/admin/components/ManageRecipesList';
import {
  confirmDeleteFeedingStage,
  useDeleteFeedingStage,
} from '@/features/feeding-guide/hooks/useDeleteFeedingStage';
import { useFeedingGuide } from '@/features/feeding-guide/hooks/useFeedingGuide';
import { SOURCES } from '@/features/feeding-guide/mockData';
import {
  confirmDeleteRecipe,
  useDeleteRecipe,
} from '@/features/recipes/hooks/useDeleteRecipe';
import { useRecipes } from '@/features/recipes/hooks/useRecipes';
import type { FeedingStage, Recipe } from '@/types/domain';

type AdminTab =
  | 'add-recipe'
  | 'add-feeding-stage'
  | 'manage-recipes'
  | 'manage-guide';

const TABS: { id: AdminTab; label: string }[] = [
  { id: 'add-recipe', label: 'Добавить рецепт' },
  { id: 'add-feeding-stage', label: 'Добавить этап прикорма' },
  { id: 'manage-recipes', label: 'Управление рецептами' },
  { id: 'manage-guide', label: 'Управление гидом' },
];

export default function AdminScreen() {
  const [tab, setTab] = useState<AdminTab>('add-recipe');
  const sources = Object.values(SOURCES);

  const recipesQuery = useRecipes();
  const feedingGuideQuery = useFeedingGuide();
  const deleteRecipeMutation = useDeleteRecipe();
  const deleteStageMutation = useDeleteFeedingStage();

  function handleDeleteRecipe(recipe: Recipe) {
    confirmDeleteRecipe(recipe.title, () => {
      deleteRecipeMutation.mutate(recipe.id);
    });
  }

  function handleDeleteStage(stage: FeedingStage) {
    confirmDeleteFeedingStage(`${stage.ageMonths} мес. · ${stage.productGroup}`, () => {
      deleteStageMutation.mutate(stage.id);
    });
  }

  return (
    <View className="flex-1 bg-stone-900">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-4 px-4 pb-2 pt-4">
          <Pressable onPress={() => router.back()} className="self-start active:opacity-70">
            <Text className="text-base font-medium text-rose-300">Назад</Text>
          </Pressable>

          <Text className="text-3xl font-bold text-white">Админка</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {TABS.map((item) => {
                const selected = tab === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setTab(item.id)}
                    className={`rounded-full px-4 py-2 ${
                      selected ? 'bg-rose-500' : 'bg-stone-800'
                    }`}>
                    <Text
                      className={`text-sm font-medium ${
                        selected ? 'text-white' : 'text-stone-300'
                      }`}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {tab === 'add-recipe' ? <AddRecipeForm /> : null}

        {tab === 'add-feeding-stage' ? <AddFeedingStageForm sources={sources} /> : null}

        {tab === 'manage-recipes' ? (
          <ManageRecipesList
            recipes={recipesQuery.data ?? []}
            isLoading={recipesQuery.isLoading}
            isError={recipesQuery.isError}
            isDeleting={deleteRecipeMutation.isPending}
            onDelete={handleDeleteRecipe}
          />
        ) : null}

        {tab === 'manage-guide' ? (
          <ManageFeedingStagesList
            stages={feedingGuideQuery.stages}
            isLoading={feedingGuideQuery.isLoading}
            isError={feedingGuideQuery.isError}
            isDeleting={deleteStageMutation.isPending}
            onDelete={handleDeleteStage}
          />
        ) : null}
      </SafeAreaView>
    </View>
  );
}
