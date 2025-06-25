'use client';

import { useEffect, useState } from 'react';
import SelectOrder from 'src/components/auctions/SelectOrder';
import AuctionCard from 'src/components/common/AuctionCard';
import { AuctionRow } from 'src/lib/supabase/type';

export default function Page() {
  const [auctions, setAuctions] = useState<AuctionRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getAllAuction() {
    const fetchUrl = `http://localhost:3001/api/auctions`;
    const data = await fetch(fetchUrl);
    const result = await data.json();
    return result;
  }

  useEffect(() => {
    async function init() {
      const result = await getAllAuction();
      if (result.status === 'success' && result.data) {
        setAuctions(result.data);
      }
    }

    init();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(auctions);

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <p className="text-lg font-semibold text-[#1F1F25]">경매 리스트</p>
        <SelectOrder />
      </div>
      <div className="rounded-md bg-gray-300 px-2 py-2">
        <p className="pt-1 pb-2 text-sm">{`총 ${auctions.length}개의 최신 경매가 있습니다`}</p>
        <ul className="grid grid-cols-2 gap-3">
          {auctions.length > 0 &&
            auctions.map((auction) => {
              const {
                auction_id: auctionId,
                status,
                image_urls: imageSrc,
                title,
                current_point: currentPoint,
                address,
                end_time: remainTime
              } = auction;

              return (
                <AuctionCard
                  key={auctionId}
                  status={status}
                  imageSrc={imageSrc[0]!}
                  title={title}
                  currentPoint={currentPoint}
                  address={address[0]!}
                  remainTime={remainTime}
                  buyerCount={5}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
}
