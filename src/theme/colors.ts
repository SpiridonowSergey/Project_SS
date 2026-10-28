/**
 * JS mirror of CSS variables in `src/global.css`.
 * Use only for RN props that cannot take Tailwind className
 * (ActivityIndicator, Ionicons, Switch trackColor, etc.).
 * Do not hardcode brand/danger hexes in screens — import from here.
 */
export const colors = {
  brand: '#f43f5e',
  brandSoft: '#fff1f2',
  danger: '#ef4444',
  dangerSoft: '#fef2f2',
  warning: '#b45309',
  warningSoft: '#fffbeb',
  surface: '#f9fafb',
  surfaceElevated: '#ffffff',
  label: '#1c1917',
  labelSecondary: '#57534e',
  labelMuted: '#a8a29e',
  border: '#e7e5e4',
  onTint: '#ffffff',
} as const;
