import { create } from 'zustand';
import { BuyerUpdate, SellerUpdate } from 'src/lib/supabase/type';

type User = BuyerUpdate | SellerUpdate;

interface UserStore {
  user: User;
  role: string;
  setUser: (user: User, newRole: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  // 키워드로 검색한 경매 리스트
  user: {},
  role: '',
  setUser: (newUser, newRole) => set({ user: newUser, role: newRole })
}));
