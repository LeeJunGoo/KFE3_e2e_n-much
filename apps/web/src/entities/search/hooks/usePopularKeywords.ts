'use client';

import { useQuery } from '@tanstack/react-query';
import { getPopularKeywords } from 'src/entities/search/api';

const usePopularKeywords = () => {
  const {
    data: popularKeywords,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['popularKeywords'],
    queryFn: getPopularKeywords
  });

  if (isError) {
    console.error('인기 검색어 로딩 실패:', error);
  }

  return { popularKeywords: popularKeywords ?? [], isLoading };
};

export default usePopularKeywords;
