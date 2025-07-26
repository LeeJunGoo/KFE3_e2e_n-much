import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getFavoriteAuctionCardList, getUserAuctions } from 'src/entities/user/mypage/auctions/api';
import { auctionQueryKeys } from 'src/entities/user/mypage/auctions/queries/keys';
import type { EpisodeCount } from 'src/entities/auction/types';
import type { AuctionRow, UserRow } from 'src/shared/supabase/types';

export const useGetUserAuctions = (userId?: UserRow['id']) => {
  return useQuery({
    queryKey: auctionQueryKeys.user(userId || ''),
    queryFn: () => getUserAuctions(userId!),
    enabled: !!userId
  });
};

// (useGetAuctionListQuery 참고) - KSH
export const useGetUserFavoriteAuctions = (order: string, userId: string) => {
  const { ref, inView } = useInView();
  const {
    data: fetchedAuctions,
    isError,
    error,
    isPending,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['favoriteAuctions', userId],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      getFavoriteAuctionCardList({ order, pageParam, userId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId,
    staleTime: 0,
    enabled: Boolean(order) === true && Boolean(userId) === true
  });

  return { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, ref, inView };
};
