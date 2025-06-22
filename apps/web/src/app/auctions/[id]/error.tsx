'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  const handleErrorOnClick = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <>
      <div className="text-white">
        <h3>에러가 발생 했습니다.</h3>
        <div>{error.message}</div>
        <button onClick={handleErrorOnClick}>다시 시도</button>
      </div>
    </>
  );
};

export default Error;
