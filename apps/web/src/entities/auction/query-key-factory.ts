import { ADDRESS_ID_QUERY_KEY, AUCTION_FORM_QUERY_KEY } from './constants/queryKey';

export const auctionFormKeys = {
  all: [AUCTION_FORM_QUERY_KEY] as const,
  item: (auctionId: string) => [...auctionFormKeys.all, auctionId] as const
};

export const addressIdKeys = {
  all: [ADDRESS_ID_QUERY_KEY] as const,
  item: (userId: string) => [...auctionFormKeys.all, userId] as const
};
