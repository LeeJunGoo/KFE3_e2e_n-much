import { createClient } from '../client/client';
import type { CreateAuctionPayload } from '@repo/ui/types/auctions';

const supabase = createClient();

export async function getAllAuctions() {
  const { data: auctions, error } = await supabase.from('auctions').select('*');

  if (error) {
    console.log(error);
    throw new Error('DB: 모든 경매 불러오기 에러');
  }
  return auctions;
}

export async function getAuction(auction_id: string) {
  const { data: auction, error } = await supabase
    .from('auctions')
    .select('*')
    .eq('auction_id', auction_id)
    .maybeSingle();

  if (error) {
    throw new Error('DB: 특정 경매 불러오기 에러');
  }
  return auction;
}

export async function addAuction(auctionData: CreateAuctionPayload) {
  const { data: auction, error } = await supabase.from('auctions').insert([auctionData]).select().single();

  if (error) {
    throw new Error('DB: 경매 추가 에러');
  }

  return auction;
}

export async function updateAuction(auction_id: string, status: string) {
  const { data: user, error } = await supabase
    .from('auctions')
    .update({ status })
    .eq('auction_id', auction_id)
    .select();

  if (error) {
    throw new Error('DB: 경매 수정 에러');
  }
  return user;
}

export async function deleteAuction(auction_id: string) {
  const { data: auction, error } = await supabase.from('auctions').delete().eq('auction_id', auction_id).select();

  if (error) {
    throw new Error('DB: 경매 삭제 에러');
  }
  return auction;
}
