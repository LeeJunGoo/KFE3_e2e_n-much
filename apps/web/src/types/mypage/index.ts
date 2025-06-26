import { AUCTION_TAB_FILTERS } from 'src/constants/mypage';
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
  role: string;
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
