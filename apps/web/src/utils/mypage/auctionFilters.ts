import { AuctionItem, AuctionStatus, TabKey } from 'src/types/mypage';

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

  const statusMap: Record<string, AuctionStatus[]> = {
    입찰중: ['bidding'],
    낙찰예정: ['winning'],
    낙찰: ['won'],
    유찰: ['failed']
  };

  const targetStatuses = statusMap[filter];
  if (!targetStatuses) return auctions;

  return auctions.filter((auction) => targetStatuses.includes(auction.status));
};
