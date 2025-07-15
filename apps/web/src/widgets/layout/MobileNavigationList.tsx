import type { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavigationListProps {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNavigationList = ({ isSearchOpen, setIsSearchOpen }: MobileNavigationListProps) => {
  const pathname = usePathname();
  const baseClass = 'flex flex-col items-center gap-0.5 py-2 w-full';

  const getTextColor = (isActive: boolean) => (isActive ? 'text-(--color-accent)' : 'text-(--color-warm-gray)');

  return (
    <nav className="border-t-(--color-warm-gray)/30 fixed bottom-0 left-0 right-0 z-40 m-auto h-16 max-w-2xl border-t bg-white">
      <ul className="flex h-full items-center justify-between">
        <li className="flex-1">
          <Link href="/main" className={`${baseClass} ${getTextColor(pathname === '/main')}`}>
            아이콘
            <span className="mt-1 text-xs">홈</span>
          </Link>
        </li>

        <li className="flex-1" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <div className={`${baseClass} ${getTextColor(isSearchOpen)}`}>
            아이콘
            <span className="mt-1 text-xs">검색</span>
          </div>
        </li>

        <li className="flex-1">
          <Link
            href="/auctions/write"
            className={`${baseClass} ${getTextColor(pathname.startsWith('/auctions/write'))}`}
          >
            아이콘
            <span className="mt-1 text-xs">경매등록</span>
          </Link>
        </li>

        <li className="flex-1">
          <Link href="/auctions" className={`${baseClass} ${getTextColor(pathname.startsWith('/auctions'))}`}>
            아이콘
            <span className="mt-1 text-xs">경매현황</span>
          </Link>
        </li>

        <li className="flex-1">
          <Link href="/mypage" className={`${baseClass} ${getTextColor(pathname.startsWith('/mypage'))}`}>
            아이콘
            <span className="mt-1 text-xs">마이페이지</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigationList;
