import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuctionCardList } from 'src/entities/auction/api';
import { auctionListKeys } from 'src/entities/auction/queries/queryKeyFactory';
import AuctionList from 'src/features/auction/AuctionList';
import SelectOrder from 'src/features/auction/SelectOrder';
import PageContainer from 'src/shared/ui/PageContainer';
import type { AuctionListPageProps, EpisodeCount } from 'src/entities/auction/types';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionListPage = async ({ order }: AuctionListPageProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: auctionListKeys.order(order),
    queryFn: ({
      pageParam
    }: {
      pageParam: number;
    }): Promise<{
      data: (AuctionRow & EpisodeCount)[];
      nextId: number;
    }> => getAuctionCardList({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId
  });

  return (
    <PageContainer>
      <div className="mb-4 flex w-full flex-col md:flex-row md:justify-between">
        <p className="text-foreground mb-4 text-lg font-semibold">경매 리스트</p>
        <SelectOrder order={order} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuctionList order={order} />
      </HydrationBoundary>
    </PageContainer>
  );
};

export default AuctionListPage;
