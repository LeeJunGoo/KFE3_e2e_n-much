import type { AuctionRow } from 'src/shared/supabase/types';

export type AuctionsContainerProps = {
  auctions?: AuctionRow[];
};

export type MyAuctionListItemProps = {
  auction: AuctionRow;
};
