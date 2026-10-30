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
    <View className="gap-2 rounded-2xl bg-surface-elevated p-4 shadow-sm">
      <Text className="type-caption font-medium text-label-secondary">
        Введено {introducedCount} из {totalCount} продуктов
      </Text>
      <View className="h-2.5 overflow-hidden rounded-full bg-brand-soft">
        <View className="h-full rounded-full bg-brand" style={{ width: `${progressPercent}%` }} />
      </View>
    </View>
  );
}
