# Project SS

Мобильное приложение для молодых мам: рецепты детского питания, аллергены с заменами, гид по прикорму, конструктор сбалансированной тарелки и персональный онбординг.

Платформы: **iOS** и **Android** (Expo). Web используется для разработки.

## Идея

Помочь родителям уверенно кормить ребёнка — от первых месяцев до расширения рациона.

- **Рецепты** — по возрасту и приёму пищи, калории, ингредиенты, шаги, безопасная подача; часть контента premium.
- **Аллергены** — фильтры исключения в каталоге и bottom sheet с заменами на экране рецепта.
- **Гид по прикорму** — этапы введения с объёмами и ссылкой на медицинский источник (`sourceId` → `MedicalSource`).
- **Тарелки** — шаблоны сбалансированного рациона из Supabase с заменой продуктов и sync кастомизаций.
- **Профиль** — имя мамы, дата рождения ребёнка, персональное приветствие и возраст малыша на Home.
- **Premium** — paywall с mock-покупкой и UI-gate через `useEntitlement`.

## Текущая версия (v0.8 — Premium, plates sync, session restore)

Рецепты, этапы прикорма и шаблоны тарелок читаются из **Supabase**. Профили — `public.profiles` (триггер `on_auth_user_created`). Если `feeding_stages` пуст, гид падает обратно на `MOCK_FEEDING_STAGES`. Избранное и прогресс гида — Zustand + AsyncStorage; кастомизации тарелок — `user_plates` + локальные overrides.

Визуальный язык: `DESIGN.md` (**Care Rose**, light-only). Карточки — `bg-surface-elevated` + `shadow-sm`.

| Модуль | Статус |
| --- | --- |
| Auth email/пароль (Supabase) | готово (`/login`, SecureStore) |
| Восстановление сессии до рендера Stack | готово (`isRestoringSession` + `getSession`) |
| Онбординг + sync в `profiles` | готово |
| Защита роутов (auth → onboarding → app) | готово (`Stack.Protected`) |
| Home с именем и возрастом ребёнка | готово (+ banner Premium) |
| Каталог рецептов + фильтры + избранное | готово (meal toggle / sheet / chips) |
| Premium-gate рецептов | готово (`useEntitlement`, `PremiumLockCard`, `RecipeCard.isLocked`) |
| Paywall `/paywall` | готово (mock IAP → `subscription_*`) |
| Экран рецепта `/recipe/[id]` | готово |
| Аллергены: чипы + sheet с заменами | готово (локальные `MOCK_ALLERGENS`) |
| Гид по прикорму + прогресс «Введено» | готово (Supabase + mock fallback) |
| Тарелки из Supabase + `user_plates` | готово (`usePlateTemplates` / `useUserPlate` / `useSaveUserPlate`) |
| Push-токены после логина | готово (`expo-notifications` → `push_tokens`) |
| Очистка Zustand при signOut | готово (`clearLocalSessionStores`) |
| RLS: profiles / plates / push_tokens | готово (миграции в `supabase/migrations/`) |
| Дизайн: Care Rose | готово (`DESIGN.md`, `global.css`) |
| i18n | ещё нет |
| Реальные IAP (StoreKit / Play Billing) | ещё нет (mock grants) |

## Авторизация и безопасность

### Поток

1. Неавторизован → `/login` (вкладки «Вход» / «Регистрация»).
2. Авторизован, онбординг не пройден → `/onboarding`.
3. Авторизован + онбординг → основные экраны (`/`).

### Восстановление сессии (критично для cold start)

`AuthProvider` (`src/features/user/providers/AuthProvider.tsx`):

1. `isRestoringSession = true` по умолчанию.
2. `supabase.auth.getSession()` читает сессию из SecureStore.
3. Только после завершения → `isRestoringSession = false` и `markAuthSessionReady()`.
4. `onAuthStateChange` **только обновляет** `session`, не снимает флаг восстановления.

Пока сессия восстанавливается (или Zustand ещё не гидрирован), `_layout.tsx` / `(auth)/_layout.tsx` **не рендерят** `Stack` — пустой экран `bg-brand-soft`. Это убирает мигание `/login` и ошибку `REMOVE_ROUTES`.

Клиент: `src/shared/lib/supabase.ts`

- Persist: **expo-secure-store** (web — `localStorage`), `persistSession: true`.
- На старте вызывается `stopAutoRefresh()`.
- `AppState` вызывает `startAutoRefresh` / `stopAutoRefresh` **только после** `markAuthSessionReady()`.

### Login / Signup (`/login`)

- `signInWithPassword` / `signUp` (React Hook Form + Zod).
- Регистрация: Email, Пароль, Имя мамы (опционально).
- `emailRedirectTo: 'projectss://'` (scheme из `app.json`).
- Если confirm email включён и сессии нет — Alert «Подтвердите email».

**Supabase Dashboard → Authentication → URL Configuration:**

- Site URL — не `localhost`, а deep link / прод-URL
- Redirect URLs — `projectss://` (+ web-origin при необходимости)

### Онбординг (`/onboarding`)

