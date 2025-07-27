import { getServerUser } from 'src/entities/auth/serverAction';
import { getUserLikesEpisodes } from 'src/entities/user/mypage/episodes/api';
import MyEpisodeListItem from 'src/features/user/mypage/components/episodes/components/MyEpisodeListItem';
import type { EpisodeWithAuction } from 'src/entities/user/mypage/episodes/types';

const LikedEpisodesContainer = async () => {
  const user = await getServerUser();
  console.log('user:', user);
  const userId: string = user!.id;
  console.log('userId:', userId);

  const episodes: EpisodeWithAuction[] = await getUserLikesEpisodes(userId);

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
