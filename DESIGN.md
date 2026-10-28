---
name: Project_SS
description: Trust-first complementary feeding notebook — calm pills, flat rows, cited sources.
colors:
  care-rose: "#f43f5e"
  care-rose-soft: "#fff1f2"
  allergy-signal: "#ef4444"
  allergy-signal-soft: "#fef2f2"
  premium-amber: "#b45309"
  premium-amber-soft: "#fffbeb"
  clinic-mist: "#f9fafb"
  notebook-page: "#ffffff"
  notebook-ink: "#1c1917"
  notebook-ink-secondary: "#57534e"
  notebook-ink-muted: "#a8a29e"
  soft-rule: "#e7e5e4"
  on-tint: "#ffffff"
typography:
  title:
    fontFamily: "System"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.27
  headline:
    fontFamily: "System"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.29
  body:
    fontFamily: "System"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.29
  caption:
    fontFamily: "System"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.38
rounded:
  pill: "9999px"
  sheet: "24px"
  control: "16px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "64px"
components:
  chip-idle:
    backgroundColor: "{colors.notebook-page}"
    textColor: "{colors.notebook-ink-secondary}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.care-rose}"
    textColor: "{colors.on-tint}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "44px"
  chip-allergen-selected:
    backgroundColor: "{colors.allergy-signal}"
    textColor: "{colors.on-tint}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "44px"
  recipe-row:
    backgroundColor: "{colors.notebook-page}"
    textColor: "{colors.notebook-ink}"
    padding: "14px 16px"
  badge-premium:
    backgroundColor: "{colors.premium-amber-soft}"
    textColor: "{colors.premium-amber}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  badge-allergen:
    backgroundColor: "{colors.allergy-signal-soft}"
    textColor: "{colors.allergy-signal}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  button-primary:
    backgroundColor: "{colors.care-rose}"
    textColor: "{colors.on-tint}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
  button-secondary:
    backgroundColor: "{colors.notebook-page}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
---

# Design System: Project_SS

## Overview

**Creative North Star: "Тетрадь прикорма с источниками"**

The parent-facing UI reads like a trustworthy feeding notebook: calm, caring, and sure of itself. Care Rose marks action and selection; Allergy Signal and Premium Amber speak only when safety or tier status matters. Surfaces stay light — Clinic Mist behind Notebook Page rows — so meal-time scanning stays fast.

Density is list-first and flat. Filters are restrained pills; recipes are flat rows separated by Soft Rule hairlines, not lifted cards. Native stack chrome carries navigation; brand tint is Care Rose, titles are Notebook Ink. The system rejects heavy cardboard cards with drop shadows, cartoon kid-app clutter and neon accents, and any dark parent UI.

**Key Characteristics:**
- Trust-first notebook metaphor (sources, clear warnings, no toy energy)
- Light-only parent surfaces
- Calm pills and flat rows
- Flat + tonal depth (soft fills + hairlines; no drop shadows on product UI)
- Semantic soft washes for allergen and premium status

## Colors

A warm-rose accent on cool paper neutrals, with reserved semantic signals for allergy and premium.

### Primary
- **Care Rose** (`care-rose`): Interactive accent — selected chips, header tint, primary actions, favorite-on state. Soft wash (`care-rose-soft`) for brand-tinted empty/loading chrome only.

### Secondary
Omit — one accent only.

### Tertiary
Omit.

### Neutral
- **Clinic Mist** (`clinic-mist`): Screen canvas behind lists and forms.
- **Notebook Page** (`notebook-page`): Elevated row/sheet fill (white).
- **Notebook Ink** (`notebook-ink` / secondary / muted): Primary, secondary, and meta text.
- **Soft Rule** (`soft-rule`): Hairline dividers and idle chip borders (often at 50% opacity).
- **On Tint** (`on-tint`): Text/icons on Care Rose or Allergy Signal fills.

### Semantic
- **Allergy Signal** (`allergy-signal` + soft): Allergen exclusion chips (selected), allergen badges, destructive emphasis.
- **Premium Amber** (`premium-amber` + soft): Premium badges only — not a second brand accent.

**The One Voice Rule.** Care Rose is the only decorative accent. Allergy Signal and Premium Amber appear only for their semantic jobs.

**The Light Parent Rule.** Parent-facing screens stay light-only. Do not introduce dark surfaces outside the admin tooling island.

## Typography

**Display Font:** System (SF Pro on iOS / Roboto on Android)
**Body Font:** System
**Label/Mono Font:** System (same face; caption role)

**Character:** Platform-native clarity — notebook seriousness without a costume display face. Hierarchy comes from weight and the four-step size ramp, not decorative lettering.

