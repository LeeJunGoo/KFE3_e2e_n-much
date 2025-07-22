'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@repo/ui/components/ui/pagination';
import { useEffect, useRef, useState } from 'react';
import type { EpisodeItemProps } from 'src/entities/episode/types';
import { AuctionRow } from 'src/shared/supabase/types';
import EpisodeItem from './EpisodeItem';
import EpisodeEmpty from './shared/EpisodeEmpty';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const EPISODES_PER_PAGE = 5;

const EpisodeList = ({
  episodeList,
  auction_id,
  sellerId
}: {
  episodeList: EpisodeItemProps[];
  auction_id: AuctionRow['auction_id'];
  sellerId: AuctionRow['user_id'];
}) => {
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState<EpisodeItemProps[]>(episodeList);
  const [episodesCount, setEpisodesCount] = useState(episodes.length);

  const query = useQueryClient();
  // const { data } = useQuery({
  //   queryKey: ['episodes', page],
  //   queryFn:
  // });

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
  // useEffect(() => {
  //   if (!auction_id) return;

  //   const fetchEpisodes = async () => {
  //     try {
  //       const episodesListData = await fetchEpisodesById(auction_id);
  //       setEpisodes(episodesListData.episode);
  //       setEpisodesCount(episodesListData.count);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         setEpisodes([]);
  //         throw new Error(`입찰자에 대한 정보를 불러오지 못했습니다.: ${error.message}`);
  //       }
  //     }
  //   };

  //   fetchEpisodes();
  // }, [currentPage, auction_id]);

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
      <ul className="space-y-5 divide-y">
        {currentEpisodes.map((episode: EpisodeItemProps) => (
          <EpisodeItem key={episode.episode_id} episode={episode} sellerId={sellerId} />
        ))}
      </ul>
      {/* 페이지 네이션 */}
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
              <PaginationEllipsis />
            </PaginationItem>
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
