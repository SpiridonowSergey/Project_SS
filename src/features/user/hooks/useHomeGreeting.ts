import { useUserStore } from '@/features/user/store';
import { formatChildAge } from '@/features/user/utils/formatChildAge';

export function useHomeGreeting() {
  const motherName = useUserStore((state) => state.motherName);
  const childBirthDate = useUserStore((state) => state.childBirthDate);
  const childAge = formatChildAge(childBirthDate);

  return {
    greeting: motherName ? `Привет, ${motherName}!` : 'Привет, мама!',
    childAgeLabel: childAge ? `Малышу ${childAge}` : null,
  };
}
