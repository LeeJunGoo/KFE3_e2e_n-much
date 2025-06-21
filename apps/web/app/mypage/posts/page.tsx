'use client';

import PageTitle from 'components/common/PageTitle';
import { useRouter } from 'next/navigation';

const PostListByRolePage = () => {
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
        <PageTitle>내가 쓴 글</PageTitle>
      </div>
      <ul className="mt-11">
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="text-sm mb-2 pb-2 border-b border-gray-300">
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="font-semibold mt-2 mb-1">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex justify-end items-center">
            <p>좋아요: 45</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default PostListByRolePage;
