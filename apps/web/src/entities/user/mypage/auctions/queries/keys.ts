export const auctionQueryKeys = {
  all: ['auction'] as const,
  user: (userId: string) => [...auctionQueryKeys.all, 'user', userId] as const
};

export const likedAuctionQueryKeys = {
  all: ['likedAuction'] as const,
  user: (userId: string) => [...likedAuctionQueryKeys.all, 'user', userId] as const
};
