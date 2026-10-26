import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedingProgressBar } from '@/features/feeding-guide/components/FeedingProgressBar';
import { FeedingStageCard } from '@/features/feeding-guide/components/FeedingStageCard';
import { useFeedingGuide } from '@/features/feeding-guide/hooks/useFeedingGuide';
import { SOURCES } from '@/features/feeding-guide/mockData';
import { getFeedingStageId } from '@/features/feeding-guide/stageId';

export default function FeedingGuideScreen() {
  const {
    stages,
    introducedCount,
    totalCount,
    isStageIntroduced,
    toggleIntroduced,
  } = useFeedingGuide();

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-4 px-4 pb-2 pt-4">
          <Text className="text-3xl font-bold text-stone-900">Гид по прикорму</Text>
          <FeedingProgressBar introducedCount={introducedCount} totalCount={totalCount} />
        </View>

        <FlatList
          data={stages}
          keyExtractor={(item) => getFeedingStageId(item)}
          contentContainerClassName="gap-3 px-4 pb-8"
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
            <Text className="mt-4 text-xs leading-5 text-stone-400">
              Информация носит справочный характер и не заменяет консультацию педиатра.
              Сроки введения прикорма индивидуальны.
            </Text>
          }
        />
      </SafeAreaView>
    </View>
  );
}
