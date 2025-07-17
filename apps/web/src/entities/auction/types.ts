import type { AddressRow, AuctionRow, UserRow } from 'src/shared/supabase/types';

// export type BuyerInfoType = {
//   buyer: Pick<BuyerRow, 'buyer_id' | 'avatar' | 'nickname' | 'email'>;
// };

export type UserType = { users: Pick<UserRow, 'address_id' | 'email' | 'id'> };

export type AuctionInfoType = { status: string; data: AuctionRow };

export type AuctionInfoForEpisodeType = AuctionRow & UserType;

// export type AuctionHighestBidder = { status: string; data: EpisodeRow & BuyerInfoType };

export type SellerAuctionCountType = {
  status: string;
  data: {
    totalAuctions: number;
    activeAuctions: number;
  };
};

export type SortedAuctionItemType = AuctionRow & {
  episodes: {
    count: number;
  }[];
};

export type SortedAuctionsType = {
  data: SortedAuctionItemType[];
  status: string;
};

export type AddressType = {
  business_name: AddressRow['business_name'];
  road_address: AddressRow['road_address'];
  detail_address: AddressRow['detail_address'];
  is_default: AddressRow['is_default'];
};

export type AuctionTimerStatus = 'ongoing' | 'urgent';
