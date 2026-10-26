import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedingStageCard } from '@/features/feeding-guide/components/FeedingStageCard';
import { MOCK_FEEDING_STAGES, SOURCES } from '@/features/feeding-guide/mockData';

export default function FeedingGuideScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="px-4 pb-2 pt-4">
          <Text className="text-3xl font-bold text-stone-900">Гид по прикорму</Text>
        </View>

        <FlatList
          data={MOCK_FEEDING_STAGES}
          keyExtractor={(item) => `${item.ageMonths}-${item.productGroup}`}
          contentContainerClassName="gap-3 px-4 pb-8"
          renderItem={({ item }) => (
            <FeedingStageCard stage={item} source={SOURCES[item.sourceId]} />
          )}
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
