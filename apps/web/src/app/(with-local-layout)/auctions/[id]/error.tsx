'use client';

import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  const handleErrorOnClick = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <>
      <>
        <div className="flex h-[70vh] min-h-screen flex-col items-center justify-center px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">문제가 발생했어요 😢</h2>
          <p className="mb-6 text-sm text-gray-500">
            알 수 없는 오류가 발생했습니다. 새로고침하거나 이전 페이지로 돌아가보세요.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" type="button" onClick={() => router.back()} className="h-10 w-30">
              이전 페이지
            </Button>
            <Button variant="inActive" type="submit" className="h-10 w-30 flex-1" onClick={handleErrorOnClick}>
              다시 시도
            </Button>
          </div>
        </div>
      </>
    </>
  );
};

export default Error;
