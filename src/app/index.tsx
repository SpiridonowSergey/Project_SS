import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-rose-50">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 justify-center gap-6 px-6">
          <Text className="text-3xl font-bold text-rose-500">Привет, мама!</Text>

          <Pressable className="rounded-2xl bg-white p-5 shadow-sm active:opacity-80">
            <Text className="text-lg font-semibold text-stone-800">Рецепты</Text>
            <Text className="mt-1 text-sm text-stone-500">
              Блюда по возрасту, калории и аллергены
            </Text>
          </Pressable>

          <Pressable className="rounded-2xl bg-white p-5 shadow-sm active:opacity-80">
            <Text className="text-lg font-semibold text-stone-800">Гид по прикорму</Text>
            <Text className="mt-1 text-sm text-stone-500">
              Этапы введения продуктов с рождения
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
