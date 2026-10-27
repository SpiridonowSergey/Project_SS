import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlateTemplateCard } from '@/features/plates/components/PlateTemplateCard';
import { PLATE_TEMPLATES } from '@/features/plates/mockData';

export default function PlatesScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-2 px-4 pb-2 pt-4">
          <Text className="text-3xl font-bold text-stone-900">Тарелки</Text>
          <Text className="text-sm text-stone-500">
            Выберите шаблон сбалансированной тарелки и при необходимости замените продукты внутри
            категории.
          </Text>
        </View>

        <FlatList
          data={PLATE_TEMPLATES}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 px-4 pb-8"
          renderItem={({ item }) => <PlateTemplateCard template={item} />}
        />
      </SafeAreaView>
    </View>
  );
}
