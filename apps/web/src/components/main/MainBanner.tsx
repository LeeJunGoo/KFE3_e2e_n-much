'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import { Autoplay } from '@repo/ui/lib/utils';

import Banner_1 from 'assets/images/banner_1.png';
import Banner_2 from 'assets/images/banner_2.png';
import Banner_3 from 'assets/images/banner_3.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MainBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const imageArray = [Banner_1, Banner_2, Banner_3];

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateState = (api: CarouselApi) => {
      setCount(api!.scrollSnapList().length);
      setCurrent(api!.selectedScrollSnap());
    };

    // 첫 로드 시 상태를 한 번 설정
    updateState(api);

    api.on('select', updateState);

    // 컴포넌트 언마운트 시 모든 이벤트 리스너를 확실하게 제거합니다.
    return () => {
      api.off('select', updateState);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })
        ]}
      >
        <CarouselContent>
          {imageArray.map((url, index) => (
            <CarouselItem key={`${url.src}-${index}`}>
              <div className="relative h-64 w-full overflow-hidden">
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
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 space-x-2 transition-transform">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api!.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? 'w-4 bg-white' : 'w-2 bg-(--color-light-gray)'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
