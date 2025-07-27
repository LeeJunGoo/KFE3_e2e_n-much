export const auctionQueryKeys = {
  all: ['auction'] as const,
  user: (userId: string) => [...auctionQueryKeys.all, 'user', userId] as const
};

export const favoriteAuctionQueryKeys = {
  all: ['favoriteAuction'] as const,
  user: (userId: string) => [...favoriteAuctionQueryKeys.all, 'user', userId] as const
};
