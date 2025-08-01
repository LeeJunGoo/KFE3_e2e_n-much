'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

//NOTE - 공통 타입으로 지정
interface GoBackButtonProps {
  className?: string;
  mode?: 'push' | 'back';
  url?: string;
  fallbackUrl?: string;
}

const GoBackButton = ({ className, mode = 'back', url = '', fallbackUrl }: GoBackButtonProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (mode === 'push' && url) {
      router.push(url);
      return;
    }

    if (fallbackUrl) {
      router.push(fallbackUrl);
      return;
    }

    router.back();
  };

  return (
    <button onClick={handleGoBack} className={`absolute left-5 top-2/4 -translate-y-2/4 ${className}`}>
      <FaArrowLeft className="hover:text-(--color-accent) size-4" />
    </button>
  );
};

export default GoBackButton;
