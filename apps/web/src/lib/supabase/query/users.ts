import { CreateUserPayload } from 'src/types/mypage';
import { createClient } from '../client/client';
import { UserUpdate, UserInsert } from '../type';

const supabase = createClient();

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('users').select(`
    *,
    auctions:auctions (
      auction_id,
      title
    ),
    episodes:episodes (
      episode_id,
      title,
      bid_point
    )
  `);

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('DB: 모든 유저 불러오기 에러');
  }
  return data || [];
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

export async function upsertUser(userData: UserInsert) {
  const { data: user, error } = await supabase.from('users').upsert([userData]).select().single();

  if (error) {
    throw new Error('DB: 유저 추가/수정 에러');
  }
  return user;
}

//경매자 총 경매수 count, 현재 진행중인 경매 count
export const getUserAuctionCount = async (user_id: string) => {
  const { count: totalCount, error: totalError } = await supabase
    .from('auctions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user_id);

  const { count: activeCount, error: activeError } = await supabase
    .from('auctions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user_id)
    .eq('status', 'OPEN');

  if (totalError) {
    console.log('totalError:', totalError);
    throw new Error('DB: 경매자의 총 경매 수를 불러오는 과정에서 Error 발생');
  }
  if (activeError) {
    console.log('activeError:', activeError);
    throw new Error('DB: 경매자의 현재 진행중인 경매 수를 불러오는 과정에서 Error 발생');
  }

  return {
    totalAuctions: totalCount || 0,
    activeAuctions: activeCount || 0
  };
};
