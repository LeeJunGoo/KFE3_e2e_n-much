'use server';
import { getAuctionsWithEpisodeCountByOrderMainPage } from '../supabase/query/auctions';

//NOTE - 경매 데이터 마감 임박, 인기순, 최신순
export const fetchSortedAuctions = async (order: string, isAscending: boolean, count: number) => {
  const data = await getAuctionsWithEpisodeCountByOrderMainPage(order, isAscending, count);

  return data;
};
