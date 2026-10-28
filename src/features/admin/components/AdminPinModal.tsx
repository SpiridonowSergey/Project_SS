import { Modal, Pressable, Text, TextInput, View } from 'react-native';

import { colors } from '@/theme';

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
      <View className="flex-1 items-center justify-center bg-label/40 px-6">
        <View className="w-full gap-4 rounded-3xl bg-surface-elevated p-5">
          <Text className="text-xl font-bold text-label">Вход в админку</Text>

          <TextInput
            value={pin}
            onChangeText={onChangePin}
            secureTextEntry
            keyboardType="number-pad"
            placeholder="PIN-код"
            placeholderTextColor={colors.labelMuted}
            className="rounded-2xl border border-border bg-surface px-4 py-3 text-base text-label"
          />

          {hasError ? <Text className="text-sm text-danger">Неверный код</Text> : null}

          <View className="flex-row gap-3">
            <Pressable
              onPress={onClose}
              className="flex-1 items-center rounded-2xl border border-border py-3.5 active:opacity-80">
              <Text className="text-base font-medium text-label-secondary">Отмена</Text>
            </Pressable>
            <Pressable
              onPress={onSubmit}
              className="flex-1 items-center rounded-2xl bg-brand py-3.5 active:opacity-80">
              <Text className="text-base font-semibold text-onTint">Войти</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
