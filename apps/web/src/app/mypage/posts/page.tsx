'use client';

import PageTitle from 'src/components/common/ui/PageTitle';
import { useRouter } from 'next/navigation';

const PostListByRolePage = () => {
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
        <PageTitle>내가 쓴 글</PageTitle>
      </div>
      <ul className="mt-11">
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
        <li className="mb-2 border-b border-gray-300 pb-2 text-sm">
          <div className="mt-5 flex items-center gap-3">
            <h3 className="text-base">안주원</h3>
            <p className="text-gray-400">2023.10.01</p>
          </div>
          <h3 className="mt-2 mb-1 font-semibold">타이틀</h3>
          <p>
            글 내용이 들어갑니다. 글 내용이 들어갑니다. 글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이
            들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.글 내용이 들어갑니다.
          </p>
          <div className="flex items-center justify-end">
            <p>좋아요: 45</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default PostListByRolePage;
