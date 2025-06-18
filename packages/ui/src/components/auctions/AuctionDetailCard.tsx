'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';

const AuctionDetailCard = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length); // 전체 카운트
    setCurrent(api.selectedScrollSnap() + 1); // 이전 카운트

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1); // 현재 카운트
    });
  }, [api]);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem className="bg-amber-300 w-full h-[300px]"></CarouselItem>
          <CarouselItem className="bg-amber-300 w-full h-[300px]"></CarouselItem>
          <CarouselItem className="bg-amber-300 w-full h-[300px]"></CarouselItem>
        </CarouselContent>
      </Carousel>
      <p className="absolute bottom-5 right-5 rounded-full bg-gray-900/70 px-3 py-1 text-sm text-white">
        {current} / {count}
      </p>
    </div>
  );
};

export default AuctionDetailCard;
