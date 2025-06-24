export const auctionQueryKeys = {
  all: ['auction'] as const,
  detail: (auctionId: string) => [...auctionQueryKeys.all, 'detail', auctionId] as const,
  created: (creatorId: string) => [...auctionQueryKeys.all, 'created', creatorId] as const,
  bid: (bidderId: string) => [...auctionQueryKeys.all, 'bid', bidderId] as const
};
