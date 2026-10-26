import { Pressable, Text } from 'react-native';

type FilterChipProps = {
  label: string;
  selected: boolean;
  variant?: 'allergen' | 'ingredient';
  onPress: () => void;
};

export function FilterChip({
  label,
  selected,
  variant = 'ingredient',
  onPress,
}: FilterChipProps) {
  const selectedClassName =
    variant === 'allergen'
      ? 'border-red-500 bg-red-500'
      : 'border-rose-500 bg-rose-500';
  const selectedTextClassName = 'text-white';
  const idleClassName = 'border-stone-200 bg-white';
  const idleTextClassName = 'text-stone-700';

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-3 py-2 active:opacity-80 ${
        selected ? selectedClassName : idleClassName
      }`}>
      <Text
        className={`text-sm font-medium ${
          selected ? selectedTextClassName : idleTextClassName
        }`}>
        {label}
      </Text>
    </Pressable>
  );
}
