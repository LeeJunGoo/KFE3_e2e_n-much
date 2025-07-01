import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuyerUpdate, SellerUpdate } from 'src/lib/supabase/type';
import type { Role } from '../types/auth/index';

type User = BuyerUpdate | SellerUpdate | null;

interface UserStore {
  userInfo: User;
  userRole: Role | null;
  setUser: (userInfo: User, userRole: Role | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      userRole: null,
      setUser: (newUserInfo: User, newUserRole: Role | null) => set({ userInfo: newUserInfo, userRole: newUserRole })
    }),
    {
      name: 'user-store' // localStorage에 저장될 key
    }
  )
);
