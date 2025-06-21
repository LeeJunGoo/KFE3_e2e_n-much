import Link from 'next/link';
import { FaChartBar, FaHome, FaSearch, FaUser } from 'react-icons/fa';

export default function TabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-2xl bg-amber-300 m-auto h-16">
      <ul className="h-full flex items-center justify-between">
        <li className="flex-1">
          <Link href="/" className="w-full flex flex-col items-center py-2 text-gray-600">
            <FaHome size={20} />
            <span className="text-xs mt-1">홈</span>
          </Link>
        </li>
        <li className="flex-1">
          <button className="w-full flex flex-col items-center py-2 text-gray-600">
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
  );
}
