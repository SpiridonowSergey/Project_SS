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

  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}
