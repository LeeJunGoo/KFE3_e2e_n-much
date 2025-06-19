'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@repo/ui/components/ui/pagination';
import { useEffect, useRef, useState } from 'react';
import EpisodeItem from './EpisodeItem';

export interface EpisodeProps {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  title: string;
  content: string;
}

const EPISODE_PER_PAGE = 5;

const EpisodeList = ({ mockStories }: { mockStories: EpisodeProps[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockStories.length / EPISODE_PER_PAGE);

  // 현재 페이지에 보여줄 사연들 계산
  const startIndex = (currentPage - 1) * EPISODE_PER_PAGE;
  const endIndex = startIndex + EPISODE_PER_PAGE;
  const currentStories = mockStories.slice(startIndex, endIndex);

  const listHeaderRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (listHeaderRef.current) {
      listHeaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <>
      <div className="border rounded-lg">
        <div className="px-6 py-4" ref={listHeaderRef}>
          <h2 className="text-xl font-bold">
            <span>사연</span>
            <span className="ml-1 text-blue-600">({mockStories.length})</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">다양한 사연을 확인하고 입찰에 참여해보세요.</p>
        </div>
        <ul className="divide-y border-t">
          {currentStories.map((story: EpisodeProps) => (
            <EpisodeItem key={story.id} story={story} />
          ))}
        </ul>
        <div className="px-6 py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {/* 페이지 번호 동적 생성 */}
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(i + 1);
                    }}
                    aria-disabled={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* <PaginationEllipsis /> */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;
