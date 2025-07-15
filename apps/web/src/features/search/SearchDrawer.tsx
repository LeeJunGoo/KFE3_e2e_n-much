'use client';

import React from 'react';
import BottomDrawer from './components/BottomDrawer';
import SearchView from './components/SearchView';

interface SearchDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchDrawer = ({ open, setOpen }: SearchDrawerProps) => {
  return (
    <BottomDrawer
      open={open}
      onOpenChange={setOpen}
      title="검색"
      description="검색어로 경매를 검색하고, 최근 검색어와 인기 검색어를 확인하세요."
    >
      <SearchView open={open} />
    </BottomDrawer>
  );
};

export default SearchDrawer;
