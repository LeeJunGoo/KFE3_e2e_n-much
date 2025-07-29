'use client';

import { useEffect } from 'react';
import { Skeleton } from '@repo/ui/components/ui/skeleton';
import { AUCTION_LIST_SKELETON_LENGTH } from 'src/entities/auction/constants';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useGetUserFavoriteAuctions } from 'src/entities/user/mypage/auctions/queries/useAuctions';
import AuctionCardClone from 'src/features/user/mypage/components/favorites/components/FavoriteAuctionCard';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import type { AuctionListProps, EpisodeCount } from 'src/entities/auction/types';
import type { AuctionRow } from 'src/shared/supabase/types';

const FavoriteAuctionList = ({ order }: AuctionListProps) => {
  //TODO - nextjs 캐시로 관리하기 (KMH)

  const userData = useUserState();
  const userId: string = userData!.id;

  const { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, ref, inView } =
    useGetUserFavoriteAuctions(order, userId);

  // console.log('fetchedAuctions', fetchedAuctions);

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

  if (isPending) {
    return (
      <>
        <h3 className="pb-2 pt-1 text-sm">{`총 ${fetchedAuctions ? fetchedAuctions.pages.reduce((total, page) => total + page.data.length, 0) : 0}개의 경매가 있습니다`}</h3>
        <ul className="grid grid-cols-2 gap-3">
          {Array.from({ length: AUCTION_LIST_SKELETON_LENGTH }).map(() => (
            <Skeleton key={uuidv4()} className="h-40 w-full" />
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
                <AuctionCardClone
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
      <div className="flex w-full justify-center" ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </>
  );
};
export default FavoriteAuctionList;
