import { EpisodeInfo, EpisodesListType } from 'src/types/episodes';
import { EpisodeInsert, EpisodeRow } from '../supabase/type';

//NOTE - 특정 경매 물품에 대한 사연 리스트 불러오기
export const fetchEpisodesById = async (auction_id: string) => {
  const res = await fetch(`http://localhost:3001/api/episodes/?auctionId=${auction_id}`);

  if (!res.ok) {
    throw new Error(`입찰자에 대한 정보를 불러오지 못했습니다.`);
  }

  const data: EpisodesListType = await res.json();

  return data.data;
};

//NOTE - 특정 사연 정보
export const fetchEpisodeById = async (episode_id: EpisodeRow['episode_id']) => {
  const res = await fetch(`http://localhost:3001/api/episodes/?episodeId=${episode_id}`);

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

//NOTE - 사연 등록하기
export const fetchCreateEpisode = async ({
  auction_id,
  buyer_id,
  title,
  description
}: Pick<EpisodeInsert, 'auction_id' | 'buyer_id' | 'title' | 'description'>) => {
  const res = await fetch('http://localhost:3001/api/episodes', {
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

//NOTE - 사연 수정하기
export const fetchEditEpisode = async ({
  episode_id,
  title,
  description
}: Pick<EpisodeInsert, 'episode_id' | 'title' | 'description'>) => {
  const res = await fetch('http://localhost:3001/api/episodes?type=updateEpisode', {
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

//NOTE - 사연 삭제하기
export const fetchDeleteEpisode = async (episode_id: string) => {
  const res = await fetch('http://localhost:3001/api/episodes', {
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

//NOTE - 특정 에피소드 입찰하기
export const fetchUpdateEpisodeBid = async (auction_id: string, episode_id: string, bid_point: number) => {
  const res = await fetch('http://localhost:3001/api/episodes/bid', {
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

//NOTE - 특정 에피소드 낙찰하기
export const fetchUpdateEpisodeWinning = async (episode_id: string, winning_bid: boolean) => {
  const res = await fetch('http://localhost:3001/api/episodes?type=winningEpisode', {
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
