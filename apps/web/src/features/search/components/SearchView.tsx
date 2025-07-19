'use client';

import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { LOCALSTORAGE_KEY, LOCALSTORAGE_MAX_LENGTH } from 'src/entities/auction/constants';
import { postKeyword } from 'src/entities/search/api';
import usePopularKeywords from 'src/entities/search/hooks/usePopularKeywords';
import useRecentKeywords from 'src/entities/search/hooks/useRecentKeywords';
import useSearchAction from 'src/entities/search/hooks/useSearchAction';
import PopularKeywords from 'src/features/search/components/PopularKeywords';
import RecentKeywords from 'src/features/search/components/RecentKeywords';
import SearchInput from 'src/features/search/components/SearchInput';
import { getList, pushItem, removeItem, removeList } from 'src/shared/utils/LocalStorageListUtil';

interface SearchViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchView = ({ open, setOpen }: SearchViewProps) => {
  const { keyword, setKeyword, isLoading: isSearchLoading, setIsLoading: setIsSerachLoading } = useSearchAction();
  const { recentKeywords, setRecentKeywords } = useRecentKeywords({ getList });
  const { popularKeywords, isLoading: isPopularLoading } = usePopularKeywords();

  const router = useRouter();

  const handleSearchClick = async (searchKeyword: string) => {
    const trimmedKeyword = searchKeyword.trim();
    if (!trimmedKeyword || isSearchLoading) {
      return;
    }

    setIsSerachLoading(true);

    // 검색 결과 페이지로 이동
    router.push(`/auctions?keyword=${encodeURIComponent(trimmedKeyword)}`);
    // 모달 닫기
    setOpen(false);

    try {
      // 검색어 저장 (백그라운드)
      const successMessage = await postKeyword(trimmedKeyword);
      if (successMessage === 'success') {
        const message = '검색어를 저장했습니다.';
        toast.success(message);

        // 로컬스토리지에 추가 후 반환 값을 상태 변수에 저장
        const result = pushItem({
          key: LOCALSTORAGE_KEY,
          newValueItem: trimmedKeyword,
          valueList: recentKeywords,
          maxLangth: LOCALSTORAGE_MAX_LENGTH
        });
        setRecentKeywords(result);
      }
    } catch (error) {
      const message = '검색어를 저장하지 못했습니다.';
      toast.error(message);
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setIsSerachLoading(false);
    }
  };

  const handleRemoveClick = (keyword: string) => {
    try {
      const result = removeItem({ key: LOCALSTORAGE_KEY, newValueItem: keyword, valueList: recentKeywords });
      setRecentKeywords(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`검색어 삭제 중 오류가 발생했습니다.: ${error.message}`);
      }
    }
  };

  const handleClearClick = () => {
    try {
      const result = removeList({ key: LOCALSTORAGE_KEY });
      setRecentKeywords(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`검색어 전체 삭제 중 오류가 발생했습니다.: ${error.message}`);
      }
    }
  };

  return (
    <section aria-label="검색" className="px-4 pb-8 pt-4">
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
        handleRemoveClick={handleRemoveClick}
        handleClearClick={handleClearClick}
      />
      <PopularKeywords keywords={popularKeywords} handleKeywordClick={handleSearchClick} isLoading={isPopularLoading} />
    </section>
  );
};

export default SearchView;
