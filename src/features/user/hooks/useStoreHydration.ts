import { useEffect, useState } from 'react';

import { useUserStore } from '@/features/user/store';

export function useStoreHydration() {
  const [hydrated, setHydrated] = useState(() => useUserStore.persist.hasHydrated());

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    return useUserStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
  }, []);

  return hydrated;
}
