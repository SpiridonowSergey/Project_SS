# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

Primary user is a parent — most often a young mother — who is introducing complementary feeding or expanding a child's diet. Job to be done: know what and how to feed my child safely for this age. Pediatricians and grandparents may view content but are not a primary audience.

## Product Purpose

Help parents feed a child confidently from early complementary feeding through diet expansion: age-appropriate recipes, allergen-aware cooking with substitutes, a staged feeding guide tied to medical sources, and balanced plate templates. Success means the parent can decide what to serve today without guessing about age safety, allergens, or meal balance.

## Positioning

Age-guided feeding with mandatory medical source links (`sourceId` → `MedicalSource`), allergen warnings that always include substitutes (never a bare allergen label), and balanced plates where substitutions stay strictly inside the same category (e.g. carbs for carbs). Neighboring baby-food or recipe apps cannot truthfully copy this combination because they lack source binding and substitution logic.

## Operating Context

Used on phone during meal planning and cooking. Onboarding captures the mother's name and the child's birth date so Home can greet personally and surface age. Core flows: browse/filter recipes (meal type, favorites, allergen exclusion, ingredients), open a recipe with safe serving and allergen substitutes, mark feeding-guide stages as introduced, and customize a plate template within category slots. Content is consulted alongside — not instead of — a pediatrician.

## Capabilities and Constraints

- Recipes (catalog + detail), feeding guide with progress, plate templates with in-category substitutes, allergen filters and substitute sheets, profile/onboarding, admin content tools (PIN-gated).
- Every feeding recommendation must carry a `sourceId` pointing to a `MedicalSource`.
- Allergen warnings must always show substitutes, not only the allergen label.
- Plate substitutions only within the same food category.
- Free-tier recipes are marked `isPremium: false`; premium gating must not appear in UI without `useEntitlement` (entitlement UI not shipped yet).
- Working product name remains **Project_SS** until a final name is chosen.
- Russian-language UI is first; i18n infrastructure is not shipped yet.
- Light-only UI is an intentional product decision (`userInterfaceStyle: "light"`).
- Auth and cloud-synced user data are not shipped yet (local Zustand + AsyncStorage for profile, favorites, feeding progress).
- Undecided: final brand name; premium packaging and paywall; full i18n locales beyond Russian-first.

## Brand Commitments

- Working name: Project_SS (placeholder; do not invent a public brand name in design work).
- Voice and UI copy: Russian-first.
- Appearance: light-only as a committed product choice, not a temporary gap.
- Medical trust: always show the pediatrician disclaimer — the app does not replace consultation with a pediatrician.

## Evidence on Hand

- Live/read content: recipes and feeding stages from Supabase (`recipes`, `feeding_stages`).
- Local mocks still in use: allergens/substitutes, medical sources for the guide, plate templates.
- Domain types and rules in `src/types/domain.ts` and `.agents/skills/AGENTS.md`.
- Do not fabricate testimonials, clinical claims, customer quotes, pricing, or medical outcomes beyond what sources and disclaimers already encode.

## Product Principles

1. Safety over cleverness — age guidance, allergen substitutes, and medical sources beat engagement tricks.
2. Never leave the parent with a dead end — every allergen warning offers a substitute; every plate swap stays balanced.
3. Cite, don't invent — feeding advice is tied to sources; the pediatrician disclaimer stays visible.
4. Personal and calm — greet by name and child age; keep the UI light and scannable for meal-time use.
5. One product, two platforms — iOS and Android are first-class; web is for development only.
