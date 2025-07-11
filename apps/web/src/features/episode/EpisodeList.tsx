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
import { FaRegCommentDots } from 'react-icons/fa';
import { fetchEpisodesById } from 'src/entities/episode/api';
import { EpisodeItemProps } from 'src/entities/episode/types';
import EpisodeItem from './EpisodeItem';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import { SellerRow } from 'src/shared/supabase/types';

const EPISODES_PER_PAGE = 5;

const EpisodeList = ({
  auction_id,
  userInfo,
  sellerId
}: {
  auction_id: string;
  userInfo: UserInfoType;
  sellerId: SellerRow['seller_id'];
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState<EpisodeItemProps[]>([]);
  const [episodesCount, setEpisodesCount] = useState(0);

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
        const episodesListData = await fetchEpisodesById(auction_id);
        setEpisodes(episodesListData.episode);
        setEpisodesCount(episodesListData.count);
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
      {/* 사연 목록 */}
      {episodesCount === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-b-lg bg-slate-50 px-6 py-10 text-center">
          <FaRegCommentDots className="text-4xl text-slate-400" />
          <div>
            <p className="font-semibold text-slate-700">아직 사연이 없어요</p>
            <p className="mt-1 text-sm text-slate-500">가장 먼저 사연을 작성하여 상품을 차지할 기회를 잡아보세요!</p>
          </div>
        </div>
      ) : (
        <ul className="space-y-5 divide-y">
          {currentEpisodes.map((episode: EpisodeItemProps) => (
            <EpisodeItem key={episode.episode_id} episode={episode} userInfo={userInfo} sellerId={sellerId} />
          ))}
        </ul>
      )}

      <div className="px-6 py-4">
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
