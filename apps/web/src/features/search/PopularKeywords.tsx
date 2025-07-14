'use client';

import React from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

interface PopularKeyword {
  rank: number;
  keyword: string;
  // status?: 'up' | 'down' | 'new'; // 순위 변동 상태
}

interface PopularKeywordsProps {
  keywords: PopularKeyword[];
  handleKeywordClick: (keyword: string) => void;
}

const PopularKeywords = ({ keywords, handleKeywordClick }: PopularKeywordsProps) => {
  return (
    <div data-role="popular_keywords_section">
      <h3 className="mb-3 text-base font-medium">인기 검색어</h3>
      <div className="grid grid-cols-2 gap-2">
        {keywords.length > 0 ? (
          keywords.map((k) => (
            <div
              key={`popular-${k.rank}`}
              className="flex cursor-pointer items-center justify-between"
              onClick={() => handleKeywordClick(k.keyword)}
            >
              <div className="flex items-center">
                <span className="text-(--color-accent) w-6 font-medium">{k.rank}</span>
                <span className="truncate text-sm">{k.keyword}</span>
              </div>
              {/* TODO: 순위 변동 상태에 따른 아이콘 표시 로직 추가 */}
              <div className="flex items-center">
                <FaCaretUp className="text-(--color-green) mr-1" />
                <FaCaretDown className="text-(--color-red)" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-(--color-light-gray) col-span-2 text-sm">인기 검색어가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PopularKeywords;
