import { AuctionRow, BuyerRow, EpisodeRow, SellerRow } from 'src/lib/supabase/type';

//NOTE - 경매 상세페이지 타입 지정

export type BuyerInfo = {
  buyer: Pick<BuyerRow, 'buyer_id' | 'avatar' | 'nickname'>;
};

export type SellerInfo = {
  seller: Pick<SellerRow, 'seller_id' | 'avatar' | 'nickname'>;
};

export type AuctionInfo = { status: string; data: AuctionRow };

export type AuctionWithSellerInfo = { status: string; data: AuctionRow & SellerInfo };

export type AuctionHighestBidder = { status: string; data: EpisodeRow & BuyerInfo };

export type SellerAuctionCountType = {
  status: string;
  data: {
    totalAuctions: number;
    activeAuctions: number;
  };
};

export type AuctionTimeProps = Pick<AuctionRow, 'start_time' | 'end_time'> & { highestBuyer: EpisodeRow & BuyerInfo };
