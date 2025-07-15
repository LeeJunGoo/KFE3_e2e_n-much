'use client';
import React, { useEffect } from 'react';
import usePopularKeywords from 'src/entities/search/hooks/usePopularKeywords';
import useRecentKeywords from 'src/entities/search/hooks/useRecentKeywords';
import useSearchAction from 'src/entities/search/hooks/useSearchAction';
import PopularKeywords from 'src/features/search/components/PopularKeywords';
import RecentKeywords from 'src/features/search/components/RecentKeywords';
import SearchInput from 'src/features/search/components/SearchInput';

interface SearchViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchView = ({ open, setOpen }: SearchViewProps) => {
  const { keyword, setKeyword, handleSearch: searchClick, isLoading } = useSearchAction();
  const { recentKeywords, remove: removeRecentKeyword, clear: clearRecentKeywords } = useRecentKeywords();
  const { popularKeywords } = usePopularKeywords();

  const handleSearch = (searchKeyword: string) => {
    searchClick(searchKeyword);
    setOpen(false);
  };

  return (
    <section data-role="search_box" aria-label="검색창" className="p-4">
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearch={handleSearch}
        isFocused={open}
        isLoading={isLoading}
      />
      <RecentKeywords
        keywords={recentKeywords}
        handleKeywordClick={handleSearch}
        handleRemoveClick={removeRecentKeyword}
        handleClearClick={clearRecentKeywords}
      />
      <PopularKeywords keywords={popularKeywords} handleKeywordClick={handleSearch} />
    </section>
  );
};

export default SearchView;
