import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform } from 'react-native';

import { useUserStore } from '@/features/user/store';
import {
  formatDisplayDate,
  isValidIsoDate,
  parseIsoDate,
  toIsoDate,
} from '@/features/user/utils/formatChildAge';
import { supabase } from '@/shared/lib/supabase';

export function useOnboarding() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const setIsOnboarded = useUserStore((state) => state.setIsOnboarded);
  const setStoredChildBirthDate = useUserStore((state) => state.setChildBirthDate);

  const [motherName, setMotherName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDate = parseIsoDate(childBirthDate) ?? new Date();
  const displayDate = formatDisplayDate(childBirthDate);

  function openDatePicker() {
    setIsDatePickerVisible(true);
  }

  function closeDatePicker() {
    setIsDatePickerVisible(false);
  }

  function handleDateChange(event: DateTimePickerEvent, date?: Date) {
    if (Platform.OS === 'android') {
      setIsDatePickerVisible(false);
    }

    if (event.type === 'dismissed' || !date) {
      return;
    }

    const isoDate = toIsoDate(date);
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

    completeOnboarding({
      motherName: trimmedName,
      childBirthDate,
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setIsOnboarded(false);
      setIsSubmitting(false);
      setError(userError?.message ?? 'Не удалось определить пользователя');
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        mother_name: trimmedName,
        child_birth_date: childBirthDate,
      })
      .eq('id', user.id);

    if (profileError) {
      setIsOnboarded(false);
      setIsSubmitting(false);
      setError(profileError.message);
      return;
    }

    setIsSubmitting(false);
    router.replace('/');
  }

  return {
    motherName,
    displayDate,
    selectedDate,
    isDatePickerVisible,
    error,
    isSubmitting,
    setMotherName,
    openDatePicker,
    closeDatePicker,
    handleDateChange,
    submit,
  };
}
