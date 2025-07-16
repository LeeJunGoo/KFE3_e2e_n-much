'use client';

import { DEFAULT_KEYWORDS } from 'src/entities/search/constants';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';

interface PopularKeyword {
  rank: number;
  keyword: string;
}

interface PopularKeywordsProps {
  keywords: PopularKeyword[];
  handleKeywordClick: (keyword: string) => void;
  isLoading?: boolean;
}

const PopularKeywords = ({ keywords, handleKeywordClick, isLoading }: PopularKeywordsProps) => {
  let keywordsToDisplay: { rank: number; keyword: string }[] = DEFAULT_KEYWORDS;

  if (keywords.length > 0) {
    keywordsToDisplay = keywords;
  }

  return (
    <div data-role="popular_keywords_section">
      <div className="mb-3 flex items-center">
        <h3 className="text-base font-medium">인기 검색어</h3>
        {isLoading && <LoadingSpinner size="sm" className="ml-2" />}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {keywordsToDisplay.map((k) => (
          <div
            key={`popular-${k.rank}`}
            className="flex cursor-pointer items-center justify-between"
            onClick={() => handleKeywordClick(k.keyword)}
          >
            <div className="flex items-center">
              <span className="text-(--color-accent) w-6 font-medium">{k.rank}</span>
              <span className={`truncate text-sm ${isLoading && 'text-(--color-light-gray)'}`}>{k.keyword}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularKeywords;
