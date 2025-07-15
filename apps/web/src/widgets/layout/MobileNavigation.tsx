'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchView from 'src/features/search/SearchView';
import MobileNavigationList from './MobileNavigationList';

const MobileNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {isSearchOpen && <SearchView open={isSearchOpen} />}
      <MobileNavigationList isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </>
  );
};

export default MobileNavigation;
