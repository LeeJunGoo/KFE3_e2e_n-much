import { createClient } from '../client/client';
import type { CreateUserPayload, UserUpdate } from '@repo/ui/types/users';

const supabase = createClient();

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('users').select(`
    *,
    auctions (
      auction_id,
      title
    ),
    episodes (
      episode_id,
      title,
      bid_point
    )
  `);

  if (error) {
    throw new Error('DB: 모든 유저 불러오기 에러');
  }

  console.log('전체 데이터:', data);
  console.log('첫 번째 유저:', data?.[0]);
  console.log('첫 번째 유저의 경매:', data?.[0]?.auctions);
  console.log('첫 번째 유저의 에피소드:', data?.[0]?.episodes);

  return data;
};

export const getUser = async (user_id: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('user_id', user_id).maybeSingle();

  if (error) {
    throw new Error('DB: 특정 유저 불러오기 에러');
  }
  return data;
};

export const addUser = async (newUserData: CreateUserPayload) => {
  const { data, error } = await supabase.from('users').insert([newUserData]).select().single();

  if (error) {
    throw new Error('DB: 유저 추가 에러');
  }

  return data;
};

export const updateUser = async (user_id: string, updatedData: UserUpdate) => {
  const { data, error } = await supabase.from('users').update(updatedData).eq('user_id', user_id).select().single();

  if (error) {
    console.log(error);
    throw new Error('DB: 유저 수정 에러');
  }

  return data;
};

//경매자 총 경매수 count, 현재 진행중인 경매 count
export const getUserAuctionCount = async (user_id: string) => {
  const { count: totalCount } = await supabase
    .from('auctions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user_id);

  const { count: activeCount } = await supabase
    .from('auctions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user_id)
    .eq('status', 'OPEN');

  console.log('경매 통계:', {
    총경매수: totalCount,
    진행중경매: activeCount
  });

  return {
    totalAuctions: totalCount || 0,
    activeAuctions: activeCount || 0
  };
};
