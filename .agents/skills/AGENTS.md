# AGENTS.md

## Tech Stack
- Expo SDK 54+, React Native 0.76+, New Architecture
- TypeScript strict
- Expo Router (NEVER suggest React Navigation)
- NativeWind for styling (NEVER suggest styled-components or Unistyles)
- TanStack Query for server state
- Zustand for client state
- React Hook Form + Zod for forms

## Architecture Rules
- Screens in app/ are THIN: they delegate to components in src/features/
- Every screen has a custom hook in the feature folder
- NEVER use useEffect for data fetching — use TanStack Query
- ALL user-facing strings must go through translation keys
- Feature folders must not import from each other; use shared/ for cross-cutting concerns

## Domain Rules
- Every feeding recommendation MUST have a sourceId pointing to a MedicalSource
- Allergen warnings must ALWAYS show substitutes, not just the allergen label
- Free-tier recipes are marked isPremium: false; never gate premium content in UI without useEntitlement