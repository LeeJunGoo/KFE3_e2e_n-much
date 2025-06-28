import { STATUS_LABELS } from 'src/constants/mypage';
import { AuctionItem, AuctionStatus, TabKey } from 'src/types/mypage';

// 객체 매핑
export const STATUS_LABEL_MAP: Record<string, keyof typeof STATUS_LABELS> = Object.entries(STATUS_LABELS).reduce(
  (acc, [key, label]) => {
    acc[label] = key as keyof typeof STATUS_LABELS;
    return acc;
  },
  {} as Record<string, keyof typeof STATUS_LABELS>
);

export const filterByTabKey = (auctions: AuctionItem[], tab: TabKey): AuctionItem[] => {
  const now = new Date();
  if (tab === 'ongoing') {
    // 진행 중인 경매 (종료일이 현재보다 미래)
    return auctions.filter((auction) => new Date(auction.endDate) > now);
  } else {
    // 종료된 경매 (종료일이 현재보다 과거)
    return auctions.filter((auction) => new Date(auction.endDate) <= now);
  }
};

export const filterByStatusLabel = <T extends { status: string }>(items: T[], filter: string): T[] => {
  if (filter === '전체') return items;

  const statusKey = STATUS_LABEL_MAP[filter] as AuctionStatus;
  if (!statusKey) return items;

  return items.filter((item) => item.status === statusKey);
};
