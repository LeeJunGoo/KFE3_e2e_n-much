import { LuHeart } from 'react-icons/lu';

const OnboardingComplete = () => {
  return (
    <div className="via-background from-(--color-secondary) to-(--color-primary)/20 flex min-h-screen items-center justify-center bg-gradient-to-br px-6">
      <div className="animate-fade-in-scale text-center">
        <div className="animate-pulse-heart from-(--color-primary) via-(--color-accent) to-(--color-green) mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl">
          <LuHeart className="h-20 w-20 fill-current text-white" />
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
};

export default OnboardingComplete;
