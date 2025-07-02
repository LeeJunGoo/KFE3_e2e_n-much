'use client';
import { Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import { TAB_MENUS } from 'src/constants/main';
import TabNavItem from './TabNavItem';
import type { TabMenuItem } from 'src/types/main';

interface TabNavigationProps {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const getIsActive = (item: TabMenuItem, pathname: string, isSearchOpen: boolean) => {
  if (item.type === 'button') return isSearchOpen;
  if (item.type === 'link' && item.href) {
    return item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  }
  return false;
};

const TabNavigation = ({ isSearchOpen, setIsSearchOpen }: TabNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="border-t-(--color-warm-gray)/30 fixed bottom-0 left-0 right-0 z-40 m-auto h-16 max-w-2xl border-t bg-white">
      <ul className="flex h-full items-center justify-between">
        {TAB_MENUS.map((item) => (
          <TabNavItem
            key={item.label}
            item={item}
            isActive={getIsActive(item, pathname, isSearchOpen)}
            onClick={item.type === 'button' ? () => setIsSearchOpen((prev) => !prev) : undefined}
          />
        ))}
      </ul>
    </nav>
  );
};

export default TabNavigation;
