import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "../utils/mmkvStorage";

type AuthStore = {
  user: any | null;
  setUser: (user: any) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  clearIsLoggedIn: () => void;
  clearAll: () => void;
};

type PersistedAuthState = Pick<AuthStore, "user" | "isLoggedIn">;

const authStoreStorage = createJSONStorage<PersistedAuthState>(() => ({
  setItem: (name, value) => {
    mmkvStorage.set(name, value);
  },
  getItem: (name) => {
    return mmkvStorage.getString(name) ?? null;
  },
  removeItem: (name) => {
    mmkvStorage.remove(name);
  },
}));

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      clearIsLoggedIn: () => set({ isLoggedIn: false }),
      clearAll: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "auth.store",
      storage: authStoreStorage,
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
