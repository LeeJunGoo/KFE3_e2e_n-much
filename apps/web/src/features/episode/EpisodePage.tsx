import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { createClient } from 'src/shared/supabase/client/server';
import { type EpisodeRow } from 'src/shared/supabase/types';
import AuctionErrorBoundary from 'src/shared/ui/AuctionErrorBoundary';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import EpisodesAuctionCard from './EpisodesAuctionCard';
import EpisodesForm from './EpisodesForm';
import { getEpisodeById } from 'src/entities/episode/api';

const EpisodePage = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const [auctionId, episodeId] = (await params).id;
  let initialEpisodeInfo: EpisodeRow | null = null; // 조건부에 따라 수정 및 등록 페이지로 나누기

  //NOTE - episodeId true: 수정, false: 등록
  if (episodeId) {
    initialEpisodeInfo = await getEpisodeById(episodeId);
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  return (
    <>
      <DetailPageHeader>{initialEpisodeInfo ? '사연 수정하기' : '사연 등록하기'}</DetailPageHeader>
      <PageContainer>
        <AuctionErrorBoundary
          fallback={
            <div className="flex h-[120px] items-center justify-center border-2">
              <h3 className="text-[22px]">⚠️ 경매 물품 정보 섹션에서 오류가 발생했습니다.</h3>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex h-[120px] items-center justify-center">
                <span className="animate-pulse text-lg text-gray-500">{'🚚 경매 데이터를 불러오는 중입니다...'}</span>
              </div>
            }
          >
            <EpisodesAuctionCard auctionId={auctionId!} userId={user.id} />
          </Suspense>
        </AuctionErrorBoundary>
        <EpisodesForm auction_id={auctionId!} initialEpisodeInfo={initialEpisodeInfo} />
      </PageContainer>
    </>
  );
};

export default EpisodePage;
