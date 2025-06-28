import { AuctionRow, BuyerInsert, EpisodeRow, SellerInsert } from 'src/lib/supabase/type';

// =====================================================
// 🏷️ 기본 타입들
// =====================================================
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

export interface UserRoleDataProps {
  role: 'BIDDER' | 'AUCTIONEER';
}

// =====================================================
// 🎯 상태 & 탭 타입들
// =====================================================
export type TabKey = 'ongoing' | 'closed';
export type AuctionStatus = 'bidding' | 'pending' | 'completed' | 'failed' | 'ended';

// =====================================================
// 📦 아이템 인터페이스들
// =====================================================

// 경매 아이템
export interface AuctionItem {
  id: string;
  title: string;
  currentPrice: number;
  endDate: string;
  status: AuctionStatus;
  imageUrl: string;
  myBidAmount?: number;
}

// 포인트 활동
type PointActivity = {
  type: 'charge' | 'purchase' | 'event' | 'signup';
  title: string;
  date: string;
  amount: number;
};

// 경매 활동
type AuctionActivity = {
  type: 'auction';
  title: string;
  date: string;
  status: AuctionStatus;
  myBidAmount?: number;
};

// 통합 활동 타입
export type Activity = AuctionActivity | PointActivity;

// =====================================================
// 🎨 컴포넌트 Props들
// =====================================================
export interface MyAuctionListItemProps {
  item: AuctionItem;
}

export type ActivityListItemProps = {
  activity: Activity;
};

export interface TabsHeaderProps {
  tab: TabKey;
}

export interface TabsContentProps<T = AuctionItem> {
  tab: TabKey;
  data: T[];
}
