import { create } from 'zustand';
import { AuctionRow } from 'src/shared/supabase/types';

interface AuctionsStore {
  auctions: AuctionRow[];
  setAuctions: (auctions: AuctionRow[]) => void;
}

export const useAuctionsStore = create<AuctionsStore>((set) => ({
  // 키워드로 검색한 경매 리스트
  auctions: [],
  setAuctions: (newAuctions: AuctionRow[]) => set({ auctions: newAuctions })
}));
