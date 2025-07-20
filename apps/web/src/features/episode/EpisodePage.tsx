import { notFound } from 'next/navigation';
import { getAuctionSummaryInfoWithAddress } from 'src/entities/auction/api';
import { getEpisodeInfo } from 'src/entities/episode/api';
import { EPISODE_TIP } from 'src/entities/episode/constants';
import EpisodeAuctionCard from 'src/features/episode/EpisodeAuctionCard';
import EpisodesForm from 'src/features/episode/EpisodeForm';
import { createServer } from 'src/shared/supabase/client/server';
import { type EpisodeRow } from 'src/shared/supabase/types';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const EpisodePage = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const [auctionId, episodeId] = (await params).id;
  let initialEpisodeInfo: EpisodeRow | null = null; // 조건부에 따라 수정 및 등록 페이지로 나누기

  // NOTE - 경매 상품 및 업체 정보
  const auctionInfo = await getAuctionSummaryInfoWithAddress(auctionId!);

  //NOTE - episodeId true: 수정, false: 등록
  if (episodeId) {
    initialEpisodeInfo = await getEpisodeInfo(episodeId);
  }

  //NOTE - 로그인된 유저 정보
  const supabase = await createServer();
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
        <EpisodeAuctionCard auctionInfo={auctionInfo} />
        <EpisodesForm auctionId={auctionId!} initialEpisodeInfo={initialEpisodeInfo} userId={user.id}>
          <div className="bg-(--color-secondary) my-10 rounded-lg p-4">
            <h3 className="text-(--color-accent) mb-4 text-sm font-medium">
              <i className="fas fa-lightbulb mr-2"></i>좋은 사연을 위한 팁
            </h3>
            <ul className="text-(--color-warm-gray) space-y-2 text-sm">
              {EPISODE_TIP.map((text, index) => (
                <li key={index}>&bull;&nbsp;{text}&#46;</li>
              ))}
            </ul>
          </div>
        </EpisodesForm>
      </PageContainer>
    </>
  );
};

export default EpisodePage;
