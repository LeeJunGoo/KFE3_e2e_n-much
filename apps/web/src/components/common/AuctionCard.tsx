'use client';

import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export default function AuctionCard() {
  return (
    <div className="w-80 rounded-2xl shadow-md border overflow-hidden bg-white">
      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
        <div className="absolute top-3 right-3">
          <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">진행중</span>
        </div>
        <span className="text-gray-400">이미지 영역</span>
      </div>

      {/* 본문 */}
      <div className="p-4">
        <h2 className="text-md font-semibold">아이폰 14 Pro 256GB</h2>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <FaMapMarkerAlt className="w-4 h-4 mr-1" />
          부산시 해운대구
        </div>

        <div className="text-sm text-gray-600 mt-2">현재가</div>
        <div className="text-xl font-bold text-blue-600">890,000원</div>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <div className="flex items-center">
            <FaUsers className="w-4 h-4 mr-1" />
            28명 입찰
          </div>
          <div className="flex items-center">
            <FaClock className="w-4 h-4 mr-1" />
            1일 8시간
          </div>
        </div>

        <button className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
          입찰하기
        </button>
      </div>
    </div>
  );
}
