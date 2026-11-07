# Project SS

Мобильное приложение для молодых мам: рецепты детского питания, аллергены с заменами, гид по прикорму, конструктор сбалансированной тарелки и персональный онбординг.

Платформы: **iOS** и **Android** (Expo). Web используется для разработки.

## Идея

Помочь родителям уверенно кормить ребёнка — от первых месяцев до расширения рациона.

- **Рецепты** — по возрасту и приёму пищи, калории, ингредиенты, шаги, безопасная подача; часть контента premium.
- **Аллергены** — фильтры исключения в каталоге и bottom sheet с заменами на экране рецепта.
- **Гид по прикорму** — этапы введения с объёмами и ссылкой на медицинский источник (`sourceId` → `MedicalSource`).
- **Тарелки** — шаблоны сбалансированного рациона с заменой продуктов внутри категории.
- **Профиль** — имя мамы, дата рождения ребёнка, персональное приветствие и возраст малыша на Home.

## Текущая версия (v0.7 — Auth + profiles)

Рецепты и этапы прикорма читаются из **Supabase**. Профили пользователей — таблица `public.profiles` (создаётся триггером `on_auth_user_created` при регистрации). Если `feeding_stages` пуст, гид падает обратно на локальный `MOCK_FEEDING_STAGES`. Локально остаются моки аллергенов, источников гида и шаблонов тарелок; избранное и прогресс гида — в Zustand + AsyncStorage.

Визуальный язык зафиксирован в `DESIGN.md` (**Care Rose**, light-only). Клиентские поверхности используют elevated-карточки `bg-surface-elevated` + `shadow-sm`.

| Модуль | Статус |
| --- | --- |
| Auth email/пароль (Supabase) | готово (`/login`, SecureStore-сессия) |
| Онбординг + sync в `profiles` | готово |
| Защита роутов (auth → onboarding → app) | готово (`Stack.Protected`) |
| Home с именем и возрастом ребёнка | готово (soft cards) |
| Каталог рецептов + фильтры + избранное | готово (Supabase; meal toggle / sheet / active chips) |
| Экран рецепта `/recipe/[id]` | готово (flat sections под native header) |
| Аллергены: чипы + bottom sheet с заменами | готово (локальные `MOCK_ALLERGENS`) |
| Гид по прикорму + прогресс «Введено» | готово (Supabase + mock fallback, прогресс persist) |
| Конструктор тарелок | готово (моки шаблонов, soft cards) |
| Подписка (`useSubscription`) | готово (чтение `subscription_end_date`) |
| RLS для `profiles` | готово (SQL-миграция в репо) |
| Дизайн: токены + type ramp + Care Rose | готово (`DESIGN.md`, `global.css`) |
| i18n | ещё нет |
| Entitlements / premium-gate в UI | ещё нет (`useSubscription` есть; gate через `useEntitlement` — нет) |

## Авторизация и безопасность

### Поток

1. Неавторизован → `/login` (вкладки «Вход» / «Регистрация»).
2. Авторизован, онбординг не пройден → `/onboarding`.
3. Авторизован + онбординг → основные экраны (`/`).

Сессия: `supabase.auth.onAuthStateChange` в `useAuthSession`; persist через **expo-secure-store** (на web — `localStorage`) в `src/shared/lib/supabase.ts`.

### Login / Signup (`/login`)

- `signInWithPassword` / `signUp` (React Hook Form + Zod).
- Регистрация: Email, Пароль, Имя мамы (опционально).
- `emailRedirectTo: 'projectss://'` (scheme из `app.json`) — deep link вместо localhost.
- Если confirm email включён в Supabase и сессии нет — Alert «Подтвердите email».
- Ошибки — красный текст под формой.

**Проверь в Supabase Dashboard → Authentication → URL Configuration:**

- Site URL — не `localhost`, а deep link / прод-URL
- Redirect URLs — `projectss://` (+ web-origin при необходимости)

### Онбординг (`/onboarding`)

- Имя мамы + дата рождения (`DatePickerField`: web = `<input type="date">`, native = DateTimePicker).
- Сначала Zustand (`completeOnboarding`), затем `profiles.update({ mother_name, child_birth_date })`.
- При ошибке БД — откат `isOnboarded`.

### Выход (`/profile`)

- Кнопка «Выйти» → Alert подтверждения → `supabase.auth.signOut()` + `resetUser()` → `/login`.

### RLS (`profiles`)

Скрипт: `supabase/migrations/20251101_profiles_rls.sql`

- `SELECT` / `UPDATE` / `INSERT`: `auth.uid() = id` (роль `authenticated`).
- Без `using (true)` / `with check (true)`.
- Прогони в SQL Editor, если в Dashboard ещё открытые политики.

### Подписка

Хук `useSubscription` читает `profiles.subscription_end_date` для текущего пользователя.

- `isPremium` = дата конца > `new Date()` (сравнение UTC epoch ms).
- UI-gate premium ещё не подключён — не гейтить контент без `useEntitlement`.

## Дизайн-система

Источник правды: `DESIGN.md` + CSS-переменные в `src/global.css` + Tailwind (`tailwind.config.js`) + JS-зеркало `src/theme/colors.ts`.

