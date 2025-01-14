import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  _id: number;
  name: string;
  profile: string;
  accessToken: string;
  refreshToken: string;
};

interface AuthState {
  user: User | null;
}

interface AuthActions {
  setUser: (user: User | null, active: string) => void;
  resetUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null, active: string) => {
        useAuthStore.persist.setOptions({
          storage: createJSONStorage(() => active === 'active' ? localStorage : sessionStorage),
        });
        set({ user });
      },
      resetUser: () => set({ user: null }),
    }),
    {
      name: 'user'
    }
  )
);