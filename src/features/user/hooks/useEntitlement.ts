import { useSubscription } from '@/features/user/hooks/useSubscription';

/** Gate premium UI only through this hook (see AGENTS.md). */
export function useEntitlement() {
  const subscription = useSubscription();

  return {
    isPremium: subscription.isPremium,
    endDate: subscription.endDate,
    isLoading: subscription.isLoading,
    isError: subscription.isError,
    refetch: subscription.refetch,
  };
}
