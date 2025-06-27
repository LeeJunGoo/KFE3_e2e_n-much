'use client';

import React from 'react';
import AuctionCard from '../common/AuctionCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@repo/ui/components/ui/carousel';
import testImage from 'assets/images/test.png';

const Cards = () => {
  // Ending soon auctions
  const endingSoonAuctions = [
    {
      id: 1,
      status: 'OPEN',
      imageSrc: testImage,
      title: '미쉐린 스타 레스토랑 2인 식사권',
      currentPoint: 0,
      endTime: '2025-06-29 23:48:16+00',
      favorites: 45,
      episodeCount: 18
    },
    {
      id: 2,
      status: 'OPEN',
      imageSrc: testImage,
      title: '오래된 책방 카페 브런치 초대권',
      currentPoint: 0,
      endTime: '2025-06-29 23:48:16+00',
      favorites: 0,
      episodeCount: 24
    },
    {
      id: 3,
      status: 'OPEN',
      imageSrc: testImage,
      title: '프라이빗 쿠킹 클래스 체험권',
      currentPoint: 0,
      endTime: '2025-06-29 23:48:16+00',
      favorites: 0,
      episodeCount: 15
    },
    {
      id: 4,
      status: 'OPEN',
      imageSrc: testImage,
      title: '루프탑 프라이빗 디너 2인권',
      currentPoint: 0,
      endTime: '2025-06-29 23:48:16+00',
      favorites: 0,
      episodeCount: 32
    }
  ];

  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        <div className="p-1">
          {endingSoonAuctions.map((auction) => (
            <CarouselItem key={auction.id} className="md:basis-1/2 lg:basis-1/3">
              <AuctionCard
                status={auction.status}
                imageSrc="/apps/web/assets/images/test.png"
                title={auction.title}
                currentPoint={auction.currentPoint}
                endTime={auction.endTime}
                favorites={auction.favorites}
                episodeCount={auction.episodeCount}
              />
            </CarouselItem>
          ))}
        </div>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Cards;
