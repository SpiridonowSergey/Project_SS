import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddRecipeForm } from '@/features/admin/components/AddRecipeForm';

type AdminTab = 'add-recipe';

export default function AdminScreen() {
  const [tab, setTab] = useState<AdminTab>('add-recipe');

  return (
    <View className="flex-1 bg-stone-900">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-4 px-4 pb-2 pt-4">
          <Pressable onPress={() => router.back()} className="self-start active:opacity-70">
            <Text className="text-base font-medium text-rose-300">Назад</Text>
          </Pressable>

          <Text className="text-3xl font-bold text-white">Админка</Text>

          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setTab('add-recipe')}
              className={`rounded-full px-4 py-2 ${
                tab === 'add-recipe' ? 'bg-rose-500' : 'bg-stone-800'
              }`}>
              <Text
                className={`text-sm font-medium ${
                  tab === 'add-recipe' ? 'text-white' : 'text-stone-300'
                }`}>
                Добавить рецепт
              </Text>
            </Pressable>
          </View>
        </View>

        {tab === 'add-recipe' ? <AddRecipeForm /> : null}
      </SafeAreaView>
    </View>
  );
}
