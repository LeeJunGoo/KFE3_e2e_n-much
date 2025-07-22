import { selectUsers } from 'src/entities/auth/supabase';
import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import type { ExtendedUser } from 'src/entities/auth/types';

type AuthState = {
  user: ExtendedUser | null;
  loading: boolean;
  actions: {
    setUser: (user: ExtendedUser | User | null) => void;
    setLoading: (loading: boolean) => void;
    fetchUserProfile: (userId: string) => Promise<void>;
  };
};

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  actions: {
    setUser: (user) => {
      set({ user: user as ExtendedUser | null });
      if (user) {
        get().actions.fetchUserProfile(user.id);
      }
    },

    setLoading: (loading) => set({ loading }),

    fetchUserProfile: async (userId) => {
      const profile = await selectUsers(userId);
      const currentUser = get().user;

      if (currentUser && profile) {
        set({
          user: {
            ...currentUser,
            ...profile
          }
        });
      }
    }
  }
}));

export const useUserState = () => useAuthStore((state) => state.user);
export const useUserLoadingState = () => useAuthStore((state) => state.loading);
export const useAuthActions = () => useAuthStore((state) => state.actions);
