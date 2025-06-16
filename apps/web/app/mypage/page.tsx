import PageTitle from '@repo/ui/components/typography/PageTitle';
import Image from 'next/image';
import Link from 'next/link';

const MyPage = () => {
  return (
    <>
      <PageTitle>마이페이지</PageTitle>
      <section className="rounded-2xl p-4 mt-6 bg-indigo-50">
        <div className="flex gap-4 items-center">
          <div className="size-20 rounded-full flex items-center justify-center relative shrink-0">
            <div
              className="absolute inset-0 bg-white opacity-50 rounded-full"
              aria-hidden="true"
            />
            <div className="relative z-10 overflow-hidden rounded-full border border-gray-300 size-16 bg-white">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
                alt="User Avatar"
                width={100}
                height={100}
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="flex flex-col gap-0.5 text-sm w-full relative">
            <Link
              href="/mypage/profile"
              className="absolute right-0 top-2/4 -translate-y-2/4"
            >
              아이콘
            </Link>
            <h3 className="text-lg font-semibold">안주원</h3>
            <p className="text-gray-400">example@email.com</p>
            {/* 조건부 렌더링 */}
            <p className="text-gray-400">서울특별시 서대문구</p>
          </div>
        </div>
        <div className="flex gap-3 items-center mt-5 pt-5 border-t border-t-gray-300">
          <p className="text-4xl">⭐️</p>
          <div className="flex flex-col">
            <h3>입찰 참여자</h3>
            <p className="text-sm">2230 P</p>
          </div>
        </div>
      </section>
      <nav className="mt-11">
        <ul className="rounded-2xl border bg-amber-100">
          <li className="border-b border-b-gray-300">
            <Link
              href="/mypage/points"
              className="flex justify-between w-full p-4"
            >
              <p>포인트 사용 내역</p>
              <p>아이콘</p>
            </Link>
          </li>
          <li className="border-b border-b-gray-300">
            <Link
              href="/mypage/posts"
              className="flex justify-between w-full p-4"
            >
              <p>내가 쓴 글</p>
              <p>아이콘</p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full flex justify-center items-center mt-11">
        <button className="text-gray-400 text-sm cursor-pointer">
          로그아웃
        </button>
      </div>
    </>
  );
};

export default MyPage;
