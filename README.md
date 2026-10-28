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

## Текущая версия (v0.4 — токены + нативный chrome)

Рецепты и этапы прикорма читаются из **Supabase**. Локально остаются моки аллергенов, источников гида и шаблонов тарелок; пользовательские данные (онбординг, избранное, прогресс гида, замены в тарелке) — в Zustand + AsyncStorage.

Стартовали внедрение дизайн-системы по аудиту: **Phase 0** (цветовые токены NativeWind) и **Phase 1** (нативные заголовки Stack на ключевых экранах).

| Модуль | Статус |
| --- | --- |
| Онбординг + защита роутов | готово (persist) |
| Home с именем и возрастом ребёнка | готово |
| Каталог рецептов + фильтры + избранное | готово (данные из Supabase) |
| Экран рецепта `/recipe/[id]` | готово (Supabase + `useRecipe`) |
| Аллергены: чипы + bottom sheet с заменами | готово (локальные `MOCK_ALLERGENS`) |
| Гид по прикорму + прогресс «Введено» | готово (этапы из Supabase, прогресс persist) |
| Конструктор тарелок | готово (моки шаблонов) |
| Дизайн: CSS-токены + Tailwind colors | готово (Phase 0, light-only) |
| Дизайн: нативный header recipes / recipe / profile | готово (Phase 1) |
| i18n | ещё нет |
| Entitlements / premium-gate | ещё нет (`isPremium` есть в данных) |
| Auth Supabase | ещё нет (только anon-клиент для чтения) |

## Дизайн-система (в работе)

### Phase 0 — токены (готово)

- Цвета бренда, фона, текста и danger задаются в `src/global.css` как CSS-переменные (`--color-brand`, `--color-danger`, …).
- Тема **только light**: `color-scheme: light` в CSS, `userInterfaceStyle: "light"` в `app.json`, `darkMode: "class"` в Tailwind (без dark UI).
- `tailwind.config.js` → `theme.extend.colors` привязан к `var(--color-*)` (`brand`, `danger`, `surface`, `label`, `border`).
- Для props без className (`ActivityIndicator`, Ionicons и т.п.) — зеркало токенов в `src/theme/colors.ts`.
- В UI экранов recipes / profile / recipe detail hex в разметке не хардкодим: только Tailwind-классы или `colors.*`.

### Phase 1 — навигационный chrome (готово)

- В `src/app/_layout.tsx` для `recipes`, `recipe/[id]`, `profile` включён стандартный Stack header (title + системная «Назад»).
- Кастомные самодельные хедеры с `headerShown: false` на этих экранах убраны.
- На `/recipes` кнопка «Сбросить» вынесена в `headerRight` (показывается только при активных фильтрах).

## Экраны и сценарии

### Онбординг (`/onboarding`)

- Имя мамы + дата рождения ребёнка (нативный DateTimePicker)
- Сохранение в `useUserStore` (persist)
- Без онбординга `Stack.Protected` не пускает в основные экраны

### Home (`/`)

- «Привет, {имя}!» и возраст малыша
- Ссылки: Рецепты, Гид по прикорму, Тарелки

### Рецепты (`/recipes`)

- Нативный header: title «Рецепты», «Сбросить» в `headerRight` при активных фильтрах
- Список из таблицы Supabase `recipes` через `useRecipes` (TanStack Query)
- Фильтры: приём пищи, избранное, исключение аллергенов, ингредиенты (логика **И**)
- Сердечко на карточке → `useFavoritesStore` (persist)
- Тап по карточке → `/recipe/[id]`

### Рецепт (`/recipe/[id]`)

- Нативный header: title = название рецепта (или «Рецепт» в loading / not found)
- Загрузка одного рецепта: `useRecipe(id)` → `recipes.select('*').eq('id', id).single()`
- Метаданные, аллергены с заменами (modal), ингредиенты, safeServing, шаги
- Состояния: загрузка / не найден / контент

### Профиль (`/profile`)

- Нативный header: title «Профиль»
- Имя мамы, возраст / дата рождения ребёнка
- Long-press по версии → PIN-gate админки

### Гид по прикорму (`/feeding-guide`)

- Этапы из таблицы `feeding_stages` через `useFeedingGuide`
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
- React Hook Form + Zod (в зависимостях)

## Структура

```
src/
  app/
    _layout.tsx              # QueryClient, GestureHandler, Stack.Protected
    index.tsx                # Home
    (auth)/onboarding.tsx
    recipes.tsx
    recipe/[id].tsx
    feeding-guide.tsx
    plates.tsx
    plate/[id].tsx
  features/
    recipes/                 # api, hooks, filters, favorites, UI
    feeding-guide/           # api, progress store, UI
    allergens/               # modal + mock allergens
    plates/                  # templates, substitutes, UI
    user/                    # onboarding store, age utils
  shared/lib/supabase.ts
  theme/                     # JS-зеркало цветовых токенов
  types/domain.ts
  global.css                 # CSS-переменные (light-only)
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

- Дизайн Phase 2+: сжатие фильтров, quieter recipe rows, profile как settings-list, PIN в formSheet
- Распространить токены `colors.*` на остальные экраны (admin, feeding-guide, onboarding, plates)
- Auth и пользовательские данные в Supabase
- Источники гида и аллергены из БД
- i18n
- `useEntitlement` для premium
- Persist / синхронизация кастомных тарелок
