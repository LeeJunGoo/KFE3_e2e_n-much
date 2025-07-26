import { getServerUser } from 'src/entities/auth/serverAction';
import { getLikeEpisode } from 'src/entities/episode/supabase';
import MyEpisodeListItem from 'src/features/user/mypage/components/episodes/components/MyEpisodeListItem';
import type { EpisodeWithAuction } from 'src/entities/user/mypage/episodes/types';

const LikedEpisodesContainer = async () => {
  const user = await getServerUser();
  const userId: string = user?.id as string;

  //TODO - supabase 쿼리 함수를 직접 호출, api 요청으로 변경 예정
  const episodes: EpisodeWithAuction[] = await getLikeEpisode(userId);

  return (
    <>
      <h3 className="pb-2 pt-1 text-sm">{`총 ${episodes ? episodes.length : 0}개의 사연이 있습니다`}</h3>
      <ul>
        {episodes &&
          episodes.map((episode) => {
            return <MyEpisodeListItem key={episode.episode_id} episode={episode} />;
          })}
      </ul>
    </>
  );
};

export default LikedEpisodesContainer;
