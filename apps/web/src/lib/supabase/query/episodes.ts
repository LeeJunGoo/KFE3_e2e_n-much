import { createClient } from '../client/client';

const supabase = createClient();

// NOTE - 특정 에피소드 정보
export async function getEpisode(episode_id: string) {
  const { data, error } = await supabase.from('episodes').select(`*`).eq('episode_id', episode_id).maybeSingle();

  if (error) {
    console.log('🚀 ~ getEpisode ~ error:', error.message);
    throw new Error('DB: 특정 사연 불러오기 에러');
  }

  return data;
}

// NOTE - 특정 에피소드 및 사연자 정보 / 사연 개수
export const getEpisodesByAuctionId = async (auctionId: string) => {
  const {
    data: episode,
    error,
    count
  } = await supabase
    .from('episodes')
    .select(
      `
      *,
      buyer:buyer_id (
        nickname,
        avatar
      )
    `,
      { count: 'exact' }
    )
    .eq('auction_id', auctionId)
    .order('created_at', { ascending: false });

  if (error) {
    console.log('🚀 ~ getEpisodesByAuctionId ~ error:', error.message);
    throw new Error('DB: 경매 물품에 대한 사연 정보 불러오기 에러');
  }

  return { episode, count };
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

//NOTE - 특정 에피소드 등록
export const createEpisode = async (auction_id: string, buyer_id: string, title: string, description: string) => {
  const { data, error } = await supabase
    .from('episodes')
    .insert([
      {
        auction_id,
        buyer_id,
        title,
        description
      }
    ])
    .select()
    .single();

  if (error) {
    console.log('🚀 ~ createEpisode ~ error:', error.message);
    throw new Error(error.message);
  }
  return data;
};

//NOTE - 특정 에피소드 수정
export async function updateEpisode(episode_id: string, title: string, description: string) {
  const { data, error } = await supabase
    .from('episodes')
    .update({ title, description })
    .eq('episode_id', episode_id)
    .select();

  if (error) {
    console.log('🚀 ~ updateEpisode ~ error:', error.message);
    throw new Error('DB: 사연 수정 에러');
  }

  return data;
}

// NOTE - 최고 입찰자의 정보
export const getHighestBidder = async (auction_id: string) => {
  const { data, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      buyer:buyer_id (
        buyer_id,
        nickname,
        avatar
      )
    `
    )
    .eq('auction_id', auction_id)
    .order('bid_point', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.log('🚀 ~ getHighestBidder ~ error:', error.message);
    throw new Error('DB: 최고 입찰자 불러오기 에러');
  }

  return data;
};
