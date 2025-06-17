import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const page = () => {
  return (
    <>
      <header className="mb-5">
        <div className="flex justify-between">
          <Link
            href={'/auctions'}
            className="flex items-center gap-2 text-[#8E74F2] hover:text-[#D6CBFF] transition-colors"
          >
            <FaArrowLeft />
            <span>경매 목록으로 돌아가기</span>
          </Link>
          <div className="space-x-2">
            <button className="bg-[#F4F4F7] px-4 py-2 rounded-md hover:bg-[#C6C7D1] transition-colors">수정</button>
            <button className="bg-[#F4F4F7] px-4 py-2 rounded-md hover:bg-[#C6C7D1] transition-colors">삭제</button>
          </div>
        </div>
      </header>
      <main className="space-y-5">
        <section className="bg-[#F3F4F6] p-4 rounded-lg space-y-3">
          <h3 className="text-2xl font-bold">식사권 화이트롤 + 빵</h3>
          <div>
            <p className="text-gray-400 text-sm">현재&nbsp;입찰가</p>
            <p className="text-[#8E74F2] text-lg font-semibold">850,000&nbsp;P</p>
          </div>
          <div>
            <p className="text-sm">남은 시간</p>
            <time className="text-lg font-semibold text-[#D84A5F]">2일&nbsp;23시간&nbsp;59분 남음</time>
          </div>
        </section>
        <section className=""></section>
      </main>
      경매 상품 상세 page
    </>
  );
};

export default page;
