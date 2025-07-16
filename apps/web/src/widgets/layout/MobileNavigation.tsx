'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchDrawer from 'src/features/search/SearchDrawer';
import MobileNavigationList from './MobileNavigationList';

const MobileNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {isSearchOpen && <SearchDrawer open={isSearchOpen} setOpen={setIsSearchOpen} />}
      <MobileNavigationList isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </>
  );
};

export default MobileNavigation;
