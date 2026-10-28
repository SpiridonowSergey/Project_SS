import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useStoreHydration } from '@/features/user/hooks/useStoreHydration';
import { useUserStore } from '@/features/user/store';
import { colors } from '@/theme';

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
    return <View className="flex-1 bg-brand-soft" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.brand,
        headerTitleStyle: { color: colors.label },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.surface },
      }}>
      <Stack.Protected guard={isOnboarded} redirectTo="/onboarding">
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: ' ',
            headerBackTitle: ' ',
          }}
        />
        <Stack.Screen
          name="recipes"
          options={{
            headerShown: true,
            headerTransparent: false,
            title: 'Рецепты',
            headerBackTitle: 'Рецепты',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen
          name="recipe/[id]"
          options={{
            headerShown: true,
            headerTransparent: false,
            title: 'Рецепт',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen name="feeding-guide" options={{ headerShown: false }} />
        <Stack.Screen name="plates" options={{ headerShown: false }} />
        <Stack.Screen name="plate/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            title: 'Профиль',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isOnboarded} redirectTo="/">
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
