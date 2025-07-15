import { useState } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import useRecentKeywords from 'src/entities/search/hooks/useRecentKeywords';
// import { postKeyword } from 'src/entities/search/api';

const useSearchAction = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { insert: insertRecentKeyword } = useRecentKeywords();

  const handleSearch = async (searchKeyword: string) => {
    const trimmedKeyword = searchKeyword.trim();
    if (!trimmedKeyword || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      // 최근 검색어 목록에 추가
      insertRecentKeyword(trimmedKeyword);

      // API를 통해 검색어 저장
      // await postKeyword(trimmedKeyword);

      router.push(`/auctions?keyword=${encodeURIComponent(trimmedKeyword)}`);
    } catch (error) {
      const message = '검색 처리 중 오류가 발생했습니다.';
      console.error(`${message}: ${error}`);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    keyword,
    setKeyword,
    handleSearch,
    isLoading
  };
};

export default useSearchAction;
