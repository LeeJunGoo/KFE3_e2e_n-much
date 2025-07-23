'use client';

import { useEffect } from 'react';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { AUCTION_LIST_SKELETON_LENGTH } from 'src/entities/auction/constants';
import { useGetAuctionListQuery } from 'src/entities/auction/queries/auction';
import AuctionCard from 'src/features/auction/shared/AuctionCard';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import type { AuctionListProps, EpisodeCount } from 'src/entities/auction/types';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionList = ({ order, keyword }: AuctionListProps) => {
  console.log('list', order, keyword);
  //TODO - nextjs 캐시로 관리하기 (KMH)
  const { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, ref, inView } =
    useGetAuctionListQuery(order, keyword);

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

  return (
    <>
      <h3 className="pb-2 pt-1 text-sm">
        {fetchedAuctions
          ? keyword
            ? `${keyword}에 대한 검색 결과입니다.`
            : `총 ${fetchedAuctions.pages.reduce((total, page) => total + page.data.length, 0)}개의 경매가 있습니다.`
          : '총 0개의 경매가 있습니다'}
      </h3>
      <ul className="grid grid-cols-2 gap-2">
        {isPending &&
          Array.from({ length: AUCTION_LIST_SKELETON_LENGTH }).map(() => (
            <Skeleton key={uuidv4()} className="h-40 w-full" />
          ))}
        {fetchedAuctions &&
          !isPending &&
          fetchedAuctions.pages.map((page) =>
            page.data.map((auction: AuctionRow & EpisodeCount) => {
              const { auction_id: auctionId, title, end_date: endDate, episodes } = auction;
              const { image_urls: imageUrls, favorites } = auction;
              const episodeCount = episodes[0]['count'];
              const favoriteCount = favorites.length;
              const previewImage = imageUrls[0];

              return (
                <AuctionCard
                  key={`${auctionId}`}
                  auctionId={auctionId}
                  imageSrc={previewImage}
                  title={title}
                  endDate={endDate}
                  episodeCount={episodeCount}
                  favoriteCount={favoriteCount}
                />
              );
            })
          )}
      </ul>
      <div className="flex w-full justify-center" ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </>
  );
};
export default AuctionList;
