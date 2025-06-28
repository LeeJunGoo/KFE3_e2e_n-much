import { useQuery } from '@tanstack/react-query';
import { auctionQueryKeys } from './keys/auctions';

// 경매 데이터 리스트 불러오기
export const useGetAuctions = () => {
  return useQuery({
    queryKey: auctionQueryKeys.all
  });
};

// 내가 올린 경매 데이터 불러오기(경매자)
export const useCreatedAuctions = (creatorId: string) => {
  return useQuery({
    queryKey: auctionQueryKeys.created(creatorId)
  });
};

// 내가 입찰한 경매 데이터 불러오기 (입찰자)
export const useGetBidAuctions = (bidderId: string) => {
  return useQuery({
    queryKey: auctionQueryKeys.bid(bidderId),
    enabled: !!bidderId
  });
};
