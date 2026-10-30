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

## Текущая версия (v0.6 — каталог фильтров + soft cards)

Рецепты и этапы прикорма читаются из **Supabase**. Если `feeding_stages` пуст, гид падает обратно на локальный `MOCK_FEEDING_STAGES`. Локально остаются моки аллергенов, источников гида и шаблонов тарелок; пользовательские данные (онбординг, избранное, прогресс гида, замены в тарелке) — в Zustand + AsyncStorage.

Визуальный язык зафиксирован в `DESIGN.md` (**Care Rose**, light-only). Клиентские поверхности (Home, рецепты, гид, тарелки, профиль) используют elevated-карточки `bg-surface-elevated` + `shadow-sm`.

| Модуль | Статус |
| --- | --- |
| Онбординг + защита роутов | готово (persist) |
| Home с именем и возрастом ребёнка | готово (soft cards) |
| Каталог рецептов + фильтры + избранное | готово (Supabase; meal toggle / sheet / active chips) |
| Экран рецепта `/recipe/[id]` | готово (flat sections под native header) |
| Аллергены: чипы + bottom sheet с заменами | готово (локальные `MOCK_ALLERGENS`) |
| Гид по прикорму + прогресс «Введено» | готово (Supabase + mock fallback, прогресс persist) |
| Конструктор тарелок | готово (моки шаблонов, soft cards) |
| Дизайн: токены + type ramp + Care Rose | готово (`DESIGN.md`, `global.css`) |
| Дизайн: native headers + soft elevated cards | готово |
| i18n | ещё нет |
| Entitlements / premium-gate | ещё нет (`isPremium` есть в данных) |
| Auth Supabase | ещё нет (только anon-клиент для чтения) |

## Дизайн-система

Источник правды: `DESIGN.md` + CSS-переменные в `src/global.css` + Tailwind (`tailwind.config.js`) + JS-зеркало `src/theme/colors.ts`.

**Care Rose (light-only):**

- Акцент взаимодействия — `brand` (Care Rose); мягкая заливка — `brand-soft`.
- Аллергены — только `danger` / `danger-soft`; premium — `warning` / `warning-soft`.
- Текст на tint — `onTint`; фоны — `surface` (Clinic Mist) и `surface-elevated` (Notebook Page).
- Типографика: `type-title` / `type-headline` / `type-body` / `type-caption`.
- Карточки списков и хаба — `rounded-2xl bg-surface-elevated … shadow-sm`.
- Фильтры и статусы — pills (`rounded-full`).

**Навигация:**

- Native Stack header: `recipes`, `recipe/[id]`, `feeding-guide`, `plates`, `profile`.
- На `/recipes` при `hasActiveFilters` — «Сбросить» только в `headerRight` (полный сброс).

## Экраны и сценарии

### Онбординг (`/onboarding`)

- Имя мамы + дата рождения ребёнка (нативный DateTimePicker)
- Сохранение в `useUserStore` (persist)
- Без онбординга `Stack.Protected` не пускает в основные экраны

### Home (`/`)

- «Привет, {имя}!» и возраст малыша
- Ссылки-карточки: Рецепты, Гид по прикорму, Тарелки, Профиль

### Рецепты (`/recipes`)

Каталог — основной сценарий текущей версии.

**Данные:** `useRecipes` → Supabase `recipes` → `useRecipesFilters`.

**Шапка фильтров** (`RecipesFilters`):

1. Чип «Избранное» (toggle).
2. Горизонтальный ряд приёмов пищи: Завтрак / Обед / Ужин / Перекус (без «Все»).
3. Кнопка «Настроить фильтры» → advanced sheet.

**Логика** (`useRecipesFilters`):

- Приём пищи — одиночный выбор с **toggle в `null`**: повторный тап снимает фильтр.
- Аллергены / ингредиенты — multi-select через `toggleId` (ингредиенты: логика **И**).
- Избранное — фильтр по `useFavoritesStore`.

**Сводка активных фильтров** (`RecipesActiveFilters`):

- Видна только при активных фильтрах.
- Tonal-чипы с крестиком: сброс **только этого** фильтра (`toggleAllergen` / `toggleIngredient` / meal / favorites).
- Полный сброс — кнопка «Сбросить» в native `headerRight` (не дублируется под чипами).
- В empty-state списка остаётся CTA «Сбросить фильтры».

**Advanced sheet** (`RecipesAdvancedFiltersSheet`, `@gorhom/bottom-sheet`):

- `enableDynamicSizing` + `maxDynamicContentSize` (~90% экрана).
- Список аллергенов/ингредиентов скроллится; «Готово» закреплена в `BottomSheetFooter` с учётом safe area.

**Список:** `RecipeCard` — elevated soft card; сердечко избранного отдельно от перехода в деталку.

### Рецепт (`/recipe/[id]`)

- Нативный header: title = название рецепта
- `useRecipe(id)`; контент на `bg-surface`
- Секции через hairline (`border-b border-border/50`): meta, аллергены + substitutes sheet, ингредиенты, safeServing, шаги
- `contentInsetAdjustmentBehavior="automatic"` под native header

### Профиль (`/profile`)

- Нативный header: title «Профиль»
- Elevated-карточка данных мамы/ребёнка
- Версия приложения внизу экрана; long-press по версии → PIN-gate админки (`AdminPinModal`)

### Гид по прикорму (`/feeding-guide`)

- Этапы из `feeding_stages` через `useFeedingGuide`; при пустом ответе — `MOCK_FEEDING_STAGES`
- Soft cards этапов + прогресс-бар; Switch «Введено», persist прогресса
- Источники пока из локального `SOURCES` по `sourceId`
- Дисклеймер: не заменяет консультацию педиатра

### Тарелки (`/plates`, `/plate/[id]`)

- Шаблоны из `PLATE_TEMPLATES` (soft cards)
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
| `feeding_stages` | `useFeedingGuide` | snake_case → `FeedingStage` (`mapFeedingStage`); пустой список → mock |

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
    recipes.tsx              # каталог + фильтры + active chips + sheet
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

- Auth и пользовательские данные в Supabase
- Источники гида и аллергены из БД
- Profile как settings-list; PIN в native formSheet
- i18n
- `useEntitlement` для premium
- Persist / синхронизация кастомных тарелок
