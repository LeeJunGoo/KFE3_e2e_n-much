'use client';

import { useEffect } from 'react';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { useGetAuctionListQuery } from 'src/entities/auction/queries/auction';
import AuctionCard from 'src/features/auction/shared/AuctionCard';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';
import type { AuctionListProps, EpisodeCount } from 'src/entities/auction/types';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionList = ({ order }: AuctionListProps) => {
  //TODO - nextjs 캐시로 관리하기 (KMH)
  const { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, ref, inView } =
    useGetAuctionListQuery(order);

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

  //TODO - 스켈레톤 UJI 물어보기 (KMH)
  if (isPending) {
    return (
      <>
        <h3 className="pb-2 pt-1 text-sm">{`총 ${fetchedAuctions ? fetchedAuctions.pages.reduce((total, page) => total + page.data.length, 0) : 0}개의 경매가 있습니다`}</h3>
        <ul className="grid grid-cols-2 gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="rounded-xs h-[217.994px] w-[310px]">
              <Skeleton />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
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
                  auctionId={auctionId}
                  imageSrc={imageUrls[0]}
                  title={title}
                  endDate={endDate}
                  episodeCount={episodes[0]['count']}
                  favoriteCount={favorites.length}
                />
              );
            })
          )}
      </ul>
      <div className="flex w-full items-center" ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </>
  );
};
export default AuctionList;
