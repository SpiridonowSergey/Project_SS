import { Modal, Pressable, Text, TextInput, View } from 'react-native';

type AdminPinModalProps = {
  visible: boolean;
  pin: string;
  hasError: boolean;
  onChangePin: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export function AdminPinModal({
  visible,
  pin,
  hasError,
  onChangePin,
  onSubmit,
  onClose,
}: AdminPinModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/40 px-6">
        <View className="w-full gap-4 rounded-3xl bg-white p-5">
          <Text className="text-xl font-bold text-stone-900">Вход в админку</Text>

          <TextInput
            value={pin}
            onChangeText={onChangePin}
            secureTextEntry
            keyboardType="number-pad"
            placeholder="PIN-код"
            placeholderTextColor="#a8a29e"
            className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-stone-900"
          />

          {hasError ? <Text className="text-sm text-red-600">Неверный код</Text> : null}

          <View className="flex-row gap-3">
            <Pressable
              onPress={onClose}
              className="flex-1 items-center rounded-2xl border border-stone-200 py-3.5 active:opacity-80">
              <Text className="text-base font-medium text-stone-600">Отмена</Text>
            </Pressable>
            <Pressable
              onPress={onSubmit}
              className="flex-1 items-center rounded-2xl bg-rose-500 py-3.5 active:opacity-80">
              <Text className="text-base font-semibold text-white">Войти</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
