import { AUCTION_STATUS_LABELS } from 'src/constants/mypage';
import { AuctionItem, AuctionStatus, TabKey } from 'src/types/mypage';

//Status 객체 매핑
export const AUCTION_STATUS_LABEL_MAP: Record<string, keyof typeof AUCTION_STATUS_LABELS> = Object.entries(
  AUCTION_STATUS_LABELS
).reduce(
  (acc, [key, label]) => {
    acc[label] = key as keyof typeof AUCTION_STATUS_LABELS;
    return acc;
  },
  {} as Record<string, keyof typeof AUCTION_STATUS_LABELS>
);

export const filterAuctionsByTab = (auctions: AuctionItem[], tab: TabKey): AuctionItem[] => {
  const now = new Date();

  if (tab === 'ongoing') {
    // 진행 중인 경매 (종료일이 현재보다 미래)
    return auctions.filter((auction) => new Date(auction.endDate) > now);
  } else {
    // 종료된 경매 (종료일이 현재보다 과거)
    return auctions.filter((auction) => new Date(auction.endDate) <= now);
  }
};

export const filterAuctionsByStatus = (auctions: AuctionItem[], filter: string): AuctionItem[] => {
  if (filter === '전체') return auctions;

  const statusKey = AUCTION_STATUS_LABEL_MAP[filter] as AuctionStatus;
  if (!statusKey) return auctions;

  return auctions.filter((auction) => auction.status === statusKey);
};
