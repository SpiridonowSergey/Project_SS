import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useStoreHydration } from '@/features/user/hooks/useStoreHydration';
import { useUserStore } from '@/features/user/store';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const hydrated = useStoreHydration();
  const isOnboarded = useUserStore((state) => state.isOnboarded);

  if (!hydrated) {
    return <View className="flex-1 bg-rose-50" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isOnboarded} redirectTo="/onboarding">
        <Stack.Screen name="index" />
        <Stack.Screen name="recipes" />
        <Stack.Screen name="recipe/[id]" />
        <Stack.Screen name="feeding-guide" />
        <Stack.Screen name="plates" />
        <Stack.Screen name="plate/[id]" />
      </Stack.Protected>

      <Stack.Protected guard={!isOnboarded} redirectTo="/">
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
