'use client';

import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { IoCloseOutline } from 'react-icons/io5';

interface RecentKeywordsProps {
  keywords: string[];
  handleKeywordClick: (keyword: string) => void;
  handleRemoveClick: (keyword: string) => void;
  handleClearClick: () => void;
}

const RecentKeywords = ({ keywords, handleKeywordClick, handleRemoveClick, handleClearClick }: RecentKeywordsProps) => {
  return (
    <div data-role="recent_keywords_section" className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-medium">최근 검색어</h3>
        <Button className="p-0 text-xs text-[#B8B8B8]" variant="ghost" onClick={handleClearClick}>
          전체 삭제
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {keywords.length > 0 ? (
          keywords.map((k, idx) => (
            <div
              key={`recent-${k}-${idx}`}
              className="flex cursor-pointer items-center rounded-full bg-[#EEF2FB] px-3 py-2"
              onClick={() => handleKeywordClick(k)}
            >
              <span className="flex-1 truncate text-sm">{k}</span>
              <button
                className="ml-1 text-[#B8B8B8]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveClick(k);
                }}
              >
                <IoCloseOutline />
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-sm text-gray-500">최근 검색 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecentKeywords;
