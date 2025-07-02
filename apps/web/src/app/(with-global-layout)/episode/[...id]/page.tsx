import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import PageHeader from 'src/components/common/ui/PageHeader';
import EpisodesForm from 'src/components/episodes/EpisodesForm';
import PageContainer from 'src/components/layout/PageContainer';

import { fetchEpisodeById } from 'src/lib/queries/episodes';
import { getAuthInfo } from 'src/lib/supabase/query/auth';
import { EpisodeRow } from 'src/lib/supabase/type';
import TestImage from 'assets/images/test.png';
import AuctionTimer from 'src/components/auctions/detail/AuctionTimer';
import ListCard from 'src/components/common/ui/ListCard';

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
        <ListCard>
          <div className="flex gap-2">
            <div className="flex flex-shrink-0 overflow-hidden rounded-lg">
              <Image src={TestImage} alt="테스트 이미지입니다." width={80} height={80} className="object-cover" />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-medium">제목</p>
                <p className="text-sm text-(--color-warm-gray)">주소</p>
              </div>
              <AuctionTimer startTime="222" endTime="2222" />
            </div>
          </div>
        </ListCard>
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
