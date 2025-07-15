'use client';
import React from 'react';
import usePopularKeywords from 'src/entities/search/hooks/usePopularKeywords';
import useRecentKeywords from 'src/entities/search/hooks/useRecentKeywords';
import useSearchAction from 'src/entities/search/hooks/useSearchAction';
import PopularKeywords from 'src/features/search/components/PopularKeywords';
import RecentKeywords from 'src/features/search/components/RecentKeywords';
import SearchInput from 'src/features/search/components/SearchInput';

interface SearchViewProps {
  open: boolean;
}

const SearchView = ({ open }: SearchViewProps) => {
  const { keyword, setKeyword, handleSearch, isLoading } = useSearchAction();
  const { recentKeywords, remove: removeRecentKeyword, clear: clearRecentKeywords } = useRecentKeywords();
  const { popularKeywords } = usePopularKeywords();

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
