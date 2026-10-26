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

export function useOnboarding() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const setStoredChildBirthDate = useUserStore((state) => state.setChildBirthDate);

  const [motherName, setMotherName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function submit() {
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
    completeOnboarding({
      motherName: trimmedName,
      childBirthDate,
    });
    router.replace('/');
  }

  return {
    motherName,
    displayDate,
    selectedDate,
    isDatePickerVisible,
    error,
    setMotherName,
    openDatePicker,
    closeDatePicker,
    handleDateChange,
    submit,
  };
}
