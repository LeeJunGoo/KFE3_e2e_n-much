import { ADDRESS_ID_QUERY_KEY, AUCTION_FORM_QUERY_KEY } from './constants/queryKey';

//NOTE - auctionForm에 들어갈 데이터를 가져오는데 사용
export const auctionFormKeys = {
  all: [AUCTION_FORM_QUERY_KEY] as const,
  item: (auctionId: string) => [...auctionFormKeys.all, auctionId] as const
};

//NOTE - addressId를 가져올 때 사용
export const addressIdKeys = {
  all: [ADDRESS_ID_QUERY_KEY] as const,
  item: (userId: string) => [...auctionFormKeys.all, userId] as const
};
