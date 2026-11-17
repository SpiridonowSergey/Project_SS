import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAuthSession } from '@/features/user/hooks/useAuthSession';
import { useStoreHydration } from '@/features/user/hooks/useStoreHydration';
import { AuthProvider } from '@/features/user/providers/AuthProvider';
import { useUserStore } from '@/features/user/store';
import { colors } from '@/theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const hydrated = useStoreHydration();
  const { isRestoringSession, isAuthenticated } = useAuthSession();
  const isOnboarded = useUserStore((state) => state.isOnboarded);

  // Wait for SecureStore session + Zustand hydrate before Stack.Protected,
  // otherwise guards flip logged-out → logged-in and trigger REMOVE_ROUTES.
  if (!hydrated || isRestoringSession) {
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
        <Stack.Screen
          name="paywall"
          options={{
            headerShown: true,
            headerTransparent: false,
            presentation: 'modal',
            title: 'Premium',
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
