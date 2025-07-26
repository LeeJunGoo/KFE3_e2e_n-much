import { EPISODES_PER_PAGE } from 'src/entities/episode/constants';
import { createClient } from 'src/shared/supabase/client/client';
import type { EpisodeCreateType, EpisodeEditType } from 'src/entities/episode/types';
import type { EpisodeRow, UserRow, AuctionRow } from 'src/shared/supabase/types';

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

//ANCHOR - 경매 물품에 대한 전체 에피소드 개수
export const selectEpisodesCount = async (auctionId: AuctionRow['auction_id']) => {
  const { error, count } = await supabase
    .from('episodes')
    .select('*', { count: 'exact', head: true })
    .eq('auction_id', auctionId);
  if (error) {
    console.error('🚀 ~ selectEpisodesCount ~ error:', error);
    throw new Error();
  }

  return {
    episodeCount: count ?? 0
  };
};

//ANCHOR - 경매 물품에 대한 페이지별 에피소드 리스트 및 사연자 정보
export const selectEpisodesWithPagination = async (page: number, auctionId: AuctionRow['auction_id']) => {
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * EPISODES_PER_PAGE;
  const to = from + EPISODES_PER_PAGE - 1;

  const { data: episodeList, error } = await supabase
    .from('episodes')

    .select(
      `
      *,
      users:user_id (
       id,
        nick_name,
        user_avatar,
        email
      )
    `
    )
    .eq('auction_id', auctionId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('🚀 ~ selectEpisodesWithPagination ~ error:', error.message);
    throw new Error();
  }

  return episodeList ?? [];
};

//ANCHOR - 사연 작성 유효성 검사
export const selectHasUserWrittenEpisode = async (
  auctionId: AuctionRow['auction_id'],
  userId: AuctionRow['user_id']
) => {
  const { data, error } = await supabase
    .from('episodes')

    .select('episode_id')
    .eq('auction_id', auctionId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ hasUserWrittenEpisode ~ error:', error);
    throw new Error();
  }
  return Boolean(data);
};

//ANCHOR - 사연 입찰
export const updateEpisodeBid = async (episodeId: string, bidPoint: number) => {
  const { data, error } = await supabase
    .from('episodes')
    .update({ bid_point: bidPoint })
    .eq('episode_id', episodeId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ updateEpisodeBid ~ error:', error);
    throw new Error();
  }
  return Boolean(data); // 작성 여부
};

//ANCHOR - 경매 물품에 대한 에피소드 삭제
export const deleteEpisodeById = async (episodeId: EpisodeRow['episode_id']) => {
  const { data, error } = await supabase.from('episodes').delete().eq('episode_id', episodeId).select('episode_id');

  if (error) {
    console.error('🚀 ~ deleteEpisodeById ~ deleteAuctionById:', error);
    throw new Error();
  }

  return Boolean(data);
};

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

//ANCHOR - 사용자의 보유 포인트
export const selectUserBidPointAmount = async (userId: UserRow['id']) => {
  const { data, error } = await supabase
    .from('points')
    .select('balance_after')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ selectUserBidPoint ~ error:', error);
    throw new Error();
  }

  const userBidPoint = data?.balance_after ?? 0;
  return userBidPoint;
};

//ANCHOR - 사연에 대한 경매 참여자(Buyer)의 총입찰 포인트
export const selectUserTotalBidPoint = async (auctionId: AuctionRow['auction_id'], userId: UserRow['id']) => {
  const { data: userBidPoint, error } = await supabase
    .from('valid_user_bid_totals')
    .select('total_bid_points')
    .eq('auction_id', auctionId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ selectUserBidPoint ~ error:', error);
    throw new Error();
  }
  return userBidPoint?.total_bid_points ?? 0;
};

// NOTE - 사용자가 좋아요한 에피소드 목록 조회 (KSH)
export const getLikeEpisode = async (user_id: UserRow['id']) => {
  const { data, error } = await supabase
    .from('episodes')
    .select('*, auctions(title,status)')
    .contains('likes', [user_id]);

  if (error) {
    throw new Error('DB: 사용자가 좋아요한 에피소드 목록 조회 에러');
  }
  return data ?? [];
};
