'use client';
import { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@repo/ui/components/ui/pagination';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEpisodesWithPagination } from 'src/entities/episode/api';
import { EPISODES_PER_PAGE } from 'src/entities/episode/constants';
import { episodesListKeys } from 'src/entities/episode/queries/keys/queryKeyFactory';
import { usePageActions } from 'src/entities/episode/stores/usePaginationStore';
import EpisodeItem from 'src/features/episode/EpisodeItem';
import EpisodeEmpty from 'src/features/episode/shared/EpisodeEmpty';
import { type AuctionRow } from 'src/shared/supabase/types';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeList = ({
  episodesCount,
  auctionId,
  sellerId
}: {
  episodesCount: number;
  auctionId: AuctionRow['auction_id'];
  sellerId: AuctionRow['user_id'];
}) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { setCurrentPage } = usePageActions();
  const totalPages = Math.max(1, Math.ceil(episodesCount / EPISODES_PER_PAGE));

  const { isError, data: episodesList } = useQuery({
    queryKey: episodesListKeys.item({ auctionId, page }),
    queryFn: () => getEpisodesWithPagination(auctionId, page),
    placeholderData: keepPreviousData,
    staleTime: 300000
  });

  // ANCHOR - 다음 페이지 prefetch
  useEffect(() => {
    // 마지막 페이지까지만 데이터를 받음
    if (page <= totalPages - 1) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: episodesListKeys.item({ auctionId, page: nextPage }),
        queryFn: () => getEpisodesWithPagination(auctionId, nextPage)
      });
    }
  }, [page, queryClient, totalPages, auctionId]);

  const handlePageChange = (nextPage: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(nextPage);
      setCurrentPage(nextPage);
    }

    //"사연 모음" 타이틀로 스크롤 이동
    const headerEl = document.getElementById('episode-section-header');
    if (headerEl) {
      headerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isError) {
    return <EpisodeEmpty />;
  }

  return (
    <>
      {/* 사연 목록 */}
      <ul className="space-y-5 divide-y">
        {episodesList!.map((episode: EpisodeItemProps) => (
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
                  handlePageChange(page - 1);
                }}
                aria-disabled={page === 1}
              />
            </PaginationItem>

            {/* 페이지 번호 동적 생성 */}
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
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
                  handlePageChange(page + 1);
                }}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default EpisodeList;
