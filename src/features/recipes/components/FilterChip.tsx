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
      className={`min-h-11 items-center justify-center rounded-full border px-3.5 active:opacity-80 ${
        selected ? selectedClassName : idleClassName
      }`}>
      <Text
        className={`type-caption font-medium ${
          selected ? 'text-onTint' : 'text-label-secondary'
        }`}>
        {label}
      </Text>
    </Pressable>
  );
}
