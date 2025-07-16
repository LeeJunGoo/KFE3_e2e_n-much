import { useState } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { postKeyword } from 'src/entities/search/api';
import useRecentKeywords from 'src/entities/search/hooks/useRecentKeywords';

const useSearchAction = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { insert: insertRecentKeyword } = useRecentKeywords();

  const handleSearch = (searchKeyword: string) => {
    const trimmedKeyword = searchKeyword.trim();
    if (!trimmedKeyword || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      // 최근 검색어 목록에 추가
      insertRecentKeyword(trimmedKeyword);
      // 검색 결과 페이지로 이동
      router.push(`/auctions?keyword=${encodeURIComponent(trimmedKeyword)}`);
      // 검색어 저장 (백그라운드)
      postKeyword(trimmedKeyword).catch((error) => {
        console.error(`[BACKGROUND] 키워드 저장에 실패했습니다:`, error);
      });
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
