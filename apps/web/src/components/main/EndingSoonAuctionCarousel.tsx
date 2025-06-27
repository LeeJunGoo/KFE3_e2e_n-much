'use client';

import React from 'react';
import { SortedAuctionItemType } from 'src/types/main';
import AuctionCard from '../common/AuctionCard';
import NotAuctionImage from 'assets/images/auctionDefault.png';
import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';

const EndingSoonAuctionCarousel = ({ endingSoonAuctions }: { endingSoonAuctions: SortedAuctionItemType[] }) => {
  return (
    <ul>
      <Carousel>
        <CarouselContent className="w-full">
          {endingSoonAuctions.map((auction) => (
            <CarouselItem key={auction.auction_id} className="object-cover">
              <AuctionCard
                status={auction.status}
                imageSrc={auction.image_urls?.[0] ?? NotAuctionImage.src}
                title={auction.title}
                currentPoint={auction.current_point}
                endTime={auction.end_time}
                episodeCount={auction.episodes?.length ?? 0}
                favorites={auction.favorites?.length ?? 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ul>
  );
};

export default EndingSoonAuctionCarousel;