- Имя мамы + дата рождения (`DatePickerField`: web = `<input type="date">`, native = DateTimePicker).
- Сначала проверка/запись в `profiles`, затем Zustand (`completeOnboarding`).
- При ошибке БД — откат локального `isOnboarded`.

### Выход (`/profile`)

1. Alert подтверждения.
2. `supabase.auth.signOut()`.
3. `queryClient.clear()`.
4. `resetUser()` + `clearLocalSessionStores` — сброс favorites, feeding progress, plate overrides.
5. Редирект на `/login`.

Сброс сторов идёт через `src/shared/lib/clearLocalSession.ts`; resetters прокидываются из `profile.tsx` (фичи не импортируют друг друга).

### RLS

Выполнить в SQL Editor (порядок не критичен, но лучше все):

| Файл | Что делает |
| --- | --- |
| `supabase/migrations/20251101_profiles_rls.sql` | `profiles`: SELECT/UPDATE только своей строки; колонки `mother_name`, `child_birth_date` (+ mock subscription — см. ниже); INSERT запрещён клиенту |
| `supabase/migrations/20251110_mock_subscription_grants.sql` | **Временно** разрешает UPDATE `subscription_start_date` / `subscription_end_date` для mock paywall. Убрать перед реальным IAP |
| `supabase/migrations/20251111_push_tokens.sql` | таблица `push_tokens` + RLS `auth.uid() = user_id` |
| `supabase/migrations/20251117_plates_rls.sql` | `plate_templates` SELECT-only; `user_plates` CRUD своих строк; unique `(user_id, template_id)` |

### Подписка и Premium

- `useSubscription` — читает `profiles.subscription_end_date`; `isPremium` = конец > сейчас (UTC epoch ms).
- `useEntitlement` — обёртка над подпиской; **весь premium UI гейтится только через него**.
- `/paywall` + `usePaywall` / `PaywallView` — mock-покупка пишет даты в `profiles` и инвалидирует query.
- Залоченные рецепты: `RecipeCard` (`isLocked`) + `PremiumLockCard` на детали; баннер на Home.

> Mock grants — временные. После StoreKit / Play Billing даты должен выставлять webhook / Edge Function; revoke колонок subscription у `authenticated`.

## Push-уведомления

- Плагин `expo-notifications` + `UIBackgroundModes: remote-notification` (iOS) + `googleServicesFile` (Android) в `app.json`.
- `src/shared/lib/notifications.ts` — регистрация токена; ошибки сети в `try/catch` (лог, без краша).
- После восстановления сессии `AuthProvider` upsert'ит токен в `push_tokens` (`onConflict: user_id`).

## Дизайн-система

Источник правды: `DESIGN.md` + `src/global.css` + `tailwind.config.js` + `src/theme/colors.ts`.

**Care Rose (light-only):**

- Акцент — `brand` / `brand-soft`; аллергены — `danger` / `danger-soft`; premium — `warning` / `warning-soft`.
- Текст на tint — `onTint`; фоны — `surface` / `surface-elevated`.
- Типографика: `type-title` / `type-headline` / `type-body` / `type-caption`.
- Карточки — `rounded-2xl bg-surface-elevated … shadow-sm`; фильтры — pills.

**Навигация:**

- Native Stack header: `recipes`, `recipe/[id]`, `feeding-guide`, `plates`, `profile`, `paywall` (modal).
- На `/recipes` при `hasActiveFilters` — «Сбросить» только в `headerRight`.

## Экраны и сценарии

### Home (`/`)

- «Привет, {имя}!» и возраст малыша
- Баннер Premium → `/paywall` (если нет entitlement)
- Ссылки: Рецепты, Гид по прикорму, Тарелки, Профиль

### Рецепты (`/recipes`)

**Данные:** `useRecipes` → Supabase `recipes` → `useRecipesFilters`.

**Шапка** (`RecipesFilters`): Избранное → meal chips (без «Все») → «Настроить фильтры».

**Логика** (`useRecipesFilters`): meal toggle в `null`; аллергены/ингредиенты multi-select (ингредиенты — **И**).

**Active chips** (`RecipesActiveFilters`): сброс по одному крестиком; полный сброс — только `headerRight`.

**Sheet** (`RecipesAdvancedFiltersSheet`): `enableDynamicSizing`, sticky «Готово» в `BottomSheetFooter` + safe area.

**Premium:** карточки с `isPremium` и без entitlement — locked; тап ведёт на paywall / lock UI.

### Рецепт (`/recipe/[id]`)

- Native header = название; секции через hairline.
- Аллергены + substitutes sheet.
- Названия продуктов — через `productNames` (русификация id → label).
- Premium без entitlement → `PremiumLockCard`.

### Профиль (`/profile`)

- Карточка мамы/ребёнка; «Выйти» с полной очисткой локальной сессии; long-press по версии → PIN админки.

### Гид по прикорму (`/feeding-guide`)

- `feeding_stages` + mock fallback; Switch «Введено»; источники из локального `SOURCES`.

### Тарелки (`/plates`, `/plate/[id]`)

