import { AuctionRow, BuyerInsert, EpisodeRow, SellerInsert } from 'src/lib/supabase/type';

// export type MyPageUserInfo = UserRow;
export type MyCreatedAuctions = AuctionRow[];
export type MyBidAuctions = (EpisodeRow & {
  auction: AuctionRow;
})[];

export type CreateBuyerPayload = Pick<BuyerInsert, 'email' | 'nickname'>;
export type CreateSellerPayload = Pick<SellerInsert, 'email' | 'nickname'>;
