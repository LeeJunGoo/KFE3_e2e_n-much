import { AUCTION_TAB_FILTERS, BID_STATUS_LABEL } from 'src/constants/mypage';
import { AuctionRow, BuyerInsert, EpisodeRow, SellerInsert } from 'src/lib/supabase/type';

// export type MyPageUserInfo = UserRow;
export type MyCreatedAuctions = AuctionRow[];
export type MyBidAuctions = (EpisodeRow & {
  auction: AuctionRow;
})[];

export type CreateBuyerPayload = Pick<BuyerInsert, 'email' | 'nickname'>;
export type CreateSellerPayload = Pick<SellerInsert, 'email' | 'nickname'>;

export type MyPageMenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

//조건 분기 처리
export interface UserRoleDataProps {
  role: 'BIDDER' | 'AUCTIONEER';
}

//내 경매 현황 page
export type TabKey = keyof typeof AUCTION_TAB_FILTERS;

//mock data (제거용)
export interface AuctionItem {
  id: string;
  title: string;
  currentPrice: number;
  endDate: string;
  status: AuctionStatus;
  imageUrl: string;
  myBidAmount?: number;
}

export type AuctionStatus = 'bidding' | 'winning' | 'won' | 'lost';

export interface AuctionTabsContentProps {
  tab: 'ongoing' | 'closed';
  data: AuctionItem[];
}

export interface AuctionListItemProps {
  item: AuctionItem;
}

//NOTE - 삭제 예정
export type AuctionActivity = {
  type: 'auction';
  title: string;
  date: string;
  status: keyof typeof BID_STATUS_LABEL;
};

export type PointActivity = {
  type: 'point';
  title: string;
  date: string;
  amount: number;
};

export type SignupActivity = {
  type: 'signup';
  title: string;
  date: string;
  amount: number;
};

export type EventActivity = {
  type: 'event';
  title: string;
  date: string;
  amount: number;
};

export type Activity = AuctionActivity | PointActivity | SignupActivity | EventActivity;

export type ActivityListItemProps = {
  activity: Activity;
};
/** ---------------------------------- */

export type ActivityType = 'all' | 'auction' | 'point' | 'use' | 'event' | 'participation' | 'signup';
