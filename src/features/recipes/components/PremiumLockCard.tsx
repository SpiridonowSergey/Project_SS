import { Ionicons } from '@expo/vector-icons';
import { type Href, router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/theme';

const PAYWALL_HREF = '/paywall' as Href;

export function PremiumLockCard() {
  return (
    <View className="items-center gap-4 rounded-3xl bg-warning-soft px-5 py-8">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-elevated">
        <Ionicons name="lock-closed" size={32} color={colors.warning} />
      </View>
      <View className="gap-2">
        <Text className="text-center type-headline text-warning">Доступно в Premium</Text>
        <Text className="text-center type-caption text-warning">
          Оформите подписку, чтобы открыть шаги приготовления и советы по подаче.
        </Text>
      </View>
      <Pressable
        onPress={() => {
          router.push(PAYWALL_HREF);
        }}
        accessibilityRole="button"
        accessibilityLabel="Открыть в Premium"
        className="min-h-11 items-center justify-center rounded-2xl bg-warning px-5 active:opacity-80">
        <Text className="type-headline text-onTint">Открыть в Premium</Text>
      </Pressable>
    </View>
  );
}
