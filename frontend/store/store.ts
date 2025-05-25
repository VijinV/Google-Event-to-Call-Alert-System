import { create } from "zustand";
import { persist } from "zustand/middleware";
import { secureStorage } from "./secureStorage";

type User = {
  email: string;
  name: string;
  image: string;
};

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const item = secureStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) =>
          secureStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => secureStorage.removeItem(name),
      },
      partialize: (state) => ({ ...state }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
