import { Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAddFeedingStageForm } from '@/features/admin/hooks/useAddFeedingStageForm';
import { parseOptionalNumber } from '@/features/admin/schemas/recipeFormSchema';
import type { MedicalSource } from '@/types/domain';

type AddFeedingStageFormProps = {
  sources: MedicalSource[];
};

export function AddFeedingStageForm({ sources }: AddFeedingStageFormProps) {
  const defaultSourceId = sources[0]?.id ?? '';
  const { form, isSubmitting, submitForm } = useAddFeedingStageForm(defaultSourceId);
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="gap-5 px-4 pb-10"
      keyboardShouldPersistTaps="handled">
      <Text className="text-xl font-semibold text-white">Добавить этап прикорма</Text>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">Возраст (мес.)</Text>
        <Controller
          control={control}
          name="ageMonths"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={Number.isFinite(value) ? String(value) : ''}
              onChangeText={(text) => onChange(parseOptionalNumber(text))}
              onBlur={onBlur}
              keyboardType="number-pad"
              className="rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
            />
          )}
        />
        {errors.ageMonths ? (
          <Text className="text-sm text-red-400">{errors.ageMonths.message}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">Группа продуктов</Text>
        <Controller
          control={control}
          name="productGroup"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Овощное пюре"
              placeholderTextColor="#78716c"
              className="rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
            />
          )}
        />
        {errors.productGroup ? (
          <Text className="text-sm text-red-400">{errors.productGroup.message}</Text>
        ) : null}
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1 gap-2">
          <Text className="text-sm font-medium text-stone-300">Стартовый объём</Text>
          <Controller
            control={control}
            name="startVolume"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="10-150 г"
                placeholderTextColor="#78716c"
                className="rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
              />
            )}
          />
          {errors.startVolume ? (
            <Text className="text-sm text-red-400">{errors.startVolume.message}</Text>
          ) : null}
        </View>

        <View className="flex-1 gap-2">
          <Text className="text-sm font-medium text-stone-300">Целевой объём</Text>
          <Controller
            control={control}
            name="targetVolume"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="150 г"
                placeholderTextColor="#78716c"
                className="rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
              />
            )}
          />
          {errors.targetVolume ? (
            <Text className="text-sm text-red-400">{errors.targetVolume.message}</Text>
          ) : null}
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">Источник</Text>
        <Controller
          control={control}
          name="sourceId"
          render={({ field: { value, onChange } }) => (
            <View className="gap-2">
              {sources.map((source) => {
                const selected = value === source.id;
                return (
                  <Pressable
                    key={source.id}
                    onPress={() => onChange(source.id)}
                    className={`rounded-2xl border px-4 py-3 ${
                      selected
                        ? 'border-rose-400 bg-rose-500/20'
                        : 'border-stone-700 bg-stone-800'
                    }`}>
                    <Text
                      className={`text-base font-medium ${
                        selected ? 'text-rose-200' : 'text-stone-200'
                      }`}>
                      {source.title}
                    </Text>
                    <Text className="mt-1 text-xs text-stone-400">{source.organization}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
        {errors.sourceId ? (
          <Text className="text-sm text-red-400">{errors.sourceId.message}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">Примечания</Text>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholder="Дополнительные рекомендации"
              placeholderTextColor="#78716c"
              className="min-h-[96px] rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
            />
          )}
        />
      </View>

      <Pressable
        onPress={submitForm}
        disabled={isSubmitting}
        className="items-center rounded-2xl bg-rose-500 py-4 active:opacity-80 disabled:opacity-60">
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-base font-semibold text-white">Сохранить этап</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
