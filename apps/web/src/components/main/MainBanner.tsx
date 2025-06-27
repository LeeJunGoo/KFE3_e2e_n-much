'use client';

import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import { Autoplay } from '@repo/ui/lib/utils';
import TestImage from 'assets/images/auctionDefault.png';
import TestImage_2 from 'assets/images/test.png';
import Image from 'next/image';

const MainBanner = () => {
  const imageArray = [TestImage, TestImage_2];

  return (
    <>
      <Carousel
        opts={{
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false
          })
        ]}
        className="w-full overflow-hidden rounded-lg"
      >
        <CarouselContent className="h-60 w-full">
          {imageArray.map((url, index) => (
            <CarouselItem key={index} className="relative h-full w-full">
              <Image
                src={url}
                alt="메인 배너 이미지입니다."
                fill
                className="object-cover"
                sizes="(min-width: 768px) 672px, 100vw"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default MainBanner;
