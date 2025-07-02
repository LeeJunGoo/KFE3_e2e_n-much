'use client';

//FIXME - tanstack query 적용하기
//TODO -  select와 url 불일치 고민하기
//TODO - 서버 컴포넌트 전환 생각해보기

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllAuctionWithEpisodeCount } from 'src/lib/queries/auctions';
import AuctionCard from '../common/AuctionCard';
import { AuctionRow } from 'src/lib/supabase/type';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface EpisodeCount {
  episodes: [{ count: number }];
}

export default function AuctionList({ order }: { order: string }) {
  const { ref, inView } = useInView();
  const {
    data: auctions,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['auctions', order],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      fetchAllAuctionWithEpisodeCount({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextId,
    staleTime: 5
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) {
    return <p>에러 발생</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <div className="rounded-md bg-gray-300 px-2 py-2">
      <p className="pt-1 pb-2 text-sm">{`총 ${auctions?.pages.reduce((total, page) => total + page.data.length, 0)}개의 경매가 있습니다`}</p>
      <ul className="grid grid-cols-2 gap-3">
        {auctions &&
          auctions.pages.map((page) =>
            page.data.map((auction: AuctionRow & EpisodeCount) => {
              const { auction_id, status, title, current_point, end_time, episodes, address } = auction;
              let { image_urls, favorites } = auction;

              if (!image_urls) {
                image_urls = [];
              }
              if (!favorites) {
                favorites = [];
              }

              return (
                <AuctionCard
                  key={`${auction_id}`}
                  auction_id={auction_id}
                  address={address[0]}
                  status={status}
                  imageSrc={image_urls[0]}
                  title={title}
                  currentPoint={current_point}
                  endTime={end_time}
                  episodeCount={episodes[0]['count']}
                  favorites={favorites.length}
                />
              );
            })
          )}
        <div>
          <button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
          </button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
      </ul>
    </div>
  );
}
