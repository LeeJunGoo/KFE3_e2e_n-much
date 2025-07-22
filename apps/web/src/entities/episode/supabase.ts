import { createClient } from 'src/shared/supabase/client/client';
import { type AuctionRow } from 'src/shared/supabase/types';
import type { EpisodeCreateType, EpisodeEditType } from 'src/entities/episode/types';
import { EPISODES_PER_PAGE } from './constants';

const supabase = createClient();

//ANCHOR - 경매 상품에 대한 에피소드 정보
export const selectEpisodeInfo = async (episode_id: string) => {
  const { data, error } = await supabase.from('episodes').select(`*`).eq('episode_id', episode_id).maybeSingle();

  if (error) {
    console.error('🚀 ~ selectEpisodeInfo ~ error:', error);
    throw new Error();
  }

  return data;
};

//ANCHOR - 경매 상품에 대한 에피소드 등록
export const insertEpisode = async ({ auctionId, userId, title, description }: EpisodeCreateType) => {
  const { error } = await supabase.from('episodes').insert([
    {
      auction_id: auctionId,
      user_id: userId,
      title,
      description
    }
  ]);

  if (error) {
    console.error('🚀 ~ insertEpisode ~ error:', error);
    throw new Error();
  }
};

//ANCHOR - 경매 상품에 대한 에피소드 수정
export const updateEpisodeById = async ({ episodeId, title, description }: EpisodeEditType) => {
  const { error } = await supabase.from('episodes').update({ title, description }).eq('episode_id', episodeId!);

  if (error) {
    console.error('🚀 ~ updateEpisodeById ~ error:', error.message);
    throw new Error();
  }
};

//ANCHOR - 경매 물품에 대한 전체 에피소드 리스트 및 개수
export const selectEpisodesByAuctionId = async (auctionId: AuctionRow['auction_id']) => {
  const {
    data: episode,
    error,
    count
  } = await supabase
    .from('episodes')
    .select(
      `
      *,
      users:user_id (
        nick_name,
        user_avatar,
        email
      )
    `,
      { count: 'exact' }
    )
    .eq('auction_id', auctionId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🚀 ~ selectEpisodesByAuctionId ~ error:', error);
    throw new Error();
  }

  return {
    episodeList: episode ?? [],
    episodeCount: count ?? 0
  };
};
export const selectEpisodesWithPagination = async (page: number, auctionId: AuctionRow['auction_id']) => {
  const from = (page - 1) * EPISODES_PER_PAGE;
  const to = from + EPISODES_PER_PAGE - 1;

  const { data: episode, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      users:user_id (
        nick_name,
        user_avatar,
        email
      )
    `
    )
    .eq('auction_id', auctionId)
    .range(to, from)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🚀 ~ selectEpisodesWithPagination ~ error:', error);
    throw new Error();
  }
  return {
    episodeList: episode ?? []
  };
};

//NOTE - 특정 에피소드 입찰
export async function updateEpisodeBidPoint(episode_id: string, bid_point: number) {
  const { data, error } = await supabase
    .from('episodes')
    .update({ bid_point })
    .eq('episode_id', episode_id)
    .select()
    .single();

  if (error) {
    console.log('🚀 ~ updateEpisodeBidPoint ~ error:', error.message);
    throw new Error('DB: 입찰하기 에러');
  }

  return data;
}

//NOTE - 특정 에피소드 낙찰
export async function selectWinningEpisode(episode_id: string, winning_bid: boolean) {
  const { data, error } = await supabase
    .from('episodes')
    .update({ winning_bid })
    .eq('episode_id', episode_id)
    .select()
    .single();

  if (error) {
    console.log('🚀 ~ selectWinningEpisode ~ error:', error.message);
    throw new Error('DB: 사연 수정 에러');
  }

  return data;
}

//NOTE - 톡정 에피소드 삭제
export async function deleteEpisode(episode_id: string) {
  const { data, error } = await supabase.from('episodes').delete().eq('episode_id', episode_id).select();

  if (error) {
    console.log('🚀 ~ deleteEpisode ~ error:', error.message);
    throw new Error('DB: 사연 삭제 에러');
  }

  return data;
}

//ANCHOR - 입찰 랭킹의 입찰자의 정보
export const selectBidderRanking = async (auction_id: string) => {
  const { data, error } = await supabase
    .from('ranking')
    .select(
      `
      rank_position,
      bid_amount,
      created_at,
      users:user_id (
        id,
        nick_name,
        user_avatar,
        email
      )
    `
    )
    .eq('auction_id', auction_id)
    .order('rank_position', { ascending: true });

  if (error) {
    console.error('🚀 ~ selectBidderRanking ~ error:', error);
    throw new Error();
  }

  return data;
};

// NOTE - 사용자 참여 중인 경매 개수 조회
export async function getUserBiddingCount(buyer_id: string) {
  const { data, error } = await supabase
    .from('episodes')
    .select(
      `
      episode_id,
      auctions!inner(status)
    `
    )
    .eq('buyer_id', buyer_id)
    .eq('auctions.status', 'OPEN');

  if (error) {
    throw new Error('DB: 참여 중인 경매 개수 조회 에러');
  }

  return data?.length || 0;
}

// NOTE - 사용자가 작성한 스토리 목록 조회
export async function getUserStories(buyer_id: string) {
  const { data, error } = await supabase
    .from('episodes')
    .select(
      `
      episode_id,
      title,
      description,
      created_at,
      status,
      bid_point,
      auctions!inner(
        auction_id,
        title,
        status,
        end_time
      )
    `
    )
    .eq('buyer_id', buyer_id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('DB: 사용자 스토리 목록 조회 에러');
  }

  return data;
}
