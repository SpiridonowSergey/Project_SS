import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FeedingGuideState = {
  introducedStageIds: string[];
  toggleIntroduced: (stageId: string) => void;
  isIntroduced: (stageId: string) => boolean;
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
    }),
    {
      name: 'feeding-guide-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
