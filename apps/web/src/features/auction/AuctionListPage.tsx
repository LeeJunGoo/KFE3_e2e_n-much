import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchedAuctionList } from 'src/entities/auction/queries/auction';
import AuctionList from 'src/features/auction/AuctionList';
import SelectOrder from 'src/features/auction/SelectOrder';
import PageContainer from 'src/shared/ui/PageContainer';
import type { AuctionListPageProps } from 'src/entities/auction/types';

const AuctionListPage = async ({ order, keyword }: AuctionListPageProps) => {
  const queryClient = new QueryClient();

  await prefetchedAuctionList(order, keyword, queryClient);

  return (
    <PageContainer>
      <div className="mb-4 flex w-full flex-col md:flex-row md:justify-between">
        <p className="text-foreground mb-4 text-lg font-semibold">경매 리스트</p>
        <SelectOrder order={order} keyword={keyword} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuctionList order={order} keyword={keyword} />
      </HydrationBoundary>
    </PageContainer>
  );
};

export default AuctionListPage;
