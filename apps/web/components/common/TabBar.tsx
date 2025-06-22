'use client';
import Link from 'next/link';
import { FaChartBar, FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { useState } from 'react';

export default function TabBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {isSearchOpen && (
        <div className="fixed bottom-16 left-0 right-0 max-w-2xl bg-white m-auto p-3 shadow z-50">
          <input type="text" placeholder="검색어를 입력하세요" className="w-full px-4 py-2 border rounded" autoFocus />
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-2 right-4 text-sm text-gray-500">
            ✕
          </button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl bg-amber-300 m-auto h-16 z-40">
        <ul className="h-full flex items-center justify-between">
          <li className="flex-1">
            <Link href="/" className="w-full flex flex-col items-center py-2 text-gray-600">
              <FaHome size={20} />
              <span className="text-xs mt-1">홈</span>
            </Link>
          </li>
          <li className="flex-1">
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="w-full flex flex-col items-center py-2 text-gray-600"
            >
              <FaSearch size={20} />
              <span className="text-xs mt-1">검색</span>
            </button>
          </li>
          <li className="flex-1">
            <Link href="/auctions" className="w-full flex flex-col items-center py-2 text-gray-600">
              <FaChartBar size={20} />
              <span className="text-xs mt-1">현황</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/mypage" className="w-full flex flex-col items-center py-2 text-gray-600">
              <FaUser size={20} />
              <span className="text-xs mt-1">프로필</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
