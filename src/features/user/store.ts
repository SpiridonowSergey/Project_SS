import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type OnboardingPayload = {
  motherName: string;
  childBirthDate: string;
};

type UserState = {
  motherName: string;
  childBirthDate: string;
  isOnboarded: boolean;
  setMotherName: (motherName: string) => void;
  setChildBirthDate: (childBirthDate: string) => void;
  setIsOnboarded: (isOnboarded: boolean) => void;
  completeOnboarding: (payload: OnboardingPayload) => void;
  resetUser: () => void;
};

const initialState = {
  motherName: '',
  childBirthDate: '',
  isOnboarded: false,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setMotherName: (motherName) => set({ motherName }),
      setChildBirthDate: (childBirthDate) => set({ childBirthDate }),
      setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
      completeOnboarding: ({ motherName, childBirthDate }) =>
        set({
          motherName: motherName.trim(),
          childBirthDate,
          isOnboarded: true,
        }),
      resetUser: () => set(initialState),
    }),
    {
      name: 'user-profile',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
