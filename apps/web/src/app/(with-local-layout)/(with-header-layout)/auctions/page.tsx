//TODO - 하단의 경매 현황 누르면 url 파라미터로 end_time을 넘기도록 해야 함

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import AuctionList from 'src/components/auctions/AuctionList';
import SelectOrder from 'src/components/auctions/SelectOrder';
import PageContainer from 'src/components/layout/PageContainer';
import { fetchAllAuctionWithEpisodeCount } from 'src/entities/auction/api';
import { AuctionRow } from 'src/shared/supabase/types';

interface EpisodeCount {
  episodes: [{ count: number }];
}

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const queryClient = new QueryClient();

  let { order, page } = await searchParams;

  if (!order) {
    order = 'end_time';
  }

  if (!page) {
    page = '0';
  }

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['auctions', order],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: AuctionRow & EpisodeCount; nextId: number }> =>
      fetchAllAuctionWithEpisodeCount({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: AuctionRow & EpisodeCount; nextId: number }) => lastPage.nextId
  });

  return (
    <PageContainer>
      <div className="mb-4 flex w-full justify-between">
        <p className="text-lg font-semibold text-[#1F1F25]">경매 리스트</p>
        <SelectOrder order={order} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuctionList order={order} />
      </HydrationBoundary>
    </PageContainer>
  );
}
