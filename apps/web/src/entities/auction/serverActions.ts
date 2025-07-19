'use server';
import { unstable_cache } from 'next/cache';
import { selectAuctionsByMainPageCategory } from 'src/entities/auction/supabase';

//ANCHOR - 마감 임박
export const getEndingSoonAuctions = unstable_cache(
  async (order: string, isAscending: boolean, count: number) => {
    const data = await selectAuctionsByMainPageCategory(order, isAscending, count);
    return data;
  },
  ['auctions-endingSoon'],
  { tags: ['auctions-endingSoon'], revalidate: 60 }
);

//ANCHOR - 인기순
export const getPopularAuctions = unstable_cache(
  async (order: string, isAscending: boolean, count: number) => {
    return await selectAuctionsByMainPageCategory(order, isAscending, count);
  },
  ['auctions-popularity'],
  {
    tags: ['auctions-popularity'],
    revalidate: 3600
  }
);

//ANCHOR - 최신순
// export const getALatestAuctions = unstable_cache(
//   async (order: string, isAscending: boolean, count: number) => {
//     const data = await selectAuctionsByMainPageCategory(order, isAscending, count);
//     return data;
//   },
//   ['auctions-Latest'],
//   {
//     tags: ['auctions-Latest']
//   }
// );
export const getALatestAuctions = async (order: string, isAscending: boolean, count: number) => {
  const data = await selectAuctionsByMainPageCategory(order, isAscending, count);
  return data;
};
