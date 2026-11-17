import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PAYWALL_BENEFITS } from '@/features/user/constants/paywallPlans';
import { usePaywall } from '@/features/user/hooks/usePaywall';
import { colors } from '@/theme';

export function PaywallView() {
  const insets = useSafeAreaInsets();
  const { plans, selectedPlanId, setSelectedPlanId, isPurchasing, purchase } = usePaywall();

  return (
    <View className="flex-1 bg-surface" style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 px-4 pb-6 pt-2"
        showsVerticalScrollIndicator={false}>
        <View className="items-center gap-4 rounded-3xl bg-brand-soft px-5 py-8">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-warning-soft">
            <Ionicons name="diamond" size={40} color={colors.warning} />
          </View>
          <View className="gap-2">
            <Text className="text-center type-title text-label">
              Откройте все рецепты и советы
            </Text>
            <Text className="text-center type-body text-label-secondary">
              Полный доступ к безопасной подаче, аллергенам и гиду
            </Text>
          </View>
        </View>

        <View className="gap-3 rounded-2xl bg-surface-elevated p-4 shadow-sm">
          {PAYWALL_BENEFITS.map((benefit) => (
            <View key={benefit} className="flex-row items-start gap-3">
              <View className="mt-0.5 h-6 w-6 items-center justify-center rounded-full bg-brand-soft">
                <Ionicons name="checkmark" size={16} color={colors.brand} />
              </View>
              <Text className="flex-1 type-body text-label">{benefit}</Text>
            </View>
          ))}
        </View>

        <View className="gap-3">
          <Text className="type-headline text-label">Выберите тариф</Text>
          {plans.map((plan) => {
            const selected = plan.id === selectedPlanId;
            return (
              <Pressable
                key={plan.id}
                onPress={() => setSelectedPlanId(plan.id)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`${plan.label}, ${plan.priceLabel}`}
                className={`rounded-2xl bg-surface-elevated p-4 shadow-sm active:opacity-90 ${
                  selected ? 'border-2 border-brand' : 'border border-border/50'
                }`}>
                <View className="flex-row items-start justify-between gap-3">
                  <View className="min-w-0 flex-1 gap-1">
                    <View className="flex-row flex-wrap items-center gap-2">
                      <Text className="type-headline text-label">{plan.label}</Text>
                      {plan.badge ? (
                        <View className="rounded-full bg-warning-soft px-2.5 py-0.5">
                          <Text className="type-caption font-semibold text-warning">
                            {plan.badge}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Text className="type-caption text-label-secondary">{plan.perMonthLabel}</Text>
                  </View>
                  <Text className="type-headline text-brand">{plan.priceLabel}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View className="border-t border-border/40 px-4 pt-3">
        <Pressable
          onPress={() => {
            void purchase();
          }}
          disabled={isPurchasing}
          accessibilityRole="button"
          accessibilityLabel="Оформить подписку"
          className="min-h-12 items-center justify-center rounded-2xl bg-brand px-5 active:opacity-80 disabled:opacity-60">
          {isPurchasing ? (
            <ActivityIndicator color={colors.onTint} />
          ) : (
            <Text className="type-headline text-onTint">Оформить подписку</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
