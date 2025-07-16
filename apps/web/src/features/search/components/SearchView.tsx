'use client';

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
  const { keyword, setKeyword, handleSearch, isLoading: isSearchLoading } = useSearchAction();
  const { recentKeywords, remove: removeRecentKeyword, clear: clearRecentKeywords } = useRecentKeywords();
  const { popularKeywords, isLoading: isPopularLoading } = usePopularKeywords();

  const handleSearchClick = (searchKeyword: string) => {
    handleSearch(searchKeyword);
    setOpen(false);
  };

  return (
    <section data-role="search_box" aria-label="검색창" className="p-4">
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearchClick={handleSearchClick}
        isFocused={open}
        isLoading={isSearchLoading}
      />
      <RecentKeywords
        keywords={recentKeywords}
        handleKeywordClick={handleSearchClick}
        handleRemoveClick={removeRecentKeyword}
        handleClearClick={clearRecentKeywords}
      />
      <PopularKeywords keywords={popularKeywords} handleKeywordClick={handleSearchClick} isLoading={isPopularLoading} />
    </section>
  );
};

export default SearchView;