- Шаблоны: `usePlateTemplates` → `plate_templates`.
- Кастомизация: `useUserPlate` / `useSaveUserPlate` → `user_plates` (`custom_slots` upsert по `user_id,template_id`).
- Локальные overrides в Zustand (сбрасываются при signOut).
- Деталь `/plate/[id]`: `isLoading` → индикатор; `isError` → «Не удалось загрузить вашу тарелку» + «Повторить» (`refetch`).

### Paywall (`/paywall`)

- Модальный экран планов (`paywallPlans`); mock purchase обновляет `subscription_*` и закрывает экран.

## Данные и API

### Supabase

Клиент: `src/shared/lib/supabase.ts`  
Переменные в `.env` (в `.gitignore`):

```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

| Таблица / сервис | Хук / место | Заметки |
| --- | --- | --- |
| Auth | `AuthProvider`, `useAuthSession`, `useLogin` | SecureStore; gate до `getSession` |
| `profiles` | онбординг, `useSubscription`, paywall | RLS + mock subscription grants |
| `recipes` | `useRecipes`, `useRecipe` | `mapRecipe`; `isPremium` |
| `feeding_stages` | `useFeedingGuide` | пустой список → mock |
| `plate_templates` | `usePlateTemplates` | SELECT для authenticated |
| `user_plates` | `useUserPlate`, `useSaveUserPlate` | свои строки; unique `(user_id, template_id)` |
| `push_tokens` | `AuthProvider` / `notifications.ts` | upsert по `user_id` |

После смены `.env`: `npx expo start -c`.

### Локальный persist (Zustand + AsyncStorage)

- `user-profile` — онбординг (после auth)
- `recipe-favorites` — избранное (`clearFavorites` на signOut)
- `feeding-guide-progress` — этапы (`clearProgress` на signOut)
- plate overrides — in-memory (`clearAllOverrides` на signOut)

Плюс на signOut: `queryClient.clear()`.

## Стек

- Expo SDK 58, React Native, TypeScript (strict)
- Expo Router (`src/app/`) + `Stack.Protected`
- NativeWind 4 + Tailwind CSS
- TanStack Query
- Zustand + persist + AsyncStorage
- Supabase JS + **expo-secure-store**
- **expo-notifications** (push tokens)
- `@gorhom/bottom-sheet`, DateTimePicker / `DatePickerField`, `@expo/vector-icons`
- React Hook Form + Zod

## Структура

```
src/
  app/
    _layout.tsx              # AuthProvider, hydration + isRestoringSession gate, Stack.Protected
    index.tsx
    (auth)/login.tsx
    (auth)/onboarding.tsx
    recipes.tsx
    recipe/[id].tsx
    feeding-guide.tsx
    plates.tsx
    plate/[id].tsx
    profile.tsx
    paywall.tsx
    admin.tsx
  features/
    recipes/                 # catalog, filters, favorites, PremiumLockCard
    feeding-guide/
    allergens/
    plates/                  # api/, hooks (templates/userPlate/save), store overrides
    user/                    # AuthProvider, login, onboarding, subscription, entitlement, paywall
    admin/
  shared/
    lib/supabase.ts          # SecureStore + gated autoRefresh
    lib/notifications.ts     # push token register (try/catch)
    lib/clearLocalSession.ts # signOut resetters
    lib/productNames.ts      # id → русские названия продуктов
    ui/DatePickerField.tsx
  theme/colors.ts
  types/domain.ts
  global.css
supabase/migrations/
  20251101_profiles_rls.sql
  20251110_mock_subscription_grants.sql
  20251111_push_tokens.sql
  20251117_plates_rls.sql
DESIGN.md
PRODUCT.md
```

Правила: `.agents/skills/AGENTS.md` — тонкие экраны, хуки в фичах, фичи не импортируют друг друга, рекомендации прикорма с `sourceId`, аллергены всегда с substitutes, premium только через `useEntitlement`.

## Доменные типы

В `src/types/domain.ts`:

- `MedicalSource`, `Allergen`, `Substitute`
- `Recipe` (+ `mealType`, `safeServing`, `isPremium`)
- `FeedingStage` (`sourceId` обязателен)
- `MealType`: `breakfast` | `lunch` | `dinner` | `snack`

`profiles` (Supabase): `id`, `mother_name`, `child_birth_date`, `subscription_start_date`, `subscription_end_date`.

Plates (Supabase): `plate_templates`, `user_plates` (`user_id`, `template_id`, `custom_slots`).

## Запуск

```bash
npm install
# положите .env с EXPO_PUBLIC_SUPABASE_URL и EXPO_PUBLIC_SUPABASE_ANON_KEY
# выполните SQL-миграции из supabase/migrations/ в Supabase SQL Editor
npx expo start
```

Туннель: `npx expo start --tunnel`  
Типы: `npx tsc --noEmit`  
Линт: `npx expo lint`

Для push на устройстве нужен **development build** / EAS (Expo Go ограниченно для native notifications).

## Что дальше

- Реальные IAP + revoke mock subscription grants
- Источники гида и аллергены из БД
- Profile как settings-list; hardened ADMIN_PIN
- i18n (все строки через translation keys)
- Retry push-токена при появлении сети
- Hydration профиля из Supabase на новом устройстве (уже частично через onboarding/`profiles`)
