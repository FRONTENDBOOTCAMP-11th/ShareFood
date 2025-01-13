import { create } from 'zustand';

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
  setUser: (user: User | null) => void;
  resetUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (user: User | null) => {
    set({ user });
  },
  resetUser: () => set({ user: null }),
}));

export const useSessionStorage = () => {
  const setItem = (key: string, value: string | undefined) => {
    sessionStorage.setItem(key, value ?? '');
  };

  return { setItem };
};

export const useLocalStorage = () => {
  const setItem = (key: string, value: string | undefined) => {
    sessionStorage.setItem(key, value ?? '');
  };

  return { setItem };
};
