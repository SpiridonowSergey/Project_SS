import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { Allergen } from '@/types/domain';

type AllergenModalProps = {
  allergen: Allergen;
  onClose: () => void;
};

export function AllergenModal({ allergen, onClose }: AllergenModalProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['42%', '65%'], []);

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
        <Text className="text-2xl font-bold text-stone-900">{allergen.label}</Text>
        <Text className="mt-2 text-sm text-stone-500">
          Возможные замены — обсудите с педиатром перед введением.
        </Text>

        <View className="mt-5 gap-3">
          <Text className="text-base font-semibold text-stone-800">Замены</Text>
          {allergen.substitutes.map((substitute) => (
            <View
              key={`${allergen.id}-${substitute.productId}`}
              className="rounded-2xl bg-rose-50 px-4 py-3">
              <Text className="text-base font-medium text-stone-900">{substitute.productId}</Text>
              <Text className="mt-1 text-sm text-stone-600">{substitute.note}</Text>
            </View>
          ))}
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
