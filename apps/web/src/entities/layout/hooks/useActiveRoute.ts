'use client';
import { usePathname } from 'next/navigation';

const useActiveRoute = () => {
  const pathname = usePathname();
  return {
    isHome: pathname === '/main',
    isAuctionWrite: pathname.startsWith('/auctions/write'),
    isAuctions: pathname.startsWith('/auctions') && !pathname.startsWith('/auctions/write'),
    isMypage: pathname.startsWith('/mypage')
  };
};

export { useActiveRoute };
