import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { useUserStore } from '@/features/user/store';
import { formatChildAge } from '@/features/user/utils/formatChildAge';
import { supabase } from '@/shared/lib/supabase';

export function useProfileScreen() {
  const motherName = useUserStore((state) => state.motherName);
  const childBirthDate = useUserStore((state) => state.childBirthDate);
  const resetUser = useUserStore((state) => state.resetUser);
  const childAge = formatChildAge(childBirthDate);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  async function performSignOut() {
    setIsSigningOut(true);
    setSignOutError(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsSigningOut(false);
      setSignOutError(error.message);
      return;
    }

    resetUser();
    setIsSigningOut(false);
    router.replace('/login');
  }

  function signOut() {
    Alert.alert('Выйти из аккаунта', 'Вы уверены, что хотите выйти?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Выйти',
        style: 'destructive',
        onPress: () => {
          void performSignOut();
        },
      },
    ]);
  }

  return {
    motherName: motherName || 'Мама',
    childBirthDate,
    childAgeLabel: childAge ? `Малышу ${childAge}` : null,
    isSigningOut,
    signOutError,
    signOut,
  };
}
