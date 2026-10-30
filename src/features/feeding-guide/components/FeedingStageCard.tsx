import { Switch, Text, View } from 'react-native';

import { colors } from '@/theme';
import type { FeedingStage, MedicalSource } from '@/types/domain';

type FeedingStageCardProps = {
  stage: FeedingStage;
  source?: MedicalSource;
  introduced: boolean;
  onToggleIntroduced: () => void;
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

export function FeedingStageCard({
  stage,
  source,
  introduced,
  onToggleIntroduced,
}: FeedingStageCardProps) {
  return (
    <View
      className={`rounded-2xl bg-surface-elevated p-4 shadow-sm ${
        introduced ? 'opacity-50' : 'opacity-100'
      }`}>
      <View className="flex-row items-start justify-between gap-3">
        <View className="min-w-0 flex-1 gap-1">
          <Text className="type-headline text-label">{stage.productGroup}</Text>
          <Text className="type-caption text-label-secondary">
            {formatAgeMonths(stage.ageMonths)}
          </Text>
        </View>

        <View className="items-center gap-1">
          <Switch
            value={introduced}
            onValueChange={onToggleIntroduced}
            trackColor={{ false: colors.border, true: colors.brandSoft }}
            thumbColor={introduced ? colors.brand : colors.surfaceElevated}
          />
          <Text className="type-caption text-label-secondary">Введено</Text>
        </View>
      </View>

      <View className="mt-3 gap-1">
        <Text className="type-caption text-label-secondary">Старт: {stage.startVolume}</Text>
        <Text className="type-caption text-label-secondary">Цель: {stage.targetVolume}</Text>
      </View>

      {stage.notes ? (
        <Text className="mt-3 type-body text-label-secondary">{stage.notes}</Text>
      ) : null}

      {introduced ? (
        <View className="mt-3 self-start rounded-full bg-brand-soft px-2.5 py-0.5">
          <Text className="type-caption font-medium text-brand">Продукт введён</Text>
        </View>
      ) : null}

      <Text className="mt-3 type-caption text-label-secondary">
        Источник: {source?.title ?? stage.sourceId}
      </Text>
    </View>
  );
}
