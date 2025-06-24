import PageTitle from 'src/components/common/PageTitle';
import Image from 'next/image';
import Link from 'next/link';

const MyPage = () => {
  return (
    <>
      <PageTitle>마이페이지</PageTitle>
      <section className="mt-6 rounded-2xl bg-(--color-primary) p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex size-20 shrink-0 items-center justify-center rounded-full">
            <div className="absolute inset-0 rounded-full bg-white opacity-50" aria-hidden="true" />
            <div className="relative z-10 size-16 overflow-hidden rounded-full border border-gray-300 bg-white">
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
          <div className="relative flex w-full flex-col gap-0.5 text-sm">
            <Link href="/mypage/profile" className="absolute top-2/4 right-0 -translate-y-2/4">
              아이콘
            </Link>
            <h3 className="text-lg font-semibold">안주원</h3>
            <p className="text-gray-400">example@email.com</p>
            {/* 조건부 렌더링 */}
            <p className="text-gray-400">서울특별시 서대문구</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-t-gray-300 pt-5">
          <p className="text-4xl">⭐️</p>
          <div className="flex flex-col">
            <h3>입찰 참여자</h3>
            <p className="text-sm">2230 P</p>
          </div>
        </div>
      </section>
      <nav className="mt-11">
        <ul className="rounded-2xl border bg-(--color-primary)">
          <li className="border-b border-b-gray-300">
            <Link href="/mypage/my-auctions" className="flex w-full justify-between p-4">
              <p>내 경매 현황</p>
              <p>아이콘</p>
            </Link>
          </li>
          <li className="border-b border-b-gray-300">
            <Link href="/mypage/points" className="flex w-full justify-between p-4">
              <p>포인트 사용 내역</p>
              <p>아이콘</p>
            </Link>
          </li>
          <li className="border-b border-b-gray-300">
            <Link href="/mypage/posts" className="flex w-full justify-between p-4">
              <p>내가 쓴 글</p>
              <p>아이콘</p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-11 flex w-full items-center justify-center">
        <button className="cursor-pointer text-sm text-gray-400">로그아웃</button>
      </div>
    </>
  );
};

export default MyPage;
