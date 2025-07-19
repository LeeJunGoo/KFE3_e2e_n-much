'use client';
import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import NotAuctionImage from 'src/assets/images/auctionDefault.png';
import AuctionCard from 'src/features/auction/shared/AuctionCard';
import type { SortedAuctionItemType } from 'src/entities/auction/types';

const EndingSoonCarousel = ({ endingSoonAuctions }: { endingSoonAuctions: SortedAuctionItemType[] }) => {
  return (
    <ul>
      <Carousel
        opts={{
          align: 'start'
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {endingSoonAuctions!.map((auction) => (
            <CarouselItem key={auction.auction_id} className="basis-3/5 pl-4">
              {/* //FIXME - 전체적인 UI 수정 */}
              <AuctionCard
                auction_id={auction.auction_id}
                status={auction.status}
                imageSrc={auction.image_urls?.[0] ?? NotAuctionImage.src}
                title={auction.title}
                currentPoint={auction.current_point}
                endDate={auction.end_date}
                episodeCount={auction.episodes?.length ?? 0}
                favorites={auction.favorites?.length ?? 0}
                address={auction.address_id!}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </ul>
  );
};

export default EndingSoonCarousel;
