import type { AddressRow, AuctionRow } from 'src/shared/supabase/types';

type AuctionSummaryInfoType = Pick<AuctionRow, 'auction_id' | 'title' | 'end_date' | 'image_urls'>;
type AddressSummaryInfoType = Pick<AddressRow, 'address_id' | 'business_name' | 'road_address' | 'detail_address'>;

export type AuctionSummaryInfoWithAddressType = AuctionSummaryInfoType & AddressSummaryInfoType;

type AuctionInfoType = Omit<
  AuctionRow,
  'address_id' | 'created_at' | 'favorites' | 'highest_bidder_id' | 'starting_point' | 'updated_at'
>;

type AddressInfoType = Omit<AddressRow, 'created_at' | 'is_default' | 'user_id'>;

export type AuctionInfoWithAddressType = AuctionInfoType & AddressInfoType;

export type AuctionTimerStatus = 'ongoing' | 'urgent' | 'ended';

// export type BuyerInfoType = {
//   buyer: Pick<BuyerRow, 'buyer_id' | 'avatar' | 'nickname' | 'email'>;
// };

// export type AuctionInfoType = { status: string; data: AuctionRow };

// export type AuctionHighestBidder = { status: string; data: EpisodeRow & BuyerInfoType };

// export type SortedAuctionItemType = AuctionRow & {
//   episodes: {
//     count: number;
//   }[];
// };

// export type SortedAuctionsType = {
//   data: SortedAuctionItemType[];
//   status: string;
// };
