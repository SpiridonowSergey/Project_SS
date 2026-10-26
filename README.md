# Project SS

Мобильное приложение для молодых мам: рецепты детского питания с рождения, калорийность, логика аллергенов и гид по введению прикорма.

## Идея

Помочь родителям уверенно кормить ребёнка на каждом этапе — от первых недель до расширения рациона.

- **Рецепты** — блюда по возрасту (`minAgeMonths`), калории, ингредиенты и шаги приготовления; часть контента может быть premium.
- **Аллергены** — предупреждения всегда с безопасными заменителями, а не только с меткой аллергена.
- **Гид по прикорму** — этапы введения продуктов с объёмами и ссылкой на медицинский источник (`MedicalSource`).
- **Доверие к советам** — каждая рекомендация по прикорму привязана к источнику (`sourceId`).

Целевые платформы: **iOS** и **Android** на Expo.

## Текущая версия (v0.1 — каркас)

Сейчас это базовый скелет без бизнес-логики и экранов фич. Демо Expo удалено.

| Что есть | Статус |
| --- | --- |
| Expo Router (`Stack`) + Home-экран | готово |
| TanStack Query (`QueryClientProvider`) | подключен |
| NativeWind / Tailwind | подключен |
| Доменные типы (`Recipe`, `Allergen`, `FeedingStage`…) | в `src/types/domain.ts` |
| Рецепты, гид, аллергены, i18n, entitlements | ещё нет (заглушки на Home) |

### Стек

- Expo SDK 58, React Native, TypeScript (strict)
- Expo Router (file-based routing в `src/app/`)
- NativeWind 4 + Tailwind CSS
- TanStack Query, Zustand, React Hook Form + Zod
- Supabase (клиент уже в зависимостях)

### Структура

```
src/
  app/           # экраны Expo Router (тонкие)
  types/         # доменные типы
  global.css     # Tailwind / NativeWind
```

Фичи дальше живут в `src/features/`, общее — в `src/shared/` (см. `.agents/skills/AGENTS.md`).

## Запуск

```bash
npm install
npx expo start
```

Дальше: Expo Go, эмулятор Android или симулятор iOS.
