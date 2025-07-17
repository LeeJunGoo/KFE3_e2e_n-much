import { type User } from '@supabase/supabase-js';
import { create } from 'zustand';

type AuthState = {
  user: User | null;
  loading: boolean;
  actions: {
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
  };
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  actions: {
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading })
  }
}));

export const useUserState = () => useAuthStore((state) => state.user);
export const useUserLoadingState = () => useAuthStore((state) => state.loading);
export const useAuthActions = () => useAuthStore((state) => state.actions);
