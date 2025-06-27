'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchBar from '../common/SearchBar';
import TabNavigation from './TabNavigation';

export default function TabBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {isSearchOpen && <SearchBar />}
      <TabNavigation isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </>
  );
}
