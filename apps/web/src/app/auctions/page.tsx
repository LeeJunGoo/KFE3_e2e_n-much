//FIXME - tanstack query 적용하기
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SelectOrder from 'src/components/auctions/SelectOrder';
import AuctionCard from 'src/components/common/AuctionCard';
import { AuctionRow } from 'src/lib/supabase/type';

interface EpisodeCount {
  episodes: [{ count: number }];
}

export default function Page() {
  const searchParams = useSearchParams();
  const auctionOrderParam = searchParams.get('order');
  const [auctions, setAuctions] = useState<(AuctionRow & EpisodeCount)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<string | null>(auctionOrderParam);

  async function getAllAuction(order: string | null) {
    let fetchUrl = null;
    if (!order) {
      fetchUrl = `http://localhost:3001/api/auctions_with_episode_count`;
    } else {
      fetchUrl = `http://localhost:3001/api/auctions_with_episode_count?order=${order}`;
    }
    const data = await fetch(fetchUrl);
    const result = await data.json();
    return result;
  }

  useEffect(() => {
    async function init() {
      const result = await getAllAuction(order);
      if (result.status === 'success' && result.data) {
        setAuctions(result.data);
      }
      setIsLoading(false);
    }

    init();
  }, [order]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <p className="text-lg font-semibold text-[#1F1F25]">경매 리스트</p>
        <SelectOrder order={order} setOrder={setOrder} />
      </div>
      <div className="rounded-md bg-gray-300 px-2 py-2">
        <p className="pt-1 pb-2 text-sm">{`총 ${auctions.length}개의 경매가 있습니다`}</p>
        <ul className="grid grid-cols-2 gap-3">
          {auctions.length > 0 &&
            auctions.map((auction) => {
              const { auction_id, status, title, current_point, end_time, episodes } = auction;
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
    </>
  );
}
