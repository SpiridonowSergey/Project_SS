import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';

import type { FeedingStage } from '@/types/domain';

type ManageFeedingStagesListProps = {
  stages: FeedingStage[];
  isLoading: boolean;
  isError: boolean;
  isDeleting: boolean;
  onDelete: (stage: FeedingStage) => void;
};

export function ManageFeedingStagesList({
  stages,
  isLoading,
  isError,
  isDeleting,
  onDelete,
}: ManageFeedingStagesListProps) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <ActivityIndicator color="#fda4af" />
        <Text className="text-stone-400">Загрузка этапов...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-red-400">Ошибка загрузки этапов</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={stages}
      keyExtractor={(item) => item.id}
      contentContainerClassName="gap-3 px-4 pb-10"
      ListHeaderComponent={
        <Text className="mb-2 text-xl font-semibold text-white">Управление гидом</Text>
      }
      ListEmptyComponent={
        <Text className="mt-8 text-center text-stone-400">Этапов пока нет</Text>
      }
      renderItem={({ item }) => (
        <View className="flex-row items-center gap-3 rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3">
          <View className="flex-1">
            <Text className="text-base font-semibold text-white">
              {item.ageMonths} мес. · {item.productGroup}
            </Text>
            <Text className="mt-1 text-sm text-stone-400">
              {item.startVolume} → {item.targetVolume}
            </Text>
          </View>
          <Pressable
            onPress={() => onDelete(item)}
            disabled={isDeleting}
            className="rounded-full bg-red-500/15 p-2.5 active:opacity-70 disabled:opacity-40">
            <Ionicons name="trash-outline" size={20} color="#f87171" />
          </Pressable>
        </View>
      )}
    />
  );
}
