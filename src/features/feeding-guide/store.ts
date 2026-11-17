import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FeedingGuideState = {
  introducedStageIds: string[];
  toggleIntroduced: (stageId: string) => void;
  isIntroduced: (stageId: string) => boolean;
  clearProgress: () => void;
};

export const useFeedingGuideStore = create<FeedingGuideState>()(
  persist(
    (set, get) => ({
      introducedStageIds: [],
      toggleIntroduced: (stageId) =>
        set((state) => {
          const isAlreadyIntroduced = state.introducedStageIds.includes(stageId);

          return {
            introducedStageIds: isAlreadyIntroduced
              ? state.introducedStageIds.filter((id) => id !== stageId)
              : [...state.introducedStageIds, stageId],
          };
        }),
      isIntroduced: (stageId) => get().introducedStageIds.includes(stageId),
      clearProgress: () => set({ introducedStageIds: [] }),
    }),
    {
      name: 'feeding-guide-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
