import { User } from '@supabase/supabase-js';
import PageHeader from 'src/components/common/ui/PageHeader';
import EpisodesForm from 'src/components/episodes/EpisodesForm';
import PageContainer from 'src/components/layout/PageContainer';

import EpisodesAuctionCard from 'src/components/episodes/EpisodesAuctionCard';
import { fetchEpisodeById } from 'src/lib/queries/episodes';
import { getAuthInfo } from 'src/lib/supabase/query/auth';
import { EpisodeRow } from 'src/lib/supabase/type';
import AuctionErrorBoundary from 'src/components/common/AuctionErrorBoundary';
import { Suspense } from 'react';

const EpisodePage = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const [auction_id, episode_id] = (await params).id;
  let initialEpisodeInfo: EpisodeRow | undefined;
  let initialUserInfo: User | null | undefined;

  if (episode_id) {
    try {
      initialEpisodeInfo = await fetchEpisodeById(episode_id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  } else {
    // NOTE - 로그인 정보
    initialUserInfo = await getAuthInfo();
  }

  return (
    <>
      <PageHeader>{initialEpisodeInfo ? '사연 수정' : '사연 등록'}</PageHeader>
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
            <EpisodesAuctionCard auction_id={auction_id!} />
          </Suspense>
        </AuctionErrorBoundary>
        <EpisodesForm
          auction_id={auction_id!}
          episode_id={episode_id}
          initialEpisodeInfo={initialEpisodeInfo}
          initialUserInfo={initialUserInfo}
        />
      </PageContainer>
    </>
  );
};

export default EpisodePage;
