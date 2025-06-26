'use client';
import Link from 'next/link';
import { FaChartBar, FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import SearchComp from './SearchComp';

export default function TabBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {isSearchOpen && <SearchComp />}

      <nav className="fixed right-0 bottom-0 left-0 z-40 m-auto h-16 max-w-2xl bg-amber-300">
        <ul className="flex h-full items-center justify-between">
          <li className="flex-1">
            <Link href="/" className="flex w-full flex-col items-center py-2 text-gray-600">
              <FaHome size={20} />
              <span className="mt-1 text-xs">홈</span>
            </Link>
          </li>
          <li className="flex-1">
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="flex w-full flex-col items-center py-2 text-gray-600"
            >
              <FaSearch size={20} />
              <span className="mt-1 text-xs">검색</span>
            </button>
          </li>
          <li className="flex-1">
            <Link href="/auctions" className="flex w-full flex-col items-center py-2 text-gray-600">
              <FaChartBar size={20} />
              <span className="mt-1 text-xs">현황</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/mypage" className="flex w-full flex-col items-center py-2 text-gray-600">
              <FaUser size={20} />
              <span className="mt-1 text-xs">프로필</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
