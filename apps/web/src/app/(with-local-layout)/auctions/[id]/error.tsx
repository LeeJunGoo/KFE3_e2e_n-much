'use client';

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
      <div className="flex h-[70vh] min-h-screen flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-600">문제가 발생했어요 😢</h2>
        <p className="mb-6 text-sm text-gray-500">
          알 수 없는 오류가 발생했습니다. 새로고침하거나 이전 페이지로 돌아가보세요.
        </p>
        <div className="flex gap-4">
          <button onClick={handleErrorOnClick} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            다시 시도
          </button>
          <button
            onClick={() => router.back()}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            이전 페이지
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
