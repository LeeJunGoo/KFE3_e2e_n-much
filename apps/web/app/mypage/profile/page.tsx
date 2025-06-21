'use client';

import PageTitle from 'components/common/PageTitle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfileEditPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <section>
        <div className="relative">
          <button onClick={handleBack} className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer">
            뒤로가기
          </button>
          <PageTitle>프로필 수정</PageTitle>
        </div>
        <ul className="mt-11">
          <li className="mb-11">
            <div className="flex items-center justify-between border-b border-gray-300 pb-3">
              <h3 className="font-semibold">기본정보</h3>
              <button className="text-sm cursor-pointer">수정</button>
            </div>
            <div className="flex flex-col items-center justify-center mt-10">
              <div className="relative overflow-hidden rounded-full border border-gray-300 size-20 bg-white">
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
                  alt="User Avatar"
                  width={200}
                  height={200}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="text-center">
                <p className="my-2.5">example@example.com</p>
                <p>안주원</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center justify-between border-b border-gray-300 pb-3">
              <h3 className="font-semibold">주소</h3>
              <button className="text-sm cursor-pointer">수정</button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">안주원제과점</h3>
              <p className="mt-3 text-gray-400 text-sm">[03712] 서울특별시 서대문구 111 (남가좌동)</p>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ProfileEditPage;
