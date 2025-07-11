'use client';

import { useState } from 'react';
import { ChevronRight, Heart, Star, Trophy, Users, PenTool, X } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { Card } from '@repo/ui/components/ui/card';
import { LuGift } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

const OnboardingFlow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setIsSkipped(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipIntro = () => {
    setIsSkipped(true);
  };

  if (isSkipped) {
    setTimeout(() => {
      router.push('/auth/signup');
    }, 2000);

    return (
      <div className="via-background from-(--color-secondary) to-(--color-primary)/20 flex min-h-screen items-center justify-center bg-gradient-to-br px-6">
        <div className="animate-fade-in-scale text-center">
          <div className="animate-pulse-heart from-(--color-primary) via-(--color-accent) to-(--color-green) mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl">
            <Heart className="h-20 w-20 fill-current text-white" />
          </div>
          <h1 className="text-text-base mb-4 text-3xl font-bold">
            사연으로 만나는
            <br />
            따뜻한 경매
          </h1>
          <p className="text-(--color-warm-gray) mb-8 text-lg">
            온보딩을 완료했습니다.
            <br />
            이제 사연을 나누고 마음을 전해보세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="from-(--color-secondary) via-(--color-background) to-(--color-primary)/20 flex min-h-screen flex-col bg-gradient-to-br">
      {/* Skip Button */}
      <div className="flex justify-end pr-6 pt-8">
        <Button
          variant="ghost"
          onClick={skipIntro}
          className="text-(--color-warm-gray) hover:text-(--color-accent) text-sm"
        >
          건너뛰기 <X className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center pb-4">
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-(--color-accent) w-8'
                  : index < currentSlide
                    ? 'bg-(--color-primary) w-2'
                    : 'bg-(--color-light-gray)/20 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {currentSlide === 0 && <SlideOne />}
        {currentSlide === 1 && <SlideTwo />}
        {currentSlide === 2 && <SlideThree />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-(--color-warm-gray) hover:text-(--color-accent) disabled:opacity-30"
        >
          이전
        </Button>
        <Button
          onClick={nextSlide}
          className="bg-(--color-accent) hover:bg-(--color-accent)/90 rounded-xl px-8 py-3 text-white shadow-lg"
        >
          {currentSlide === 2 ? '시작하기' : '다음'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const SlideOne = () => (
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

const SlideTwo = () => (
  <div className="animate-slide-up flex flex-1 flex-col items-center justify-center px-6 text-center">
    <div className="relative mb-8">
      <div className="animate-float from-(--color-accent) to-(--color-primary) mb-4 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl">
        <PenTool className="h-16 w-16 text-white" />
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
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <p className="text-text-base mb-3 text-sm leading-relaxed">{item.story}</p>
          <div className="flex items-center justify-between">
            <Button size="sm" className="bg-(--color-red)/10 text-(--color-red) hover:bg-(--color-red)/20 border-0">
              <Heart className="mr-1 h-4 w-4 fill-current" />
              좋아요
            </Button>
            <span className="text-(--color-warm-gray) text-xs font-medium">{item.likes}개</span>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const SlideThree = () => (
  <div className="animate-slide-up flex flex-1 flex-col items-center justify-center px-6 text-center">
    <div className="relative mb-8">
      <div className="animate-float from-(--color-green) to-(--color-accent) mb-4 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl">
        <Trophy className="h-16 w-16 text-white" />
      </div>
      <div className="animate-pulse-heart bg-(--color-green) absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full">
        <span className="text-sm text-white">🎉</span>
      </div>
    </div>

    <h1 className="text-text-base mb-4 text-3xl font-bold leading-tight">좋아요로 낙찰 결정</h1>

    <p className="text-(--color-warm-gray) mb-8 max-w-sm text-lg leading-relaxed">
      가장 많은 공감을 받은 사연이 낙찰됩니다.
      <br />
      <span className="text-(--color-accent) font-medium">좋아요는 포인트로 눌러요.</span>
    </p>

    <div className="w-full max-w-sm">
      <Card className="animate-fade-in-scale border-(--color-green)/20 from-(--color-green)/10 to-(--color-primary)/10 border-2 bg-gradient-to-r p-4 shadow-xl backdrop-blur-sm">
        <div className="mb-2 flex items-center">
          <Trophy className="text-(--color-green) mr-2 h-5 w-5" />
          <span className="text-(--color-green) text-sm font-bold">낙찰된 사연</span>
        </div>
        <p className="text-text-base mb-3 text-sm leading-relaxed">
          &quot;엄마 생신이라 오랜만에 둘이서 외식을 하고 싶어요. 아버지가 돌아가신 후 혼자 계셔서 마음이
          아팠거든요...&quot;
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="text-(--color-red) mr-1 h-4 w-4 fill-current" />
            <span className="text-text-base font-bold">47개</span>
          </div>
          <div className="text-(--color-green) flex items-center">
            <Star className="mr-1 h-4 w-4 fill-current" />
            <span className="text-sm font-medium">낙찰!</span>
          </div>
        </div>
      </Card>

      <div className="bg-(--color-accent)/10 mt-4 rounded-lg p-3">
        <div className="text-(--color-accent) flex items-center justify-center text-sm">
          <Users className="mr-2 h-4 w-4" />
          <span>일반 유저 + 판매자 좋아요 = 총점</span>
        </div>
      </div>
    </div>
  </div>
);

export default OnboardingFlow;
