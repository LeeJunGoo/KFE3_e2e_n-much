'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AuctionRow } from 'types/auctions';

type AuctionDetailCardProps = Pick<AuctionRow, 'image_urls'>;

const AuctionDetailCard = ({ image_urls }: AuctionDetailCardProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // 1. 초기 카운트 값을 설정
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    // 2. 이벤트 핸들러 함수 정의
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    // 3. 이벤트 리스너 등록
    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {image_urls && image_urls.length > 0 ? (
            image_urls.map((url, index) => (
              <CarouselItem key={url} className="relative h-[300px]">
                <Image
                  src={url}
                  alt={`경매 상품 이미지 ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="flex h-[300px] items-center justify-center bg-slate-100">
              <p className="text-slate-500">등록된 이미지가 없습니다.</p>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      <p className="absolute bottom-5 right-5 rounded-full bg-gray-900/70 px-3 py-1 text-sm text-white">
        {current} / {count}
      </p>
    </div>
  );
};

export default AuctionDetailCard;
