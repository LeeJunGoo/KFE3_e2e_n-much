import type { AddressRow, AuctionRow, RankingRow, UserRow } from 'src/shared/supabase/types';

type AuctionSummaryInfoType = Pick<AuctionRow, 'auction_id' | 'title' | 'end_date' | 'image_urls'>;
type AddressSummaryInfoType = Pick<AddressRow, 'address_id' | 'business_name' | 'road_address' | 'detail_address'>;

export type AuctionSummaryInfoWithAddressType = AuctionSummaryInfoType & AddressSummaryInfoType;

type AuctionInfoType = Omit<
  AuctionRow,
  'address_id' | 'created_at' | 'favorites' | 'highest_bidder_id' | 'starting_point' | 'updated_at'
>;

type AddressInfoType = Omit<AddressRow, 'created_at' | 'is_default' | 'user_id'>;

export type AuctionInfoWithAddressType = AuctionInfoType & AddressInfoType;

export type SellerAuctionCountType = {
  totalAuctions: number;
  activeAuctions: number;
};

type RankingSummaryInfoType = Pick<RankingRow, 'rank_position' | 'bid_amount' | 'created_at'>;
type UserSummaryInfoType = Pick<UserRow, 'email' | 'nick_name' | 'user_avatar' | 'id'>;

export type BidderRankingInfoType = RankingSummaryInfoType & { users: UserSummaryInfoType };

// export type BuyerInfoType = {
//   buyer: Pick<BuyerRow, 'buyer_id' | 'avatar' | 'nickname' | 'email'>;
// };

// export type AuctionInfoType = { status: string; data: AuctionRow };

// export type AuctionHighestBidder = { status: string; data: EpisodeRow & BuyerInfoType };

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

//NOTE - auctionForm에서 사용하는 목록
export type AddressId = Pick<AddressRow, 'address_id'>;

export type FetchedAuction = Pick<
  AuctionRow,
  'title' | 'description' | 'end_date' | 'starting_point' | 'current_point' | 'max_point' | 'image_urls' | 'status'
>;

export interface PreviewImage {
  id: string;
  data: string;
  isUrl: boolean;
}

//NOTE - auctionForm 관련 페이지 props 목록
export interface AuctionMutationPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export interface AuctionFormPageProps {
  auctionId: string | undefined;
}

//NOTE - auctionForm 컴포넌트 props
export interface AuctionFormProps {
  auctionIdParam: string | undefined;
  loggedInUserId: string;
}

// export type SortedAuctionItemType = AuctionRow & {
//   episodes: {
//     count: number;
//   }[];
// };

// export type SortedAuctionsType = {
//   data: SortedAuctionItemType[];
//   status: string;
// };

//NOTE - auctionList 관련 페이지 props 목록
export interface CurrentAuctionsPageProps {
  searchParams: Promise<{ order: string }>;
}

export interface AuctionListPageProps {
  order: string;
}

//NOTE - auctionCard의 좋아유 갯수
export interface EpisodeCount {
  episodes: [{ count: number }];
}

//NOTE - 경매 리스트 props
export interface AuctionListProps {
  order: string;
}

//NOTE - auctionCard의 props
export interface AuctionCardProp {
  auctionId: string;
  imageSrc: string | undefined;
  title: string;
  episodeCount: number;
  endDate: string;
  favoriteCount: number;
}

//NOTE - 정렬 카테고리 선택
export interface SelectOrderProps {
  order: string;
}
