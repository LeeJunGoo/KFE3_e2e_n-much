'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
// import { Input } from '@repo/ui/components/ui/input';
import { getSearchedAuctions } from 'src/lib/supabase/query/auctions';
import { IoCloseOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';

const STORAGE_KEY = 'keywords';
const MAX_LENGTH = 6;

export default function SearchComp() {
  const [keyword, setKeyword] = useState('');
  const [savedKeywords, setSavedKeywords] = useState<string[]>([]);

  function getPrevKeywords(): string[] {
    const storedData: string | null = localStorage.getItem(STORAGE_KEY);
    const prevKeywords: string[] = storedData ? (JSON.parse(storedData) as string[]) : [];
    return prevKeywords;
  }

  function getCurrentKeywords(prevKeywords: string[], newKeyword: string): string[] {
    // 읽어온 데이터에서 newKeyword와 중복 제거
    let currentKeywords = prevKeywords.filter((item) => item !== newKeyword);
    currentKeywords.unshift(newKeyword);
    // 6개만 남기기
    if (currentKeywords.length > MAX_LENGTH) {
      currentKeywords = currentKeywords.slice(0, MAX_LENGTH);
    }
    return currentKeywords;
  }

  const handleSearchByKeyword = async () => {
    // 공백으로 인한 버그 막기(로컬스토리지에는 공백 포함해서 저장된 keyword가 UI에서는 공백 없이 보여짐, 중복 발생)
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    const dataList = await getSearchedAuctions(trimmedKeyword);
    console.log('검색 결과: ', dataList);
    // 최근 검색어
    const prevKeywords = getPrevKeywords();
    const currentKeywords = getCurrentKeywords(prevKeywords, trimmedKeyword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentKeywords));
    setSavedKeywords(currentKeywords);
    setKeyword('');
  };

  const handleDeleteKeyword = (keyword: string) => {
    const prevKeywords = getPrevKeywords();
    const currentKeywords = prevKeywords.filter((item) => item !== keyword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentKeywords));
    setSavedKeywords(currentKeywords);
  };

  const handleClearKeywords = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setSavedKeywords([]);
  };

  // 엔터키 입력 감지 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchByKeyword();
    }
  };

  useEffect(() => {
    setSavedKeywords(getPrevKeywords());
  }, []);

  useEffect(() => {
    console.log('savedKeywords: ', savedKeywords);
  }, [savedKeywords]);

  return (
    // 임시 모달
    <div className="fixed right-0 bottom-16 left-0 z-50 m-auto max-w-2xl bg-white">
      {/* 여기서부터 모달에 보내는 영역 */}
      <div data-role="search_box" className="p-4">
        <div data-role="input_section" className="mb-6">
          <div className="relative">
            <input
              type="text"
              className="peer placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-lg border border-[#C6C7D1] bg-[#EEF2FB] px-3 py-1 pr-9 text-sm shadow-none transition-colors focus:ring-1 focus:ring-[#5B80C2] focus:outline-none focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="검색어를 입력하세요"
              value={keyword || ''}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-[#B8B8B8] peer-focus:text-[#5B80C2]"
              onClick={handleSearchByKeyword}
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div data-role="recent_keywords_section" className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-medium">최근 검색어</h3>
            <Button className="p-0 text-xs text-[#B8B8B8]" variant="ghost" onClick={handleClearKeywords}>
              전체 삭제
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {savedKeywords.length > 0 &&
              savedKeywords.map((keyword, idx) => {
                return (
                  <div key={`${keyword}-${idx}`} className="flex items-center rounded-full bg-[#EEF2FB] px-3 py-2">
                    <span className="flex-1 truncate text-sm">{keyword}</span>
                    <button className="ml-1 text-[#B8B8B8]" onClick={() => handleDeleteKeyword(keyword)}>
                      <IoCloseOutline />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        {/* DB 테이블 추가 필요 */}
        <div data-role="popular_keywords_section">
          <h3 className="text-base font-medium">인기 검색어</h3>
        </div>
      </div>
    </div>
  );
}
