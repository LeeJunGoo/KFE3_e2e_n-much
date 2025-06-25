// import { CreateUserPayload } from 'src/types/mypage';
import { createClient } from '../client/client';
import { BuyerInsert, SellerInsert } from '../type';

const supabase = createClient();

// export const getAllUsers = async () => {
//   const { data, error } = await supabase.from('users').select(`
//     *,
//     auctions:auctions (
//       auction_id,
//       title
//     ),
//     episodes:episodes (
//       episode_id,
//       title,
//       bid_point
//     )
//   `);

//   if (error) {
//     console.error('Supabase error:', error);
//     throw new Error('DB: 모든 유저 불러오기 에러');
//   }
//   return data || [];
// };

export const getUser = async (user_id: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('user_id', user_id).maybeSingle();

  if (error) {
    throw new Error('DB: 특정 유저 불러오기 에러');
  }
  return data;
};

// export const addUser = async (newUserData: CreateUserPayload) => {
//   const { data, error } = await supabase.from('users').insert([newUserData]).select().single();

//   if (error) {
//     throw new Error('DB: 유저 추가 에러');
//   }

//   return data;
// };

export async function upsertBuyer(userData: BuyerInsert) {
  const { data: user, error } = await supabase.from('buyers').upsert([userData]).select().single();

  if (error) {
    throw new Error('DB: 유저 추가/수정 에러');
  }
  return user;
}

export async function upsertSeller(userData: SellerInsert) {
  const { data: user, error } = await supabase.from('sellers').upsert([userData]).select().single();

  if (error) {
    throw new Error('DB: 유저 추가/수정 에러');
  }
  return user;
}
