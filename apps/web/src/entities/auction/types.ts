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
