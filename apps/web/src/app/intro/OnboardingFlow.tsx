
import { useState } from 'react';
import { ChevronRight, Heart, Star, Trophy, Users, PenTool, Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const OnboardingFlow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-custom via-background-custom to-primary-custom/20 flex items-center justify-center px-6">
        <div className="text-center animate-fade-in-scale">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-custom via-accent-custom to-green-custom rounded-full flex items-center justify-center mb-6 animate-pulse-heart shadow-2xl mx-auto">
            <Heart className="w-20 h-20 text-white fill-current" />
          </div>
          <h1 className="text-3xl font-bold text-text-base mb-4">
            사연으로 만나는<br />따뜻한 경매
          </h1>
          <p className="text-lg text-warm-gray mb-8">
            온보딩을 완료했습니다.<br />
            이제 사연을 나누고 마음을 전해보세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-custom via-background-custom to-primary-custom/20 flex flex-col">
      {/* Skip Button */}
      <div className="flex justify-end pt-8 pr-6">
        <Button 
          variant="ghost" 
          onClick={skipIntro}
          className="text-warm-gray hover:text-accent-custom text-sm"
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
                  ? 'w-8 bg-accent-custom' 
                  : index < currentSlide 
                    ? 'w-2 bg-primary-custom' 
                    : 'w-2 bg-light-gray'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {currentSlide === 0 && <SlideOne />}
        {currentSlide === 1 && <SlideTwo />}
        {currentSlide === 2 && <SlideThree />}
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-warm-gray hover:text-accent-custom disabled:opacity-30"
        >
          이전
        </Button>
        <Button 
          onClick={nextSlide}
          className="bg-accent-custom hover:bg-accent-custom/90 text-white px-8 py-3 rounded-xl shadow-lg"
        >
          {currentSlide === 2 ? '시작하기' : '다음'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const SlideOne = () => (
  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-slide-up">
    <div className="mb-8 relative">
      <div className="w-32 h-32 bg-gradient-to-br from-primary-custom to-accent-custom rounded-3xl flex items-center justify-center mb-4 animate-float shadow-xl">
        <Gift className="w-16 h-16 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-custom rounded-full flex items-center justify-center animate-pulse-heart">
        <span className="text-white text-sm">🏷️</span>
      </div>
    </div>
    
    <h1 className="text-3xl font-bold text-text-base mb-4 leading-tight">
      마음으로 하는 경매
    </h1>
    
    <p className="text-lg text-warm-gray mb-8 max-w-sm leading-relaxed">
      커피 한 잔, 식사 한 끼, 그리고 따뜻한 마음.<br />
      이제는 사연으로 나누세요.
    </p>
    
    <Card className="w-full max-w-sm p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in-scale">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-3 h-3 bg-red-custom rounded-full"></div>
        <div className="w-3 h-3 bg-primary-custom rounded-full"></div>
        <div className="w-3 h-3 bg-green-custom rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-light-gray/50 rounded w-3/4"></div>
        <div className="bg-secondary-custom p-3 rounded-lg">
          <p className="text-sm font-medium text-text-base">2인 식사권</p>
          <p className="text-xs text-warm-gray mt-1">로맨틱한 저녁 식사</p>
        </div>
        <div className="h-2 bg-light-gray/30 rounded w-1/2"></div>
      </div>
    </Card>
  </div>
);

const SlideTwo = () => (
  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-slide-up">
    <div className="mb-8 relative">
      <div className="w-32 h-32 bg-gradient-to-br from-accent-custom to-primary-custom rounded-3xl flex items-center justify-center mb-4 animate-float shadow-xl">
        <PenTool className="w-16 h-16 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-custom rounded-full flex items-center justify-center animate-pulse-heart">
        <span className="text-white text-sm">📝</span>
      </div>
    </div>
    
    <h1 className="text-3xl font-bold text-text-base mb-4 leading-tight">
      사연으로 입찰하세요
    </h1>
    
    <p className="text-lg text-warm-gray mb-8 max-w-sm leading-relaxed">
      왜 필요한지 이야기해 주세요.<br />
      <em className="text-accent-custom">"엄마 생신이라…"</em>
    </p>
    
    <div className="w-full max-w-sm space-y-3">
      {[
        { story: "엄마 생신이라 오랜만에 둘이서 외식을 하고 싶어요...", likes: 24 },
        { story: "아이들 때문에 둘만의 시간이 없었는데...", likes: 18 },
        { story: "힘든 시간을 보낸 우리의 기념일을 축하하고 싶어요...", likes: 31 }
      ].map((item, index) => (
        <Card key={index} className={`p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in-scale`} style={{animationDelay: `${index * 0.1}s`}}>
          <p className="text-sm text-text-base mb-3 leading-relaxed">{item.story}</p>
          <div className="flex items-center justify-between">
            <Button size="sm" className="bg-red-custom/10 hover:bg-red-custom/20 text-red-custom border-0">
              <Heart className="w-4 h-4 mr-1 fill-current" />
              좋아요
            </Button>
            <span className="text-xs text-warm-gray font-medium">{item.likes}개</span>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const SlideThree = () => (
  <div className="flex-1 flex flex-col items-center justify-center px-6 text-center animate-slide-up">
    <div className="mb-8 relative">
      <div className="w-32 h-32 bg-gradient-to-br from-green-custom to-accent-custom rounded-3xl flex items-center justify-center mb-4 animate-float shadow-xl">
        <Trophy className="w-16 h-16 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-custom rounded-full flex items-center justify-center animate-pulse-heart">
        <span className="text-white text-sm">🎉</span>
      </div>
    </div>
    
    <h1 className="text-3xl font-bold text-text-base mb-4 leading-tight">
      좋아요로 낙찰 결정
    </h1>
    
    <p className="text-lg text-warm-gray mb-8 max-w-sm leading-relaxed">
      가장 많은 공감을 받은 사연이 낙찰됩니다.<br />
      <span className="text-accent-custom font-medium">좋아요는 포인트로 눌러요.</span>
    </p>
    
    <div className="w-full max-w-sm">
      <Card className="p-4 bg-gradient-to-r from-green-custom/10 to-primary-custom/10 backdrop-blur-sm border-2 border-green-custom/20 shadow-xl animate-fade-in-scale">
        <div className="flex items-center mb-2">
          <Trophy className="w-5 h-5 text-green-custom mr-2" />
          <span className="text-sm font-bold text-green-custom">낙찰된 사연</span>
        </div>
        <p className="text-sm text-text-base mb-3 leading-relaxed">
          "엄마 생신이라 오랜만에 둘이서 외식을 하고 싶어요. 아버지가 돌아가신 후 혼자 계셔서 마음이 아팠거든요..."
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="w-4 h-4 text-red-custom fill-current mr-1" />
            <span className="font-bold text-text-base">47개</span>
          </div>
          <div className="flex items-center text-green-custom">
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span className="text-sm font-medium">낙찰!</span>
          </div>
        </div>
      </Card>
      
      <div className="mt-4 p-3 bg-accent-custom/10 rounded-lg">
        <div className="flex items-center justify-center text-sm text-accent-custom">
          <Users className="w-4 h-4 mr-2" />
          <span>일반 유저 + 판매자 좋아요 = 총점</span>
        </div>
      </div>
    </div>
  </div>
);

export default OnboardingFlow;
