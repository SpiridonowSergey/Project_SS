import { router } from 'expo-router';
import { useState } from 'react';

import { ADMIN_PIN } from '@/features/admin/constants';

export function useAdminGate() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [hasError, setHasError] = useState(false);

  function openModal() {
    setPin('');
    setHasError(false);
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
    setPin('');
    setHasError(false);
  }

  function submitPin() {
    if (pin === ADMIN_PIN) {
      closeModal();
      router.push('/admin');
      return;
    }

    setHasError(true);
    setPin('');
  }

  return {
    isModalVisible,
    pin,
    hasError,
    setPin,
    openModal,
    closeModal,
    submitPin,
  };
}
