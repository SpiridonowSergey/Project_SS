import { Stack } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { FeedingProgressBar } from '@/features/feeding-guide/components/FeedingProgressBar';
import { FeedingStageCard } from '@/features/feeding-guide/components/FeedingStageCard';
import { useFeedingGuide } from '@/features/feeding-guide/hooks/useFeedingGuide';
import { SOURCES } from '@/features/feeding-guide/mockData';
import { getFeedingStageId } from '@/features/feeding-guide/stageId';
import { colors } from '@/theme';

export default function FeedingGuideScreen() {
  const {
    isLoading,
    isError,
    stages,
    introducedCount,
    totalCount,
    isStageIntroduced,
    toggleIntroduced,
  } = useFeedingGuide();

  return (
    <>
      <View className="flex-1 bg-surface">
        {isLoading ? (
          <View className="flex-1 items-center justify-center gap-3">
            <ActivityIndicator size="large" color={colors.brand} />
            <Text className="type-body text-label-secondary">Загрузка...</Text>
          </View>
        ) : null}

        {isError ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center type-body text-danger">Ошибка загрузки</Text>
          </View>
        ) : null}

        {!isLoading && !isError ? (
          <FlatList
            data={stages}
            keyExtractor={(item) => getFeedingStageId(item)}
            contentContainerClassName="gap-3 px-4 pb-8 pt-2"
            ListHeaderComponent={
              <View className="mb-1">
                <FeedingProgressBar introducedCount={introducedCount} totalCount={totalCount} />
              </View>
            }
            ListEmptyComponent={
              <Text className="mt-8 text-center type-body text-label-secondary">
                Пока нет этапов прикорма
              </Text>
            }
            renderItem={({ item }) => {
              const stageId = getFeedingStageId(item);

              return (
                <FeedingStageCard
                  stage={item}
                  source={SOURCES[item.sourceId]}
                  introduced={isStageIntroduced(stageId)}
                  onToggleIntroduced={() => toggleIntroduced(stageId)}
                />
              );
            }}
            ListFooterComponent={
              stages.length > 0 ? (
                <Text className="mt-4 type-caption leading-5 text-label-secondary">
                  Информация носит справочный характер и не заменяет консультацию педиатра.
                  Сроки введения прикорма индивидуальны.
                </Text>
              ) : undefined
            }
          />
        ) : null}
      </View>

      <Stack.Screen
        options={{
          title: 'Гид по прикорму',
          headerShown: true,
          headerTransparent: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </>
  );
}
