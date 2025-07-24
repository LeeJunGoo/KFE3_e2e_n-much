import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchedAuctionList } from 'src/entities/auction/queries/auction';
import AuctionList from 'src/features/auction/AuctionList';
import SelectOrder from 'src/features/auction/SelectOrder';
import PageContainer from 'src/shared/ui/PageContainer';
import PageTitle from 'src/shared/ui/PageTitle';
import type { AuctionListPageProps } from 'src/entities/auction/types';

const AuctionListPage = async ({ order, keyword }: AuctionListPageProps) => {
  const queryClient = new QueryClient();

  await prefetchedAuctionList(order, keyword, queryClient);

  return (
    <PageContainer>
      <div className="mb-4 flex w-full flex-col md:flex-row md:items-center">
        <PageTitle className="mb-4 md:mb-0">경매 리스트 </PageTitle>
        <SelectOrder order={order} keyword={keyword} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuctionList order={order} keyword={keyword} />
      </HydrationBoundary>
    </PageContainer>
  );
};

export default AuctionListPage;
