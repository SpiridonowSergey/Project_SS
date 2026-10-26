import { Text, View } from 'react-native';

import type { FeedingStage, MedicalSource } from '@/types/domain';

type FeedingStageCardProps = {
  stage: FeedingStage;
  source?: MedicalSource;
};

function formatAgeMonths(ageMonths: number) {
  const mod10 = ageMonths % 10;
  const mod100 = ageMonths % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${ageMonths} месяц`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${ageMonths} месяца`;
  }

  return `${ageMonths} месяцев`;
}

export function FeedingStageCard({ stage, source }: FeedingStageCardProps) {
  return (
    <View className="rounded-2xl bg-white p-4 shadow-sm">
      <Text className="text-lg font-semibold text-stone-900">
        {formatAgeMonths(stage.ageMonths)}
      </Text>
      <Text className="mt-1 text-base text-stone-700">{stage.productGroup}</Text>

      <View className="mt-3 gap-1">
        <Text className="text-sm text-stone-600">Старт: {stage.startVolume}</Text>
        <Text className="text-sm text-stone-600">Цель: {stage.targetVolume}</Text>
      </View>

      {stage.notes ? (
        <Text className="mt-3 text-sm text-stone-500">{stage.notes}</Text>
      ) : null}

      <Text className="mt-4 text-xs text-stone-400">
        Источник: {source?.title ?? stage.sourceId}
      </Text>
    </View>
  );
}
