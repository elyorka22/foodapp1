import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  role: 'USER' | 'ADMIN' | 'RESTAURANT' | 'COURIER' | null;
  setSession: (accessToken: string, role: AuthState['role']) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,
  setSession: (accessToken, role) => set({ accessToken, role }),
  clearSession: () => set({ accessToken: null, role: null }),
}));
