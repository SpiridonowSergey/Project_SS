import { Stack } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

import { PlateTemplateCard } from '@/features/plates/components/PlateTemplateCard';
import { PLATE_TEMPLATES } from '@/features/plates/mockData';

export default function PlatesScreen() {
  return (
    <>
      <View className="flex-1 bg-surface">
        <FlatList
          data={PLATE_TEMPLATES}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 px-4 pb-8 pt-2"
          ListHeaderComponent={
            <Text className="mb-4 type-body text-label-secondary">
              Выберите шаблон сбалансированной тарелки и при необходимости замените продукты
              внутри категории.
            </Text>
          }
          renderItem={({ item }) => <PlateTemplateCard template={item} />}
        />
      </View>

      <Stack.Screen
        options={{
          title: 'Тарелки',
          headerShown: true,
          headerTransparent: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </>
  );
}
