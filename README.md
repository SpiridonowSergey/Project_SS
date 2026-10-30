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

## Текущая версия (v0.5 — Care Rose + фильтры каталога)

Рецепты и этапы прикорма читаются из **Supabase**. Локально остаются моки аллергенов, источников гида и шаблонов тарелок; пользовательские данные (онбординг, избранное, прогресс гида, замены в тарелке) — в Zustand + AsyncStorage.

Визуальный язык зафиксирован в `DESIGN.md` (**Care Rose**, light-only, flat + tonal). Каталог рецептов доведён до спокойных pills-фильтров, плоских list-row и сводки активных фильтров.

| Модуль | Статус |
| --- | --- |
| Онбординг + защита роутов | готово (persist) |
| Home с именем и возрастом ребёнка | готово |
| Каталог рецептов + фильтры + избранное | готово (Supabase + toggle meal / sheet) |
| Экран рецепта `/recipe/[id]` | готово (flat sections, без elevated-карточек) |
| Аллергены: чипы + bottom sheet с заменами | готово (локальные `MOCK_ALLERGENS`) |
| Гид по прикорму + прогресс «Введено» | готово (этапы из Supabase, прогресс persist) |
| Конструктор тарелок | готово (моки шаблонов) |
| Дизайн: токены + type ramp + Care Rose | готово (`DESIGN.md`, `global.css`) |
| Дизайн: native header recipes / recipe / profile | готово |
| i18n | ещё нет |
| Entitlements / premium-gate | ещё нет (`isPremium` есть в данных) |
| Auth Supabase | ещё нет (только anon-клиент для чтения) |

## Дизайн-система

Источник правды: `DESIGN.md` + CSS-переменные в `src/global.css` + Tailwind (`tailwind.config.js`) + JS-зеркало `src/theme/colors.ts`.

**Care Rose (light-only, flat + tonal):**

- Акцент взаимодействия — `brand` (Care Rose); мягкая заливка — `brand-soft`.
- Аллергены — только `danger` / `danger-soft`; premium — `warning` / `warning-soft`.
- Текст на tint — `onTint`; фоны — `surface` (Clinic Mist) и `surface-elevated` (Notebook Page).
- Типографика: `type-title` / `type-headline` / `type-body` / `type-caption`.
- Без drop-shadow на parent UI; глубина — soft fills + `border-border/50`.
- Фильтры и статусы — pills (`rounded-full`); строки рецептов — плоские strips.

**Навигация:**

- `recipes`, `recipe/[id]`, `profile` — нативный Stack header (системная «Назад»).
- На `/recipes` при активных фильтрах — «Сбросить» в `headerRight`.

## Экраны и сценарии

### Онбординг (`/onboarding`)

- Имя мамы + дата рождения ребёнка (нативный DateTimePicker)
- Сохранение в `useUserStore` (persist)
- Без онбординга `Stack.Protected` не пускает в основные экраны

### Home (`/`)

- «Привет, {имя}!» и возраст малыша
- Ссылки: Рецепты, Гид по прикорму, Тарелки, Профиль

### Рецепты (`/recipes`)

Каталог — главный доработанный сценарий текущей версии.

**Данные:** `useRecipes` → Supabase `recipes` → `useRecipesFilters`.

**Шапка фильтров** (`RecipesFilters`):

1. Чип «Избранное» (toggle).
2. Горизонтальный ряд приёмов пищи: Завтрак / Обед / Ужин / Перекус (без «Все»).
3. Кнопка «Настроить фильтры» → sheet с аллергенами и ингредиентами.

**Логика** (`useRecipesFilters`):

- Приём пищи — одиночный выбор с **toggle в `null`**: повторный тап снимает фильтр, показываются все meal types.
- Аллергены / ингредиенты — multi-select через `toggleId` (ингредиенты: логика **И**).
- Избранное — фильтр по `useFavoritesStore`.

**Сводка активных фильтров** (`RecipesActiveFilters`):

- Показывается только если есть активные фильтры.
- Спокойные tonal-пилюли с `close-circle` внутри (brand-soft / danger-soft / нейтраль).
- Сброс по одному фильтру или «Сбросить всё».

**Список:** плоские `RecipeCard` (list-row, без теней); сердечко избранного отдельно от перехода в деталку.

