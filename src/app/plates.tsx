import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';

import { PlateTemplateCard } from '@/features/plates/components/PlateTemplateCard';
import { usePlateTemplates } from '@/features/plates/hooks/usePlateTemplates';
import { colors } from '@/theme';

export default function PlatesScreen() {
  const { templates, isLoading, isError, refetch, isRefetching } = usePlateTemplates();

  return (
    <>
      <View className="flex-1 bg-surface">
        <FlatList
          data={isLoading || isError ? [] : templates}
          keyExtractor={(item) => item.id}
          contentContainerClassName={
            templates.length === 0 || isLoading || isError
              ? 'flex-grow px-4 pb-8 pt-2'
              : 'gap-3 px-4 pb-8 pt-2'
          }
          ListHeaderComponent={
            !isLoading && !isError ? (
              <Text className="mb-4 type-body text-label-secondary">
                Выберите шаблон сбалансированной тарелки и при необходимости замените продукты
                внутри категории.
              </Text>
            ) : undefined
          }
          ListEmptyComponent={
            isLoading ? (
              <View className="flex-1 items-center justify-center gap-3 py-16">
                <ActivityIndicator size="large" color={colors.brand} />
                <Text className="type-body text-label-secondary">Загрузка...</Text>
              </View>
            ) : isError ? (
              <View className="flex-1 items-center justify-center gap-4 py-16">
                <Text className="text-center type-body text-danger">
                  Не удалось загрузить шаблоны тарелок
                </Text>
                <Pressable
                  onPress={() => {
                    void refetch();
                  }}
                  disabled={isRefetching}
                  accessibilityRole="button"
                  accessibilityLabel="Повторить загрузку тарелок"
                  className="min-h-11 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80 disabled:opacity-60">
                  {isRefetching ? (
                    <ActivityIndicator color={colors.onTint} />
                  ) : (
                    <Text className="type-headline text-onTint">Повторить</Text>
                  )}
                </Pressable>
              </View>
            ) : (
              <View className="flex-1 items-center justify-center gap-4 py-16">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
                  <Ionicons name="grid-outline" size={32} color={colors.brand} />
                </View>
                <Text className="text-center type-body text-label-secondary">
                  Шаблоны тарелок пока не добавлены
                </Text>
              </View>
            )
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
