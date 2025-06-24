'use client';

import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export default function AuctionCard() {
  return (
    <div className="w-48 overflow-hidden rounded-2xl border bg-white shadow-md">
      {/* 이미지 영역 */}
      <div className="relative flex h-48 items-center justify-center bg-gray-100">
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-green-200 px-2 py-1 text-xs text-green-800">진행중</span>
        </div>
        <span className="text-gray-400">이미지 영역</span>
      </div>

      {/* 본문 */}
      <div className="p-4">
        <h2 className="text-md font-semibold">아이폰 14 Pro 256GB</h2>

        <div className="mt-1 flex items-center text-sm text-gray-500">
          <FaMapMarkerAlt className="mr-1 h-4 w-4" />
          부산시 해운대구
        </div>

        <div className="mt-2 text-sm text-gray-600">현재가</div>
        <div className="text-xl font-bold text-blue-600">890,000원</div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaUsers className="mr-1 h-4 w-4" />
            28명 입찰
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1 h-4 w-4" />
            1일 8시간
          </div>
        </div>

        <button className="mt-4 w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800">
          입찰하기
        </button>
      </div>
    </div>
  );
}
