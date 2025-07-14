'use client';

import React, { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  handleSearch: (keyword: string) => void;
  isFocused?: boolean;
  isLoading?: boolean;
}

const SearchInput = ({ keyword, setKeyword, handleSearch, isFocused = false, isLoading = false }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      // 열릴 때 navbar 아이콘 포커스에서 Drawer 내부로 포커스 이동해야 함, 포커스 이동하지 않으면 에러
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <form
      data-role="input_section"
      className="relative mb-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(keyword);
      }}
    >
      <input
        type="text"
        className="placeholder:text-muted-foreground peer flex h-12 w-full rounded-lg border border-[var(--color-light-gray)] bg-[var(--color-secondary)] px-3 py-1 pr-9 text-sm shadow-none transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="검색어를 입력하세요"
        value={keyword || ''}
        onChange={(e) => setKeyword(e.target.value)}
        ref={inputRef}
        disabled={isLoading}
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-[var(--color-warm-gray)] disabled:cursor-not-allowed disabled:opacity-50 peer-focus:text-[var(--color-accent)]"
        type="submit"
        aria-label="검색"
        disabled={isLoading}
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
