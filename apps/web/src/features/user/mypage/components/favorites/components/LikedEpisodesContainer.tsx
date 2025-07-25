import { getServerUser } from 'src/entities/auth/serverAction';
import { getLikeEpisode } from 'src/entities/episode/supabase';
import MyEpisodeListItem from 'src/features/user/mypage/components/episodes/components/MyEpisodeListItem';
import type { EpisodeWithAuction } from 'src/entities/user/mypage/episodes/types';

// episodes 데이터
// const test = {
//   episode_id: '8fed8ef2-9263-4ce4-a2a6-0c775a3057ad',
//   created_at: '2025-07-21T17:17:17.501774+00:00',
//   auction_id: '4bd4f934-6770-4de9-ac4d-75d254b932b8',
//   user_id: 'e40600a6-a437-47b8-840a-ced55b143dc0',
//   title: '이준구 테스트',
//   description: '이준구 테스트이준구 테스트',
//   updated_at: '2025-07-21T17:17:17.501774+00:00',
//   bid_point: 100,
//   bid_date: '2025-07-22T17:17:17.501774+00:00',
//   winning_bid: null,
//   likes: ['b0816bcf-fc0a-48e2-9e4e-9c9648e78b70'],
//   auctions: {
//     title: 'ㅁㄴㅇㄹㅁㄴㅇ'
//   }
// };

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
