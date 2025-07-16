import { useState, useEffect } from 'react';
import { getPopularKeywords } from 'src/entities/search/api';
import { COL_COUNT } from '../constants';

interface PopularKeyword {
  rank: number;
  keyword: string;
}

const usePopularKeywords = () => {
  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 랭킹순 데이터 재정렬
  const getVerticalList = (dataList: string[]): PopularKeyword[] => {
    const verticalOrdered: PopularKeyword[] = [];
    const rowCount = Math.ceil(dataList.length / COL_COUNT);
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
        const idx = row + col * rowCount;
        if (dataList[idx]) {
          verticalOrdered.push({ rank: idx + 1, keyword: dataList[idx] });
        }
      }
    }
    return verticalOrdered;
  };

  useEffect(() => {
    const fetchKeywords = async () => {
      setIsLoading(true);
      try {
        const data = await getPopularKeywords();
        setPopularKeywords(getVerticalList(data));
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
