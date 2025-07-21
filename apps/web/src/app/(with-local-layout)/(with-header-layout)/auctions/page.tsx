//TODO - 하단의 경매 현황 누르면 url 파라미터로 end_date를 넘기도록 해야 함 (KMH)
//TODO - 미들웨어 구현하기

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuctionCardList } from 'src/entities/auction/api';
import AuctionList from 'src/features/auction/AuctionList';
import SelectOrder from 'src/features/auction/SelectOrder';
import PageContainer from 'src/shared/ui/PageContainer';
import type { AuctionRow } from 'src/shared/supabase/types';

//TODO - 파일로 분리하기 (KMH)
interface CurrentAuctionsPage {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

//TODO - 파일로 분리하기 (KMH)
interface EpisodeCount {
  episodes: [{ count: number }];
}

const CurrentAuctionsPage = async ({ searchParams }: CurrentAuctionsPage) => {
  const queryClient = new QueryClient();
  const { order } = await searchParams;

  //NOTE - 미들웨어에서 order가 없는 경우, order=end_date로 리다이렉트함 (KNH)
  const selectedOrder = order || 'end_date';

  //TODO - 쿼리 키 객체로 만들어서 관리하기 (KMH)
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['auctions', order],
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      getAuctionCardList({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId
  });

  return (
    <PageContainer>
      <div className="mb-4 flex w-full flex-col md:flex-row md:justify-between">
        <p className="text-foreground mb-4 text-lg font-semibold">경매 리스트</p>
        <SelectOrder order={selectedOrder} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuctionList order={selectedOrder} />
      </HydrationBoundary>
    </PageContainer>
  );
};
export default CurrentAuctionsPage;
