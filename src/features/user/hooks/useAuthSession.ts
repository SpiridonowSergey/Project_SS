import { useAuthContext } from '@/features/user/providers/AuthProvider';

/** Shared auth session from AuthProvider — subscribe once at the app root. */
export function useAuthSession() {
  return useAuthContext();
}
