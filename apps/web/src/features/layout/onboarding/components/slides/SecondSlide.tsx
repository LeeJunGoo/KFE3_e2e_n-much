import { Button } from '@repo/ui/components/ui/button';
import { Card } from '@repo/ui/components/ui/card';
import { LuPenTool, LuHeart } from 'react-icons/lu';

const ANIMATION_DELAY_MULTIPLIER = 0.1;

const SecondSlide = () => {
  return (
    <div className="animate-slide-up flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="animate-float from-(--color-accent) to-(--color-primary) mb-4 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl">
          <LuPenTool className="h-16 w-16 text-white" />
        </div>
        <div className="animate-pulse-heart bg-(--color-primary) absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full">
          <span className="text-sm text-white">📝</span>
        </div>
      </div>
      <h1 className="text-text-base mb-4 text-3xl font-bold leading-tight">사연으로 입찰하세요</h1>
      <p className="text-(--color-warm-gray) mb-8 max-w-sm text-lg leading-relaxed">
        왜 필요한지 이야기해 주세요.
        <br />
        <em className="text-(--color-accent)">&quot;엄마 생신이라…&quot;</em>
      </p>

      <div className="w-full max-w-sm space-y-3">
        {[
          { story: '엄마 생신이라 오랜만에 둘이서 외식을 하고 싶어요...', likes: 24 },
          { story: '아이들 때문에 둘만의 시간이 없었는데...', likes: 18 },
          { story: '힘든 시간을 보낸 우리의 기념일을 축하하고 싶어요...', likes: 31 }
        ].map((item, index) => (
          <Card
            key={index}
            className={`animate-fade-in-scale border-0 bg-white/80 p-4 shadow-lg backdrop-blur-sm`}
            style={{ animationDelay: `${index * ANIMATION_DELAY_MULTIPLIER}s` }}
          >
            <p className="text-text-base mb-3 text-sm leading-relaxed">{item.story}</p>
            <div className="flex items-center justify-between">
              <Button size="sm" className="bg-(--color-red)/10 text-(--color-red) hover:bg-(--color-red)/20 border-0">
                <LuHeart className="mr-1 h-4 w-4 fill-current" />
                좋아요
              </Button>
              <span className="text-(--color-warm-gray) text-xs font-medium">{item.likes}개</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecondSlide;
