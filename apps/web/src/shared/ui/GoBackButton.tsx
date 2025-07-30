'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

//NOTE - 공통 타입으로 지정
interface GoBackButtonProps {
  className?: string;
  mode?: 'push' | 'back';
  url?: string;
}

const GoBackButton = ({ className, mode = 'back', url = '' }: GoBackButtonProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (mode === 'back') {
      router.back();
    }
    router.push(url);
  };

  return (
    <button onClick={handleGoBack} className={`absolute left-5 top-2/4 ${className}`}>
      <FaArrowLeft className="hover:text-(--color-accent) size-4" />
    </button>
  );
};

export default GoBackButton;
