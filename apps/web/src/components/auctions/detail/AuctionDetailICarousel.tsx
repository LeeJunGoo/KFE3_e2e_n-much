'use client';

import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import { Autoplay } from '@repo/ui/lib/utils';
import Image from 'next/image';
import React from 'react';
import { AuctionRow } from 'src/lib/supabase/type';
import NotAuctionImage from 'assets/images/auctionDefault.png';

type ImageArrayProps = AuctionRow['image_urls'];

const AuctionDetailICarousel = ({ imageUrls }: { imageUrls: ImageArrayProps }) => {
  const isImage = imageUrls && imageUrls.length > 0;

  return (
    <section aria-label="경매 이미지 슬라이더" className="relative h-64 w-full">
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
              <CarouselItem key={`${url}-${index}`}>
                <div className="relative h-64 w-full">
                  <Image
                    src={url}
                    alt={`메인 배너 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 672px, 100vw"
                    priority
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="relative h-64 w-full">
              <div className="relative h-full w-full">
                <Image
                  src={NotAuctionImage}
                  alt="이미지가 존재하지 않습니다."
                  fill
                  sizes="(min-width: 768px) 390px, 100vw"
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default AuctionDetailICarousel;
