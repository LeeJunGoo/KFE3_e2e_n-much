'use client';

import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import { Autoplay } from '@repo/ui/lib/utils';
import Banner_1 from 'assets/images/banner_1.png';
import Banner_2 from 'assets/images/banner_2.png';
import Banner_3 from 'assets/images/banner_3.png';
import Image from 'next/image';

const MainBanner = () => {
  const imageArray = [Banner_1, Banner_2, Banner_3];

  return (
    <>
      <Carousel
        opts={{
          loop: true,
          align: 'center'
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false
          })
        ]}
        className="w-full"
      >
        <CarouselContent>
          {imageArray.map((url, index) => (
            <CarouselItem key={`${url}-${index}`}>
              <div className="relative h-65 w-full overflow-hidden rounded-lg">
                <Image
                  src={url}
                  alt="메인 배너 이미지입니다."
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 672px, 100vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default MainBanner;
