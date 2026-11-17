import { router } from 'expo-router';
import { useState } from 'react';

import { useUserStore } from '@/features/user/store';
import { isValidIsoDate } from '@/features/user/utils/formatChildAge';
import { supabase } from '@/shared/lib/supabase';

export function useOnboarding() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const setStoredChildBirthDate = useUserStore((state) => state.setChildBirthDate);

  const [motherName, setMotherName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChildBirthDateChange(isoDate: string) {
    setChildBirthDate(isoDate);
    setStoredChildBirthDate(isoDate);
    setError(null);
  }

  async function submit() {
    const trimmedName = motherName.trim();

    if (!trimmedName) {
      setError('Введите имя мамы');
      return;
    }

    if (!isValidIsoDate(childBirthDate)) {
      setError('Выберите дату рождения ребёнка');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setIsSubmitting(false);
      setError(userError?.message ?? 'Не удалось определить пользователя');
      return;
    }

    const { data: updated, error: profileError } = await supabase
      .from('profiles')
      .update({
        mother_name: trimmedName,
        child_birth_date: childBirthDate,
      })
      .eq('id', user.id)
      .select('id');

    if (profileError || !updated?.length) {
      setIsSubmitting(false);
      setError(profileError?.message ?? 'Профиль не найден');
      return;
    }

    completeOnboarding({
      motherName: trimmedName,
      childBirthDate,
    });
    setIsSubmitting(false);
    router.replace('/');
  }

  return {
    motherName,
    childBirthDate,
    error,
    isSubmitting,
    setMotherName,
    handleChildBirthDateChange,
    submit,
  };
}
