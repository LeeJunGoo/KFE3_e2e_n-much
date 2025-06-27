//NOTE - 메인페이지 타입 지정

import { AuctionRow } from 'src/lib/supabase/type';

export type SortedAuctionItemType = AuctionRow & {
  episodes: {
    count: number;
  }[];
};

export type SortedAuctionsType = {
  data: SortedAuctionItemType[];
  status: string;
};
