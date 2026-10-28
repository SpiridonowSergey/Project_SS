import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 px-4 pb-6 pt-4">
          <Pressable onPress={() => router.back()} className="mb-4 self-start active:opacity-70">
            <Text className="text-base font-medium text-rose-500">Назад</Text>
          </Pressable>

          <Text className="text-3xl font-bold text-stone-900">Профиль</Text>

          <View className="mt-6 gap-3 rounded-2xl bg-white p-5 shadow-sm">
            <Text className="text-lg font-semibold text-stone-900">{motherName}</Text>
            {childAgeLabel ? (
              <Text className="text-base text-stone-600">{childAgeLabel}</Text>
            ) : null}
            {childBirthDate ? (
              <Text className="text-sm text-stone-400">Дата рождения: {childBirthDate}</Text>
            ) : null}
          </View>

          <View className="flex-1" />

          <Pressable onLongPress={openModal} delayLongPress={800} className="items-center py-2">
            <Text className="text-xs text-stone-400">Версия приложения: {APP_VERSION}</Text>
          </Pressable>
        </View>
      </SafeAreaView>

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
