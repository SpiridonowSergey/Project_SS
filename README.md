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

## Текущая версия (v0.3 — Supabase + клиентские фичи)

Рецепты и этапы прикорма читаются из **Supabase**. Локально остаются моки аллергенов, источников гида и шаблонов тарелок; пользовательские данные (онбординг, избранное, прогресс гида, замены в тарелке) — в Zustand + AsyncStorage.

| Модуль | Статус |
| --- | --- |
| Онбординг + защита роутов | готово (persist) |
| Home с именем и возрастом ребёнка | готово |
| Каталог рецептов + фильтры + избранное | готово (данные из Supabase) |
| Экран рецепта `/recipe/[id]` | готово (Supabase + `useRecipe`) |
| Аллергены: чипы + bottom sheet с заменами | готово (локальные `MOCK_ALLERGENS`) |
| Гид по прикорму + прогресс «Введено» | готово (этапы из Supabase, прогресс persist) |
| Конструктор тарелок | готово (моки шаблонов) |
| i18n | ещё нет |
| Entitlements / premium-gate | ещё нет (`isPremium` есть в данных) |
| Auth Supabase | ещё нет (только anon-клиент для чтения) |

## Экраны и сценарии

### Онбординг (`/onboarding`)

- Имя мамы + дата рождения ребёнка (нативный DateTimePicker)
- Сохранение в `useUserStore` (persist)
- Без онбординга `Stack.Protected` не пускает в основные экраны

### Home (`/`)

- «Привет, {имя}!» и возраст малыша
- Ссылки: Рецепты, Гид по прикорму, Тарелки

### Рецепты (`/recipes`)

- Список из таблицы Supabase `recipes` через `useRecipes` (TanStack Query)
- Фильтры: приём пищи, избранное, исключение аллергенов, ингредиенты (логика **И**)
- Сердечко на карточке → `useFavoritesStore` (persist)
- Тап по карточке → `/recipe/[id]`

### Рецепт (`/recipe/[id]`)

- Загрузка одного рецепта: `useRecipe(id)` → `recipes.select('*').eq('id', id).single()`
- Метаданные, аллергены с заменами (modal), ингредиенты, safeServing, шаги
- Состояния: загрузка / не найден / контент

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
  types/domain.ts
  global.css
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
- i18n
- `useEntitlement` для premium
- Persist / синхронизация кастомных тарелок
