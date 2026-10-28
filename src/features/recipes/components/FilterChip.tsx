import { Pressable, Text } from 'react-native';

type FilterChipProps = {
  label: string;
  selected: boolean;
  variant?: 'allergen' | 'ingredient' | 'meal';
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
      ? 'border-danger bg-danger'
      : 'border-brand bg-brand';
  const idleClassName = 'border-border bg-surface-elevated';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={`rounded-full border px-3 py-2 active:opacity-80 ${
        selected ? selectedClassName : idleClassName
      }`}>
      <Text
        className={`text-sm font-medium ${
          selected ? 'text-white' : 'text-label-secondary'
        }`}>
        {label}
      </Text>
    </Pressable>
  );
}