### Hierarchy
- **Title** (700, 22px / 28px): Screen-level emphasis when custom headers appear; prefer native large titles where chrome is shown.
- **Headline** (600, 17px / 22px): Recipe titles, section heads in content.
- **Body** (400, 17px / 22px): Primary reading copy, empty/error messages.
- **Caption** (400, 13px / 18px): Filter section labels, meta lines, chip labels, badges (often `font-medium` / `font-semibold` on chips and badges).

**The Ramp Rule.** Prefer `type-title` / `type-headline` / `type-body` / `type-caption` (or matching `text-title`… utilities) over ad-hoc size classes on parent screens.

## Layout

Phone-first portrait. Horizontal page padding is 16px (`px-4`) on list headers and recipe rows; Home still uses 24px in places — new work should converge on 16px for list surfaces. Filter groups stack with 16px gaps; label-to-chip gap is 6px. List bottom padding ~24px. Empty/loading centers use generous vertical padding (~64px). Touch targets minimum 44pt (`min-h-11`). Native Stack headers on recipes, recipe detail, and profile; other flows may still hide chrome pending Phase 1 rollout.

## Elevation & Depth

**Flat + tonal.** No drop shadows on parent product UI. Depth comes from Clinic Mist behind Notebook Page, Soft Rule hairlines between rows, and soft semantic washes behind badges. Press feedback is opacity or a brief Clinic Mist fill — not lift.

**The Flat-By-Default Rule.** Surfaces rest flat. Do not reintroduce `shadow-*` on parent cards, rows, or chips.

### Shadow Vocabulary
None for parent UI. (Admin tooling may use its own island; do not copy it into parent screens.)

## Shapes

Pills dominate interactive filters and status badges (`rounded-full`). Modal sheets and dialogs use large continuous corners (~24px / `rounded-3xl`); primary form controls ~16px (`rounded-2xl`). Recipe rows have square edges — they are strips, not cards. Borders are 1px Soft Rule (or semantic border when selected).

**The Pill Filter Rule.** Filter and status chips are pills. Do not square them off for variety.

## Components

### Buttons
- **Shape:** Gently rounded controls (`rounded-2xl` ~16px) for dialogs; text actions in headers stay borderless.
- **Primary:** Care Rose fill, On Tint label.
- **Secondary / Ghost:** Notebook Page or transparent with Soft Rule border; Notebook Ink / Care Rose text for header actions (“Сбросить”).
- **Press:** `active:opacity-70`–`80`, no shadow lift.

### Chips
- **Style:** Idle — Notebook Page + Soft Rule border + secondary ink. Selected meal/ingredient — Care Rose fill + On Tint. Selected allergen exclusion — Allergy Signal fill + On Tint.
- **State:** `accessibilityState.selected`; minimum height 44.
- **Implementation:** Prefer shared `FilterChip` over one-off pill Pressables.

### Cards / Containers
- **Corner Style:** None on recipe rows (flat strips).
- **Background:** Notebook Page on Clinic Mist canvas.
- **Shadow Strategy:** None — Soft Rule hairline (`border-border/50`) between rows.
- **Border:** Bottom hairline only on rows.
- **Internal Padding:** ~14–16px vertical, 16px horizontal; leave trailing room for the favorite control.

### Badges
- Premium: Premium Amber soft wash + amber label.
- Allergens: Allergy Signal soft wash + signal label.
- Always pills; never compete with Care Rose as decoration.

### Inputs / Fields
- Soft Rule border, Clinic Mist or Notebook Page fill, ~16px radius on parent dialogs; focus via platform defaults / border emphasis.

### Navigation
- Native Stack: Care Rose tint, Notebook Ink titles, no header shadow (`headerShadowVisible: false`), Clinic Mist content background. Prefer system back over custom headers on screens that already opted into chrome.

### Recipe Row (signature)
Flat Notebook Page strip: optional premium/allergen badges, headline title, caption meta (age · calories), trailing favorite heart (Care Rose when on, muted ink when off). Entire row opens detail; heart is a separate 44×44 target.

## Do's and Don'ts

### Do:
- **Do** keep parent UI light-only and flat + tonal (hairlines + soft fills).
- **Do** use Care Rose only as the interactive accent; reserve Allergy Signal and Premium Amber for their meanings.
- **Do** show allergen status with substitutes available in the flow — never a bare danger chip as the whole story on detail.
- **Do** keep chips as calm pills with ≥44pt targets and shared `FilterChip` where possible.
- **Do** prefer the semantic type ramp and token colors (`brand`, `danger`, `surface`, `label`, `border`) over raw Tailwind palette classes on parent screens.

### Don't:
- **Don't** use heavy shadowed “cardboard” cards on parent screens.
- **Don't** ship cartoon clutter, emoji-as-icons, or neon/kid-app palettes.
- **Don't** introduce dark parent chrome (admin stays an isolated island).
- **Don't** hardcode hex in screen markup — use tokens / `colors.*` for non-className props.
- **Don't** invent a second brand accent or treat Premium Amber as decoration.
