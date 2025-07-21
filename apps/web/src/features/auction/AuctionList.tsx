'use client';

//TODO - 스피너 적용하기

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getAuctionCardList } from 'src/entities/auction/api';
import AuctionCard from 'src/features/auction/shared/AuctionCard';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';
import type { AuctionRow } from 'src/shared/supabase/types';

//TODO - 파일로 분리하기 (KMH)
interface AuctionListProps {
  order: string;
}

//TODO - 파일로 분리하기 (KMH)
interface EpisodeCount {
  episodes: [{ count: number }];
}

const AuctionList = ({ order }: AuctionListProps) => {
  const { ref, inView } = useInView();
  const {
    data: auctions,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['auctions', order],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      getAuctionCardList({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId,
    staleTime: 5
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) {
    console.error(error);
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
                auction_id: auctionId,
                status,
                title,
                current_point: currentPoint,
                end_date: endDate,
                episodes
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
                  key={`${auctionId}`}
                  auction_id={auctionId}
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
          <div ref={ref} onClick={() => fetchNextPage()}>
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        </div>
      </ul>
    </div>
  );
};
export default AuctionList;
