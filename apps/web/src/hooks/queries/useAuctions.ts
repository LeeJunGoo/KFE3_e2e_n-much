import { useQuery } from '@tanstack/react-query';
import { auctionQueryKeys } from './keys/auctions';
import {
  fetchAllAuctions,
  fetchAuctionById,
  fetchMyBidAuctions,
  fetchMyCreatedAuctions
} from '../../lib/queries/auctions';

// 경매 데이터 리스트 불러오기
export const useGetAuctions = () => {
  return useQuery({
    queryKey: auctionQueryKeys.all,
    queryFn: fetchAllAuctions
  });
};

// 특정 경매 데이터 불러오기
export const useGetAuction = (auctionId: string) => {
  return useQuery({
    queryKey: auctionQueryKeys.detail(auctionId),
    queryFn: () => fetchAuctionById(auctionId),
    enabled: !!auctionId
  });
};

// 내가 올린 경매 데이터 불러오기(경매자)
export const useCreatedAuctions = (creatorId: string) => {
  return useQuery({
    queryKey: auctionQueryKeys.created(creatorId),
    queryFn: () => fetchMyCreatedAuctions(creatorId),
    enabled: !!creatorId
  });
};

// 내가 입찰한 경매 데이터 불러오기 (입찰자)
export const useGetBidAuctions = (bidderId: string) => {
  return useQuery({
    queryKey: auctionQueryKeys.bid(bidderId),
    queryFn: () => fetchMyBidAuctions(bidderId),
    enabled: !!bidderId
  });
};
