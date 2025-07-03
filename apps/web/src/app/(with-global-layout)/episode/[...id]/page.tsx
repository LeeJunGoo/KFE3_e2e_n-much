import PageHeader from 'src/components/common/ui/PageHeader';
import EpisodesForm from 'src/components/episodes/EpisodesForm';
import PageContainer from 'src/components/layout/PageContainer';

import { Suspense } from 'react';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import AuctionErrorBoundary from 'src/components/common/AuctionErrorBoundary';
import LoginPrompt from 'src/components/common/LoginPrompt';
import EpisodesAuctionCard from 'src/components/episodes/EpisodesAuctionCard';
import { fetchDetailPageUserInfo } from 'src/lib/queries/auth';
import { fetchEpisodeById } from 'src/lib/queries/episodes';
import { createClient } from 'src/lib/supabase/client/server';
import { EpisodeRow } from 'src/lib/supabase/type';

const EpisodePage = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const [auction_id, episode_id] = (await params).id;
  let initialEpisodeInfo: EpisodeRow | undefined;

  if (episode_id) {
    initialEpisodeInfo = await fetchEpisodeById(episode_id);
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <LoginPrompt />;
  }

  //NOTE - 로그인된 유저 정보
  const userInfo: UserInfoType = await fetchDetailPageUserInfo(user.id);

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
          userInfo={userInfo}
        />
      </PageContainer>
    </>
  );
};

export default EpisodePage;
