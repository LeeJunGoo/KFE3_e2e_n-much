import { AuctionRow, EpisodeRow, UserInsert, UserRow } from 'src/lib/supabase/type';

export type MyPageUserInfo = UserRow;
export type MyCreatedAuctions = AuctionRow[];
export type MyBidAuctions = (EpisodeRow & {
  auction: AuctionRow;
})[];

export type CreateUserPayload = Pick<UserInsert, 'email' | 'password' | 'role' | 'nickname'>;
