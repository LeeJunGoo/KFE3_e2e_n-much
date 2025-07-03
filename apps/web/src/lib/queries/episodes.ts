import { EpisodeInfo, EpisodesListType } from 'src/types/episodes';
import { EpisodeInsert, EpisodeRow } from '../supabase/type';

// NOTE - 특정 에피소드 및 사연자 정보 / 사연 개수
export const fetchEpisodesById = async (auction_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/?auctionId=${auction_id}`);

  if (!res.ok) {
    throw new Error(`입찰자에 대한 정보를 불러오지 못했습니다.`);
  }

  const data: EpisodesListType = await res.json();

  return data.data;
};

//NOTE - 톡정 에피소드 정보
export const fetchEpisodeById = async (episode_id: EpisodeRow['episode_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/?episodeId=${episode_id}`);

  if (!res.ok) {
    const errorData = await res.json();
    if (res.status === 400) {
      console.error(errorData.message);
      return;
    }
    throw new Error('사연 정보를 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }

  const result: EpisodeInfo = await res.json();

  return result.data;
};

//NOTE - 톡정 에피소드 등록
export const fetchCreateEpisode = async ({
  auction_id,
  buyer_id,
  title,
  description
}: Pick<EpisodeInsert, 'auction_id' | 'buyer_id' | 'title' | 'description'>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      auction_id,
      buyer_id,
      title,
      description
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (res.status === 400) {
      console.error(errorData.message);
      return;
    }
    throw new Error('사연을 수정하는 과정에서 네트워크 에러가 발생했습니다.');
  }

  const data: EpisodeInfo = await res.json();

  return data.status;
};

//NOTE - 톡정 에피소드 수정
export const fetchEditEpisode = async ({
  episode_id,
  title,
  description
}: Pick<EpisodeInsert, 'episode_id' | 'title' | 'description'>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=updateEpisode`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({
      episode_id,
      title,
      description
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (res.status === 400) {
      console.error(errorData.message);
      return;
    }
    throw new Error('사연을 수정하는 과정에서 네트워크 에러가 발생했습니다.');
  }

  const data: EpisodeInfo = await res.json();

  return data.status;
};

//NOTE - 톡정 에피소드 삭제
export const fetchDeleteEpisode = async (episode_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify({
      episode_id
    })
  });

  if (!res.ok) {
    throw new Error('사연을 삭제하는 과정에서 네트워크 오류가 발생했습니다.');
  }

  const data: EpisodeInfo = await res.json();
  console.log('🚀 ~ fetchDeleteEpisode ~ data:', data);

  return data.status;
};

//NOTE - 특정 에피소드 입찰
export const fetchUpdateEpisodeBid = async (auction_id: string, episode_id: string, bid_point: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes/bid`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({
      auction_id,
      episode_id,
      bid_point // 계산된 최종 입찰가
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: EpisodeInfo = await res.json();

  return data.status;
};

//NOTE - 특정 에피소드 낙찰
export const fetchUpdateEpisodeWinning = async (episode_id: string, winning_bid: boolean) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=winningEpisode`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify({
      episode_id,
      winning_bid
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  const data: EpisodeInfo = await res.json();

  return data.status;
};

//NOTE - 사용자 참여 중인 경매 개수 조회
export const fetchUserBiddingCount = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=biddingCount`);
  if (!res.ok) {
    throw new Error('참여 중인 경매 개수를 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};

//NOTE - 사용자가 작성한 스토리 목록 조회
export const fetchUserStories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/episodes?type=userStories`);
  if (!res.ok) {
    throw new Error('사용자 스토리 목록을 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};
