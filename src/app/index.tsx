import { Ionicons } from '@expo/vector-icons';
import { type Href, Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useEntitlement } from '@/features/user/hooks/useEntitlement';
import { useHomeGreeting } from '@/features/user/hooks/useHomeGreeting';
import { colors } from '@/theme';

const PAYWALL_HREF = '/paywall' as Href;

type HomeLink = {
  href: '/recipes' | '/feeding-guide' | '/plates' | '/profile';
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const HOME_LINKS: HomeLink[] = [
  {
    href: '/recipes',
    title: 'Рецепты',
    subtitle: 'Блюда по возрасту, калории и аллергены',
    icon: 'restaurant-outline',
  },
  {
    href: '/feeding-guide',
    title: 'Гид по прикорму',
    subtitle: 'Этапы введения продуктов с рождения',
    icon: 'book-outline',
  },
  {
    href: '/plates',
    title: 'Тарелки',
    subtitle: 'Конструктор сбалансированной тарелки',
    icon: 'grid-outline',
  },
  {
    href: '/profile',
    title: 'Профиль',
    subtitle: 'Данные мамы и малыша',
    icon: 'person-outline',
  },
];

export default function HomeScreen() {
  const { greeting, childAgeLabel } = useHomeGreeting();
  const { isPremium } = useEntitlement();

  return (
    <View className="flex-1 bg-surface">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 justify-center gap-6 px-4">
          <View className="gap-2">
            <Text className="type-title text-brand">{greeting}</Text>
            {childAgeLabel ? (
              <Text className="type-body text-label-secondary">{childAgeLabel}</Text>
            ) : null}
          </View>

          {!isPremium ? (
            <Link href={PAYWALL_HREF} asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Оформить Premium"
                className="flex-row items-center gap-3 rounded-2xl bg-warning-soft p-4 active:opacity-80">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-surface-elevated">
                  <Ionicons name="diamond" size={22} color={colors.warning} />
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="type-headline text-warning">Оформить Premium</Text>
                  <Text className="mt-1 type-caption text-warning">
                    Все рецепты, замены аллергенов и гид
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.warning} />
              </Pressable>
            </Link>
          ) : null}

          <View className="gap-3">
            {HOME_LINKS.map((link) => (
              <Link key={link.href} href={link.href} asChild>
                <Pressable className="flex-row items-center gap-4 rounded-2xl bg-surface-elevated p-4 shadow-sm active:opacity-80">
                  <View className="h-11 w-11 items-center justify-center rounded-full bg-brand-soft">
                    <Ionicons name={link.icon} size={22} color={colors.brand} />
                  </View>
                  <View className="flex-1">
                    <Text className="type-headline text-label">{link.title}</Text>
                    <Text className="mt-1 type-caption text-label-secondary">{link.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.labelMuted} />
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
