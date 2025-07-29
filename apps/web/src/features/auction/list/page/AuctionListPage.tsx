import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchAuctionList } from 'src/entities/auction/queries/auction';
import { getAuctionCount } from 'src/entities/auction/serverActions';
import WriteAuctionButton from 'src/features/auction/button/WriteAuctionButton';
import AuctionList from 'src/features/auction/list/components/AuctionList';
import SelectOrder from 'src/features/auction/list/components/SelectOrder';
import ErrorState from 'src/features/user/mypage/components/shared/ErrorState';
import PageContainer from 'src/shared/ui/PageContainer';
import PageTitle from 'src/shared/ui/PageTitle';
import GoTopButton from 'src/shared/utils/goTopButton';
import type { AuctionListPageProps } from 'src/entities/auction/types';

const AuctionListPage = async ({ order, keyword }: AuctionListPageProps) => {
  const queryClient = new QueryClient();
  const auctionCount = await getAuctionCount(keyword);

  await prefetchAuctionList(order, keyword, queryClient);

  return (
    <PageContainer>
      <div className="mb-4 flex w-full flex-col md:flex-row md:items-center">
        <PageTitle className="mb-4 md:mb-0">경매 리스트 </PageTitle>
        <SelectOrder order={order} keyword={keyword} />
      </div>
      {auctionCount ? (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AuctionList order={order} keyword={keyword} auctionCount={auctionCount} />
        </HydrationBoundary>
      ) : (
        <ErrorState />
      )}

      <WriteAuctionButton />
      <GoTopButton />
    </PageContainer>
  );
};

export default AuctionListPage;
