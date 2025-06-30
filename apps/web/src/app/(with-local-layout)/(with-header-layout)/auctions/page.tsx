import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import AuctionList from 'src/components/auctions/AuctionList';
import SelectOrder from 'src/components/auctions/SelectOrder';
import PageContainer from 'src/components/layout/PageContainer';
import { fetchAllAuctionWithEpisodeCount } from 'src/lib/queries/auctions';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const queryClient = new QueryClient();

  let { order, page } = await searchParams;

  if (!order) {
    order = 'end_time';
  }

  if (!page) {
    page = '1';
  }

  await queryClient.prefetchQuery({
    queryKey: ['auctions'],
    queryFn: await fetchAllAuctionWithEpisodeCount({ order, page: Number(page) })
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
