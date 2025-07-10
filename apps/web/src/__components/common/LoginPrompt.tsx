'use client';

import { LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageContainer from '../layout/PageContainer';

const LoginPrompt = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/main');
  };

  return (
    <PageContainer className="flex items-center justify-center">
      <div className="h-full w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        {/* 아이콘 */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
          <LockKeyhole className="h-8 w-8 text-slate-500 dark:text-slate-400" />
        </div>

        {/* 메인 텍스트 */}
        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">로그인이 필요한 서비스입니다</h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          로그인 후 모든 서비스를 자유롭게 이용해 보세요.
        </p>

        {/* 버튼 그룹 */}
        <div className="mt-8 flex flex-col gap-3">
          {/* 1. 로그인 버튼 */}
          <Link
            href="/auth/signin"
            className="w-full transform rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md transition-transform duration-150 ease-in-out hover:bg-blue-700 active:scale-95"
          >
            로그인 페이지로 이동
          </Link>

          {/* 2. 뒤로 돌아가기 버튼 */}
          <button
            onClick={handleGoBack}
            className="w-full transform rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-base font-semibold text-gray-700 shadow-sm transition-transform duration-150 ease-in-out hover:bg-gray-100 active:scale-95 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            뒤로 돌아가기
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default LoginPrompt;
