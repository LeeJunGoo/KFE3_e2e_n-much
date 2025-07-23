import { ADDRESS_ID_QUERY_KEY, AUCTION_FORM_QUERY_KEY, AUCTION_LIST_QUERY_KEY } from 'src/entities/auction/constants';

//NOTE - auctionForm에 들어갈 데이터를 가져오는데 사용
export const auctionFormKeys = {
  all: [AUCTION_FORM_QUERY_KEY] as const,
  item: (auctionId: string | undefined) => (auctionId ? ([...auctionFormKeys.all, auctionId] as const) : [])
};

//NOTE - addressId를 가져올 때 사용
//TODO - auctionFormKeys를 addressId에 맞게 수정하기 (KMH)
export const addressIdKeys = {
  all: [ADDRESS_ID_QUERY_KEY] as const,
  item: (userId: string | undefined) => (userId ? ([...auctionFormKeys.all, userId] as const) : [])
};

//NOTE - auctionList를 가져올 때 사용
//TODO - auctionFormKeys를 auctionList에 맞게 수정하기 (KMH)
export const auctionListKeys = {
  all: [AUCTION_LIST_QUERY_KEY] as const,
  order: (order: string | undefined) => (order ? ([...auctionFormKeys.all, order] as const) : [])
};
