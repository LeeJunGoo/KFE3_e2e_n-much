'use client';

import { useState, useEffect } from 'react';
import { getPopularKeywords } from 'src/entities/search/api';

const usePopularKeywords = () => {
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchKeywords = async () => {
      setIsLoading(true);
      try {
        const data = await getPopularKeywords();
        setPopularKeywords(data);
      } catch (error) {
        console.error('인기 검색어 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeywords();
  }, []);

  return { popularKeywords, isLoading };
};

export default usePopularKeywords;
