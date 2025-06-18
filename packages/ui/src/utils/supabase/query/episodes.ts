import { createClient } from '../client/client';

const supabase = createClient();

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
