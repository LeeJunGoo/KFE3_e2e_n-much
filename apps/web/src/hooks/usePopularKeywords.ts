import { useState, useEffect } from 'react';

const colCount = 2;
const initData = ['연인', '기념일', '결혼기념일', '부모님', '어버이날', '생일', '100일', '친구', '졸업', '이벤트'];

// 1위~10위 처럼 1번부터 시작하는 순위 매김
interface PopularKeyword {
  rank: number;
  keyword: string;
}

export default function usePopularKeywords() {
  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);

  /**
   * 세로 우선으로 데이터 재정렬!
   */
  const getVerticalList = (rowCount: number, dataList: string[]): PopularKeyword[] => {
    const verticalOrdered: PopularKeyword[] = [];
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        const idx = row + col * rowCount;
        if (dataList[idx] !== undefined) {
          verticalOrdered.push({ rank: idx + 1, keyword: dataList[idx] });
        }
      }
    }
    return verticalOrdered;
  };

  useEffect(() => {
    // 추후에 여기, DB 데이터 fetch
    const rowCount = Math.ceil(initData.length / colCount);
    setPopularKeywords(getVerticalList(rowCount, initData));
  }, []);

  useEffect(() => {
    console.log(popularKeywords);
  }, [popularKeywords]);

  return { popularKeywords };
}
