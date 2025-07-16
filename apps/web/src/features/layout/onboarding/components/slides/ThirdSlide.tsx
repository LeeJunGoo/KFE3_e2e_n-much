import { Card } from '@repo/ui/components/ui/card';
import { LuTrophy, LuHeart, LuStar, LuUsers } from 'react-icons/lu';

const ThirdSlide = () => {
  return (
    <div className="animate-slide-up flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="animate-float from-(--color-green) to-(--color-accent) mb-4 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br shadow-xl">
          <LuTrophy className="h-16 w-16 text-white" />
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
            <LuTrophy className="text-(--color-green) mr-2 h-5 w-5" />
            <span className="text-(--color-green) text-sm font-bold">낙찰된 사연</span>
          </div>
          <p className="text-text-base mb-3 text-sm leading-relaxed">
            &quot;엄마 생신이라 오랜만에 둘이서 외식을 하고 싶어요. 아버지가 돌아가신 후 혼자 계셔서 마음이
            아팠거든요...&quot;
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LuHeart className="text-(--color-red) mr-1 h-4 w-4 fill-current" />
              <span className="text-text-base font-bold">47개</span>
            </div>
            <div className="text-(--color-green) flex items-center">
              <LuStar className="mr-1 h-4 w-4 fill-current" />
              <span className="text-sm font-medium">낙찰!</span>
            </div>
          </div>
        </Card>
        <div className="bg-(--color-accent)/10 mt-4 rounded-lg p-3">
          <div className="text-(--color-accent) flex items-center justify-center text-sm">
            <LuUsers className="mr-2 h-4 w-4" />
            <span>일반 유저 + 판매자 좋아요 = 총점</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThirdSlide;
