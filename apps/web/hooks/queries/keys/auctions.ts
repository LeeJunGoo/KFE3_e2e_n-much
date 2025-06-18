export const auctionQueryKeys = {
  all: ['auction'] as const,
  detail: (id: string) => ['auction', id] as const,
  created: (creatorId: string) => ['auction', 'created', creatorId] as const,
  bid: (bidderId: string) => ['auction', 'bid', bidderId] as const
};
