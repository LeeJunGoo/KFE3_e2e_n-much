import { createClient } from '../client/client';
import type { CreateAuctionPayload } from '@repo/ui/types/auctions';

const supabase = createClient();

export const getAllAuctions = async () => {
  const { data, error } = await supabase.from('auctions').select(`
      *,
      user:user_id (
        user_id,
        nickname,
        avatar
      )
    `);

  if (error) {
    console.error(error);
    throw new Error('DB: 모든 경매 불러오기 에러');
  }
  return data;
};

export const getAuction = async (auction_id: string) => {
  const { data, error } = await supabase
    .from('auctions')
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
    .maybeSingle();

  if (error) {
    throw new Error('DB: 특정 경매 불러오기 에러');
  }
  return data;
};

export const addAuction = async (auctionData: CreateAuctionPayload) => {
  const { data, error } = await supabase.from('auctions').insert([auctionData]).select().single();

  if (error) {
    throw new Error('DB: 경매 추가 에러');
  }

  return data;
};

export const updateAuction = async (auction_id: string, status: string) => {
  const { data, error } = await supabase.from('auctions').update({ status }).eq('auction_id', auction_id).select();

  if (error) {
    throw new Error('DB: 경매 수정 에러');
  }
  return data;
};

export const deleteAuction = async (auction_id: string) => {
  const { data, error } = await supabase.from('auctions').delete().eq('auction_id', auction_id).select();

  if (error) {
    throw new Error('DB: 경매 삭제 에러');
  }
  return data;
};
