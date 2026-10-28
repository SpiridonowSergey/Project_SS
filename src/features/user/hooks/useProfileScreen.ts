import { useUserStore } from '@/features/user/store';
import { formatChildAge } from '@/features/user/utils/formatChildAge';

export function useProfileScreen() {
  const motherName = useUserStore((state) => state.motherName);
  const childBirthDate = useUserStore((state) => state.childBirthDate);
  const childAge = formatChildAge(childBirthDate);

  return {
    motherName: motherName || 'Мама',
    childBirthDate,
    childAgeLabel: childAge ? `Малышу ${childAge}` : null,
  };
}
