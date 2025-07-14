'use client';

import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import { Autoplay } from '@repo/ui/lib/utils';
import Image from 'next/image';
import NotAuctionImage from 'src/assets/images/auctionDefault.png';
import type { AuctionRow } from 'src/shared/supabase/types';

type ImageArrayProps = AuctionRow['image_urls'];

const AuctionDetailICarousel = ({ imageUrls }: { imageUrls: ImageArrayProps }) => {
  const isImage = imageUrls && imageUrls.length > 0;

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false
        })
      ]}
    >
      <CarouselContent>
        {isImage ? (
          imageUrls.map((url, index) => (
            <CarouselItem key={`${url}-${index}`} className="h-64 w-full">
              <div className="relative h-full w-full">
                <Image
                  src={url}
                  alt={`경매 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 700px, 50vw"
                  priority
                />
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="h-64 w-full">
            <div className="relative h-full w-full">
              <Image
                src={NotAuctionImage}
                alt="이미지가 존재하지 않습니다."
                fill
                className="object-cover"
                sizes="(min-width: 768px) 700px, 100vw"
                priority
              />
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default AuctionDetailICarousel;
