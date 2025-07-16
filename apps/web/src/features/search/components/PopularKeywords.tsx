'use client';

import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';

interface PopularKeywordsProps {
  keywords: string[];
  handleKeywordClick: (keyword: string) => void;
  isLoading?: boolean;
}

// 스켈레톤 적용
const PopularKeywords = ({ keywords, handleKeywordClick, isLoading }: PopularKeywordsProps) => {
  const LEFT_SLICE_COUNT = { start: 0, end: 5 };
  const RIGHT_SLICE_COUNT = { start: 5, end: 10 };

  const getKeywordItem = (keyword: string, idx: number) => {
    return (
      <div
        key={`popular-${keyword}`}
        className="flex cursor-pointer items-center justify-between"
        onClick={() => handleKeywordClick(keyword)}
      >
        <div className="flex items-center">
          <span className="text-(--color-accent) w-6 font-medium">{idx + 1}</span>
          <span className={`truncate text-sm ${isLoading && 'text-(--color-light-gray)'}`}>{keyword}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-3 flex items-center">
        <h3>인기 검색어</h3>
        {isLoading && <LoadingSpinner size="sm" className="ml-2" />}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex w-full flex-col gap-2">
          {keywords
            .slice(LEFT_SLICE_COUNT.start, LEFT_SLICE_COUNT.end)
            .map((keyword, idx) => getKeywordItem(keyword, idx))}
        </div>
        <div className="flex w-full flex-col gap-2">
          {keywords
            .slice(RIGHT_SLICE_COUNT.start, RIGHT_SLICE_COUNT.end)
            .map((keyword, idx) => getKeywordItem(keyword, idx + LEFT_SLICE_COUNT.end))}
        </div>
      </div>
    </div>
  );
};

export default PopularKeywords;
