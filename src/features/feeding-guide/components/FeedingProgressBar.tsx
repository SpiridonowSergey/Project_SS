import { Text, View } from 'react-native';

type FeedingProgressBarProps = {
  introducedCount: number;
  totalCount: number;
};

export function FeedingProgressBar({
  introducedCount,
  totalCount,
}: FeedingProgressBarProps) {
  const progressPercent =
    totalCount === 0 ? 0 : Math.min(100, Math.round((introducedCount / totalCount) * 100));

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-stone-600">
        Введено {introducedCount} из {totalCount} продуктов
      </Text>
      <View className="h-2 overflow-hidden rounded-full bg-stone-200">
        <View className="h-full rounded-full bg-rose-500" style={{ width: `${progressPercent}%` }} />
      </View>
    </View>
  );
}
