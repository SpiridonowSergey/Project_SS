import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FavoritesState = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id) =>
        set((state) => {
          const isAlreadyFavorite = state.favoriteIds.includes(id);

          return {
            favoriteIds: isAlreadyFavorite
              ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
              : [...state.favoriteIds, id],
          };
        }),
      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: 'recipe-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
