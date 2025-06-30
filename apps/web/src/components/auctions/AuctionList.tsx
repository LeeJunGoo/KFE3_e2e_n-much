'use client';

//FIXME - tanstack query 적용하기
//TODO -  select와 url 불일치 고민하기
//TODO - 서버 컴포넌트 전환 생각해보기

import { useQuery } from '@tanstack/react-query';
import { fetchAllAuctionWithEpisodeCount } from 'src/lib/queries/auctions';
import AuctionCard from '../common/AuctionCard';
import { AuctionRow } from 'src/lib/supabase/type';

interface EpisodeCount {
  episodes: [{ count: number }];
}

export default function AuctionList({ order }: { order: string }) {
  const {
    data: auctions,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['auctions'],
    queryFn: () => fetchAllAuctionWithEpisodeCount(order)
  });
  if (isError) {
    return <p>에러 발생</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <div className="rounded-md bg-gray-300 px-2 py-2">
      <p className="pt-1 pb-2 text-sm">{`총 ${auctions.length}개의 경매가 있습니다`}</p>
      <ul className="grid grid-cols-2 gap-3">
        {auctions.length > 0 &&
          auctions.map((auction: AuctionRow & EpisodeCount) => {
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
                key={auction_id}
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
          })}
      </ul>
    </div>
  );
}
