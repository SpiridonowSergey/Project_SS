import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { AdminPinModal } from '@/features/admin/components/AdminPinModal';
import { APP_VERSION } from '@/features/admin/constants';
import { useAdminGate } from '@/features/admin/hooks/useAdminGate';
import { useProfileScreen } from '@/features/user/hooks/useProfileScreen';
import { colors } from '@/theme';

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
      <View className="flex-1 px-4 pb-8 pt-3">
        <View className="rounded-2xl bg-surface-elevated p-4 shadow-sm">
          <View className="flex-row items-start gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-brand-soft">
              <Ionicons name="person-outline" size={22} color={colors.brand} />
            </View>

            <View className="min-w-0 flex-1 gap-3">
              <View>
                <Text className="type-caption text-label-secondary">Данные мамы и ребёнка</Text>
                <Text className="mt-1 type-headline text-label">{motherName}</Text>
              </View>

              {childAgeLabel ? (
                <View className="border-t border-border/30 pt-3">
                  <Text className="type-caption text-label-secondary">Возраст ребёнка</Text>
                  <Text className="mt-1 type-body text-label">{childAgeLabel}</Text>
                </View>
              ) : null}

              {childBirthDate ? (
                <View className="border-t border-border/30 pt-3">
                  <Text className="type-caption text-label-secondary">Дата рождения</Text>
                  <Text className="mt-1 type-body text-label">{childBirthDate}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <View className="flex-1" />

        <Pressable
          onLongPress={openModal}
          delayLongPress={800}
          accessibilityRole="button"
          accessibilityLabel={`Версия приложения ${APP_VERSION}`}
          className="min-h-11 items-center justify-center py-3 active:opacity-70">
          <Text className="type-caption text-label-secondary">
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
