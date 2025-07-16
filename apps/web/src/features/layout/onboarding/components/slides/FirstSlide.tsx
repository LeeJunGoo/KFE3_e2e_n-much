import { Card } from '@repo/ui/components/ui/card';
import { LuGift } from 'react-icons/lu';

const FirstSlide = () => {
  return (
    <div className="animate-slide-up flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="animate-float from-(--color-primary) to-(--color-accent) mb-4 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl">
          <LuGift className="size-15 text-white" />
        </div>
        <div className="animate-pulse-heart bg-(--color-red) absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full">
          <span className="text-sm text-white">🏷️</span>
        </div>
      </div>
      <h1 className="text-text-base mb-4 text-3xl font-bold leading-tight">마음으로 하는 경매</h1>
      <p className="text-(--color-warm-gray) mb-8 max-w-sm text-lg leading-relaxed">
        커피 한 잔, 식사 한 끼, 그리고 따뜻한 마음.
        <br />
        이제는 사연으로 나누세요.
      </p>
      <Card className="animate-fade-in-scale w-full max-w-sm border-0 bg-white/80 p-4 shadow-lg backdrop-blur-sm">
        <div className="mb-3 flex items-center space-x-3">
          <div className="bg-(--color-red) h-3 w-3 rounded-full"></div>
          <div className="bg-(--color-yellow) h-3 w-3 rounded-full"></div>
          <div className="bg-(--color-green) h-3 w-3 rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="bg-(--color-light-gray)/20 h-3 w-3/4 rounded"></div>
          <div className="bg-(--color-secondary) rounded-lg p-3">
            <p className="text-text-base text-sm font-medium">2인 식사권</p>
            <p className="text-(--color-warm-gray) mt-1 text-xs">로맨틱한 저녁 식사</p>
          </div>
          <div className="bg-(--color-light-gray)/10 h-2 w-1/2 rounded"></div>
        </div>
      </Card>
    </div>
  );
};

export default FirstSlide;
