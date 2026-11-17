import { useQuery } from '@tanstack/react-query';

import { useAuthSession } from '@/features/user/hooks/useAuthSession';
import { supabase } from '@/shared/lib/supabase';

type SubscriptionResult = {
  isPremium: boolean;
  endDate: string | null;
};

export function subscriptionQueryKey(userId: string | null) {
  return ['profile', 'subscription', userId] as const;
}

async function fetchSubscription(userId: string): Promise<SubscriptionResult> {
  const { data, error } = await supabase
    .from('profiles')
    .select('subscription_end_date')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  const endDate =
    typeof data.subscription_end_date === 'string' ? data.subscription_end_date : null;

  // Parse as Date; getTime()/Date.now() are UTC epoch ms — comparable across timezones.
  const endMs = endDate != null ? new Date(endDate).getTime() : Number.NaN;
  const nowMs = new Date().getTime();
  const isPremium = Number.isFinite(endMs) && endMs > nowMs;

  return { isPremium, endDate };
}

export function useSubscription() {
  const { userId, isAuthenticated } = useAuthSession();

  const query = useQuery({
    queryKey: subscriptionQueryKey(userId),
    queryFn: () => fetchSubscription(userId!),
    enabled: isAuthenticated && userId != null,
  });

  return {
    isPremium: query.data?.isPremium ?? false,
    endDate: query.data?.endDate ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
