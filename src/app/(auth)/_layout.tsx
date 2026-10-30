import { Stack } from 'expo-router';

import { useAuthSession } from '@/features/user/hooks/useAuthSession';
import { colors } from '@/theme';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthSession();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.surface },
      }}>
      <Stack.Protected guard={!isAuthenticated} redirectTo="/onboarding">
        <Stack.Screen name="login" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated} redirectTo="/login">
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
    </Stack>
  );
}
