import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import {
  PAYWALL_PLANS,
  addMonthsUtc,
  type PaywallPlanId,
} from '@/features/user/constants/paywallPlans';
import { useAuthSession } from '@/features/user/hooks/useAuthSession';
import { subscriptionQueryKey } from '@/features/user/hooks/useSubscription';
import { supabase } from '@/shared/lib/supabase';

export function usePaywall() {
  const { userId } = useAuthSession();
  const queryClient = useQueryClient();
  const [selectedPlanId, setSelectedPlanId] = useState<PaywallPlanId>('12');
  const [isPurchasing, setIsPurchasing] = useState(false);

  const selectedPlan =
    PAYWALL_PLANS.find((plan) => plan.id === selectedPlanId) ?? PAYWALL_PLANS[2];

  async function purchase() {
    if (!userId) {
      Alert.alert('Ошибка', 'Войдите в аккаунт, чтобы оформить подписку');
      return;
    }

    setIsPurchasing(true);

    const start = new Date();
    const end = addMonthsUtc(start, selectedPlan.months);

    const { data: updated, error } = await supabase
      .from('profiles')
      .update({
        subscription_start_date: start.toISOString(),
        subscription_end_date: end.toISOString(),
      })
      .eq('id', userId)
      .select('id');

    if (error || !updated?.length) {
      setIsPurchasing(false);
      Alert.alert('Ошибка', error?.message ?? 'Не удалось оформить подписку');
      return;
    }

    await queryClient.invalidateQueries({ queryKey: subscriptionQueryKey(userId) });
    setIsPurchasing(false);

    Alert.alert('Подписка оформлена!', 'Premium доступен на всех устройствах с этим аккаунтом.', [
      {
        text: 'Отлично',
        onPress: () => {
          router.back();
        },
      },
    ]);
  }

  return {
    plans: PAYWALL_PLANS,
    selectedPlanId,
    setSelectedPlanId,
    isPurchasing,
    purchase,
  };
}
