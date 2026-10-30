import { useQuery } from '@tanstack/react-query';

import { useAuthSession } from '@/features/user/hooks/useAuthSession';
import { supabase } from '@/shared/lib/supabase';

type SubscriptionResult = {
  isPremium: boolean;
  endDate: string | null;
};

async function fetchSubscription(userId: string): Promise<SubscriptionResult> {
  const { data, error } = await supabase
    .from('profiles')
    .select('subscription_end_date')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  const endDate = data.subscription_end_date ?? null;
  const isPremium = endDate != null && new Date(endDate).getTime() > Date.now();

  return { isPremium, endDate };
}

export function useSubscription() {
  const { userId, isAuthenticated } = useAuthSession();

  const query = useQuery({
    queryKey: ['profile', 'subscription', userId],
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
