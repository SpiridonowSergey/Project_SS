import { router } from 'expo-router';
import { useState } from 'react';

import { useUserStore } from '@/features/user/store';
import { isValidIsoDate } from '@/features/user/utils/formatChildAge';

export function useOnboarding() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const [motherName, setMotherName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const trimmedName = motherName.trim();

    if (!trimmedName) {
      setError('Введите имя мамы');
      return;
    }

    if (!isValidIsoDate(childBirthDate)) {
      setError('Введите дату в формате ГГГГ-ММ-ДД');
      return;
    }

    setError(null);
    completeOnboarding({
      motherName: trimmedName,
      childBirthDate,
    });
    router.replace('/');
  }

  return {
    motherName,
    childBirthDate,
    error,
    setMotherName,
    setChildBirthDate,
    submit,
  };
}
