'use client';
import PageTitle from '@repo/ui/components/typography/PageTitle';
import { useRouter } from 'next/navigation';

const PointHistoryPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <section>
      <div className="relative">
        <button onClick={handleBack} className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer">
          뒤로가기
        </button>
        <PageTitle>포인트 사용 내역</PageTitle>
      </div>
      <ul className="mt-11">
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
          <p>회원가입 이벤트</p>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-lg font-semibold text-purple-400">100,000 P</p>
            <p className="text-gray-400">110,000 P</p>
          </div>
        </li>
        <li className="py-4 gap-5 px-2 border-b border-gray-300 flex justify-between items-baseline">
          <time className="text-gray-300 text-sm">05.12</time>
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

export default PointHistoryPage;
