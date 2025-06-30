import { User } from '@supabase/supabase-js';
import PageTitle from 'src/components/common/ui/PageTitle';
import EpisodesForm from 'src/components/episodes/EpisodesForm';

import { fetchEpisodeById } from 'src/lib/queries/episodes';
import { getAuthInfo } from 'src/lib/supabase/query/auth';
import { EpisodeRow } from 'src/lib/supabase/type';

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
    <main>
      <PageTitle>{initialEpisodeInfo ? '사연 수정' : '사연 등록'}</PageTitle>
      <EpisodesForm
        auction_id={auction_id!}
        episode_id={episode_id}
        initialEpisodeInfo={initialEpisodeInfo}
        initialUserInfo={initialUserInfo}
      />
    </main>
  );
};

export default EpisodePage;
