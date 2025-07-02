'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchBar from '../common/SearchBar';
import TabNavigation from './TabNavigation';
import { useUserStore } from 'src/store/UserStore';

export default function TabBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { userRole } = useUserStore();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    console.log('userRole:', userRole);
  }, [userRole]);

  return (
    <>
      {isSearchOpen && <SearchBar />}
      <TabNavigation isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} isSeller={userRole === 'SELLER'} />
    </>
  );
}
