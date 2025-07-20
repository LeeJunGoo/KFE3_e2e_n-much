//TODO - 하단의 경매 현황 누르면 url 파라미터로 end_time을 넘기도록 해야 함

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllAuctionsWithEpisodeCount } from 'src/entities/auction/api';
import AuctionList from 'src/features/auction/AuctionList';
import SelectOrder from 'src/features/auction/SelectOrder';
import PageContainer from 'src/shared/ui/PageContainer';
import type { AuctionRow } from 'src/shared/supabase/types';

//TODO - 파일로 분리하기 (KMH)
interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

//TODO - 파일로 분리하기
interface EpisodeCount {
  episodes: [{ count: number }];
}

//FIXME - Page 컴포넌트 이름 바꾸기
const Page = async ({ searchParams }: PageProps) => {
  const queryClient = new QueryClient();

  let { order, page } = await searchParams;

  if (!order) {
    order = 'end_date';
  }

  if (!page) {
    page = '0';
  }

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['auctions', order],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: AuctionRow & EpisodeCount; nextId: number }> =>
      getAllAuctionsWithEpisodeCount({ order, pageParam }),
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
};
export default Page;