### Рецепт (`/recipe/[id]`)

- Нативный header: title = название рецепта
- `useRecipe(id)`; контент на `bg-surface` без elevated-карточек
- Секции через hairline (`border-b border-border/50`): meta, аллергены + substitutes sheet, ингредиенты, safeServing, шаги
- `contentInsetAdjustmentBehavior="automatic"` под native header

### Профиль (`/profile`)

- Нативный header: title «Профиль»
- Плоский блок данных мамы/ребёнка (без shadow-card)
- Long-press по версии → PIN-gate админки (`AdminPinModal` на токенах)

### Гид по прикорму (`/feeding-guide`)

- Этапы из `feeding_stages` через `useFeedingGuide`
- Switch «Введено», прогресс-бар, persist прогресса
- Источники пока из локального `SOURCES` по `sourceId`
- Дисклеймер: не заменяет консультацию педиатра

### Тарелки (`/plates`, `/plate/[id]`)

- Шаблоны из `PLATE_TEMPLATES`
- Слоты: овощи / белок / углеводы
- Замена продукта только внутри категории (`SUBSTITUTES`), баланс сохраняется

## Данные и API

### Supabase

Клиент: `src/shared/lib/supabase.ts`  
Переменные в `.env` (файл в `.gitignore`):

```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

| Таблица | Хук | Маппинг |
| --- | --- | --- |
| `recipes` | `useRecipes`, `useRecipe` | snake_case → `Recipe` (`mapRecipe`) |
| `feeding_stages` | `useFeedingGuide` | snake_case → `FeedingStage` (`mapFeedingStage`) |

После смены `.env` перезапустите Metro с очисткой кэша: `npx expo start -c`.

### Локальный persist (Zustand + AsyncStorage)

- `user-profile` — онбординг
- `recipe-favorites` — избранное
- `feeding-guide-progress` — отмеченные этапы
- overrides тарелок — в памяти (Zustand без persist)

## Стек

- Expo SDK 58, React Native, TypeScript (strict)
- Expo Router (`src/app/`, file-based routing)
- NativeWind 4 + Tailwind CSS
- TanStack Query
- Zustand + persist + AsyncStorage
- Supabase JS
- `@gorhom/bottom-sheet`, DateTimePicker, `@expo/vector-icons`
- React Hook Form + Zod (admin-формы)

## Структура

```
src/
  app/
    _layout.tsx              # QueryClient, GestureHandler, Stack.Protected, headers
    index.tsx                # Home
    (auth)/onboarding.tsx
    recipes.tsx              # каталог + фильтры + active pills
    recipe/[id].tsx
    feeding-guide.tsx
    plates.tsx
    plate/[id].tsx
    profile.tsx
    admin.tsx
  features/
    recipes/                 # api, filters, favorites, RecipeCard, sheets
    feeding-guide/
    allergens/
    plates/
    user/
    admin/
  shared/lib/supabase.ts
  theme/colors.ts            # JS-зеркало токенов
  types/domain.ts
  global.css                 # CSS vars + type-* utilities
DESIGN.md                    # Care Rose design system
PRODUCT.md                   # product context (Impeccable)
```

Правила: `.agents/skills/AGENTS.md` — тонкие экраны, хуки в фичах, фичи не импортируют друг друга, рекомендации прикорма с `sourceId`, аллергены всегда с substitutes.

## Доменные типы

В `src/types/domain.ts`:

- `MedicalSource`, `Allergen`, `Substitute`
- `Recipe` (+ `mealType`, `safeServing`, `isPremium`)
- `FeedingStage` (`sourceId` обязателен)
- `MealType`: `breakfast` | `lunch` | `dinner` | `snack`

## Запуск

```bash
npm install
# положите .env с EXPO_PUBLIC_SUPABASE_URL и EXPO_PUBLIC_SUPABASE_ANON_KEY
npx expo start
```

Туннель: `npx expo start --tunnel`  
Типы: `npx tsc --noEmit`

## Что дальше

- Дотянуть Care Rose на Home / feeding-guide / plates / onboarding / admin
- Profile как settings-list; PIN в native formSheet
- Auth и пользовательские данные в Supabase
- Источники гида и аллергены из БД
- i18n
- `useEntitlement` для premium
- Persist / синхронизация кастомных тарелок
