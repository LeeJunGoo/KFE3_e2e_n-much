import { useState, useEffect } from 'react';
import { getPopularKeywords } from 'src/entities/search/api';

const colCount = 2;

// 1위~10위 처럼 1번부터 시작하는 순위 매김
interface PopularKeyword {
  rank: number;
  keyword: string;
}

const usePopularKeywords = () => {
  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);

  // 세로 우선으로 데이터 재정렬!
  const getVerticalList = (dataList: string[]): PopularKeyword[] => {
    const verticalOrdered: PopularKeyword[] = [];
    const rowCount = Math.ceil(dataList.length / colCount);
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
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
      try {
        const data = await getPopularKeywords();
        setPopularKeywords(getVerticalList(data));
      } catch (error) {
        console.error('인기 검색어 로딩 실패:', error);
      }
    };

    fetchKeywords();
  }, []);

  return { popularKeywords };
};

export default usePopularKeywords;
