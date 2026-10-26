import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RecipeCard } from '@/features/recipes/components/RecipeCard';
import { MOCK_RECIPES } from '@/features/recipes/mockData';

export default function RecipesScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="px-4 pb-2 pt-4">
          <Text className="text-3xl font-bold text-stone-900">Рецепты</Text>
        </View>

        <FlatList
          data={MOCK_RECIPES}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 px-4 pb-6"
          renderItem={({ item }) => (
            <Pressable onPress={() => {}} className="active:opacity-80">
              <RecipeCard recipe={item} />
            </Pressable>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
