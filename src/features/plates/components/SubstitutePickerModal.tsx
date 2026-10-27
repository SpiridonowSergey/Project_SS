import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import { CATEGORY_LABELS } from '@/features/plates/categoryLabels';
import type { PlateCategory } from '@/features/plates/mockData';

type SubstitutePickerModalProps = {
  category: PlateCategory;
  currentProductName: string;
  substitutes: string[];
  onSelect: (productName: string) => void;
  onClose: () => void;
};

export function SubstitutePickerModal({
  category,
  currentProductName,
  substitutes,
  onSelect,
  onClose,
}: SubstitutePickerModalProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%', '70%'], []);
  const options = substitutes.filter((name) => name !== currentProductName);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: '#d6d3d1' }}
      backgroundStyle={{ backgroundColor: '#fff' }}>
      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        <Text className="text-2xl font-bold text-stone-900">Замена</Text>
        <Text className="mt-2 text-sm text-stone-500">
          Категория «{CATEGORY_LABELS[category]}» сохранится — баланс тарелки не нарушится.
        </Text>
        <Text className="mt-1 text-sm text-stone-400">Сейчас: {currentProductName}</Text>

        <View className="mt-5 gap-2">
          {options.map((productName) => (
            <Pressable
              key={productName}
              onPress={() => {
                onSelect(productName);
                sheetRef.current?.close();
                onClose();
              }}
              className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 active:opacity-80">
              <Text className="text-base font-medium text-stone-800">{productName}</Text>
            </Pressable>
          ))}

          {options.length === 0 ? (
            <Text className="text-sm text-stone-500">Нет доступных замен в этой категории</Text>
          ) : null}
        </View>

        <Pressable
          onPress={() => {
            sheetRef.current?.close();
            onClose();
          }}
          className="mt-6 items-center rounded-2xl bg-rose-500 px-5 py-3.5 active:opacity-80">
          <Text className="text-base font-semibold text-white">Закрыть</Text>
        </Pressable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
