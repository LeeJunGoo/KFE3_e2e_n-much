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
import { notFound } from 'next/navigation';
import { FaRegCommentDots } from 'react-icons/fa';
import Link from 'next/link';
import { EpisodeItemProps, EpisodesListType } from 'types/episodes';

const EPISODES_PER_PAGE = 5;

const EpisodeList = ({ auction_id }: { auction_id: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState<EpisodeItemProps[]>([]);
  const [episodesCount, setEpisodesCount] = useState(1);

  const listHeaderRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  const totalPages = Math.max(1, Math.ceil(episodesCount / EPISODES_PER_PAGE));

  // 현재 페이지에 보여줄 사연들 계산
  const startIndex = (currentPage - 1) * EPISODES_PER_PAGE;
  const endIndex = startIndex + EPISODES_PER_PAGE;
  const currentEpisodes = episodes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    if (!auction_id) return;

    const fetchEpisodes = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/episodes?auction_id=${auction_id}`);

        if (!res.ok) {
          if (res.status === 404) return notFound;
          throw new Error(`입찰자에 대한 정보를 불러오지 못했습니다.: ${res.statusText}`);
        }

        const data: EpisodesListType = await res.json();
        setEpisodes(data.data.episode);

        setEpisodesCount(data.data.count);
      } catch (error) {
        if (error instanceof Error) {
          setEpisodes([]);
          throw new Error(`입찰자에 대한 정보를 불러오지 못했습니다.: ${error.message}`);
        }
      }
    };

    fetchEpisodes();
  }, [currentPage, auction_id]);

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
      {/* 사연 */}
      <div className="px-6 py-4" ref={listHeaderRef}>
        <h2 className="text-xl font-bold">
          <span>사연</span>
          <span className="ml-1 text-blue-600">({episodesCount})</span>
        </h2>

        <p className="text-sm text-gray-500 mt-1">다양한 사연을 확인하고 입찰에 참여해보세요.</p>
        <Link href={`/episode/${auction_id}`} className="bg-amber-300 border rounded-sm mt-5 inline-block p-1">
          사연 등록
        </Link>
      </div>

      {/* 사연 목록 */}
      {episodesCount === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center bg-slate-50 rounded-b-lg">
          <FaRegCommentDots className="text-4xl text-slate-400" />
          <div>
            <p className="font-semibold text-slate-700">아직 사연이 없어요</p>
            <p className="mt-1 text-sm text-slate-500">가장 먼저 사연을 작성하여 상품을 차지할 기회를 잡아보세요!</p>
          </div>
        </div>
      ) : (
        <ul className="divide-y border-t">
          {currentEpisodes.map((episode: EpisodeItemProps) => (
            <EpisodeItem key={episode.episode_id} episode={episode} />
          ))}
        </ul>
      )}

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
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

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
    </>
  );
};

export default EpisodeList;
