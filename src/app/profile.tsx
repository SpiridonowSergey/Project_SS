import { Pressable, Text, View } from 'react-native';

import { AdminPinModal } from '@/features/admin/components/AdminPinModal';
import { APP_VERSION } from '@/features/admin/constants';
import { useAdminGate } from '@/features/admin/hooks/useAdminGate';
import { useProfileScreen } from '@/features/user/hooks/useProfileScreen';

export default function ProfileScreen() {
  const { motherName, childAgeLabel, childBirthDate } = useProfileScreen();
  const {
    isModalVisible,
    pin,
    hasError,
    setPin,
    openModal,
    closeModal,
    submitPin,
  } = useAdminGate();

  return (
    <View className="flex-1 bg-surface">
      <View className="flex-1 px-4 pb-6 pt-3">
        <View className="gap-3 rounded-2xl bg-surface-elevated p-5 shadow-sm">
          <Text className="text-lg font-semibold text-label">{motherName}</Text>
          {childAgeLabel ? (
            <Text className="text-base text-label-secondary">{childAgeLabel}</Text>
          ) : null}
          {childBirthDate ? (
            <Text className="text-sm text-label-muted">Дата рождения: {childBirthDate}</Text>
          ) : null}
        </View>

        <View className="flex-1" />

        <Pressable onLongPress={openModal} delayLongPress={800} className="items-center py-2">
          <Text className="text-xs text-label-muted">Версия приложения: {APP_VERSION}</Text>
        </Pressable>
      </View>

      <AdminPinModal
        visible={isModalVisible}
        pin={pin}
        hasError={hasError}
        onChangePin={setPin}
        onSubmit={submitPin}
        onClose={closeModal}
      />
    </View>
  );
}
