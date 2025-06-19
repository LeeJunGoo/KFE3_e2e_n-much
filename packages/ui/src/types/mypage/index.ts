import { AuctionRow } from '../auctions';
import { EpisodeRow } from '../episodes';
import { UserRow } from '../users';

export type MyPageUserInfo = UserRow;
export type MyCreatedAuctions = AuctionRow[];
export type MyBidAuctions = (EpisodeRow & {
  auction: AuctionRow;
})[];

