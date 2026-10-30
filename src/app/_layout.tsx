import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAuthSession } from '@/features/user/hooks/useAuthSession';
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
  const { isReady: isAuthReady, isAuthenticated } = useAuthSession();
  const isOnboarded = useUserStore((state) => state.isOnboarded);

  if (!hydrated || !isAuthReady) {
    return <View className="flex-1 bg-brand-soft" />;
  }

  const canAccessApp = isAuthenticated && isOnboarded;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.brand,
        headerTitleStyle: { color: colors.label },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.surface },
      }}>
      <Stack.Protected
        guard={canAccessApp}
        redirectTo={isAuthenticated ? '/onboarding' : '/login'}>
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
        <Stack.Screen
          name="feeding-guide"
          options={{
            headerShown: true,
            headerTransparent: false,
            title: 'Гид по прикорму',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen
          name="plates"
          options={{
            headerShown: true,
            headerTransparent: false,
            title: 'Тарелки',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen name="plate/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            headerTransparent: false,
            title: 'Профиль',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!canAccessApp} redirectTo="/">
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
