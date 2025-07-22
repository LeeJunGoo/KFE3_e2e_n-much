'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getAuctionCardList } from 'src/entities/auction/api';
import { auctionListKeys } from 'src/entities/auction/queries/queryKeyFactory';
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

//TODO - nextjs 캐시로 관리하기 (KMH)
const AuctionList = ({ order }: AuctionListProps) => {
  const { ref, inView } = useInView();
  const {
    data: fetchedAuctions,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: auctionListKeys.order(order),
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      getAuctionCardList({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId,
    staleTime: 5 //TODO - 생각해보기 (KMH)
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  //TODO - 에러 발생을 이미지로 표시하기 (KMH)
  if (isError) {
    console.error(error);
    return <p>에러 발생</p>;
  }

  //TODO - 스켈레톤 UJI 사용하기 (KMH)
  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <div>
      <h3 className="pb-2 pt-1 text-sm">{`총 ${fetchedAuctions ? fetchedAuctions.pages.reduce((total, page) => total + page.data.length, 0) : 0}개의 경매가 있습니다`}</h3>
      <ul className="grid grid-cols-2 gap-3">
        {fetchedAuctions &&
          fetchedAuctions.pages.map((page) =>
            page.data.map((auction: AuctionRow & EpisodeCount) => {
              const { auction_id: auctionId, title, end_date: endDate, episodes } = auction;
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
                  imageSrc={imageUrls[0]}
                  title={title}
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
