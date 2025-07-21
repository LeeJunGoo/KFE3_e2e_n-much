'use server';
import { selectAuctionsByMainPageCategory } from 'src/entities/auction/supabase';

//ANCHOR - 마감 임박, 인기순, 최신순
export const getAuctionsCategory = async (order: string, isAscending: boolean, count: number) => {
  const data = await selectAuctionsByMainPageCategory(order, isAscending, count);
  return data;
};