**Care Rose (light-only):**

- Акцент — `brand` / `brand-soft`; аллергены — `danger` / `danger-soft`; premium — `warning` / `warning-soft`.
- Текст на tint — `onTint`; фоны — `surface` / `surface-elevated`.
- Типографика: `type-title` / `type-headline` / `type-body` / `type-caption`.
- Карточки — `rounded-2xl bg-surface-elevated … shadow-sm`; фильтры — pills.

**Навигация:**

- Native Stack header: `recipes`, `recipe/[id]`, `feeding-guide`, `plates`, `profile`.
- На `/recipes` при `hasActiveFilters` — «Сбросить» только в `headerRight`.

## Экраны и сценарии

### Home (`/`)

- «Привет, {имя}!» и возраст малыша
- Ссылки-карточки: Рецепты, Гид по прикорму, Тарелки, Профиль

### Рецепты (`/recipes`)

**Данные:** `useRecipes` → Supabase `recipes` → `useRecipesFilters`.

**Шапка** (`RecipesFilters`): Избранное → meal chips (без «Все») → «Настроить фильтры».

**Логика** (`useRecipesFilters`): meal toggle в `null`; аллергены/ингредиенты multi-select (ингредиенты — **И**).

**Active chips** (`RecipesActiveFilters`): сброс по одному крестиком; полный сброс — только `headerRight`.

**Sheet** (`RecipesAdvancedFiltersSheet`): `enableDynamicSizing`, sticky «Готово» в `BottomSheetFooter` + safe area.

### Рецепт (`/recipe/[id]`)

- Native header = название; секции через hairline; аллергены + substitutes sheet.

### Профиль (`/profile`)

- Карточка мамы/ребёнка; «Выйти» с подтверждением; long-press по версии → PIN админки.

### Гид по прикорму (`/feeding-guide`)

- `feeding_stages` + mock fallback; Switch «Введено»; источники из локального `SOURCES`.

### Тарелки (`/plates`, `/plate/[id]`)

- Шаблоны `PLATE_TEMPLATES`; замены только внутри категории.

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
| Auth | `useAuthSession`, `useLogin` | email/пароль; сессия в SecureStore |
| `profiles` | онбординг, `useSubscription` | RLS: `auth.uid() = id` |
| `recipes` | `useRecipes`, `useRecipe` | `mapRecipe` |
| `feeding_stages` | `useFeedingGuide` | пустой список → mock |

После смены `.env`: `npx expo start -c`.

### Локальный persist (Zustand + AsyncStorage)

- `user-profile` — онбординг (после auth)
- `recipe-favorites` — избранное
- `feeding-guide-progress` — отмеченные этапы
- overrides тарелок — в памяти (без persist)

## Стек

- Expo SDK 58, React Native, TypeScript (strict)
- Expo Router (`src/app/`)
- NativeWind 4 + Tailwind CSS
- TanStack Query
- Zustand + persist + AsyncStorage
- Supabase JS + **expo-secure-store**
- `@gorhom/bottom-sheet`, DateTimePicker / `DatePickerField`, `@expo/vector-icons`
- React Hook Form + Zod

## Структура

```
src/
  app/
    _layout.tsx              # auth + onboarding guards, headers
    index.tsx
    (auth)/login.tsx
    (auth)/onboarding.tsx
    recipes.tsx
    recipe/[id].tsx
    feeding-guide.tsx
    plates.tsx
    plate/[id].tsx
    profile.tsx
    admin.tsx
  features/
    recipes/
    feeding-guide/
    allergens/
    plates/
    user/                    # auth session, login, subscription, onboarding, store
    admin/
  shared/
    lib/supabase.ts
    ui/DatePickerField.tsx   # web input[type=date] + native DateTimePicker
  theme/colors.ts
  types/domain.ts
  global.css
supabase/migrations/
  20251101_profiles_rls.sql  # RLS auth.uid() = id
DESIGN.md
PRODUCT.md
```

Правила: `.agents/skills/AGENTS.md` — тонкие экраны, хуки в фичах, фичи не импортируют друг друга, рекомендации прикорма с `sourceId`, аллергены всегда с substitutes.

## Доменные типы

В `src/types/domain.ts`:

- `MedicalSource`, `Allergen`, `Substitute`
- `Recipe` (+ `mealType`, `safeServing`, `isPremium`)
- `FeedingStage` (`sourceId` обязателен)
- `MealType`: `breakfast` | `lunch` | `dinner` | `snack`

`profiles` (Supabase): `id`, `mother_name`, `child_birth_date`, `subscription_start_date`, `subscription_end_date`.

## Запуск

```bash
npm install
# положите .env с EXPO_PUBLIC_SUPABASE_URL и EXPO_PUBLIC_SUPABASE_ANON_KEY
npx expo start
```

Туннель: `npx expo start --tunnel`  
Типы: `npx tsc --noEmit`

## Что дальше

- `useEntitlement` и UI-gate для premium
- Источники гида и аллергены из БД
- Profile как settings-list; PIN в native formSheet
- i18n
- Persist / синхронизация кастомных тарелок
- Hydration профиля из Supabase при логине на новом устройстве
