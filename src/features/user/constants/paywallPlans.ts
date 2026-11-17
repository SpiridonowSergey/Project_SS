export type PaywallPlanId = '3' | '6' | '12';

export type PaywallPlan = {
  id: PaywallPlanId;
  months: 3 | 6 | 12;
  label: string;
  priceLabel: string;
  perMonthLabel: string;
  badge: string | null;
};

export const PAYWALL_PLANS: PaywallPlan[] = [
  {
    id: '3',
    months: 3,
    label: '3 месяца',
    priceLabel: '990 ₽',
    perMonthLabel: '330 ₽ / мес.',
    badge: null,
  },
  {
    id: '6',
    months: 6,
    label: '6 месяцев',
    priceLabel: '1 790 ₽',
    perMonthLabel: '298 ₽ / мес.',
    badge: null,
  },
  {
    id: '12',
    months: 12,
    label: '12 месяцев',
    priceLabel: '2 490 ₽',
    perMonthLabel: '207 ₽ / мес.',
    badge: 'Выгода 50%',
  },
];

export const PAYWALL_BENEFITS = [
  'Все рецепты без ограничений',
  'Замены аллергенов',
  'Персональный гид по прикорму',
  'Безопасная подача с подсказками',
] as const;

export function addMonthsUtc(date: Date, months: number): Date {
  const next = new Date(date.getTime());
  next.setUTCMonth(next.getUTCMonth() + months);
  return next;
}
