'use client';

import PageTitle from 'src/components/common/PageTitle';
import { useRouter } from 'next/navigation';

const MyPoints = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <section>
      <div className="relative">
        <button onClick={handleBack} className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer">
          뒤로가기
        </button>
        <PageTitle>포인트 사용 내역</PageTitle>
      </div>
      <ul className="mt-11">
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="flex items-baseline justify-between gap-5 border-b border-gray-300 px-2 py-4">
          <time className="text-sm text-gray-300">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default MyPoints;
