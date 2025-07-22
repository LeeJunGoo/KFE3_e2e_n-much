'use client';

//TODO - 스피너 적용하기

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchAllAuctionWithEpisodeCount, fetchFavoriteAuctionWithEpisodeCount } from 'src/entities/auction/api';
import { useUserLoadingState, useUserState } from 'src/entities/auth/stores/authStore';
import AuctionCard from 'src/features/user/mypage/components/favorites/components/AuctionCardClone';
import type { AuctionRow } from 'src/shared/supabase/types';

interface EpisodeCount {
  episodes: [{ count: number }];
}

const AuctionListClone = ({ order }: { order: string }) => {
  const userData = useUserState();
  const isUserloading = useUserLoadingState();

  const user: string = userData?.id as string;

  const { ref, inView } = useInView();
  const {
    data: auctions,
    isError,
    isLoading,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['auctions', order, user],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      fetchFavoriteAuctionWithEpisodeCount({ order, pageParam, user }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextId,
    staleTime: 5,
    enabled: !!user
  });
  console.log('auctions:', auctions);

  // const {
  //   data: test,
  //   isError,
  //   isLoading,
  //   isFetchingNextPage,
  //   fetchNextPage
  // } = useInfiniteQuery({
  //   queryKey: ['auctions', order],
  //   queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
  //     fetchAllAuctionWithEpisodeCount({ order, pageParam }),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => lastPage.nextId,
  //   staleTime: 5
  // });
  // console.log('test:', test);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isUserloading) {
    // 스켈레톤
  }

  if (isError) {
    return <p>에러 발생</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <div>
      <h3 className="pb-2 pt-1 text-sm">{`총 ${auctions?.pages.reduce((total, page) => total + page.data.length, 0)}개의 경매가 있습니다`}</h3>
      <ul className="grid grid-cols-2 gap-3">
        {auctions &&
          auctions.pages.map((page) =>
            page.data.map((auction: AuctionRow & EpisodeCount) => {
              const {
                auction_id: actionId,
                status,
                title,
                current_point: currentPoint,
                end_date: endDate,
                episodes,
                address_id: address
              } = auction;
              let { image_urls: imageUrls, favorites } = auction;

              if (!imageUrls) {
                imageUrls = [];
              }
              if (!favorites) {
                favorites = [];
              }

              return (
                <AuctionCard
                  key={`${actionId}`}
                  auction_id={actionId}
                  address={address}
                  status={status}
                  imageSrc={imageUrls[0]}
                  title={title}
                  currentPoint={currentPoint}
                  endDate={endDate}
                  episodeCount={episodes[0]['count']}
                  favorites={favorites.length}
                />
              );
            })
          )}
        <div>
          <div ref={ref} onClick={() => fetchNextPage()}></div>
        </div>
      </ul>
    </div>
  );
};
export default AuctionListClone;
