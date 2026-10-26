function pluralYears(years: number) {
  const mod10 = years % 10;
  const mod100 = years % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return 'год';
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return 'года';
  }

  return 'лет';
}

export function formatChildAge(childBirthDate: string) {
  if (!childBirthDate) {
    return null;
  }

  const birthDate = new Date(childBirthDate);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const now = new Date();
  let months =
    (now.getFullYear() - birthDate.getFullYear()) * 12 +
    (now.getMonth() - birthDate.getMonth());

  if (now.getDate() < birthDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    return null;
  }

  if (months < 12) {
    return `${months} мес.`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} ${pluralYears(years)}`;
  }

  return `${years} ${pluralYears(years)} ${remainingMonths} мес.`;
}

export function isValidIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime());
}

const MONTHS_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
] as const;

export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(value: string) {
  if (!isValidIsoDate(value)) {
    return null;
  }

  return new Date(`${value}T00:00:00`);
}

export function formatDisplayDate(value: string) {
  const date = parseIsoDate(value);
  if (!date) {
    return null;
  }

  return `${date.getDate()} ${MONTHS_RU[date.getMonth()]} ${date.getFullYear()}`;
}
