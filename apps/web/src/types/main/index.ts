//NOTE - 메인페이지 타입 지정

import { AuctionRow } from 'src/lib/supabase/type';

export type SortedAuction = AuctionRow & {
  episodes: {
    count: number;
  }[];
};

export type SortedAuctionsType = {
  data: SortedAuction[];
  status: string;
};
