import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { createElement, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

type DatePickerFieldProps = {
  value: string;
  onChange: (isoDate: string) => void;
  placeholder?: string;
  maximumDate?: Date;
};

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

const MONTHS_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
] as const;

function formatDisplayDate(value: string) {
  const date = parseIsoDate(value);
  if (!date) {
    return null;
  }

  return `${date.getDate()} ${MONTHS_RU[date.getMonth()]} ${date.getFullYear()}`;
}

export function DatePickerField({
  value,
  onChange,
  placeholder = 'Выберите дату',
  maximumDate = new Date(),
}: DatePickerFieldProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const selectedDate = parseIsoDate(value) ?? new Date();
  const displayDate = formatDisplayDate(value);
  const maxIsoDate = toIsoDate(maximumDate);

  if (Platform.OS === 'web') {
    return createElement('input', {
      type: 'date',
      value: value || '',
      max: maxIsoDate,
      onChange: (event: { target: { value: string } }) => {
        const nextValue = event.target.value;
        if (!nextValue) {
          return;
        }
        onChange(nextValue);
      },
      className:
        'min-h-11 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none',
    });
  }

  function handleNativeChange(event: DateTimePickerEvent, date?: Date) {
    if (Platform.OS === 'android') {
      setIsPickerVisible(false);
    }

    if (event.type === 'dismissed' || !date) {
      return;
    }

    onChange(toIsoDate(date));
  }

  return (
    <View className="gap-2">
      <Pressable
        onPress={() => setIsPickerVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={placeholder}
        className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 active:opacity-80">
        <Text className={`text-base ${displayDate ? 'text-stone-900' : 'text-stone-400'}`}>
          {displayDate ?? placeholder}
        </Text>
      </Pressable>

      {isPickerVisible ? (
        <View className="overflow-hidden rounded-2xl bg-stone-50">
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={maximumDate}
            onChange={handleNativeChange}
          />
          {Platform.OS === 'ios' ? (
            <Pressable
              onPress={() => setIsPickerVisible(false)}
              accessibilityRole="button"
              accessibilityLabel="Готово"
              className="items-center border-t border-stone-200 py-3 active:opacity-70">
              <Text className="text-sm font-semibold text-rose-500">Готово</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
