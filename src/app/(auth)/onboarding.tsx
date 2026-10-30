import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboarding } from '@/features/user/hooks/useOnboarding';
import { DatePickerField } from '@/shared/ui/DatePickerField';

export default function OnboardingScreen() {
  const {
    motherName,
    childBirthDate,
    error,
    isSubmitting,
    setMotherName,
    handleChildBirthDateChange,
    submit,
  } = useOnboarding();

  return (
    <View className="flex-1 bg-rose-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 justify-center gap-6 px-6">
          <View className="gap-2">
            <Text className="text-3xl font-bold text-rose-500">Добро пожаловать</Text>
            <Text className="text-base text-stone-600">
              Расскажите немного о себе — так мы подстроим рекомендации под вас и малыша.
            </Text>
          </View>

          <View className="gap-4 rounded-3xl bg-white p-5 shadow-sm">
            <View className="gap-2">
              <Text className="text-sm font-medium text-stone-600">Имя мамы</Text>
              <TextInput
                value={motherName}
                onChangeText={setMotherName}
                placeholder="Анна"
                placeholderTextColor="#a8a29e"
                autoCapitalize="words"
                className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-stone-900"
              />
            </View>

            <View className="gap-2">
              <Text className="text-sm font-medium text-stone-600">Дата рождения ребёнка</Text>
              <DatePickerField
                value={childBirthDate}
                onChange={handleChildBirthDateChange}
                placeholder="Выберите дату"
              />
            </View>

            {error ? <Text className="text-sm text-red-600">{error}</Text> : null}
          </View>

          <Pressable
            onPress={() => {
              void submit();
            }}
            disabled={isSubmitting}
            className="items-center rounded-2xl bg-rose-500 px-5 py-4 active:opacity-80 disabled:opacity-60">
            <Text className="text-base font-semibold text-white">
              {isSubmitting ? 'Сохраняем…' : 'Начать'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
