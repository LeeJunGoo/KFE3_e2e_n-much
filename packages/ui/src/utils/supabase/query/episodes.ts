import { createClient } from '../client/client';

const supabase = createClient();

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
      user:user_id (
        user_id,
        nickname,
        avatar
      )
    `,
      { count: 'exact' }
    )
    .eq('auction_id', auctionId)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
    throw new Error('DB: 경매 물품에 대한 사연 정보 불러오기 에러');
  }

  return { episode, count };
};

export const getAllEpisodes = async () => {
  const { data, error } = await supabase.from('episodes').select(`
      *,
      user:user_id (
        user_id,
        nickname,
        avatar
      ),
      auction:auction_id (
        auction_id,
        title
      )
    `);

  if (error) {
    console.log(error);
    throw new Error('DB: 모든 사연 불러오기 에러');
  }
  return data;
};

export async function getEpisode(episode_id: string) {
  const { data, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      user:user_id (
        user_id,
        nickname,
        avatar
      )
    `
    )
    .eq('episode_id', episode_id)
    .maybeSingle();

  if (error) {
    throw new Error('DB: 특정 사연 불러오기 에러');
  }

  return data;
}

export async function addEpisode(auction_id: string, user_id: string, bid_point: number) {
  const { data, error } = await supabase
    .from('episodes')
    .insert([
      {
        auction_id,
        user_id,
        bid_point
      }
    ])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('DB: 사연 추가 에러');
  }

  return data;
}

export async function updateEpisode(episode_id: string, winning_bid: boolean) {
  const { data, error } = await supabase.from('episodes').update({ winning_bid }).eq('episode_id', episode_id).select();

  if (error) {
    throw new Error('DB: 사연 수정 에러');
  }

  return data;
}

export async function deleteEpisode(episode_id: string) {
  const { data, error } = await supabase.from('episodes').delete().eq('episode_id', episode_id).select();

  if (error) {
    throw new Error('DB: 사연 삭제 에러');
  }

  return data;
}

// 특정 경매의 최고 입찰자와 입찰가 가져오기
export const getHighestBid = async (auction_id: string) => {
  const { data, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      user:user_id (
        user_id,
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
    throw new Error('DB: 최고 입찰자 불러오기 에러');
  }

  // console.log('최고 입찰자:', data?.user?.nickname);
  // console.log('최고 입찰가:', data?.bid_point);

  return data;
};

//특정 유저의 episode data 가져오기
export async function getUserEpisodes(user_id: string) {
  const { data, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      auction:auction_id (
        auction_id,
        title
      )
    `
    )
    .eq('user_id', user_id);

  if (error) {
    console.error(error);
    throw new Error('DB: 유저의 사연 불러오기 에러');
  }

  return data;
}

// 사연 등록하기
export const postEpisode = async (
  auction_id: string,
  user_id: string,
  title: string,
  description: string,
  bid_point: number
) => {
  const { data, error } = await supabase
    .from('episodes')
    .insert([
      {
        auction_id,
        user_id,
        title,
        description,
        bid_point
      }
    ])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
};
