import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import AuctionForm from 'src/components/auctions/AuctionForm';
import PageContainer from 'src/components/layout/PageContainer';
import { fetchAuctionById } from 'src/lib/queries/auctions';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { auction_id } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auctionForm'],
    queryFn: () => fetchAuctionById(auction_id)
  });

  return (
    <PageContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AuctionForm auctionIdParam={auction_id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
