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
      <View className="flex-1 pt-2">
        <View className="border-b border-border/50 bg-surface-elevated px-4 py-4">
          <Text className="type-headline text-label">{motherName}</Text>
          {childAgeLabel ? (
            <Text className="mt-1 type-body text-label-secondary">{childAgeLabel}</Text>
          ) : null}
          {childBirthDate ? (
            <Text className="mt-1 type-caption text-label-muted">
              Дата рождения: {childBirthDate}
            </Text>
          ) : null}
        </View>

        <View className="flex-1" />

        <Pressable
          onLongPress={openModal}
          delayLongPress={800}
          accessibilityRole="text"
          className="items-center py-4">
          <Text className="type-caption text-label-muted">
            Версия приложения: {APP_VERSION}
          </Text>
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
