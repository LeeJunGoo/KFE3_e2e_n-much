'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

const GoBackButton = ({ className }: { className?: string }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button onClick={handleGoBack} className={`absolute left-5 top-2/4 -translate-y-2/4 ${className}`}>
      <FaArrowLeft className="hover:text-(--color-accent) size-4" />
    </button>
  );
};

export default GoBackButton;
