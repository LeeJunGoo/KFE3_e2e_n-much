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

const Cards = () => {
  // Ending soon auctions
  const endingSoonAuctions = [
    {
      id: 1,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20gourmet%20dinner%20setting%20with%20elegant%20plating%2C%20soft%20lighting%2C%20premium%20restaurant%20ambiance%2C%20high-end%20culinary%20experience%2C%20artistic%20food%20presentation%2C%20warm%20atmosphere%2C%20professional%20food%20photography%20style&width=280&height=160&seq=end1&orientation=landscape',
      title: '미쉐린 스타 레스토랑 2인 식사권',
      timeLeft: '2시간 남음',
      stories: 18,
      likes: 45
    },
    {
      id: 2,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20cozy%20cafe%20interior%20with%20vintage%20decor%2C%20warm%20lighting%2C%20artistic%20latte%20art%20visible%20on%20coffee%20cups%2C%20intimate%20seating%20arrangement%2C%20wooden%20elements%2C%20soft%20bokeh%20effect%2C%20inviting%20atmosphere&width=280&height=160&seq=end2&orientation=landscape',
      title: '오래된 책방 카페 브런치 초대권',
      timeLeft: '5시간 남음',
      stories: 24
    },
    {
      id: 3,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20private%20cooking%20class%20setting%20with%20chef%20and%20ingredients%20prepared%2C%20warm%20lighting%2C%20intimate%20kitchen%20environment%2C%20culinary%20tools%20visible%2C%20educational%20cooking%20setup%2C%20premium%20cooking%20experience&width=280&height=160&seq=end3&orientation=landscape',
      title: '프라이빗 쿠킹 클래스 체험권',
      timeLeft: '8시간 남음',
      stories: 15
    },
    {
      id: 4,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20romantic%20dinner%20setup%20on%20a%20rooftop%20with%20city%20skyline%20view%2C%20candles%2C%20flower%20petals%2C%20intimate%20table%20for%20two%2C%20sunset%20lighting%2C%20premium%20dining%20experience%2C%20elegant%20wine%20glasses&width=280&height=160&seq=end4&orientation=landscape',
      title: '루프탑 프라이빗 디너 2인권',
      timeLeft: '12시간 남음',
      stories: 32
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
              <AuctionCard />
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
