export const auctionQueryKeys = {
  all: ['auction'] as const,
  user: (userId: string) => [...auctionQueryKeys.all, 'user', userId] as const
};
