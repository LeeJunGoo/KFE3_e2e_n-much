import { createClient } from '../client/client';
import { BuyerInsert, SellerInsert } from '../type';

const supabase = createClient();

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
