/**
 * Resets persisted client stores after sign-out.
 * Wired from the profile screen so feature stores stay decoupled from each other.
 */
export type LocalSessionResetters = {
  clearFavorites: () => void;
  clearFeedingProgress: () => void;
  clearPlateOverrides: () => void;
};

export function clearLocalSessionStores(resetters: LocalSessionResetters) {
  resetters.clearFavorites();
  resetters.clearFeedingProgress();
  resetters.clearPlateOverrides();
}
