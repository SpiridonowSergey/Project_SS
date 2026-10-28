import { Ionicons } from '@expo/vector-icons';
import { Controller, useFieldArray } from 'react-hook-form';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAddRecipeForm } from '@/features/admin/hooks/useAddRecipeForm';
import {
  MEAL_TYPE_OPTIONS,
  UNIT_OPTIONS,
  parseOptionalNumber,
} from '@/features/admin/schemas/recipeFormSchema';

export function AddRecipeForm() {
  const { form, isSubmitting, submitForm } = useAddRecipeForm();
  const {
    control,
    formState: { errors },
  } = form;

  const ingredientsArray = useFieldArray({ control, name: 'ingredients' });
  const stepsArray = useFieldArray({ control, name: 'steps' });

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="gap-5 px-4 pb-10"
      keyboardShouldPersistTaps="handled">
      <Text className="text-xl font-semibold text-white">Добавить рецепт</Text>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">Название</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Пюре из кабачка"
              placeholderTextColor="#78716c"
              className="rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
            />
          )}
        />
        {errors.title ? <Text className="text-sm text-red-400">{errors.title.message}</Text> : null}
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1 gap-2">
          <Text className="text-sm font-medium text-stone-300">Возраст (мес.)</Text>
          <Controller
            control={control}
            name="minAgeMonths"
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
          {errors.minAgeMonths ? (
            <Text className="text-sm text-red-400">{errors.minAgeMonths.message}</Text>
          ) : null}
        </View>

        <View className="flex-1 gap-2">
          <Text className="text-sm font-medium text-stone-300">Ккал / 100 г</Text>
          <Controller
            control={control}
            name="caloriesPer100g"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={Number.isFinite(value) ? String(value) : ''}
                onChangeText={(text) => onChange(parseOptionalNumber(text))}
                onBlur={onBlur}
                keyboardType="decimal-pad"
                className="rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
              />
            )}
          />
          {errors.caloriesPer100g ? (
            <Text className="text-sm text-red-400">{errors.caloriesPer100g.message}</Text>
          ) : null}
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">Приём пищи</Text>
        <Controller
          control={control}
          name="mealType"
          render={({ field: { value, onChange } }) => (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {MEAL_TYPE_OPTIONS.map((option) => {
                  const selected = value === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => onChange(option.id)}
                      className={`rounded-full border px-3 py-2 ${
                        selected
                          ? 'border-rose-400 bg-rose-500'
                          : 'border-stone-600 bg-stone-800'
                      }`}>
                      <Text
                        className={`text-sm font-medium ${
                          selected ? 'text-white' : 'text-stone-300'
                        }`}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          )}
        />
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">Безопасная подача</Text>
        <Controller
          control={control}
          name="safeServing"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholder="Как безопасно давать блюдо"
              placeholderTextColor="#78716c"
              className="min-h-[88px] rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
            />
          )}
        />
      </View>

      <View className="flex-row items-center justify-between rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3">
        <Text className="text-base text-stone-200">Платный (Premium)</Text>
        <Controller
          control={control}
          name="isPremium"
          render={({ field: { value, onChange } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              trackColor={{ false: '#57534e', true: '#fda4af' }}
              thumbColor={value ? '#f43f5e' : '#fafaf9'}
            />
          )}
        />
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-stone-300">
          Аллергены (через запятую)
        </Text>
        <Controller
          control={control}
          name="allergenIdsText"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="milk, gluten"
              placeholderTextColor="#78716c"
              autoCapitalize="none"
              className="rounded-2xl border border-stone-700 bg-stone-800 px-4 py-3 text-base text-white"
            />
          )}
        />
      </View>

      <View className="gap-3">
        <Text className="text-base font-semibold text-white">Ингредиенты</Text>
        {ingredientsArray.fields.map((field, index) => (
          <View
            key={field.id}
            className="gap-3 rounded-2xl border border-stone-700 bg-stone-800 p-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-stone-300">#{index + 1}</Text>
              <Pressable
                onPress={() => ingredientsArray.remove(index)}
                disabled={ingredientsArray.fields.length === 1}
                className="p-1 active:opacity-70">
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={ingredientsArray.fields.length === 1 ? '#57534e' : '#fb7185'}
                />
              </Pressable>
            </View>

            <Controller
              control={control}
              name={`ingredients.${index}.productId`}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Название продукта"
                  placeholderTextColor="#78716c"
                  className="rounded-xl border border-stone-600 bg-stone-900 px-3 py-2.5 text-base text-white"
                />
              )}
            />

            <View className="flex-row gap-2">
              <Controller
                control={control}
                name={`ingredients.${index}.amount`}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={Number.isFinite(value) ? String(value) : ''}
                    onChangeText={(text) => onChange(parseOptionalNumber(text))}
                    onBlur={onBlur}
                    keyboardType="decimal-pad"
                    placeholder="Кол-во"
                    placeholderTextColor="#78716c"
                    className="flex-1 rounded-xl border border-stone-600 bg-stone-900 px-3 py-2.5 text-base text-white"
                  />
                )}
              />

              <Controller
                control={control}
                name={`ingredients.${index}.unit`}
                render={({ field: { value, onChange } }) => (
                  <View className="flex-row gap-1">
                    {UNIT_OPTIONS.map((unit) => {
                      const selected = value === unit;
                      return (
                        <Pressable
                          key={unit}
                          onPress={() => onChange(unit)}
                          className={`rounded-xl px-2.5 py-2.5 ${
                            selected ? 'bg-rose-500' : 'bg-stone-900'
                          }`}>
                          <Text
                            className={`text-sm font-medium ${
                              selected ? 'text-white' : 'text-stone-400'
                            }`}>
                            {unit}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              />
            </View>
          </View>
        ))}

        <Pressable
          onPress={() =>
            ingredientsArray.append({ productId: '', amount: 10, unit: 'g' })
          }
          className="items-center rounded-2xl border border-dashed border-stone-600 py-3 active:opacity-80">
          <Text className="text-sm font-medium text-rose-300">+ Добавить ингредиент</Text>
        </Pressable>
        {errors.ingredients ? (
          <Text className="text-sm text-red-400">
            {errors.ingredients.message || 'Проверьте ингредиенты'}
          </Text>
        ) : null}
      </View>

      <View className="gap-3">
        <Text className="text-base font-semibold text-white">Шаги приготовления</Text>
        {stepsArray.fields.map((field, index) => (
          <View
            key={field.id}
            className="gap-2 rounded-2xl border border-stone-700 bg-stone-800 p-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-medium text-stone-300">Шаг {index + 1}</Text>
              <Pressable
                onPress={() => stepsArray.remove(index)}
                disabled={stepsArray.fields.length === 1}
                className="p-1 active:opacity-70">
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={stepsArray.fields.length === 1 ? '#57534e' : '#fb7185'}
                />
              </Pressable>
            </View>
            <Controller
              control={control}
              name={`steps.${index}.text`}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  placeholder="Описание шага"
                  placeholderTextColor="#78716c"
                  className="min-h-[72px] rounded-xl border border-stone-600 bg-stone-900 px-3 py-2.5 text-base text-white"
                />
              )}
            />
          </View>
        ))}

        <Pressable
          onPress={() => stepsArray.append({ text: '' })}
          className="items-center rounded-2xl border border-dashed border-stone-600 py-3 active:opacity-80">
          <Text className="text-sm font-medium text-rose-300">+ Добавить шаг</Text>
        </Pressable>
        {errors.steps ? (
          <Text className="text-sm text-red-400">
            {errors.steps.message || 'Проверьте шаги'}
          </Text>
        ) : null}
      </View>

      <Pressable
        onPress={submitForm}
        disabled={isSubmitting}
        className="items-center rounded-2xl bg-rose-500 py-4 active:opacity-80 disabled:opacity-60">
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-base font-semibold text-white">Сохранить рецепт</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
