import { getServerUser } from 'src/entities/auth/serverAction';
import { getUserLikesEpisodes } from 'src/entities/user/mypage/episodes/api';
import MyEpisodeListItem from 'src/features/user/mypage/components/episodes/components/MyEpisodeListItem';
import EmptyState from 'src/shared/ui/EmptyState';
import type { EpisodeWithAuction } from 'src/entities/user/mypage/episodes/types';

const LikedEpisodesContainer = async () => {
  const user = await getServerUser();
  if (!user) {
    return <>로그인이 필요합니다.</>;
  }
  const userId: string = user!.id;
  const episodes: EpisodeWithAuction[] = await getUserLikesEpisodes(userId);

  if (!episodes || episodes.length === 0) {
    return (
      <EmptyState
        title="찜한 에피소드가 없어요"
        description="관심 있는 에피소드를 저장하고 다시 만나보세요"
        className="mt-24"
      />
    );
  }

  return (
    <>
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
